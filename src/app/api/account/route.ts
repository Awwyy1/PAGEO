// API route to delete user account — removes profile, links, avatar, and signs out
import { createClient } from "@/lib/supabase/server";
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

  // 4. Sign out the user
  await supabase.auth.signOut();

  if (errors.length > 0) {
    return NextResponse.json(
      { error: `Partial deletion: ${errors.join("; ")}. Contact support to fully remove your data.` },
      { status: 207 }
    );
  }

  return NextResponse.json({ success: true });
}
