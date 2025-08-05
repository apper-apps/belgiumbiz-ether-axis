import { cn } from "@/utils/cn"
import ApperIcon from "@/components/ApperIcon"

const TabNavigation = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className="border-b border-gray-200 bg-white">
      <nav className="flex space-x-8 px-6" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium transition-colors duration-200 flex items-center gap-2",
              activeTab === tab.id
                ? "border-accent text-accent"
                : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
            )}
          >
            <ApperIcon name={tab.icon} className="w-4 h-4" />
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  )
}

export default TabNavigation