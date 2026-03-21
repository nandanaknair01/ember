import * as React from "react"
import { cn } from "@/lib/utils"

export interface PillProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean
}

const Pill = React.forwardRef<HTMLButtonElement, PillProps>(
  ({ className, selected, children, ...props }, ref) => {
    return (
      <button
        className={cn(
          "inline-flex items-center px-4 py-2 rounded-full text-sm font-medium transition-colors",
          selected
            ? "bg-[#c47c50] text-white"
            : "bg-[#e8ddd4] text-[#2d1f14] hover:bg-[#d4c5bc]",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Pill.displayName = "Pill"

export { Pill }
