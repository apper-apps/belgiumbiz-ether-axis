import companiesData from "@/services/mockData/companies.json"

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const companyService = {
  async getAll() {
    await delay(300)
    return [...companiesData]
  },

  async getById(id) {
    await delay(250)
    const company = companiesData.find(c => c.Id === parseInt(id))
    if (!company) {
      throw new Error("Bedrijf niet gevonden")
    }
    return { ...company }
  },

  async getByVatNumber(vatNumber) {
    await delay(400)
    const cleanVatNumber = vatNumber.replace(/\s/g, "").toUpperCase()
    const company = companiesData.find(c => c.vatNumber === cleanVatNumber)
    if (!company) {
      throw new Error("Bedrijf met dit BTW-nummer niet gevonden")
    }
    return { ...company }
  },

  async searchByName(name) {
    await delay(350)
    const searchTerm = name.toLowerCase().trim()
    if (!searchTerm) {
      return []
    }

    const results = companiesData.filter(company => 
      company.name.toLowerCase().includes(searchTerm)
    )

    return results.map(company => ({ ...company }))
  },

  async create(company) {
    await delay(500)
    const maxId = Math.max(...companiesData.map(c => c.Id), 0)
    const newCompany = {
      ...company,
      Id: maxId + 1
    }
    companiesData.push(newCompany)
    return { ...newCompany }
  },

  async update(id, companyData) {
    await delay(400)
    const index = companiesData.findIndex(c => c.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Bedrijf niet gevonden")
    }
    
    companiesData[index] = {
      ...companiesData[index],
      ...companyData,
      Id: parseInt(id)
    }
    
    return { ...companiesData[index] }
  },

  async delete(id) {
    await delay(300)
    const index = companiesData.findIndex(c => c.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Bedrijf niet gevonden")
    }
    
    const deletedCompany = { ...companiesData[index] }
    companiesData.splice(index, 1)
    return deletedCompany
  }
}