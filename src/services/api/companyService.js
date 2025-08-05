import { toast } from "react-toastify"

export const companyService = {
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
          { field: { Name: "vatNumber" } },
          { field: { Name: "legalForm" } },
          { field: { Name: "foundedDate" } },
          { field: { Name: "street" } },
          { field: { Name: "number" } },
          { field: { Name: "postalCode" } },
          { field: { Name: "city" } },
          { field: { Name: "country" } },
          { field: { Name: "status" } },
          { field: { Name: "website" } },
          { field: { Name: "email" } },
          { field: { Name: "phone" } },
          { field: { Name: "Tags" } }
        ]
      };

      const response = await apperClient.fetchRecords('company', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching companies:", error?.response?.data?.message);
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
          { field: { Name: "vatNumber" } },
          { field: { Name: "legalForm" } },
          { field: { Name: "foundedDate" } },
          { field: { Name: "street" } },
          { field: { Name: "number" } },
          { field: { Name: "postalCode" } },
          { field: { Name: "city" } },
          { field: { Name: "country" } },
          { field: { Name: "status" } },
          { field: { Name: "website" } },
          { field: { Name: "email" } },
          { field: { Name: "phone" } },
          { field: { Name: "Tags" } }
        ]
      };

      const response = await apperClient.getRecordById('company', id, params);
      
      if (!response || !response.data) {
        throw new Error("Bedrijf niet gevonden");
      }

      return response.data;
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error(`Error fetching company with ID ${id}:`, error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw new Error("Bedrijf niet gevonden");
    }
  },

  async getByVatNumber(vatNumber) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const cleanVatNumber = vatNumber.replace(/\s/g, "").toUpperCase();

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "vatNumber" } },
          { field: { Name: "legalForm" } },
          { field: { Name: "foundedDate" } },
          { field: { Name: "street" } },
          { field: { Name: "number" } },
          { field: { Name: "postalCode" } },
          { field: { Name: "city" } },
          { field: { Name: "country" } },
          { field: { Name: "status" } },
          { field: { Name: "website" } },
          { field: { Name: "email" } },
          { field: { Name: "phone" } },
          { field: { Name: "Tags" } }
        ],
        where: [
          {
            FieldName: "vatNumber",
            Operator: "EqualTo",
            Values: [cleanVatNumber]
          }
        ]
      };

      const response = await apperClient.fetchRecords('company', params);
      
      if (!response.success) {
        console.error(response.message);
        throw new Error("Bedrijf met dit BTW-nummer niet gevonden");
      }

      if (!response.data || response.data.length === 0) {
        throw new Error("Bedrijf met dit BTW-nummer niet gevonden");
      }

      return response.data[0];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error fetching company by VAT number:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw new Error("Bedrijf met dit BTW-nummer niet gevonden");
    }
  },

  async searchByName(name) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const searchTerm = name.toLowerCase().trim();
      if (!searchTerm) {
        return [];
      }

      const params = {
        fields: [
          { field: { Name: "Name" } },
          { field: { Name: "vatNumber" } },
          { field: { Name: "legalForm" } },
          { field: { Name: "foundedDate" } },
          { field: { Name: "street" } },
          { field: { Name: "number" } },
          { field: { Name: "postalCode" } },
          { field: { Name: "city" } },
          { field: { Name: "country" } },
          { field: { Name: "status" } },
          { field: { Name: "website" } },
          { field: { Name: "email" } },
          { field: { Name: "phone" } },
          { field: { Name: "Tags" } }
        ],
        where: [
          {
            FieldName: "Name",
            Operator: "Contains",
            Values: [searchTerm]
          }
        ]
      };

      const response = await apperClient.fetchRecords('company', params);
      
      if (!response.success) {
        console.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error searching companies by name:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return [];
    }
  },

  async create(company) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Name: company.Name,
          vatNumber: company.vatNumber,
          legalForm: company.legalForm,
          foundedDate: company.foundedDate,
          street: company.street,
          number: company.number,
          postalCode: company.postalCode,
          city: company.city,
          country: company.country,
          status: company.status,
          website: company.website,
          email: company.email,
          phone: company.phone,
          Tags: company.Tags
        }]
      };

      const response = await apperClient.createRecord('company', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to create company ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
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
        console.error("Error creating company:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      return null;
    }
  },

  async update(id, companyData) {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Id: parseInt(id),
          Name: companyData.Name,
          vatNumber: companyData.vatNumber,
          legalForm: companyData.legalForm,
          foundedDate: companyData.foundedDate,
          street: companyData.street,
          number: companyData.number,
          postalCode: companyData.postalCode,
          city: companyData.city,
          country: companyData.country,
          status: companyData.status,
          website: companyData.website,
          email: companyData.email,
          phone: companyData.phone,
          Tags: companyData.Tags
        }]
      };

      const response = await apperClient.updateRecord('company', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error("Bedrijf niet gevonden");
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to update company ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
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
        console.error("Error updating company:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw new Error("Bedrijf niet gevonden");
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

      const response = await apperClient.deleteRecord('company', params);
      
      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        throw new Error("Bedrijf niet gevonden");
      }

      if (response.results) {
        const failedRecords = response.results.filter(result => !result.success);
        
        if (failedRecords.length > 0) {
          console.error(`Failed to delete company ${failedRecords.length} records:${JSON.stringify(failedRecords)}`);
          
          failedRecords.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }

        return response.results.length > 0 && response.results[0].success;
      }
    } catch (error) {
      if (error?.response?.data?.message) {
        console.error("Error deleting company:", error?.response?.data?.message);
      } else {
        console.error(error.message);
      }
      throw new Error("Bedrijf niet gevonden");
    }
  }
}