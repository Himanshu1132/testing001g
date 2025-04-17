import { prisma } from "@/lib/prisma"
import { compare } from "bcrypt"

export async function checkCredentials(email: string, password: string) {
  try {
    // Find the user
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
      },
    })

    if (!user) {
      return {
        success: false,
        message: "User not found",
        user: null,
      }
    }

    // Check if password matches
    const passwordValid = await compare(password, user.password)

    if (!passwordValid) {
      return {
        success: false,
        message: "Invalid password",
        user: {
          id: user.id,
          email: user.email,
          passwordHash: user.password.substring(0, 10) + "...", // Show partial hash for debugging
        },
      }
    }

    return {
      success: true,
      message: "Authentication successful",
      user: {
        id: user.id,
        email: user.email,
      },
    }
  } catch (error) {
    return {
      success: false,
      message: "Authentication error",
      error: String(error),
    }
  }
}

