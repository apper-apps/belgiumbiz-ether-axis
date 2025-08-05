import Button from "@/components/atoms/Button"
import Card from "@/components/atoms/Card"
import ApperIcon from "@/components/ApperIcon"

const Error = ({ message = "Er is een fout opgetreden", onRetry }) => {
  return (
    <Card className="p-8 text-center">
      <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-4">
        <ApperIcon name="AlertCircle" className="w-8 h-8 text-error" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">Oeps! Iets ging mis</h3>
      <p className="text-gray-600 mb-6">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" icon="RefreshCw">
          Opnieuw proberen
        </Button>
      )}
    </Card>
  )
}

export default Error