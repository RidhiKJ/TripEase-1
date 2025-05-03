import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  // Create a demo user
  const hashedPassword = await bcrypt.hash("password123", 10)

  const user = await prisma.user.upsert({
    where: { email: "demo@example.com" },
    update: {},
    create: {
      email: "demo@example.com",
      name: "Demo User",
      password: hashedPassword,
      trips: {
        create: [
          {
            title: "Weekend in Paris",
            description: "A romantic weekend getaway",
            origin: "London",
            destination: "Paris",
            startDate: new Date("2023-12-15"),
            endDate: new Date("2023-12-17"),
            budget: "medium",
            interests: ["culture", "food"],
          },
          {
            title: "Summer in Barcelona",
            description: "Beach vacation with friends",
            origin: "Berlin",
            destination: "Barcelona",
            startDate: new Date("2024-07-10"),
            endDate: new Date("2024-07-20"),
            budget: "high",
            interests: ["beach", "nightlife", "food"],
          },
        ],
      },
    },
  })

  console.log({ user })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
