import { toast } from "react-toastify"

export const financialDataService = {
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
          { field: { Name: "year" } },
          { field: { Name: "revenue" } },
          { field: { Name: "profit" } },
          { field: { Name: "equity" } },
          { field: { Name: "employees" } },
          { field: { Name: "company_id" } },
          { field: { Name: "Tags" } }
        ]
      };

      const response = await apperClient.fetchRecords('financial_data', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching financial data:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  },

  async getByCompanyId(companyId) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "year" } },
          { field: { Name: "revenue" } },
          { field: { Name: "profit" } },
          { field: { Name: "equity" } },
          { field: { Name: "employees" } },
          { field: { Name: "company_id" } },
          { field: { Name: "Tags" } }
        ],
        where: [
          {
            FieldName: "company_id",
            Operator: "EqualTo",
            Values: [parseInt(companyId)]
          }
        ],
        orderBy: [
          {
            fieldName: "year",
            sorttype: "ASC"
          }
        ]
      };

      const response = await apperClient.fetchRecords('financial_data', params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching financial data by company:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  },

  async create(financialData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Name: financialData.Name || `Financial Data ${financialData.year}`,
          year: financialData.year,
          revenue: financialData.revenue,
          profit: financialData.profit,
          equity: financialData.equity,
          employees: financialData.employees,
          company_id: parseInt(financialData.company_id),
          Tags: financialData.Tags
        }]
      };

      const response = await apperClient.createRecord('financial_data', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create financial data ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
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
        console.error("Error creating financial data:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  }
}