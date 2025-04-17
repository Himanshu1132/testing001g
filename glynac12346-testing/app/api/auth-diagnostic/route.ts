import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { compare } from "bcrypt"

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

    // Find the user
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        image: true,
        password: true,
      },
    })

    if (!user) {
      return NextResponse.json({
        status: "error",
        message: "User not found",
        diagnostics: {
          email,
          userExists: false,
        },
      })
    }

    // Check password
    const passwordValid = await compare(password, user.password)

    // Return diagnostic information
    return NextResponse.json({
      status: "success",
      message: "Diagnostic complete",
      diagnostics: {
        email,
        userExists: true,
        passwordValid,
        userObject: {
          id: user.id,
          email: user.email,
          name: user.name,
          hasImage: !!user.image,
          passwordHash: user.password.substring(0, 10) + "...", // Show partial hash for debugging
        },
      },
    })
  } catch (error) {
    console.error("Auth diagnostic error:", error)
    return NextResponse.json(
      {
        status: "error",
        message: "Diagnostic failed",
        error: String(error),
      },
      { status: 500 },
    )
  }
}

