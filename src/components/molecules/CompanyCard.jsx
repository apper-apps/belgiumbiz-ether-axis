import Card from "@/components/atoms/Card"
import Badge from "@/components/atoms/Badge"
import ApperIcon from "@/components/ApperIcon"
import { format } from "date-fns"
import { nl } from "date-fns/locale"

const CompanyCard = ({ company, onClick }) => {
  const getStatusVariant = (status) => {
    switch (status?.toLowerCase()) {
      case "actief":
        return "success"
      case "ontbonden":
        return "error"
      case "geschorst":
        return "warning"
      default:
        return "default"
    }
  }

  const formatCurrency = (amount) => {
    if (!amount) return "N/B"
    return new Intl.NumberFormat("nl-BE", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  return (
    <Card hover gradient className="p-6 cursor-pointer" onClick={onClick}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-primary mb-2 gradient-text">
            {company.name}
          </h3>
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <ApperIcon name="Hash" className="w-4 h-4" />
            <span className="font-mono">{company.vatNumber}</span>
          </div>
        </div>
        <Badge variant={getStatusVariant(company.status)}>
          {company.status || "Onbekend"}
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="flex items-center gap-2 text-gray-600">
          <ApperIcon name="MapPin" className="w-4 h-4" />
          <span className="text-sm">
            {company.address?.city}, {company.address?.postalCode}
          </span>
        </div>
        
        <div className="flex items-center gap-2 text-gray-600">
          <ApperIcon name="Building2" className="w-4 h-4" />
          <span className="text-sm">{company.legalForm}</span>
        </div>

        {company.foundedDate && (
          <div className="flex items-center gap-2 text-gray-600">
            <ApperIcon name="Calendar" className="w-4 h-4" />
            <span className="text-sm">
              Opgericht {format(new Date(company.foundedDate), "dd MMMM yyyy", { locale: nl })}
            </span>
          </div>
        )}

        {company.website && (
          <div className="flex items-center gap-2 text-gray-600">
            <ApperIcon name="Globe" className="w-4 h-4" />
            <span className="text-sm truncate">{company.website}</span>
          </div>
        )}
      </div>

      {/* Financial snapshot */}
      {company.financialData && company.financialData.length > 0 && (
        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Laatste omzet:</span>
            <span className="font-semibold text-primary">
              {formatCurrency(company.financialData[0]?.revenue)}
            </span>
          </div>
        </div>
      )}

      <div className="flex items-center justify-end mt-4 text-accent">
        <span className="text-sm font-medium mr-2">Bekijk details</span>
        <ApperIcon name="ArrowRight" className="w-4 h-4" />
      </div>
    </Card>
  )
}

export default CompanyCard