// Server-side password update — bypasses Chrome AbortError
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
    try {
        const { password } = await request.json();

        if (!password || password.length < 6) {
            return NextResponse.json(
                { error: "Password must be at least 6 characters." },
                { status: 400 }
            );
        }

        const supabase = createClient();

        // Verify user has an active session (from recovery code exchange)
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError || !user) {
            return NextResponse.json(
                { error: "Session expired. Please request a new reset link." },
                { status: 401 }
            );
        }

        // Update password server-side
        const { error } = await supabase.auth.updateUser({ password });

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json(
            { error: "Something went wrong. Please try again." },
            { status: 500 }
        );
    }
}
