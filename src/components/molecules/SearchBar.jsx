import { useState, useEffect } from "react"
import Input from "@/components/atoms/Input"
import Button from "@/components/atoms/Button"
import { cn } from "@/utils/cn"
import { companyService } from "@/services/api/companyService"

const SearchBar = ({ onSearch, loading = false }) => {
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [isValidVat, setIsValidVat] = useState(false)

  // Validate Belgian VAT number format
  const validateVatNumber = (vatNumber) => {
    const belgianVatRegex = /^(BE)?[0-9]{10}$/
    return belgianVatRegex.test(vatNumber.replace(/\s/g, ""))
  }

  useEffect(() => {
    const trimmedQuery = query.trim()
    
    if (trimmedQuery.length === 0) {
      setSuggestions([])
      setShowSuggestions(false)
      setIsValidVat(false)
      return
    }

    // Check if it's a VAT number
    if (validateVatNumber(trimmedQuery)) {
      setIsValidVat(true)
      setSuggestions([])
      setShowSuggestions(false)
      return
    } else {
      setIsValidVat(false)
    }

    // If it's not a VAT number and has at least 2 characters, show company suggestions
    if (trimmedQuery.length >= 2) {
      const fetchSuggestions = setTimeout(async () => {
        try {
          const companies = await companyService.searchByName(trimmedQuery)
          setSuggestions(companies.slice(0, 5))
          setShowSuggestions(true)
        } catch (error) {
          setSuggestions([])
          setShowSuggestions(false)
        }
      }, 300)

      return () => clearTimeout(fetchSuggestions)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [query])

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query.trim())
      setShowSuggestions(false)
    }
  }

  const handleSuggestionClick = (company) => {
    setQuery(company.name)
    onSearch(company.vatNumber)
    setShowSuggestions(false)
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch()
    }
    if (e.key === "Escape") {
      setShowSuggestions(false)
    }
  }

  return (
    <div className="relative w-full max-w-2xl">
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Voer BTW-nummer (BE0123456789) of bedrijfsnaam in..."
            icon="Search"
            className={cn(
              "text-lg h-14",
              isValidVat && "border-success focus:border-success focus:ring-success/20"
            )}
          />
          
          {/* Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-lg shadow-premium max-h-60 overflow-y-auto animate-slide-up">
              {suggestions.map((company, index) => (
                <div
                  key={company.Id}
                  className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                  onClick={() => handleSuggestionClick(company)}
                >
                  <div className="font-medium text-primary">{company.name}</div>
                  <div className="text-sm text-gray-600">{company.vatNumber} • {company.city}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <Button
          onClick={handleSearch}
          loading={loading}
          size="lg"
          className="px-8 h-14"
          disabled={!query.trim()}
        >
          Zoeken
        </Button>
      </div>
      
      {/* VAT validation indicator */}
      {query.trim() && (
        <div className="mt-2 text-sm">
          {isValidVat ? (
            <span className="text-success font-medium">✓ Geldig BTW-nummer formaat</span>
          ) : query.length >= 2 ? (
            <span className="text-info">Zoeken op bedrijfsnaam...</span>
          ) : null}
        </div>
      )}
    </div>
  )
}

export default SearchBar