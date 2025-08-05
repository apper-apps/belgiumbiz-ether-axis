import React, { useState } from "react";
import { format } from "date-fns";
import { nl } from "date-fns/locale";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import TabNavigation from "@/components/molecules/TabNavigation";
import FinancialOverview from "@/components/organisms/FinancialOverview";
import ExecutivesTable from "@/components/organisms/ExecutivesTable";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";

const CompanyProfile = ({ company }) => {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overzicht", icon: "Building2" },
    { id: "executives", label: "Bestuurders", icon: "Users" },
    { id: "financial", label: "Financieel", icon: "TrendingUp" },
    { id: "contact", label: "Contact", icon: "Phone" }
  ];

  const getStatusVariant = (status) => {
    switch (status?.toLowerCase()) {
      case "actief":
        return "success";
      case "ontbonden":
        return "error";
      case "geschorst":
        return "warning";
      default:
        return "default";
    }
  };

  const handleExportPDF = () => {
    toast.success("PDF rapport wordt gegenereerd...");
    // In a real app, this would generate and download a PDF
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "overview":
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                  <ApperIcon name="Building2" className="w-5 h-5" />
                  Bedrijfsinformatie
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-gray-600">Rechtsvorm</label>
                    <p className="text-primary font-medium">{company.legalForm}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">BTW-nummer</label>
                    <p className="text-primary font-mono">{company.vatNumber}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-600">Status</label>
                    <div className="mt-1">
                      <Badge variant={getStatusVariant(company.status)}>
                        {company.status}
                      </Badge>
                    </div>
                  </div>
                  {company.foundedDate && (
                    <div>
                      <label className="text-sm font-medium text-gray-600">Oprichtingsdatum</label>
                      <p className="text-primary">
                        {format(new Date(company.foundedDate), "dd MMMM yyyy", {
                          locale: nl
                        })}
                      </p>
                    </div>
                  )}
                </div>
              </Card>
              <Card className="p-6">
                <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                  <ApperIcon name="MapPin" className="w-5 h-5" />
                  Adresgegevens
                </h3>
                <div className="space-y-2">
                  <p className="text-primary">
                    {company.street} {company.number}
                  </p>
                  <p className="text-primary">
                    {company.postalCode} {company.city}
                  </p>
                  <p className="text-gray-600">{company.country}</p>
                </div>
              </Card>
            </div>
          </div>
        );

      case "executives":
        return <ExecutivesTable executives={company.executives || []} />;

      case "financial":
        return <FinancialOverview financialData={company.financialData || []} />;

      case "contact":
        return (
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
              <ApperIcon name="Phone" className="w-5 h-5" />
              Contactinformatie
            </h3>
            <div className="space-y-4">
              {company.website && (
                <div className="flex items-center gap-3">
                  <ApperIcon name="Globe" className="w-5 h-5 text-gray-500" />
                  <div>
                    <label className="text-sm font-medium text-gray-600">Website</label>
                    <p className="text-primary">
                      <a
                        href={company.website.startsWith("http") ? company.website : `https://${company.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent hover:underline"
                      >
                        {company.website}
                      </a>
                    </p>
                  </div>
                </div>
              )}
              {company.email && (
                <div className="flex items-center gap-3">
                  <ApperIcon name="Mail" className="w-5 h-5 text-gray-500" />
                  <div>
                    <label className="text-sm font-medium text-gray-600">E-mail</label>
                    <p className="text-primary">
                      <a href={`mailto:${company.email}`} className="text-accent hover:underline">
                        {company.email}
                      </a>
                    </p>
                  </div>
                </div>
              )}
              {company.phone && (
                <div className="flex items-center gap-3">
                  <ApperIcon name="Phone" className="w-5 h-5 text-gray-500" />
                  <div>
                    <label className="text-sm font-medium text-gray-600">Telefoon</label>
                    <p className="text-primary">
                      <a href={`tel:${company.phone}`} className="text-accent hover:underline">
                        {company.phone}
                      </a>
                    </p>
                  </div>
                </div>
              )}
              {!company.website && !company.email && !company.phone && (
                <div className="text-center py-8 text-gray-500">
                  <ApperIcon name="PhoneOff" className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                  <p>Geen contactinformatie beschikbaar</p>
                </div>
              )}
            </div>
          </Card>
        );

      default:
        return null;
    }
  };
return (
    <div className="space-y-6">
      {/* Company Header */}
      <Card gradient className="p-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-3xl font-bold gradient-text mb-2">
              {company.name}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-600">
              <div className="flex items-center gap-2">
                <ApperIcon name="Hash" className="w-4 h-4" />
                <span className="font-mono">{company.vatNumber}</span>
              </div>
              <div className="flex items-center gap-2">
                <ApperIcon name="MapPin" className="w-4 h-4" />
                <span>{company.city}, {company.country}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" onClick={handleExportPDF} icon="Download">
              Export PDF
            </Button>
            <Badge variant={getStatusVariant(company.status)} className="self-start">
              {company.status}
            </Badge>
          </div>
        </div>
      </Card>
      {/* Tab Navigation */}
      <Card className="p-0 overflow-hidden">
        <TabNavigation tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        <div className="p-6">
          {renderTabContent()}
        </div>
      </Card>
    </div>
  );
};

export default CompanyProfile;