import { NextResponse } from "next/server"
import { checkCredentials } from "@/lib/auth-debug"

export async function POST(request: Request) {
  // Only allow in development environment
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "This endpoint is only available in development mode" }, { status: 403 })
  }

  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    const result = await checkCredentials(email, password)
    return NextResponse.json(result)
  } catch (error) {
    console.error("Auth debug error:", error)
    return NextResponse.json({ error: "Failed to check credentials" }, { status: 500 })
  }
}

