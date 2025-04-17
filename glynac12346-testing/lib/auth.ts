import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prisma } from "@/lib/prisma"

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: "/signin",
    error: "/signin", // Custom error page
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development",
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          console.log("Missing credentials")
          return null
        }

        // Since we can't connect to the database, let's use hardcoded admin credentials for demo purposes
        const adminUsers = [
          {
            id: "1",
            email: "admin@glynac.com",
            name: "Admin User",
            password: "admin123",
            image: "https://randomuser.me/api/portraits/men/1.jpg",
            isAdmin: true,
          },
          {
            id: "2",
            email: "sarah@glynac.com",
            name: "Sarah Williams",
            password: "admin123",
            image: "https://randomuser.me/api/portraits/women/2.jpg",
            isAdmin: true,
          },
          {
            id: "3",
            email: "michael@glynac.com",
            name: "Michael Chen",
            password: "admin123",
            image: "https://randomuser.me/api/portraits/men/3.jpg",
            isAdmin: true,
          },
        ]

        // Find the user in our hardcoded list
        const user = adminUsers.find((user) => user.email === credentials.email)

        if (!user) {
          console.log("User not found:", credentials.email)
          return null
        }

        // Check if password matches
        const passwordValid = user.password === credentials.password

        if (!passwordValid) {
          console.log("Invalid password for user:", credentials.email)
          return null
        }

        console.log("Login successful for:", credentials.email)

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          isAdmin: user.isAdmin,
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.name = (token.name as string) || ""
        session.user.email = (token.email as string) || ""
        session.user.image = (token.picture as string) || ""
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.name = user.name || ""
        token.email = user.email || ""
        token.picture = user.image || ""
      }
      return token
    },
  },
}

