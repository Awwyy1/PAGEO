// API route to delete user account — removes avatar, links, profile, the
// auth.users record itself, and signs the browser out
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";

export async function DELETE() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const errors: string[] = [];

  // 1. Delete avatar from storage (stored as "userId.avatar")
  const { error: avatarErr } = await supabase.storage
    .from("avatars")
    .remove([`${user.id}.avatar`]);
  if (avatarErr) errors.push(`Avatar: ${avatarErr.message}`);

  // 2. Delete links
  const { error: linksErr } = await supabase
    .from("links")
    .delete()
    .eq("profile_id", user.id);
  if (linksErr) errors.push(`Links: ${linksErr.message}`);

  // 3. Delete profile
  const { error: profileErr } = await supabase
    .from("profiles")
    .delete()
    .eq("id", user.id);
  if (profileErr) errors.push(`Profile: ${profileErr.message}`);

  // 4. Sign out before removing the account.
  //
  // Order matters. Signing out clears the auth cookies while the session is
  // still valid; doing it after the account is gone leaves those cookies in
  // place and the browser then carries a token for a user that no longer
  // exists — the stale-session state that made deleting and re-registering with
  // the same address behave strangely.
  await supabase.auth.signOut();

  // 5. Delete the auth.users row.
  //
  // Steps 1-3 only clear application data. Without this the account itself
  // survives forever, email address included, so a deletion request would leave
  // personal data behind. Requires the service role — a user cannot delete their
  // own auth record with an anon-key client.
  const admin = createAdminClient();
  if (!admin) {
    errors.push("Account record: server is missing its service role key");
  } else {
    const { error: authErr } = await admin.auth.admin.deleteUser(user.id);
    if (authErr) errors.push(`Account record: ${authErr.message}`);
  }

  if (errors.length > 0) {
    return NextResponse.json(
      { error: `Partial deletion: ${errors.join("; ")}. Contact support to fully remove your data.` },
      { status: 207 }
    );
  }

  return NextResponse.json({ success: true });
}
