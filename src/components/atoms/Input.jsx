import React from "react"
import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const Input = React.forwardRef(({ 
  className, 
  type = "text",
  icon,
  iconPosition = "left",
  error,
  ...props 
}, ref) => {
  return (
    <div className="relative">
      {icon && iconPosition === "left" && (
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          <ApperIcon name={icon} className="w-5 h-5" />
        </div>
      )}
      
      <input
        type={type}
        className={cn(
          "flex h-12 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200",
          icon && iconPosition === "left" && "pl-12",
          icon && iconPosition === "right" && "pr-12",
          error && "border-error focus:border-error focus:ring-error/20",
          className
        )}
        ref={ref}
        {...props}
      />
      
      {icon && iconPosition === "right" && (
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
          <ApperIcon name={icon} className="w-5 h-5" />
        </div>
      )}
      
      {error && (
        <p className="mt-1 text-sm text-error">{error}</p>
      )}
    </div>
  )
})

Input.displayName = "Input"

export default Input