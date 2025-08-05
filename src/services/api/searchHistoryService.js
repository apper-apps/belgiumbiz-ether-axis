import searchHistoryData from "@/services/mockData/searchHistory.json"

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const searchHistoryService = {
  async getAll() {
    await delay(200)
    // Return sorted by most recent first
    return [...searchHistoryData].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
  },

  async getById(id) {
    await delay(150)
    const item = searchHistoryData.find(h => h.Id === parseInt(id))
    if (!item) {
      throw new Error("Zoekgeschiedenis item niet gevonden")
    }
    return { ...item }
  },

  async create(historyItem) {
    await delay(200)
    const maxId = Math.max(...searchHistoryData.map(h => h.Id), 0)
    const newItem = {
      ...historyItem,
      Id: maxId + 1
    }
    searchHistoryData.unshift(newItem) // Add to beginning
    
    // Keep only last 10 items
    if (searchHistoryData.length > 10) {
      searchHistoryData.splice(10)
    }
    
    return { ...newItem }
  },

  async update(id, historyData) {
    await delay(200)
    const index = searchHistoryData.findIndex(h => h.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Zoekgeschiedenis item niet gevonden")
    }
    
    searchHistoryData[index] = {
      ...searchHistoryData[index],
      ...historyData,
      Id: parseInt(id)
    }
    
    return { ...searchHistoryData[index] }
  },

  async delete(id) {
    await delay(200)
    const index = searchHistoryData.findIndex(h => h.Id === parseInt(id))
    if (index === -1) {
      throw new Error("Zoekgeschiedenis item niet gevonden")
    }
    
    const deletedItem = { ...searchHistoryData[index] }
    searchHistoryData.splice(index, 1)
    return deletedItem
  },

  async clear() {
    await delay(250)
    const cleared = [...searchHistoryData]
    searchHistoryData.length = 0
    return cleared
  }
}