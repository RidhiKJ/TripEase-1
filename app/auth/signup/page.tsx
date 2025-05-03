import { SignUpForm } from "@/components/auth/sign-up-form"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="w-full max-w-md px-4">
          <SignUpForm />
        </div>
      </main>
      <Footer />
    </div>
  )
}
