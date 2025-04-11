import { useParams, useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { 
  FaUsers, 
  FaBoxOpen, 
  FaFileContract, 
  FaWarehouse, 
  FaUserCog, 
  FaShoppingCart, 
  FaFileInvoiceDollar,
  FaChevronRight,
  FaExternalLinkAlt
} from "react-icons/fa";

const HomePage = () => {
  const { section } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [filteredData, setFilteredData] = useState([]);
  const [sectionIcon, setSectionIcon] = useState(null);
  const [sectionName, setSectionName] = useState("");
  const [selectedScenario, setSelectedScenario] = useState(null);

  const scenarioData = [
    {
      _id: "1",
      key: "SCENARIO-1",
      name: "Valid Accounts with Valid DEA License",
      description: "This scenario checks for accounts with valid DEA licenses in the system. It verifies the license status and expiration dates.",
      fullDescription: "This comprehensive check ensures all customer accounts have active and valid DEA licenses. It cross-references with government databases to validate license numbers and checks for any red flags or expiration dates that might be approaching. The report includes detailed information about each account's license status and any required follow-up actions.",
      action: ["click", "key-press"],
      path: "/report/valid-accounts",
      dataDomain: "customers",
    },
    {
      _id: "2",
      key: "SCENARIO-2",
      name: "Product Inventory Analysis",
      description: "Analyzes current product inventory levels and identifies potential shortages.",
      fullDescription: "This scenario provides a detailed analysis of all products in inventory, highlighting items that are below recommended stock levels. It considers historical sales data, lead times, and seasonal trends to predict potential shortages before they occur. The report includes recommendations for reorder quantities and timing.",
      action: ["click", "key-press"],
      path: "/report/inventory-analysis",
      dataDomain: "products",
    },
    {
      _id: "3",
      key: "SCENARIO-3",
      name: "Contract Expiry Review",
      description: "Identifies contracts approaching their expiration dates.",
      fullDescription: "This scenario scans all active contracts and flags those that are approaching expiration within the next 30, 60, or 90 days (configurable). It provides contract details, key terms, and contact information for follow-up. The report can be filtered by contract type, value, or business unit.",
      action: ["click", "key-press"],
      path: "/report/contract-expiry",
      dataDomain: "contracts",
    },
    {
      _id: "4",
      key: "SCENARIO-4",
      name: "Order Processing Efficiency",
      description: "Measures order processing times and identifies bottlenecks.",
      fullDescription: "This scenario analyzes the complete order processing workflow from receipt to fulfillment. It measures time spent at each stage and identifies bottlenecks or inefficiencies. The report includes comparative metrics against industry benchmarks and recommendations for process improvements.",
      action: ["click", "key-press"],
      path: "/report/order-efficiency",
      dataDomain: "orders",
    },{
      _id: "5",
      key: "SCENARIO-5",
      name: "Scenario 5",
      description: "This scenario checks for accounts with valid DEA licenses in the system. It verifies the license status and expiration dates.",
      fullDescription: "This comprehensive check ensures all customer accounts have active and valid DEA licenses. It cross-references with government databases to validate license numbers and checks for any red flags or expiration dates that might be approaching. The report includes detailed information about each account's license status and any required follow-up actions.",
      action: ["click", "key-press"],
      path: "/report/valid-accounts",
      dataDomain: "customers",
    },{
      _id: "6",
      key: "SCENARIO-1",
      name: "Scenario 6",
      description: "This scenario checks for accounts with valid DEA licenses in the system. It verifies the license status and expiration dates.",
      fullDescription: "This comprehensive check ensures all customer accounts have active and valid DEA licenses. It cross-references with government databases to validate license numbers and checks for any red flags or expiration dates that might be approaching. The report includes detailed information about each account's license status and any required follow-up actions.",
      action: ["click", "key-press"],
      path: "/report/valid-accounts",
      dataDomain: "customers",
    },{
      _id: "7",
      key: "Scenario 7",
      name: "Valid Accounts with Valid DEA License",
      description: "This scenario checks for accounts with valid DEA licenses in the system. It verifies the license status and expiration dates.",
      fullDescription: "This comprehensive check ensures all customer accounts have active and valid DEA licenses. It cross-references with government databases to validate license numbers and checks for any red flags or expiration dates that might be approaching. The report includes detailed information about each account's license status and any required follow-up actions.",
      action: ["click", "key-press"],
      path: "/report/valid-accounts",
      dataDomain: "customers",
    }
  ];

  useEffect(() => {
    if (section) {
      const matched = scenarioData.filter((item) => item.dataDomain === section);
      setFilteredData(matched);
      setSelectedScenario(null); // Reset selected scenario when section changes
      
      // Get the icon and name from location state
      if (location.state) {
        setSectionIcon(location.state.sectionIcon);
        setSectionName(location.state.sectionName);
      } else {
        // Fallback: Create a mapping of section to icon
        const sectionIcons = {
          customers: <FaUsers className="w-6 h-6" />,
          products: <FaBoxOpen className="w-6 h-6" />,
          contracts: <FaFileContract className="w-6 h-6" />,
          "stock-status": <FaWarehouse className="w-6 h-6" />,
          "account-settings": <FaUserCog className="w-6 h-6" />,
          orders: <FaShoppingCart className="w-6 h-6" />,
          invoices: <FaFileInvoiceDollar className="w-6 h-6" />,
        };
        
        setSectionIcon(sectionIcons[section]);
        setSectionName(
          section
            .split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
        );
      }
    }
  }, [section, location.state]);

  const handleScenarioSelect = (scenario) => {
    setSelectedScenario(scenario);
  };

  const handleExplore = () => {
    if (selectedScenario) {
      navigate(`/home/${section}/${selectedScenario.key}`, { 
        state: { scenarioName: selectedScenario.name } 
      });
    }
  };

  return (
    <div className="p-4 h-full flex flex-col">
      {/* Header Section */}
      <div className="flex items-center space-x-3 mb-6">
        {sectionIcon && (
          <div className="text-gray-600">
            {React.cloneElement(sectionIcon, { className: "w-8 h-8" })}
          </div>
        )}
        <h2 className="text-2xl font-semibold text-cyan-700">
          {sectionName}
        </h2>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 gap-6">
        {/* Left Column - Scenario List (2/3 width) */}
        <div className="w-2/3">
          {filteredData.length > 0 ? (
            <div className="space-y-4">
              {filteredData.map((scenario) => (
                <div
                  key={scenario._id}
                  onClick={() => handleScenarioSelect(scenario)}
                  className={`bg-white rounded-xl shadow-sm p-5 border-2 transition-all duration-200 cursor-pointer hover:shadow-md ${
                    selectedScenario?._id === scenario._id 
                      ? "border-blue-500 bg-blue-50" 
                      : "border-gray-100 hover:border-blue-200"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-700 mb-1">
                        {scenario.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3">
                        {scenario.description}
                      </p>
                    </div>
                    <FaChevronRight 
                      className={`text-gray-400 mt-1 ${
                        selectedScenario?._id === scenario._id ? "text-blue-500" : ""
                      }`} 
                    />
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/home/${section}/${scenario.key}`, { 
                        state: { scenarioName: scenario.name } 
                      });
                    }}
                    className="text-xs text-cyan-600 hover:text-cyan-800 font-medium flex items-center gap-1"
                  >
                    Explore <FaExternalLinkAlt className="text-xs" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-8 text-center shadow-sm">
              <p className="text-gray-500">No scenarios found for this section.</p>
            </div>
          )}
        </div>

        {/* Right Column - Scenario Details (1/3 width) */}
        <div className="w-1/3">
          {selectedScenario ? (
            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 sticky top-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {selectedScenario.name}
              </h3>
              <div className="prose prose-sm text-gray-600 mb-6">
                <p>{selectedScenario.fullDescription}</p>
              </div>
              <button
                onClick={handleExplore}
                className="w-full bg-cyan-600 hover:bg-cyan-800 text-white py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
              >
                Explore <FaExternalLinkAlt className="text-sm" />
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 text-center flex items-center justify-center h-full">
              <div>
                <p className="text-gray-500 mb-3">Select an item to view details</p>
                <div className="text-gray-400 text-4xl opacity-30">
                  <FaBoxOpen className="mx-auto" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;