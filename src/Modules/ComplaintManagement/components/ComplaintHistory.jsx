import React, { useState, useEffect } from "react";
import { Paper, Group, Badge } from "@mantine/core";
import { useSelector } from "react-redux"; // Import useSelector to get role from Redux
import "../styles/ComplaintHistory.css";
import detailIcon from "../../../assets/detail.png";
import declinedIcon from "../../../assets/declined.png";
import resolvedIcon from "../../../assets/resolved.png";

function ComplaintHistory() {
  const [activeTab, setActiveTab] = useState("pending");
  const [complaints, setComplaints] = useState({
    pending: [],
    resolved: [],
    declined: [],
  });

  const role = useSelector((state) => state.user.role); // Get the user role from Redux
  const host = "http://127.0.0.1:8000"; // Replace with your backend host if necessary

  // Determine the API URL based on the user's role
  const url = role.includes("supervisor")
    ? `${host}/complaint/supervisor/`
    : role.includes("caretaker") || role.includes("convener")
      ? `${host}/complaint/caretaker/`
      : `${host}/complaint/user/`;

  useEffect(() => {
    // Fetch complaints from the API
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("authToken")}`, // Ensure the correct token is passed
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        // Log the fetched data to inspect its structure
        console.log("Fetched complaints data:", data);

        // Check if the data returned is an array, then filter by status
        if (Array.isArray(data)) {
          const pending = data.filter((c) => c.status === 0);
          const resolved = data.filter((c) => c.status === 2);
          const declined = data.filter((c) => c.status === 3);

          setComplaints({ pending, resolved, declined });
        } else {
          console.error("Unexpected response format:", data);
          // If the response is not an array, set empty complaints
          setComplaints({ pending: [], resolved: [], declined: [] });
        }
      })
      .catch((error) => console.error("Error fetching complaints:", error));
  }, [url]); // Re-fetch complaints when the `url` changes

  const getComplaints = () => complaints[activeTab];

  return (
    <div className="full-width-container">
      <div className="main-card-container" id="main-card">
        {/* Tab Menu */}
        <Group className="tab-menu" spacing="sm">
          {["pending", "resolved", "declined"].map((tab) => (
            <button
              key={tab}
              className={`tab-item ${activeTab === tab ? "active-tab" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {`${tab.charAt(0).toUpperCase() + tab.slice(1)} Complaints`}
            </button>
          ))}
        </Group>

        {/* Complaint List */}
        <div className="inner-card-content">
          {getComplaints().map((complaint, index) => (
            <Paper
              key={index}
              radius="md"
              px="lg"
              pt="sm"
              pb="xl"
              className="complaint-subcard"
              withBorder
            >
              <div className="complaint-header">
                <span>{complaint.complaint_type}</span>
                <Badge className="complaint-type-badge">
                  {complaint.complaint_type}
                </Badge>

                {activeTab === "pending" && (
                  <button
                    className="status-icon-button"
                    onClick={() => console.log("Navigate to details page")}
                    aria-label="Details"
                    style={{ background: "none", border: "none", padding: 0 }}
                  >
                    <img
                      src={detailIcon}
                      alt="Details"
                      className="status-icon"
                    />
                  </button>
                )}
                {activeTab === "resolved" && (
                  <img
                    src={resolvedIcon}
                    alt="Resolved"
                    className="status-icon"
                  />
                )}
                {activeTab === "declined" && (
                  <img
                    src={declinedIcon}
                    alt="Declined"
                    className="status-icon"
                  />
                )}
              </div>

              <div className="complaint-detail">
                <b>Date: </b>
                <span id="content">
                  {new Date(complaint.complaint_date).toLocaleDateString()}
                </span>
              </div>
              <div className="complaint-detail">
                <b>Location: </b> <span id="content">{complaint.location}</span>
              </div>
              <div className="complaint-detail">
                <b>Details: </b>
                <span id="content">{complaint.details}</span>
              </div>

              <div id="hr">
                <hr />
              </div>

              <div className="complaint-detail">
                <b>Remarks: </b>
                <span id="content">{complaint.remarks}</span>
              </div>
            </Paper>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ComplaintHistory;
