import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent } from "@/components/ui/card"
// import { Button } from "@/components/ui/button"
import { Star } from "lucide-react"
import { useEffect, useState } from 'react'
import { COLECTION_ID, type FeedbackData } from '@/components/custom/feedback-form'
import { db } from '@/lib/firebase'
import { collection, getDocs, orderBy, query } from 'firebase/firestore'

export const Route = createFileRoute('/reviews')({
  component: RouteComponent,
})

type FeedbackResponse = FeedbackData & { id: string }

function RouteComponent() {
  // const avgRating = 4.1
  // const totalReviews = 60

  // Fetch feedbacks from Firestore with id
  const [feedbacks, setFeedbacks] = useState<Array<FeedbackResponse>>([]);
  // const [lastDoc, setLastDoc] = useState(null);
  // const [loading, setLoading] = useState(false);

  const getFeedbacks = async () => {
    // setLoading(true);

    const q = query(collection(db, COLECTION_ID), orderBy("createdAt"));
    const snapshot = await getDocs(q);

    const docs = snapshot.docs.map((doc) => ({ id: doc.id, ...(doc.data() as FeedbackData) } as FeedbackResponse));

    setFeedbacks(docs);
    // setLastDoc(snapshot.docs[snapshot.docs.length - 1]);
    // setLoading(false);
  };

  useEffect(() => {
    getFeedbacks();
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-8">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Feedback KEY 8
              </h1>
              {/* <div className="flex items-center gap-3 mt-2">
                <StarRating rating={4} />
                <span className="text-lg font-semibold text-gray-900">
                  {avgRating} ({totalReviews})
                </span>
              </div> */}
            </div>
          </div>

          {/* <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Write a review</Button> */}
        </div>

        {/* Reviews Section */}
        <div className="space-y-4">
          {feedbacks.map((review, index) => (
            <FeedbackCard
              key={review.id || index}
              feedback={review}
            />
          ))}
        </div>
      </div>
    </main>
  )
}

function FeedbackCard({ feedback }: { feedback: FeedbackData }) {

  // show full content when "show more" is clicked
  const [showFullText, setShowFullText] = useState(false);

  const displayedText = feedback.additionalFeedback ? (showFullText ? feedback.additionalFeedback : feedback.additionalFeedback.slice(0, 250) + (feedback.additionalFeedback.length > 20 ? '...' : '')) : "-";

  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="">
        {/* <h3 className="font-semibold text-gray-900 mb-2">{feedback.title}</h3> */}
        <h3 className="font-semibold text-gray-900 mb-2">
          {feedback.title || "Tanpa Judul"}
        </h3>
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-600">by Anonymous</p>
          <StarRating rating={averageRating([feedback.experienceRating || 0, feedback.hangoutRating || 0, feedback.mentorshipRating || 0, feedback.futureClassRating || 0])} />
        </div>
        <p className="text-sm text-gray-700 leading-relaxed mb-3">
          {displayedText}
        </p>
        {
          feedback.additionalFeedback && feedback.additionalFeedback.length > 250 && (

            <button onClick={() => setShowFullText(!showFullText)} className="text-blue-600 text-sm font-medium cursor-pointer hover:underline">
              {showFullText ? 'Show Less' : 'Show More'}
            </button>
          )
        }
      </CardContent>
    </Card>
  )
}

function StarRating({ rating, max = 5 }: { rating: number; max?: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <Star key={i} size={16} className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} />
      ))}
    </div>
  )
}

function averageRating(ratings: number[]) {

  // convert to scale of 1-4 to 0-1
  const total: number[] = ratings.map(rating => {
    if (rating === 1) return 0;
    if (rating === 2) return 0.33;
    if (rating === 3) return 0.66;
    if (rating === 4) return 1;
    return 0;
  });

  // calculate average
  const sum = total.reduce((acc, curr) => acc + curr, 0);
  const avg = sum / ratings.length;

  // convert back to scale of 1-5
  const result = avg * 5;

  return Math.round(result);
}
