import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp, FaDownload, FaSortUp, FaSortDown, FaSort, FaFilter, FaEye, FaCheck } from "react-icons/fa";

const Report = () => {
  const { reportId } = useParams();
  const location = useLocation();
  const scenarioName = location.state?.scenarioName || reportId;
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [tempSelectedColumns, setTempSelectedColumns] = useState([]); // For temporary changes
  const [columnFilters, setColumnFilters] = useState({});
  const [filterConfig, setFilterConfig] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalRecord, setTotalRecord] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(true);
  const [showColumns, setShowColumns] = useState(false); // Initially hidden
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [dataLoaded, setDataLoaded] = useState(false); // Track if data has been loaded
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [tableData, setTableData] = useState([
    {
      GLN: "0000000000000",
      accountFax: "7",
      accountGroup: "ZPSH",
      accountGroupDesc: "Pharma Ship-To Party",
      accountPhoneCountryCode: "1",
      address1: "227 S BROADWAY",
      customer: "2150002097",
      customerClassification: "04",
      customerClassificationDesc: "RETAIL CHAIN",
      CustomerCreationDate: "11/04/2015",
      deaLicense: "BC4014623",
      eReceiverEnableFlag: "No",
      generalDeletionFlag: "X",
      generalDeliveryBlock: null,
      generalOrderBlock: null,
      industryKey: null,
      industryKeyDesc: null,
      name: "RED CROSS PHARMACY INC",
      name2: null,
      name3: null,
      name4: null,
      pricedAsMasterFlag: null,
      primaryBusinessUnit: null,
      primaryBusinessUnitDesc: null,
      primaryContactEmail: "1",
      primaryContactName: "1",
      primaryContactPersonNumber: "1"
    }
  ]);

  const response2 = {
    scenerioKey: "SCENARIO-1",
    key: "SCENERIO-FILTERS-1",
    widgets: {
      filters: [
        {
          name: "Date Filter",
          dataKey: "dateFilter",
          displayName: "Choose Date",
          index: 0,
          visible: true,
          attributes: [
            { key: "type", value: "date-picker" },
            { key: "defaultValue", value: "2024-01-01" },
            { key: "width", value: "10em" }
          ]
        },
        {
          name: "Days Filter",
          dataKey: "daysFilter",
          displayName: "Within Days",
          index: 2,
          visible: true,
          attributes: [
            { key: "type", value: "dropdown" },
            { key: "options", value: "30,60,90,120" },
            { key: "defaultValue", value: "30" },
            { key: "width", value: "10em" }
          ]
        }
      ]
    }
  };

  useEffect(() => {
    // Simulate API call for filters
    if (reportId?.toUpperCase() === response2.scenerioKey.toUpperCase()) {
      setFilterConfig(response2.widgets.filters);
      const initialValues = {};
      response2.widgets.filters.forEach((filter) => {
        const defaultValue = getAttrValue(filter.attributes, "defaultValue") || "";
        initialValues[filter.dataKey] = defaultValue;
      });
      setFormValues(initialValues);
    }
    // Initially select all columns
    const allCols = Object.keys(tableData[0] || {});
    setSelectedColumns(allCols);
    setTempSelectedColumns(allCols);
    setTotalRecord(tableData.length);
    setDataLoaded(true);
  }, [reportId]);

  const getAttrValue = (attributes, key) =>
    attributes.find((attr) => attr.key === key)?.value;

  const handleChange = (key, value) => {
    setFormValues((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  const handleColumnFilterChange = (column, value) => {
    setColumnFilters(prev => ({
      ...prev,
      [column]: value
    }));
    setPageNumber(1); // Reset to first page when filters change
  };

  const formatHeaderName = (key) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  };

  // Get unique values for a column to populate dropdown filters
  const getUniqueColumnValues = (column) => {
    const values = new Set();
    tableData.forEach(row => {
      if (row[column] !== null && row[column] !== undefined) {
        values.add(row[column]);
      }
    });
    return Array.from(values).sort();
  };

  // Sorting function
  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  // Apply sorting and filtering to table data
  const sortedAndFilteredData = [...tableData]
    .filter(row => {
      // Apply column filters
      return Object.entries(columnFilters).every(([column, value]) => {
        if (!value || value === "All") return true;
        return String(row[column]) === String(value);
      });
    })
    .sort((a, b) => {
      if (!sortConfig.key) return 0;
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

  const handleSubmit = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      console.log("Submitted Filters: ", formValues);
      setShowColumns(true); // Show column selector after submit
      // Here you would typically setTableData with the API response
    }, 1500);
  };

  const handleDownload = () => {
    setIsLoading(true);
    // Simulate download API call
    setTimeout(() => {
      setIsLoading(false);
      console.log("Downloading full report...");
    }, 1500);
  };

  const allColumns = tableData.length > 0 ? Object.keys(tableData[0]) : [];

  const toggleColumn = (column) => {
    setTempSelectedColumns((prev) =>
      prev.includes(column)
        ? prev.filter((col) => col !== column)
        : [...prev, column]
    );
  };

  const toggleAllColumns = (selectAll) => {
    if (selectAll) {
      setTempSelectedColumns([...allColumns]);
    } else {
      setTempSelectedColumns([]);
    }
  };

  const applyColumnSelection = () => {
    setSelectedColumns([...tempSelectedColumns]);
    setDropdownOpen(false);
  };

  const handlePageChange = (newPage) => {
    setPageNumber(newPage);
  };

  const handlePageSizeChange = (e) => {
    const newSize = Number(e.target.value);
    setPageSize(newSize);
    setPageNumber(1);
  };

  const filteredColumns = allColumns.filter(
    col => formatHeaderName(col).toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(sortedAndFilteredData.length / pageSize);

  return (
    <div className="p-4 space-y-6 max-w-screen-xl mx-auto overflow-x-auto">
      <h2 className="text-2xl font-sans font-semibold text-gray-800">{scenarioName}</h2>

      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cyan-700"></div>
        </div>
      )}

      {filterConfig ? (
        <>
          {/* Filters Section - Collapsible */}
          <div className="bg-white shadow-lg rounded-lg p-4 border border-gray-200">
            <div 
              className="flex justify-between items-center cursor-pointer p-2 hover:bg-gray-50 rounded-lg"
              onClick={() => setShowFilters(!showFilters)}
            >
              <div className="flex items-center space-x-2">
                <FaFilter className="text-cyan-700" />
                <h3 className="font-semibold text-lg text-gray-800">Filters</h3>
              </div>
              {showFilters ? (
                <FaChevronUp className="text-gray-500" />
              ) : (
                <FaChevronDown className="text-gray-500" />
              )}
            </div>
            
            {showFilters && (
              <div className="mt-4 space-y-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                  {filterConfig.map((filter) => {
                    const type = getAttrValue(filter.attributes, "type");
                    const width = getAttrValue(filter.attributes, "width") || "100%";
                    const options = getAttrValue(filter.attributes, "options");

                    return (
                      <div
                        key={filter.dataKey}
                        className="flex flex-col space-y-2"
                        style={{ minWidth: width }}
                      >
                        <label className="font-medium text-gray-700">
                          {filter.displayName}
                        </label>

                        {type === "date-picker" && (
                          <input
                            type="date"
                            value={formValues[filter.dataKey]}
                            onChange={(e) => handleChange(filter.dataKey, e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
                          />
                        )}

                        {type === "text-input" && (
                          <input
                            type="text"
                            value={formValues[filter.dataKey]}
                            onChange={(e) => handleChange(filter.dataKey, e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition"
                          />
                        )}

                        {type === "dropdown" && (
                          <select
                            value={formValues[filter.dataKey]}
                            onChange={(e) => handleChange(filter.dataKey, e.target.value)}
                            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition appearance-none bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+')] bg-no-repeat bg-[center_right_0.5rem] bg-[length:1rem]"
                          >
                            {options.split(",").map((opt) => (
                              <option key={opt} value={opt}>
                                {opt} Days
                              </option>
                            ))}
                          </select>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleSubmit}
                    className="bg-cyan-700 hover:bg-cyan-800 text-white px-6 py-2 rounded-md shadow-md hover:shadow-lg transition-all duration-200 font-medium"
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Column Selector - Collapsible - Always visible once shown */}
          {(showColumns || selectedColumns.length > 0) && (
            <div className="bg-white shadow-lg rounded-lg p-4 border border-gray-200">
              <div 
                className="flex justify-between items-center cursor-pointer p-2 hover:bg-gray-50 rounded-lg"
                onClick={() => setShowColumns(!showColumns)}
              >
                <div className="flex items-center space-x-2">
                  <FaEye className="text-cyan-700" />
                  <h6 className="font-semibold text-lg text-gray-800">Report view</h6>
                </div>
                {showColumns ? (
                  <FaChevronUp className="text-gray-500" />
                ) : (
                  <FaChevronDown className="text-gray-500" />
                )}
              </div>
              
              {showColumns && (
                <div className="mt-4 space-y-6">
                  {/* Dropdown for column selection */}
                  <div className="relative">
                    <div 
                      className="border border-gray-300 rounded-md px-4 py-2 flex justify-between items-center cursor-pointer bg-white"
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    >
                      <span className="text-sm text-gray-700">
                        {tempSelectedColumns.length} of {allColumns.length} columns selected
                      </span>
                      {dropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                    </div>

                    {dropdownOpen && (
                      <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg max-h-96 overflow-y-auto">
                        <div className="sticky top-0 bg-white p-2 border-b">
                          <input
                            type="text"
                            placeholder="Search columns..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                          />
                        </div>
                        
                        <div className="p-2 border-b flex justify-between">
                          <button 
                            onClick={() => toggleAllColumns(true)}
                            className="text-sm text-cyan-700 hover:text-cyan-900 font-medium"
                          >
                            Select All
                          </button>
                          <button 
                            onClick={() => toggleAllColumns(false)}
                            className="text-sm text-cyan-700 hover:text-cyan-900 font-medium"
                          >
                            Deselect All
                          </button>
                        </div>

                        <div className="max-h-64 overflow-y-auto">
                          {filteredColumns.map((col) => (
                            <div
                              key={col}
                              className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                              onClick={() => toggleColumn(col)}
                            >
                              <div className="flex items-center justify-center w-5 h-5 mr-3 border rounded-sm border-gray-300 bg-white">
                                {tempSelectedColumns.includes(col) && (
                                  <FaCheck className="text-cyan-700 text-xs" />
                                )}
                              </div>
                              <span className="text-sm text-gray-700">{formatHeaderName(col)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Selected Columns Preview */}
                  <div className="flex flex-wrap gap-2">
                    {tempSelectedColumns.slice(0, 10).map(col => (
                      <div key={col} className="bg-gray-100 text-xs text-gray-700 px-2 py-1 rounded-md">
                        {formatHeaderName(col)}
                      </div>
                    ))}
                    {tempSelectedColumns.length > 10 && (
                      <div className="bg-gray-100 text-xs text-gray-700 px-2 py-1 rounded-md">
                        +{tempSelectedColumns.length - 10} more
                      </div>
                    )}
                  </div>

                  {/* Column Filters */}
                  <div className="mt-6">
                  
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {tempSelectedColumns.map(col => {
                        const uniqueValues = getUniqueColumnValues(col);
                        if (uniqueValues.length <= 1) return null; // Don't show filters for columns with no variation

                        return (
                          <div key={col} className="flex flex-col space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                              Filter by {formatHeaderName(col)}
                            </label>
                            <select
                              value={columnFilters[col] || "All"}
                              onChange={(e) => handleColumnFilterChange(col, e.target.value === "All" ? null : e.target.value)}
                              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition appearance-none bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+')] bg-no-repeat bg-[center_right_0.5rem] bg-[length:1rem]"
                            >
                              <option value="All">All</option>
                              {uniqueValues.map(value => (
                                <option key={value} value={value}>
                                  {value || "(Empty)"}
                                </option>
                              ))}
                            </select>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Apply Button */}
                  <div className="pt-2">
                    <button
                      onClick={applyColumnSelection}
                      className="bg-cyan-700 hover:bg-cyan-800 text-white px-6 py-2 rounded-md shadow-md hover:shadow-lg transition-all duration-200 font-medium"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Table */}
          {dataLoaded && (
            <div className="overflow-x-auto mt-6 shadow-lg rounded-lg border border-gray-200">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {selectedColumns.map((col) => (
                      <th
                        key={col}
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100 transition"
                        onClick={() => requestSort(col)}
                      >
                        <div className="flex items-center justify-between">
                          {formatHeaderName(col)}
                          {sortConfig.key === col ? (
                            sortConfig.direction === 'ascending' ? (
                              <FaSortUp className="ml-1 text-cyan-700" />
                            ) : (
                              <FaSortDown className="ml-1 text-cyan-700" />
                            )
                          ) : (
                            <FaSort className="ml-1 text-gray-400" />
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sortedAndFilteredData.length > 0 ? (
                    sortedAndFilteredData.slice((pageNumber - 1) * pageSize, pageNumber * pageSize).map((row, rowIndex) => (
                      <tr 
                        key={rowIndex} 
                        className={rowIndex % 2 === 0 ? 'bg-white hover:bg-gray-50' : 'bg-gray-50 hover:bg-gray-100'}
                      >
                        {selectedColumns.map((col) => (
                          <td
                            key={col}
                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                          >
                            {row[col] ?? "-"}
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={selectedColumns.length} className="px-6 py-4 text-center text-sm text-gray-500">
                        No records found matching your filters
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* Download Button */}
          <div className="flex justify-end mt-4">
            <button
              onClick={handleDownload}
              className="bg-cyan-700 hover:bg-cyan-800 text-white px-6 py-2 rounded-md shadow-md hover:shadow-lg transition-all duration-200 font-medium flex items-center space-x-2"
            >
              <FaDownload className="text-sm" />
              <span>Download Full Report</span>
            </button>
          </div>

          {/* Pagination */}
          {sortedAndFilteredData.length > 0 && (
            <div className="flex flex-col sm:flex-row justify-between items-center mt-6 bg-white p-4 rounded-lg shadow border border-gray-200">
              <div className="mb-2 sm:mb-0">
                <span className="text-sm text-gray-700">
                  Showing <span className="font-medium">{(pageNumber - 1) * pageSize + 1}</span> to{' '}
                  <span className="font-medium">{Math.min(pageNumber * pageSize, sortedAndFilteredData.length)}</span> of{' '}
                  <span className="font-medium">{sortedAndFilteredData.length}</span> results
                </span>
              </div>
              
              <div className="flex items-center space-x-1 mb-2 sm:mb-0">
                <button
                  onClick={() => handlePageChange(Math.max(1, pageNumber - 1))}
                  disabled={pageNumber === 1}
                  className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {"<"}
                </button>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (pageNumber <= 3) {
                    pageNum = i + 1;
                  } else if (pageNumber >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = pageNumber - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`px-3 py-1 border rounded-md text-sm font-medium ${
                        pageNumber === pageNum 
                          ? 'bg-cyan-700 text-white border-cyan-700' 
                          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                      } transition`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                
                {totalPages > 5 && pageNumber < totalPages - 2 && (
                  <span className="px-2 text-gray-500">...</span>
                )}
                
                {totalPages > 5 && pageNumber < totalPages - 2 && (
                  <button
                    onClick={() => handlePageChange(totalPages)}
                    className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
                  >
                    {totalPages}
                  </button>
                )}
                
                <button
                  onClick={() => handlePageChange(Math.min(totalPages, pageNumber + 1))}
                  disabled={pageNumber === totalPages}
                  className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                  {">"}
                </button>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">Rows per page:</span>
                <select
                  value={pageSize}
                  onChange={handlePageSizeChange}
                  className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition appearance-none bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+')] bg-no-repeat bg-[center_right_0.5rem] bg-[length:1rem]"
                >
                  {[10, 20, 30, 50, 100].map((size) => (
                    <option key={size} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}
        </>
      ) : (
        <p className="text-gray-500">No filters found for this scenario.</p>
      )}
    </div>
  );
};

export default Report;