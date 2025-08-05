import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import Button from "@/components/atoms/Button"
import CompanyProfile from "@/components/organisms/CompanyProfile"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import ApperIcon from "@/components/ApperIcon"
import { companyService } from "@/services/api/companyService"
import { toast } from "react-toastify"

const CompanyProfilePage = () => {
  const { vatNumber } = useParams()
  const navigate = useNavigate()
  const [company, setCompany] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    loadCompanyData()
  }, [vatNumber])

  const loadCompanyData = async () => {
    try {
      setLoading(true)
setError("")
      
      const companyData = await companyService.getByVatNumber(vatNumber)
      
      if (!companyData) {
        setError("Bedrijf niet gevonden")
        return
      }

      // Transform data structure for backward compatibility
      const transformedCompany = {
        ...companyData,
        name: companyData.Name,
        address: {
          street: companyData.street,
          number: companyData.number,
          postalCode: companyData.postalCode,
          city: companyData.city,
          country: companyData.country
        },
        executives: [], // Will be loaded separately
        financialData: [] // Will be loaded separately
      }

      setCompany(transformedCompany)
    } catch (err) {
      setError(err.message || "Er is een fout opgetreden bij het laden van bedrijfsgegevens")
      toast.error("Kon bedrijfsgegevens niet laden")
    } finally {
      setLoading(false)
    }
  }

  const handleRetry = () => {
    loadCompanyData()
  }

  const handleBackToSearch = () => {
    navigate("/")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-white to-secondary/10">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <Loading message="Bedrijfsgegevens laden..." />
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-white to-secondary/10">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-6">
              <Button
                variant="outline"
                onClick={handleBackToSearch}
                icon="ArrowLeft"
              >
                Terug naar zoeken
              </Button>
            </div>
            <Error 
              message={error}
              onRetry={handleRetry}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-white to-secondary/10">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header with navigation */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={handleBackToSearch}
                icon="ArrowLeft"
              >
                Terug naar zoeken
              </Button>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                  <ApperIcon name="Building2" className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-semibold gradient-text">BelgiumBiz</h1>
                  <p className="text-sm text-gray-600">Bedrijfsprofiel</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600">
              <ApperIcon name="Shield" className="w-4 h-4" />
              <span>Alle gegevens zijn publiek beschikbaar</span>
            </div>
          </div>

          {/* Company Profile */}
          <CompanyProfile company={company} />
        </div>
      </div>
    </div>
  )
}

export default CompanyProfilePage