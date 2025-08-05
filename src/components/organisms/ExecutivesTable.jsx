import Card from "@/components/atoms/Card"
import Badge from "@/components/atoms/Badge"
import ApperIcon from "@/components/ApperIcon"
import { format } from "date-fns"
import { nl } from "date-fns/locale"

const ExecutivesTable = ({ executives }) => {
  if (!executives || executives.length === 0) {
    return (
      <Card className="p-8 text-center">
        <ApperIcon name="Users" className="w-12 h-12 mx-auto mb-3 text-gray-400" />
        <h3 className="text-lg font-semibold text-gray-600 mb-2">Geen bestuurders gevonden</h3>
        <p className="text-gray-500">Er zijn geen bestuurders geregistreerd voor dit bedrijf.</p>
      </Card>
    )
  }

  const isActive = (executive) => {
    return !executive.endDate || new Date(executive.endDate) > new Date()
  }

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Naam
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Functie
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Start datum
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Eind datum
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {executives.map((executive) => (
              <tr key={executive.Id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
<div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white font-semibold text-sm">
                      {executive.Name.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium text-primary">{executive.Name}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {executive.role}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {format(new Date(executive.startDate), "dd MMM yyyy", { locale: nl })}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {executive.endDate 
                    ? format(new Date(executive.endDate), "dd MMM yyyy", { locale: nl })
                    : "-"
                  }
                </td>
                <td className="px-6 py-4">
                  <Badge variant={isActive(executive) ? "success" : "error"}>
                    {isActive(executive) ? "Actief" : "Beëindigd"}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

export default ExecutivesTable