import ApperIcon from "@/components/ApperIcon"

const Loading = ({ message = "Gegevens laden..." }) => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-accent rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <ApperIcon name="Search" className="w-6 h-6 text-accent" />
        </div>
      </div>
      <p className="mt-4 text-gray-600 font-medium">{message}</p>
      <div className="mt-2 flex items-center gap-1">
        <div className="w-2 h-2 bg-accent rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
        <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
      </div>
    </div>
  )
}

export default Loading