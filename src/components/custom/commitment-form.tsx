import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

export default function CommitmentForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    monthlyCommitment: "",
    kaffahBulletin: false,
    mediaUmat: false,
    mediaAlWaie: false,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCheckboxChange = (name: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: !prev[name as keyof typeof prev],
    }))
  }

  const formatCurrency = (value: string): string => {
    const numValue = value.replace(/\D/g, "")
    if (!numValue) return ""
    return new Intl.NumberFormat("id-ID").format(Number.parseInt(numValue))
  }

  const commitmentAmount = formData.monthlyCommitment.replace(/\D/g, "")
  const totalDisplay = commitmentAmount ? `Rp ${formatCurrency(commitmentAmount)}` : "Rp 0"

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setSubmitMessage("Komitmen Anda telah dikirim!")
      setIsSubmitting(false)
      console.log("Form submitted:", formData)
      // Reset form
      setTimeout(() => {
        setFormData({
          fullName: "",
          phoneNumber: "",
          monthlyCommitment: "",
          kaffahBulletin: false,
          mediaUmat: false,
          mediaAlWaie: false,
        })
        setSubmitMessage("")
      }, 2000)
    }, 1000)
  }

  return (
    <div className="w-full max-w-2xl">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-black text-slate-900 mb-3">Formulir Komitmen</h2>
        <p className="text-slate-500 text-lg">
          Silakan isi data Anda untuk mendata komitmen Iltizamat dan langganan media.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name Field */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-semibold text-slate-900 mb-2">
              Nama Lengkap
            </label>
            <Input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Masukkan nama lengkap Anda"
              value={formData.fullName}
              onChange={handleInputChange}
              className="w-full h-11 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400"
              required
            />
          </div>

          {/* Phone Number Field */}
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-semibold text-slate-900 mb-2">
              Nomor Handphone
            </label>
            <Input
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              placeholder="Contoh: 08123456789"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              className="w-full h-11 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400"
              required
            />
            <p className="text-xs text-slate-500 mt-1">Hanya angka, tanpa spasi atau simbol.</p>
          </div>

          {/* Monthly Commitment Field */}
          <div>
            <label htmlFor="monthlyCommitment" className="block text-sm font-semibold text-slate-900 mb-2">
              Komitmen Iltizamat (per bulan)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-medium">Rp</span>
              <Input
                id="monthlyCommitment"
                name="monthlyCommitment"
                type="number"
                placeholder="10000"
                value={formData.monthlyCommitment}
                onChange={handleInputChange}
                className="w-full h-11 bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 pl-10"
                required
              />
            </div>
            <p className="text-xs text-slate-500 mt-1">Hanya angka, tanpa spasi atau simbol.</p>
          </div>

          {/* Kaffah Bulletin Subsidy Checkbox */}
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Checkbox
                id="kaffahBulletin"
                checked={formData.kaffahBulletin}
                onCheckedChange={() => handleCheckboxChange("kaffahBulletin")}
                className="mt-1"
              />
              <div className="flex-1">
                <label htmlFor="kaffahBulletin" className="text-sm font-semibold text-slate-900 cursor-pointer">
                  Subsidi Buletin Kaffah (Wajib)
                </label>
                <p className="text-xs text-slate-500 mt-1">Anda harus menyetujui untuk ikut serta dalam subsidi ini.</p>
              </div>
            </div>
          </div>

          {/* Media Subscription Checkboxes */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-900">Komitmen Langganan Media</h3>
            <div className="space-y-3 ml-0">
              <div className="flex items-center gap-3">
                <Checkbox
                  id="mediaUmat"
                  checked={formData.mediaUmat}
                  onCheckedChange={() => handleCheckboxChange("mediaUmat")}
                />
                <label htmlFor="mediaUmat" className="text-sm text-slate-700 cursor-pointer">
                  Media Umat
                </label>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox
                  id="mediaAlWaie"
                  checked={formData.mediaAlWaie}
                  onCheckedChange={() => handleCheckboxChange("mediaAlWaie")}
                />
                <label htmlFor="mediaAlWaie" className="text-sm text-slate-700 cursor-pointer">
                  Media Al-Wa'ie
                </label>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-center">
            <p className="text-xs text-slate-600 mb-1">Total Komitmen</p>
            <p className="text-2xl font-bold text-slate-900">{totalDisplay}</p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="cursor-pointer w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-base rounded-lg mt-5"
          >
            {isSubmitting ? "Mengirim..." : "Kirim Komitmen"}
          </Button>

          {/* Success Message */}
          {submitMessage && (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-center">
              <p className="text-emerald-700 font-medium">{submitMessage}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
