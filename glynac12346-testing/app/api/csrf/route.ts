import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import crypto from "crypto"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Generate CSRF token
    const csrfToken = crypto.randomBytes(32).toString("hex")

    // Set CSRF token in cookie
    const response = NextResponse.json({ csrfToken })
    response.cookies.set("XSRF-TOKEN", csrfToken, {
      httpOnly: false, // Needs to be accessible from JavaScript
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60, // 1 hour
    })

    return response
  } catch (error) {
    console.error("Error generating CSRF token:", error)
    return NextResponse.json({ error: "Failed to generate CSRF token" }, { status: 500 })
  }
}

