import Button from "@/components/atoms/Button"
import Card from "@/components/atoms/Card"
import ApperIcon from "@/components/ApperIcon"

const Empty = ({ 
  title = "Geen resultaten gevonden",
  message = "Probeer uw zoekopdracht aan te passen of gebruik andere zoektermen.",
  action,
  actionLabel = "Nieuwe zoekopdracht",
  icon = "Search"
}) => {
  return (
    <Card className="p-8 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <ApperIcon name={icon} className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">{message}</p>
      {action && (
        <Button onClick={action} variant="outline" icon="Search">
          {actionLabel}
        </Button>
      )}
    </Card>
  )
}

export default Empty