import { toast } from "react-toastify"

export const searchHistoryService = {
  async getAll() {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "query" } },
          { field: { Name: "timestamp" } },
          { field: { Name: "resultCount" } }
        ],
        orderBy: [
          {
            fieldName: "timestamp",
            sorttype: "DESC"
          }
        ],
        pagingInfo: {
          limit: 10,
          offset: 0
        }
      };

      const response = await apperClient.fetchRecords('search_history', params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching search history:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  },

  async getById(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "query" } },
          { field: { Name: "timestamp" } },
          { field: { Name: "resultCount" } }
        ]
      };

      const response = await apperClient.getRecordById('search_history', id, params);
      
      if (!response || !response.data) {
        throw new Error("Zoekgeschiedenis item niet gevonden");
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching search history with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw new Error("Zoekgeschiedenis item niet gevonden");
    }
  },

  async create(historyItem) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Name: historyItem.query || 'Search Query',
          query: historyItem.query,
          timestamp: historyItem.timestamp,
          resultCount: historyItem.resultCount
        }]
      };

      const response = await apperClient.createRecord('search_history', params);
      
      if (!response.success) {
        console.error(response.message);
        return null;
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create search history ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }

        const successfulRecords = response.results.filter(result => result.success);
        return successfulRecords.length > 0 ? successfulRecords[0].data : null;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error creating search history:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async update(id, historyData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Id: parseInt(id),
          Name: historyData.query || 'Search Query',
          query: historyData.query,
          timestamp: historyData.timestamp,
          resultCount: historyData.resultCount
        }]
      };

      const response = await apperClient.updateRecord('search_history', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error("Zoekgeschiedenis item niet gevonden");
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to update search history ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            record.errors?.forEach(error => {
              toast.error(`${error.fieldLabel}: ${error.message}`);
            });
            if (record.message) toast.error(record.message);
          });
        }

        const successfulRecords = response.results.filter(result => result.success);
        return successfulRecords.length > 0 ? successfulRecords[0].data : null;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error updating search history:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw new Error("Zoekgeschiedenis item niet gevonden");
    }
  },

  async delete(id) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await apperClient.deleteRecord('search_history', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error("Zoekgeschiedenis item niet gevonden");
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to delete search history ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }

        return response.results.length > 0 && response.results[0].success;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting search history:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw new Error("Zoekgeschiedenis item niet gevonden");
    }
  },

  async clear() {
    try {
      // Get all records first
      const allRecords = await this.getAll();
      
      if (allRecords.length === 0) {
        return [];
      }

      // Delete all records
      const recordIds = allRecords.map(record => record.Id);
      
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        RecordIds: recordIds
      };

      const response = await apperClient.deleteRecord('search_history', params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return allRecords;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error clearing search history:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  }
}