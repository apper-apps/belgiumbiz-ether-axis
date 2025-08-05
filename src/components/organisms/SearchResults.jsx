import CompanyCard from "@/components/molecules/CompanyCard"
import { useNavigate } from "react-router-dom"

const SearchResults = ({ companies, loading }) => {
  const navigate = useNavigate()

  const handleCompanyClick = (company) => {
    navigate(`/company/${company.vatNumber}`)
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-sm animate-pulse">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="h-6 bg-gray-200 rounded w-2/3 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
              </div>
              <div className="h-6 bg-gray-200 rounded w-16"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {companies.map((company) => (
        <CompanyCard
          key={company.Id}
          company={company}
          onClick={() => handleCompanyClick(company)}
        />
      ))}
    </div>
  )
}

export default SearchResults