import React from "react"
import { cn } from "@/utils/cn"

const Card = React.forwardRef(({ 
  className, 
  children,
  hover = false,
  gradient = false,
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "bg-surface rounded-lg border border-gray-200 shadow-sm",
        hover && "card-hover cursor-pointer",
        gradient && "glass-effect shadow-premium",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})

Card.displayName = "Card"

export default Card