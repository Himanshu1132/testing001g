"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { signIn } from "next-auth/react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
})

export function SignInForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true)
      setErrorMessage("")

      // For demo purposes, check if using one of our hardcoded admin accounts
      const validAdmins = [
        { email: "admin@glynac.com", password: "admin123" },
        { email: "sarah@glynac.com", password: "admin123" },
        { email: "michael@glynac.com", password: "admin123" },
      ]

      const isValidAdmin = validAdmins.some(
        (admin) => admin.email === values.email && admin.password === values.password,
      )

      if (!isValidAdmin) {
        setErrorMessage("Invalid email or password. Please try one of the demo admin accounts.")
        toast({
          title: "Login failed",
          description: "Invalid email or password. Please try one of the demo admin accounts.",
          variant: "destructive",
        })
        return
      }

      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      })

      if (!result) {
        setErrorMessage("Authentication service unavailable")
        toast({
          title: "Authentication Error",
          description: "The authentication service is unavailable. Please try again later.",
          variant: "destructive",
        })
        return
      }

      if (result.error) {
        console.error("Login error:", result.error)
        setErrorMessage("Authentication failed: " + result.error)
        toast({
          title: "Login failed",
          description: "Invalid email or password. Please try again.",
          variant: "destructive",
        })
        return
      }

      toast({
        title: "Welcome back!",
        description: "Signed in successfully",
      })
      router.push("/dashboard")
      router.refresh()
    } catch (error) {
      console.error("Authentication error:", error)
      setErrorMessage("An unexpected error occurred")
      toast({
        title: "Authentication Error",
        description: "An unexpected error occurred. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="you@example.com" {...field} className="h-11" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} className="h-11" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {errorMessage && <div className="text-sm text-red-500">{errorMessage}</div>}

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-600">
              Remember me
            </label>
          </div>
          <div className="text-sm">
            <a href="#" className="font-medium text-primary hover:text-primary/80">
              Forgot your password?
            </a>
          </div>
        </div>
        <Button type="submit" className="w-full h-11 text-base" disabled={isLoading}>
          {isLoading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Signing in...</span>
            </div>
          ) : (
            <span>Sign in</span>
          )}
        </Button>
      </form>
    </Form>
  )
}

