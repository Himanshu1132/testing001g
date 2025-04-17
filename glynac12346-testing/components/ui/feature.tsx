"use client"

import type React from "react"

import { motion } from "framer-motion"

interface FeatureProps {
  icon: React.ReactNode
  title: string
  description: string
}

export function Feature({ icon, title, description }: FeatureProps) {
  return (
    <motion.div whileHover={{ x: 5 }} className="flex items-start space-x-4">
      <div className="flex-shrink-0 p-2 bg-white/10 rounded-lg">{icon}</div>
      <div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="text-blue-100/80">{description}</p>
      </div>
    </motion.div>
  )
}

