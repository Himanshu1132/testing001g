import { AuthError } from "next-auth"

export function handleAuthError(error: Error): string {
  console.error("Auth error details:", error)

  // Handle specific NextAuth errors
  if (error instanceof AuthError) {
    switch (error.type) {
      case "CredentialsSignin":
        return "Invalid credentials. Please check your email and password."
      case "OAuthSignin":
      case "OAuthCallback":
      case "OAuthCreateAccount":
      case "EmailCreateAccount":
      case "Callback":
      case "OAuthAccountNotLinked":
      case "EmailSignin":
      case "CredentialsSignin":
      case "SessionRequired":
        return `Authentication error: ${error.type}`
      default:
        return "An authentication error occurred. Please try again."
    }
  }

  // Handle JWT specific errors
  if (error.message.includes("payload")) {
    return "Authentication token error. Please try again."
  }

  // Generic error fallback
  return "An unexpected error occurred. Please try again later."
}

