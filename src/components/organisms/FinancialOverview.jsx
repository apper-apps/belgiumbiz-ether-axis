import { useState } from "react"
import Card from "@/components/atoms/Card"
import ApperIcon from "@/components/ApperIcon"
import Chart from "react-apexcharts"

const FinancialOverview = ({ financialData }) => {
  const [selectedMetric, setSelectedMetric] = useState("revenue")

  if (!financialData || financialData.length === 0) {
    return (
      <Card className="p-8 text-center">
        <ApperIcon name="TrendingUp" className="w-12 h-12 mx-auto mb-3 text-gray-400" />
        <h3 className="text-lg font-semibold text-gray-600 mb-2">Geen financiële gegevens</h3>
        <p className="text-gray-500">Er zijn geen financiële gegevens beschikbaar voor dit bedrijf.</p>
      </Card>
    )
  }

  const formatCurrency = (amount) => {
    if (!amount) return "€0"
    return new Intl.NumberFormat("nl-BE", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  const metrics = [
    { key: "revenue", label: "Omzet", icon: "TrendingUp", color: "#28A745" },
    { key: "profit", label: "Winst", icon: "DollarSign", color: "#17A2B8" },
    { key: "equity", label: "Eigen Vermogen", icon: "PieChart", color: "#E30613" },
    { key: "employees", label: "Werknemers", icon: "Users", color: "#F4D03F" }
  ]

  const sortedData = [...financialData].sort((a, b) => a.year - b.year)
  const latestYear = sortedData[sortedData.length - 1]

  const chartOptions = {
    chart: {
      type: "area",
      height: 350,
      toolbar: { show: false },
      sparkline: { enabled: false }
    },
    colors: [metrics.find(m => m.key === selectedMetric)?.color || "#28A745"],
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 3 },
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.1,
        stops: [0, 90, 100]
      }
    },
    xaxis: {
      categories: sortedData.map(d => d.year.toString()),
      labels: { style: { colors: "#6B7280" } }
    },
    yaxis: {
      labels: {
        style: { colors: "#6B7280" },
        formatter: (value) => {
          if (selectedMetric === "employees") {
            return value.toString()
          }
          return formatCurrency(value)
        }
      }
    },
    grid: {
      borderColor: "#E5E7EB",
      strokeDashArray: 4
    },
    tooltip: {
      theme: "light",
      y: {
        formatter: (value) => {
          if (selectedMetric === "employees") {
            return `${value} werknemers`
          }
          return formatCurrency(value)
        }
      }
    }
  }

  const chartSeries = [{
    name: metrics.find(m => m.key === selectedMetric)?.label || "Waarde",
    data: sortedData.map(d => d[selectedMetric] || 0)
  }]

  return (
    <div className="space-y-6">
      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric) => {
          const value = latestYear?.[metric.key]
          const previousValue = sortedData[sortedData.length - 2]?.[metric.key]
          const change = previousValue ? ((value - previousValue) / previousValue) * 100 : 0
          
          return (
            <Card
              key={metric.key}
              className={`p-4 cursor-pointer transition-all duration-200 ${
                selectedMetric === metric.key 
                  ? "ring-2 ring-accent shadow-lg" 
                  : "hover:shadow-md"
              }`}
              onClick={() => setSelectedMetric(metric.key)}
            >
              <div className="flex items-center justify-between mb-2">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: `${metric.color}20` }}
                >
                  <ApperIcon name={metric.icon} className="w-5 h-5" style={{ color: metric.color }} />
                </div>
                {change !== 0 && (
                  <div className={`flex items-center gap-1 text-xs ${
                    change > 0 ? "text-success" : "text-error"
                  }`}>
                    <ApperIcon 
                      name={change > 0 ? "TrendingUp" : "TrendingDown"} 
                      className="w-3 h-3" 
                    />
                    {Math.abs(change).toFixed(1)}%
                  </div>
                )}
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">{metric.label}</h3>
              <p className="text-xl font-bold text-primary">
                {metric.key === "employees" 
                  ? (value || 0).toString()
                  : formatCurrency(value)
                }
              </p>
              <p className="text-xs text-gray-500">Jaar {latestYear?.year}</p>
            </Card>
          )
        })}
      </div>

      {/* Chart */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-primary">
            {metrics.find(m => m.key === selectedMetric)?.label} Evolutie
          </h3>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <ApperIcon name="Calendar" className="w-4 h-4" />
            {sortedData[0]?.year} - {sortedData[sortedData.length - 1]?.year}
          </div>
        </div>
        
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="area"
          height={350}
        />
      </Card>

      {/* Financial Data Table */}
      <Card className="overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
            <ApperIcon name="Table" className="w-5 h-5" />
            Historische Gegevens
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Jaar</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Omzet</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Winst</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Eigen Vermogen</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Werknemers</th>
              </tr>
            </thead>
<tbody className="divide-y divide-gray-200">
              {[...sortedData].reverse().map((data) => (
                <tr key={data.Id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-primary">{data.year}</td>
                  <td className="px-6 py-4 text-right text-gray-600">
                    {formatCurrency(data.revenue)}
                  </td>
                  <td className="px-6 py-4 text-right text-gray-600">
                    {formatCurrency(data.profit)}
                  </td>
                  <td className="px-6 py-4 text-right text-gray-600">
                    {formatCurrency(data.equity)}
                  </td>
                  <td className="px-6 py-4 text-right text-gray-600">
                    {data.employees || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

export default FinancialOverview