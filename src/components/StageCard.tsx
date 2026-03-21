import { CardContent } from "@/components/ui/card"

interface StageCardProps {
  title: string
  description: string
  isSelected: boolean
  onClick: () => void
}

export default function StageCard({ title, description, isSelected, onClick }: StageCardProps) {
  return (
    <div
      className={`flex flex-col justify-center items-start p-4 rounded-lg shadow-md cursor-pointer transition-all duration-200 ${
        isSelected 
          ? 'bg-terracotta-50 border-terracotta-500 border-2' 
          : 'bg-white border-gray-200 border hover:bg-terracotta-100 hover:text-terracotta-700'
      }`}
      onClick={onClick}
    >
      <div className="text-center">
        <h3 className="font-semibold text-lg mb-1">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  )
}
