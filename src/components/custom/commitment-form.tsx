import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { sendFormData } from "@/lib/fetchIltizamatData"
import { useGlobaAlertDialog } from "@/lib/providers/global-alert-dialog-provider"

export default function CommitmentForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    monthlyCommitment: "",
    kaffahBulletin: true,
    mediaUmat: false,
    mediaAlWaie: false,
    totalCommitment: 0,
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const { showDialog } = useGlobaAlertDialog();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCheckboxChange = (name: "mediaUmat" | "mediaAlWaie") => {
    setFormData((prev) => ({
      ...prev,
      [name]: !prev[name],
    }))
  }

  const formatCurrency = (value: string): string => {
    const numValue = value.replace(/\D/g, "")
    if (!numValue) return ""
    return new Intl.NumberFormat("id-ID").format(Number.parseInt(numValue))
  }

  const handleSendData = async () => {
    setIsSubmitting(true)

    try {
      const response = await sendFormData({
        name: formData.fullName,
        iltizamat: formData.monthlyCommitment,
        buletin: formData.kaffahBulletin,
        mediaUmat: formData.mediaUmat,
        mediaAlwaie: formData.mediaAlWaie,
        total: formData.totalCommitment,
      })

      console.log("Response from sendFormData:", response)

      if (!response.status) {
        throw new Error(response.message || "Failed to submit form data")
      }

      setIsSubmitting(false)

      // Reset form
      setFormData({
        fullName: "",
        monthlyCommitment: "",
        kaffahBulletin: true,
        mediaUmat: false,
        mediaAlWaie: false,
        totalCommitment: 0,
      })

      showDialog({
        title: (
          <span className="text-emerald-600">
            Berhasil Mengirim Data
          </span>
        ),
        description: "Data komitmen Anda telah berhasil dikirim. Terima kasih atas dukungan Anda!",
        cancelText: "Tutup",
      })

    } catch (error) {
      console.error("Error submitting form:", error)
      showDialog({
        title: (
          <span className="text-red-600">
            Gagal Mengirim Data
          </span>
        ),
        description: "Terjadi kesalahan saat mengirim data Anda. Silakan coba lagi nanti.",
        cancelText: "Tutup",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleConfirm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    showDialog({
      title: "Konfirmasi Pengiriman",
      description: "Apakah Anda yakin ingin mengirim komitmen ini?",
      confirmText: "Ya, Kirim",
      cancelText: "Batal",
      onConfirm: () => {
        handleSendData();
      },
    })

  }

  useEffect(() => {

    const defaultKaffahBulletin = 15000
    const mediaUmatAmount = formData.mediaUmat ? 17000 * 2 : 0
    const mediaAlWaieAmount = formData.mediaAlWaie ? 15000 : 0
    const monthlyCommitmentAmount = parseInt(formData.monthlyCommitment.replace(/\D/g, "")) || 0

    const total =
      monthlyCommitmentAmount +
      defaultKaffahBulletin +
      mediaUmatAmount +
      mediaAlWaieAmount

    setFormData((prev) => ({
      ...prev,
      totalCommitment: total,
    }))

  }, [formData.monthlyCommitment, formData.mediaUmat, formData.mediaAlWaie])

  return (
    <div className="w-full max-w-2xl">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-black text-slate-900 mb-3">Formulir Komitmen</h2>
        <p className="text-slate-500 text-lg">
          Silakan isi data Anda untuk mendata komitmen Iltizamat dan langganan media.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
        <form onSubmit={handleConfirm} className="space-y-6">

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
                placeholder="60000"
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
                // onCheckedChange={() => handleCheckboxChange("kaffahBulletin")}
                className="mt-1"
                disabled
              />
              <div className="flex-1">
                <label htmlFor="kaffahBulletin" className="text-sm font-semibold text-gray-500 cursor-pointer">
                  Subsidi Buletin Kaffah (Rp. 15.000/bulan)
                </label>
                <p className="text-xs text-slate-500 mt-1">
                  Komitmen ini wajib untuk mendukung penerbitan Buletin Kaffah
                </p>
              </div>
            </div>
          </div>

          {/* Media Subscription Checkboxes */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-900">Komitmen Langganan Media (Opsional)</h3>
            <div className="space-y-3 ml-0">
              <div className="flex items-center gap-3">
                <Checkbox
                  id="mediaUmat"
                  checked={formData.mediaUmat}
                  onCheckedChange={() => handleCheckboxChange("mediaUmat")}
                />
                <label htmlFor="mediaUmat" className="text-sm text-slate-700 cursor-pointer">
                  <span className="font-bold">Media Umat</span> - Rp. 34.000/2 edisi
                </label>
              </div>
              <div className="flex items-center gap-3">
                <Checkbox
                  id="mediaAlWaie"
                  checked={formData.mediaAlWaie}
                  onCheckedChange={() => handleCheckboxChange("mediaAlWaie")}
                />
                <label htmlFor="mediaAlWaie" className="text-sm text-slate-700 cursor-pointer">
                  <span className="font-bold">Media Al-Wa'ie</span> - Rp. 15.000/bulan
                </label>
              </div>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 text-center">
            <p className="text-xs text-slate-600 mb-1">Total Komitmen</p>
            <p className="text-2xl font-bold text-slate-900">
              {formData.totalCommitment ? `Rp ${formatCurrency(formData.totalCommitment.toString())}` : "Rp 0"}
            </p>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="cursor-pointer w-full h-12 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-base rounded-lg"
          >
            {isSubmitting ? "Mengirim..." : "Kirim Komitmen"}
          </Button>
        </form>
      </div>
    </div>
  )
}
