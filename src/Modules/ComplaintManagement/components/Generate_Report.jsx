import React, { useEffect, useState } from "react";
import { Paper, Badge } from "@mantine/core";
import "../styles/GenerateReport.css";
import detailIcon from "../../../assets/detail.png";
import declinedIcon from "../../../assets/declined.png";
import resolvedIcon from "../../../assets/resolved.png";

const complaintTypes = [
  "Electricity",
  "Carpenter",
  "Plumber",
  "Garbage",
  "Dustbin",
  "Internet",
  "Other",
];

const locations = [
  "Hall-1",
  "Hall-3",
  "Hall-4",
  "Nagarjun Hostel",
  "Maa Saraswati Hostel",
  "Panini Hostel",
  "LHTC",
  "CORE LAB",
  "CC1",
  "CC2",
  "Rewa Residency",
  "NR2",
];

function GenerateReport() {
  const [complaintsData, setComplaintsData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    location: "",
    complaintType: "",
    status: "",
    startDate: "",
    endDate: "",
    sortBy: "",
  });

  const fetchComplaintsData = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/complaint/generate-report`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${localStorage.getItem("authToken")}`,
          },
        },
      );

      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      console.log("Fetched data:", data);

      if (Array.isArray(data)) {
        setComplaintsData(data);
        setFilteredData(data);
      } else {
        console.error("Fetched data is not an array:", data);
        setComplaintsData([]);
        setFilteredData([]);
      }
    } catch (error) {
      console.error("Error fetching complaints data:", error);
    }
  };

  // Move applyFilters function here
  const applyFilters = () => {
    let filtered = [...complaintsData];

    // Apply location filter
    if (filters.location) {
      filtered = filtered.filter(
        (complaint) =>
          complaint.location.toLowerCase() === filters.location.toLowerCase(),
      );
    }
    // Apply complaint type filter
    if (filters.complaintType) {
      filtered = filtered.filter(
        (complaint) =>
          complaint.complaint_type.toLowerCase() ===
          filters.complaintType.toLowerCase(),
      );
    }

    // Apply status filter
    if (filters.status) {
      filtered = filtered.filter(
        (complaint) => String(complaint.status) === filters.status,
      );
    }

    // Apply date filters
    if (filters.startDate) {
      filtered = filtered.filter(
        (complaint) =>
          new Date(complaint.complaint_date) >= new Date(filters.startDate),
      );
    }

    if (filters.endDate) {
      filtered = filtered.filter(
        (complaint) =>
          new Date(complaint.complaint_date) <= new Date(filters.endDate),
      );
    }

    // Apply sorting
    if (filters.sortBy) {
      if (filters.sortBy === "status") {
        filtered.sort((a, b) => {
          // Directly compare the status values
          return a.status - b.status; // Sorting in ascending order
        });
      } else {
        filtered.sort((a, b) =>
          a[filters.sortBy].localeCompare(b[filters.sortBy]),
        );
      }
    }

    setFilteredData(filtered);
  };

  useEffect(() => {
    fetchComplaintsData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, complaintsData]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  // Format date to display only day, month, and year
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Format: MM/DD/YYYY or DD/MM/YYYY based on locale
  };

  // Status mapping should be outside of JSX
  const statusMapping = {
    0: "Pending",
    2: "Resolved",
    3: "Declined",
  };

  return (
    <div className="full-width-container">
      <div className="main-card-container" id="main-card">
        <div className="inner-card-content">
          {filteredData.length > 0 ? (
            filteredData.map((complaint, index) => {
              // Determine the displayed status
              const displayedStatus =
                complaint.status in statusMapping ? complaint.status : 0; // Default to "Pending" for unknown statuses

              return (
                <Paper
                  key={index}
                  radius="md"
                  px="lg"
                  pt="sm"
                  pb="xl"
                  className="complaint-subcard"
                  withBorder
                >
                  <div className="complaint-header-container">
                    <div className="complaint-header">
                      <span>
                        {complaint.complaint_type.charAt(0).toUpperCase() +
                          complaint.complaint_type.slice(1)}
                      </span>
                    </div>
                    <Badge
                      id="complaint-type-badge"
                      style={{ marginRight: "20px" }}
                    >
                      {complaint.complaint_type}
                    </Badge>
                    <div className="details-status-container">
                      <div className="details-section">
                        <button
                          className="status-icon-button"
                          onClick={() =>
                            console.log("Navigate to details page")
                          }
                          aria-label="Details"
                          style={{
                            background: "none",
                            border: "none",
                            padding: 0,
                          }}
                        >
                          <img
                            src={detailIcon}
                            alt="Details"
                            className="status-icon"
                          />
                        </button>
                      </div>
                      <div className="status-section">
                        {statusMapping[displayedStatus] && (
                          <img
                            src={
                              statusMapping[displayedStatus] === "Resolved"
                                ? resolvedIcon
                                : statusMapping[displayedStatus] === "Declined"
                                  ? declinedIcon
                                  : detailIcon // This line will not be reached because of the check
                            }
                            alt={statusMapping[displayedStatus]}
                            className="status-icon"
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="complaint-detail">
                    <b>Date : </b>
                    <span id="content-generate">
                      {formatDate(complaint.complaint_date)}
                    </span>
                  </div>

                  <div className="complaint-detail">
                    <b>Location : </b>
                    <span id="content-generate">{complaint.location}</span>
                  </div>

                  <div className="complaint-detail">
                    <b>Complaint : </b>
                    <span id="content">{complaint.details.split(".")[0]}</span>
                  </div>

                  {/* Horizontal rule */}
                  <div id="hr">
                    <hr />
                  </div>

                  {/* Full complaint description */}
                  <div className="complaint-detail">{complaint.details}</div>
                </Paper>
              );
            })
          ) : (
            <p>No complaints found.</p>
          )}
        </div>
      </div>

      <div className="filter-card-container">
        <h2>Filters</h2>

        <div className="filter-label">Location</div>
        <select name="location" onChange={handleFilterChange}>
          <option value="">Select Location</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>

        <div className="filter-label">Complaint Type</div>
        <select name="complaintType" onChange={handleFilterChange}>
          <option value="">Select Complaint Type</option>
          {complaintTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <div className="filter-label">Status</div>
        <select name="status" onChange={handleFilterChange}>
          <option value="">Select Status</option>
          <option value="0">Pending</option>
          <option value="2">Resolved</option>
          <option value="3">Declined</option>
        </select>

        <div className="filter-label">From Date</div>
        <input type="date" name="startDate" onChange={handleFilterChange} />

        <div className="filter-label">To Date</div>
        <input type="date" name="endDate" onChange={handleFilterChange} />

        <div className="filter-label">Sort By</div>
        <select name="sortBy" onChange={handleFilterChange}>
          <option value="">Sort by</option>
          <option value="complaint_date">Date</option>
          <option value="status">Status</option>
        </select>
      </div>
    </div>
  );
}

export default GenerateReport;
