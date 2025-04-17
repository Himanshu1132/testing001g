"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"
import { motion } from "framer-motion"
import { Loader2, Sparkles, Shield } from "lucide-react"

import { SignInForm } from "@/components/sign-in-form"
import { Feature } from "@/components/ui/feature"
// Import the DevLoginHelper component
import { DevLoginHelper } from "@/components/dev-login-helper"

export default function SignInPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard")
    }
  }, [status, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 to-blue-900">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center gap-3"
        >
          <div className="relative">
            <Loader2 className="h-10 w-10 text-blue-400 animate-spin" />
            <motion.div
              className="absolute inset-0 rounded-full"
              initial={{ scale: 0.8, opacity: 0.3 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            />
          </div>
          <p className="text-lg font-medium text-blue-100">Preparing your workspace...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Left panel - decorative */}
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="hidden md:flex md:w-1/2 bg-gradient-to-br from-indigo-900 via-blue-800 to-indigo-700 relative overflow-hidden"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-16 h-16 bg-white/5 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                scale: Math.random() * 0.8 + 0.2,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: Math.random() * 8 + 4,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        {/* Content overlay */}
        <div className="absolute inset-0 flex flex-col justify-center px-12 z-10">
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-4xl font-bold text-white mb-6"
          >
            Welcome to Glynac AI
          </motion.h2>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="space-y-6"
          >
            <Feature
              icon={<Sparkles className="h-6 w-6 text-blue-300" />}
              title="Intelligent Insights"
              description="Leverage advanced analytics to optimize your workplace efficiency"
            />

            <Feature
              icon={<Shield className="h-6 w-6 text-blue-300" />}
              title="Enterprise Security"
              description="Industry-leading security protocols to protect your data"
            />
          </motion.div>
        </div>
      </motion.div>

      {/* Right panel - sign in form */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-1/2 p-6 md:p-12 flex items-center justify-center bg-gray-50"
      >
        <div className="w-full max-w-md space-y-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-center space-y-2"
          >
            <h1 className="text-3xl font-bold text-gray-900">Sign in</h1>
            <p className="text-gray-600">Access your Glynac AI workspace</p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="bg-white rounded-xl shadow-lg p-6 md:p-8"
          >
            <SignInForm />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            transition={{ delay: 1, duration: 1 }}
            className="text-sm text-center text-gray-500"
          >
            © 2025 Glynac AI. All rights reserved.
          </motion.p>

          <DevLoginHelper />
        </div>
      </motion.div>
    </div>
  )
}

