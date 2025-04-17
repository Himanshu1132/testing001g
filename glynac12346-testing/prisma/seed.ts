import { PrismaClient } from "@prisma/client"
import { hash } from "bcrypt"

const prisma = new PrismaClient()

async function main() {
  // Clean up existing data
  await prisma.riskAlert.deleteMany()
  await prisma.message.deleteMany()
  await prisma.performanceData.deleteMany()
  await prisma.retentionData.deleteMany()
  await prisma.document.deleteMany()
  await prisma.session.deleteMany()
  await prisma.account.deleteMany()
  await prisma.user.deleteMany()

  // Update the admin user creation to ensure they're properly created

  // Create admin users
  const password = await hash("admin123", 10)

  const admin1 = await prisma.user.create({
    data: {
      name: "John Smith",
      email: "admin@glynac.com", // Changed to a simpler email
      password,
      isAdmin: true,
      department: "Executive",
      position: "CEO",
      image: "https://randomuser.me/api/portraits/men/1.jpg",
    },
  })

  const admin2 = await prisma.user.create({
    data: {
      name: "Sarah Williams",
      email: "sarah@glynac.com",
      password,
      isAdmin: true,
      department: "HR",
      position: "HR Director",
      image: "https://randomuser.me/api/portraits/women/2.jpg",
    },
  })

  const admin3 = await prisma.user.create({
    data: {
      name: "Michael Chen",
      email: "michael@glynac.com",
      password,
      isAdmin: true,
      department: "Technology",
      position: "CTO",
      image: "https://randomuser.me/api/portraits/men/3.jpg",
    },
  })

  // Create regular employees
  const employees = [
    {
      name: "Sarah Johnson",
      email: "sarahj@glynac.com",
      department: "Marketing",
      position: "Marketing Manager",
      retentionRisk: 75,
      meetingLoad: 32,
      afterHoursWork: 15,
      complaintsCount: 8,
      communicationVolume: 45,
      positiveLanguagePercent: 30,
      leadershipComplaints: 5,
      responseTimeAvg: 120,
      negativeLanguagePercent: 40,
      overdueTasksCount: 12,
    },
    {
      name: "Michael Chen",
      email: "michaelc@glynac.com",
      department: "Engineering",
      position: "Senior Developer",
      retentionRisk: 45,
      meetingLoad: 25,
      afterHoursWork: 10,
      complaintsCount: 3,
      communicationVolume: 60,
      positiveLanguagePercent: 50,
      leadershipComplaints: 2,
      responseTimeAvg: 60,
      negativeLanguagePercent: 20,
      overdueTasksCount: 5,
    },
    {
      name: "Emily Rodriguez",
      email: "emily@glynac.com",
      department: "Product",
      position: "Product Manager",
      retentionRisk: 20,
      meetingLoad: 28,
      afterHoursWork: 5,
      complaintsCount: 1,
      communicationVolume: 80,
      positiveLanguagePercent: 75,
      leadershipComplaints: 0,
      responseTimeAvg: 30,
      negativeLanguagePercent: 10,
      overdueTasksCount: 2,
    },
    {
      name: "David Kim",
      email: "david@glynac.com",
      department: "Finance",
      position: "Financial Analyst",
      retentionRisk: 15,
      meetingLoad: 18,
      afterHoursWork: 3,
      complaintsCount: 0,
      communicationVolume: 50,
      positiveLanguagePercent: 80,
      leadershipComplaints: 0,
      responseTimeAvg: 45,
      negativeLanguagePercent: 5,
      overdueTasksCount: 1,
    },
    {
      name: "Alex Thompson",
      email: "alex@glynac.com",
      department: "Sales",
      position: "Sales Representative",
      retentionRisk: 40,
      meetingLoad: 30,
      afterHoursWork: 12,
      complaintsCount: 4,
      communicationVolume: 90,
      positiveLanguagePercent: 60,
      leadershipComplaints: 3,
      responseTimeAvg: 90,
      negativeLanguagePercent: 25,
      overdueTasksCount: 7,
    },
  ]

  for (const emp of employees) {
    const user = await prisma.user.create({
      data: {
        name: emp.name,
        email: emp.email,
        password,
        isAdmin: false,
        department: emp.department,
        position: emp.position,
        image: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? "men" : "women"}/${Math.floor(Math.random() * 50) + 10}.jpg`,
      },
    })

    // Create retention data
    await prisma.retentionData.create({
      data: {
        userId: user.id,
        retentionRisk: emp.retentionRisk,
        meetingLoad: emp.meetingLoad,
        afterHoursWork: emp.afterHoursWork,
        complaintsCount: emp.complaintsCount,
        communicationVolume: emp.communicationVolume,
        positiveLanguagePercent: emp.positiveLanguagePercent,
        optionalMeetingsCount: Math.floor(emp.meetingLoad * 0.4),
      },
    })

    // Create performance data
    await prisma.performanceData.create({
      data: {
        userId: user.id,
        leadershipComplaints: emp.leadershipComplaints,
        complaintsCount: emp.complaintsCount,
        communicationVolume: emp.communicationVolume,
        responseTimeAvg: emp.responseTimeAvg,
        negativeLanguagePercent: emp.negativeLanguagePercent,
        repeatedTopicsCount: Math.floor(Math.random() * 10),
        overdueTasksCount: emp.overdueTasksCount,
      },
    })

    // Create messages
    const messageCount = Math.floor(Math.random() * 20) + 10
    for (let i = 0; i < messageCount; i++) {
      const isPositive = Math.random() < emp.positiveLanguagePercent / 100
      const isNegative = !isPositive && Math.random() < emp.negativeLanguagePercent / 100
      const isNeutral = !isPositive && !isNegative

      await prisma.message.create({
        data: {
          userId: user.id,
          content: `Sample message ${i + 1} from ${emp.name}`,
          isPositive,
          isNegative,
          isNeutral,
          sentAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000),
        },
      })
    }

    // Create risk alerts for high-risk employees
    if (emp.retentionRisk > 60 || emp.negativeLanguagePercent > 30) {
      await prisma.riskAlert.create({
        data: {
          userId: user.id,
          title: `${emp.retentionRisk > 60 ? "Retention" : "Performance"} Risk for ${emp.name}`,
          description:
            emp.retentionRisk > 60
              ? `High retention risk detected based on multiple factors`
              : `Negative communication patterns detected in recent messages`,
          severity: emp.retentionRisk > 70 ? "high" : "medium",
          category: emp.retentionRisk > 60 ? "retention" : "communication",
          isResolved: false,
        },
      })
    }
  }

  // Create documents
  const documents = [
    {
      name: "Q3_Marketing_Strategy.docx",
      type: "docx",
      creator: "John Doe",
      lastModified: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000),
      views: 0,
      category: "inactive",
    },
    {
      name: "Annual_Budget_2024.xlsx",
      type: "xlsx",
      creator: "Finance Team",
      lastModified: new Date(Date.now() - 67 * 24 * 60 * 60 * 1000),
      views: 0,
      category: "inactive",
    },
    {
      name: "Employee_Handbook_Draft.docx",
      type: "docx",
      creator: "HR",
      lastModified: new Date(Date.now() - 89 * 24 * 60 * 60 * 1000),
      views: 2,
      category: "inactive",
    },
    {
      name: "Product_Roadmap_2024.pptx",
      type: "pptx",
      creator: "Product Team",
      lastModified: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      views: 25,
      category: "collaboration",
    },
    {
      name: "Sales_Targets_Q4.xlsx",
      type: "xlsx",
      creator: "Sales Team",
      lastModified: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      views: 18,
      category: "collaboration",
    },
    {
      name: "Confidential_HR_Records.xlsx",
      type: "xlsx",
      creator: "HR Director",
      lastModified: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      views: 47,
      category: "access",
    },
    {
      name: "Customer_Database_Export.csv",
      type: "csv",
      creator: "Data Team",
      lastModified: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      views: 32,
      category: "access",
    },
  ]

  for (const doc of documents) {
    await prisma.document.create({
      data: doc,
    })
  }

  console.log("Database seeded successfully")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

