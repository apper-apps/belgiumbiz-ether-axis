import { useState } from "react"
import Card from "@/components/atoms/Card"
import SearchBar from "@/components/molecules/SearchBar"
import SearchHistory from "@/components/molecules/SearchHistory"
import SearchResults from "@/components/organisms/SearchResults"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import ApperIcon from "@/components/ApperIcon"
import { companyService } from "@/services/api/companyService"
import { searchHistoryService } from "@/services/api/searchHistoryService"
import { toast } from "react-toastify"

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async (query) => {
    setLoading(true)
    setError("")
    setHasSearched(true)

    try {
      let results = []
      
      // Check if query is a VAT number
      const belgianVatRegex = /^(BE)?[0-9]{10}$/
      const cleanQuery = query.replace(/\s/g, "")
      
if (belgianVatRegex.test(cleanQuery)) {
        // Search by VAT number
        const vatNumber = cleanQuery.startsWith("BE") ? cleanQuery : `BE${cleanQuery}`
        const company = await companyService.getByVatNumber(vatNumber)
        results = [company]
      } else {
        // Search by company name
        results = await companyService.searchByName(query)
      }

      setSearchResults(results)

      // Save to search history
      await searchHistoryService.create({
        query: query,
        timestamp: new Date().toISOString(),
        resultCount: results.length
      })

      if (results.length === 0) {
        toast.info("Geen bedrijven gevonden voor deze zoekopdracht")
      } else {
        toast.success(`${results.length} bedrijf${results.length > 1 ? "ven" : ""} gevonden`)
      }

    } catch (err) {
      setError(err.message || "Er is een fout opgetreden bij het zoeken")
      toast.error("Zoeken mislukt. Probeer het opnieuw.")
    } finally {
      setLoading(false)
    }
  }

  const handleHistorySelect = (query) => {
    handleSearch(query)
  }

  const handleRetry = () => {
    setError("")
    setHasSearched(false)
    setSearchResults([])
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-white to-secondary/10">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center">
              <ApperIcon name="Building2" className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl font-bold gradient-text">BelgiumBiz</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ontdek uitgebreide bedrijfsinformatie van Belgische ondernemingen via BTW-nummer of bedrijfsnaam
          </p>
        </div>

        {/* Search Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card gradient className="p-8">
            <div className="flex flex-col items-center space-y-6">
              <SearchBar onSearch={handleSearch} loading={loading} />
              
              {/* Quick Tips */}
              <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <ApperIcon name="Hash" className="w-4 h-4" />
                  <span>BTW: BE0123456789</span>
                </div>
                <div className="flex items-center gap-2">
                  <ApperIcon name="Building" className="w-4 h-4" />
                  <span>Bedrijfsnaam: Colruyt Group</span>
                </div>
                <div className="flex items-center gap-2">
                  <ApperIcon name="Zap" className="w-4 h-4" />
                  <span>Instant resultaten</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {loading && <Loading message="Bedrijven zoeken..." />}
              
              {error && (
                <Error 
                  message={error}
                  onRetry={handleRetry}
                />
              )}
              
              {!loading && !error && hasSearched && searchResults.length === 0 && (
                <Empty 
                  title="Geen bedrijven gevonden"
                  message="We konden geen bedrijven vinden die overeenkomen met uw zoekopdracht. Controleer het BTW-nummer of probeer een andere bedrijfsnaam."
                  action={handleRetry}
                  actionLabel="Nieuwe zoekopdracht"
                />
              )}
              
              {!loading && !error && searchResults.length > 0 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-primary">
                      {searchResults.length} resultaten gevonden
                    </h2>
                    <div className="text-sm text-gray-500">
                      Klik op een bedrijf voor meer details
                    </div>
                  </div>
                  <SearchResults companies={searchResults} />
                </div>
              )}
              
              {!hasSearched && (
                <Card className="p-12 text-center">
                  <div className="w-20 h-20 bg-gradient-to-r from-secondary/20 to-accent/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ApperIcon name="Search" className="w-10 h-10 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-3">
                    Klaar om te zoeken?
                  </h3>
                  <p className="text-gray-600 max-w-md mx-auto">
                    Voer een Belgisch BTW-nummer of bedrijfsnaam in om uitgebreide 
                    bedrijfsinformatie te ontdekken, inclusief financiële gegevens en bestuurders.
                  </p>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              <SearchHistory onSelectHistory={handleHistorySelect} />
              
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                  <ApperIcon name="Info" className="w-5 h-5" />
                  Zoektips
                </h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <div className="flex items-start gap-2">
                    <ApperIcon name="CheckCircle" className="w-4 h-4 text-success mt-0.5" />
                    <span>Gebruik volledige BTW-nummers (BE + 10 cijfers)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <ApperIcon name="CheckCircle" className="w-4 h-4 text-success mt-0.5" />
                    <span>Bedrijfsnamen zijn hoofdletterongevoelig</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <ApperIcon name="CheckCircle" className="w-4 h-4 text-success mt-0.5" />
                    <span>Gedeeltelijke namen worden ondersteund</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                  <ApperIcon name="Database" className="w-5 h-5" />
                  Beschikbare gegevens
                </h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <ApperIcon name="Building2" className="w-4 h-4" />
                    <span>Bedrijfsinformatie</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ApperIcon name="Users" className="w-4 h-4" />
                    <span>Bestuurders</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ApperIcon name="TrendingUp" className="w-4 h-4" />
                    <span>Financiële cijfers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ApperIcon name="Phone" className="w-4 h-4" />
                    <span>Contactgegevens</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchPage