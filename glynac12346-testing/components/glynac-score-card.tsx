"use client"

import { Card } from "@/components/ui/card"
import { motion } from "framer-motion"

interface GlynacScoreCardProps {
  score: number
  difference: number
  communicationScore: number
  workloadScore: number
  wellbeingScore: number
}

export function GlynacScoreCard({
  score,
  difference,
  communicationScore,
  workloadScore,
  wellbeingScore,
}: GlynacScoreCardProps) {
  return (
    <Card className="glynac-score-card overflow-hidden p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center text-center text-white"
      >
        <h2 className="text-2xl font-semibold">Glynac Score</h2>
        <div className="my-4 text-7xl font-bold">{score}</div>
        <p className="mb-6">
          {difference > 0 ? "+" : ""}
          {difference} points from last month
        </p>
        <div className="grid w-full grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold">{communicationScore}</div>
            <div className="text-sm">Communication</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{workloadScore}</div>
            <div className="text-sm">Workload</div>
          </div>
          <div>
            <div className="text-2xl font-bold">{wellbeingScore}</div>
            <div className="text-sm">Wellbeing</div>
          </div>
        </div>
      </motion.div>
    </Card>
  )
}

