import React from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Button = React.forwardRef(({ 
  className, 
  variant = "primary", 
  size = "md", 
  icon,
  iconPosition = "left",
  loading = false,
  children, 
  ...props 
}, ref) => {
  const variants = {
    primary: "bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg hover:scale-105 focus:ring-2 focus:ring-accent/50",
    secondary: "bg-gradient-to-r from-secondary to-warning text-primary hover:shadow-lg hover:scale-105 focus:ring-2 focus:ring-secondary/50",
    outline: "border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white focus:ring-2 focus:ring-primary/50",
    ghost: "text-primary hover:bg-gray-100 focus:ring-2 focus:ring-gray-200"
  }
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-6 py-2.5 text-base",
    lg: "px-8 py-3 text-lg"
  }

  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      disabled={loading}
      {...props}
    >
      {loading && <ApperIcon name="Loader2" className="w-4 h-4 animate-spin" />}
      {!loading && icon && iconPosition === "left" && <ApperIcon name={icon} className="w-4 h-4" />}
      {children}
      {!loading && icon && iconPosition === "right" && <ApperIcon name={icon} className="w-4 h-4" />}
    </button>
  )
})

Button.displayName = "Button"

export default Button