"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

import { db } from "@/lib/firebase"
import { collection, addDoc } from "firebase/firestore"
import { toast } from "sonner"

type RatingValue = 1 | 2 | 3 | 4

const emojis = ["😢", "😐", "😊", "😍"]
const emojiLabels = ["Very Bad", "Okay", "Good", "Excellent"]

const COLECTION_ID = "key-8-2025"

interface RatingQuestionProps {
  question: string
  value: RatingValue | null
  onChange: (val: RatingValue) => void
  isOptional?: boolean
}

export default function FeedbackForm() {

  const [formData, setFormData] = useState({
    experienceRating: null as RatingValue | null,
    hangoutRating: null as RatingValue | null,
    mentorshipRating: null as RatingValue | null,
    futureClassRating: null as RatingValue | null,
    additionalFeedback: "",
  });

  // const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission

    console.log({
      ...formData,
    })

    setIsLoading(true)

    addDoc(collection(db, COLECTION_ID), {
      ...formData,
      // Humanize the date like November 1, 2023
      createdAt: new Date().toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    }).then((e) => {

      console.log(e)

      toast.success("Feedback terkirim! Terima kasih sudah memberikan feedback. 😊😊", {
        position: "top-center",
        style: {
          borderRadius: "10px",
          background: "#4CAF50",
          color: "#fff",
        }
      })

      // Reset form after Submit and delivered
      setFormData({
        experienceRating: null,
        hangoutRating: null,
        mentorshipRating: null,
        futureClassRating: null,
        additionalFeedback: "",
      })
    }).catch((e) => {

      console.error(e)
      toast.error("Terjadi kesalahan saat mengirim feedback. Mohon coba lagi.", {
        position: "top-center",
        style: {
          borderRadius: "10px",
          background: "#f44336",
          color: "#fff",
        }
      })

    }).finally(() => {
      setIsLoading(false)
    })

  }

  const RatingQuestion = ({
    question,
    value,
    onChange,
    isOptional = false,
  }: RatingQuestionProps) => (
    <div className="mb-8">
      <p className="text-sm font-medium text-foreground mb-4">
        {question} <span className="text-muted-foreground">
          {isOptional && "(Opsional)"}
        </span>
      </p>
      <div className="flex gap-4">
        {emojis.map((emoji, index) => {
          const rating = (index + 1) as RatingValue
          return (
            <button
              key={index}
              onClick={() => onChange(rating)}
              className={`text-5xl transition-transform duration-200 hover:cursor-pointer ${value === rating ? "scale-125" : "hover:scale-110"
                }`}
              title={emojiLabels[index]}
              type="button"
            >
              {emoji}
            </button>
          )
        })}
      </div>
    </div>
  )

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 font-jakarta">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-8 relative">

        {/* Title and subtitle */}
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Berikan Feedback Mu!
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          Feedback dari kamu untuk KEY sangat berarti bagi kami agar bisa terus memberikan pengalaman yang lebih baik kedepannya. Terima kasih banyak atas partisipasinya! 😊😊
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <RatingQuestion
            question="Bagaimana pengalamanmu selama mengikuti kelas ini?"
            value={formData.experienceRating}
            onChange={(val) => setFormData({ ...formData, experienceRating: val })}
          />

          <RatingQuestion
            question="Apakah hangout membuatmu lebih dekat dengan orang lain?"
            value={formData.hangoutRating}
            onChange={(val) => setFormData({ ...formData, hangoutRating: val })}
          />

          <RatingQuestion
            question="Bagaimana pendampingan kelompokmu selama kegiatan berlangsung?"
            value={formData.mentorshipRating}
            onChange={(val) => setFormData({ ...formData, mentorshipRating: val })}
          />

          <RatingQuestion
            question="Bagaimana menurutmu jika kelas ini diadakan lagi nanti?"
            value={formData.futureClassRating}
            onChange={(val) => setFormData({ ...formData, futureClassRating: val })}
          />

          {/* Text area */}
          <div className="mb-8">
            <label className="text-sm font-medium text-foreground mb-3 block">
              Hal yang paling berkesan atau ingin kamu sampaikan untuk kelas ini <span className="text-muted-foreground">(Optional)</span>
            </label>
            <textarea
              value={formData.additionalFeedback}
              onChange={(e) => setFormData({ ...formData, additionalFeedback: e.target.value })}
              placeholder="Bagi saya kelas ini..."
              className="w-full px-4 py-3 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-0 resize-none bg-white text-foreground"
              rows={5}
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3">
            {/* <Button type="button" variant="outline" className="px-6 bg-transparent">
              Go back
            </Button> */}
            <Button disabled={isLoading} type="submit" className="px-6 bg-purple-600 hover:bg-purple-700 text-white cursor-pointer">
              {isLoading ? "Mengirim feedback..." : "Kirim Feedback"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
