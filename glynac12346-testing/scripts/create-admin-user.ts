import { PrismaClient } from "@prisma/client"
import { hash } from "bcrypt"

const prisma = new PrismaClient()

async function createAdminUser() {
  try {
    const password = await hash("admin123", 10)

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email: "admin@glynac.com",
      },
    })

    if (existingUser) {
      console.log("Admin user already exists")
      return
    }

    // Create admin user
    const admin = await prisma.user.create({
      data: {
        name: "Admin User",
        email: "admin@glynac.com",
        password,
        isAdmin: true,
        department: "Administration",
        position: "System Administrator",
      },
    })

    console.log("Admin user created successfully:", admin.email)
  } catch (error) {
    console.error("Error creating admin user:", error)
  } finally {
    await prisma.$disconnect()
  }
}

createAdminUser()

