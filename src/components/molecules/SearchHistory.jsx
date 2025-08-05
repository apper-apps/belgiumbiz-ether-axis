import { useState, useEffect } from "react"
import Card from "@/components/atoms/Card"
import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"
import { format } from "date-fns"
import { nl } from "date-fns/locale"
import { searchHistoryService } from "@/services/api/searchHistoryService"

const SearchHistory = ({ onSelectHistory }) => {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadHistory()
  }, [])

  const loadHistory = async () => {
    try {
      const data = await searchHistoryService.getAll()
      setHistory(data.slice(0, 5)) // Show last 5 searches
    } catch (error) {
      console.error("Error loading search history:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleClearHistory = async () => {
    try {
      // In a real app, you would call an API to clear history
      setHistory([])
    } catch (error) {
      console.error("Error clearing history:", error)
    }
  }

  if (loading || history.length === 0) {
    return null
  }

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-primary flex items-center gap-2">
          <ApperIcon name="History" className="w-5 h-5" />
          Recente zoekopdrachten
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClearHistory}
          icon="Trash2"
        >
          Wissen
        </Button>
      </div>

      <div className="space-y-2">
        {history.map((item) => (
          <div
            key={item.Id}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            onClick={() => onSelectHistory(item.query)}
          >
            <div className="flex-1">
              <div className="font-medium text-primary">{item.query}</div>
              <div className="text-sm text-gray-500">
                {format(new Date(item.timestamp), "dd MMM yyyy, HH:mm", { locale: nl })}
                {item.resultCount > 0 && ` • ${item.resultCount} resultaten`}
              </div>
            </div>
            <ApperIcon name="ArrowRight" className="w-4 h-4 text-gray-400" />
          </div>
        ))}
      </div>
    </Card>
  )
}

export default SearchHistory