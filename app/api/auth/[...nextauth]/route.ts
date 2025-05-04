import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"
import { handler } from "@/auth";
import { getServerSession } from "next-auth"

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }

//export const GET = handler.GET
//export const POST = handler.POST
