import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";
import { handler } from "@/auth";
import { getServerSession } from "next-auth";

export const GET = handler.GET
export const POST = handler.POST

// app/api/auth/[...nextauth]/route.ts
// Assuming your file is in lib/auth.ts

const handler = NextAuth(authOptions);
