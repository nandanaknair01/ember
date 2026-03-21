import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "terracotta" | "outline"
  size?: "sm" | "md" | "lg"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => {
    const baseStyles = "inline-flex items-center justify-center rounded-xl font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
    
    const variants = {
      primary: "bg-[#2d1f14] text-white hover:bg-[#1a1109] focus-visible:ring-[#2d1f14]",
      secondary: "bg-[#e8ddd4] text-[#2d1f14] hover:bg-[#d4c5bc] focus-visible:ring-[#e8ddd4]",
      terracotta: "bg-[#c47c50] text-white hover:bg-[#a86542] focus-visible:ring-[#c47c50]",
      outline: "border border-[#e8ddd4] bg-transparent hover:bg-[#fdf8f5] focus-visible:ring-[#e8ddd4]"
    }
    
    const sizes = {
      sm: "h-9 px-3 text-sm",
      md: "h-11 px-4 py-2",
      lg: "h-13 px-6 text-lg"
    }

    return (
      <button
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
