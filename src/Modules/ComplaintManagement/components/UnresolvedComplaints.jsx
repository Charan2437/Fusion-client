import React, { useState, useEffect } from "react";
import {
  Text,
  Button,
  Flex,
  Grid,
  Divider,
  Badge,
  Paper,
  Card,
} from "@mantine/core";
import { useSelector } from "react-redux"; // Import useSelector to get role from Redux
import UnresCompDetails from "./UnresComp_Details.jsx";
import UnresCompChangeStatus from "./UnresComp_ChangeStatus.jsx";
import UnresCompRedirect from "./UnresComp_Redirect.jsx";

function UnresolvedComplaints() {
  const [activeComponent, setActiveComponent] = useState("list");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [redirectedComplaints, setRedirectedComplaints] = useState([]);

  const role = useSelector((state) => state.user.role); // Get user role from Redux store
  const host = "http://127.0.0.1:8000"; // Replace with your backend host if necessary

  // Determine the API URL based on user role
  const url = role.includes("supervisor")
    ? `${host}/complaint/supervisor/`
    : role.includes("caretaker") || role.includes("convener")
      ? `${host}/complaint/caretaker/`
      : `${host}/complaint/user/`;

  // Fetch unresolved complaints from the API based on role
  useEffect(() => {
    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("authToken")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        // Filter complaints that are unresolved (status !== 2 for unresolved complaints)
        const unresolvedComplaints = data.filter(
          (complaint) => complaint.status !== 2,
        );
        setComplaints(unresolvedComplaints);
      })
      .catch((error) => console.error("Error fetching complaints:", error));
  }, [url]); // Re-fetch data when `url` changes

  const handleButtonClick = (component, complaint) => {
    setActiveComponent(component);
    setSelectedComplaint(complaint);
  };

  const handleBack = () => {
    setSelectedComplaint(null);
    setActiveComponent("list");
  };

  const markComplaintAsRedirected = (complaintId) => {
    setRedirectedComplaints((prev) => [...prev, complaintId]);
  };

  return (
    <Paper
      radius="md"
      px="lg"
      pt="sm"
      pb="xl"
      style={{
        borderLeft: "0.6rem solid #15ABFF",
        width: "70vw",
        maxHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        overflow: "auto",
      }}
      withBorder
      maw="1240px"
      backgroundColor="white"
    >
      <Grid style={{ flexGrow: 1 }}>
        {activeComponent === "details" ? (
          <UnresCompDetails complaint={selectedComplaint} onBack={handleBack} />
        ) : activeComponent === "changeStatus" ? (
          <UnresCompChangeStatus
            complaint={selectedComplaint}
            onBack={handleBack}
          />
        ) : activeComponent === "redirect" ? (
          <UnresCompRedirect
            complaint={selectedComplaint}
            onBack={handleBack}
            onForward={() => markComplaintAsRedirected(selectedComplaint.id)}
          />
        ) : (
          complaints.map((complaint) => (
            <Grid.Col span={12} key={complaint.id}>
              <Card
                shadow="sm"
                p="lg"
                radius="md"
                withBorder
                style={{ width: "80%" }}
              >
                <Flex align="center" mb="sm">
                  <Text size="sm" style={{ fontWeight: "bold" }}>
                    Complaint
                  </Text>
                  <Badge
                    color="blue"
                    radius="xl"
                    variant="filled"
                    mx="md"
                    size="lg"
                    style={{
                      cursor: "default",
                      fontWeight: "normal",
                      textAlign: "left",
                    }}
                  >
                    {complaint.complaint_type}
                  </Badge>
                </Flex>

                <Text size="sm">Student: {complaint.complainer}</Text>
                <Text size="sm">
                  Date:{" "}
                  {new Date(complaint.complaint_date).toLocaleDateString()}
                </Text>
                <Text size="sm">
                  Location: {complaint.location} ({complaint.specific_location})
                </Text>

                <Divider my="md" size="sm" />

                <Text size="sm">{complaint.details}</Text>

                <Flex justify="flex-end" gap="sm" mt="md">
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={() => handleButtonClick("details", complaint)}
                  >
                    Details
                  </Button>
                  <Button
                    variant="outline"
                    size="xs"
                    onClick={() => handleButtonClick("changeStatus", complaint)}
                  >
                    Change Status
                  </Button>

                  {redirectedComplaints.includes(complaint.id) ? (
                    <Button variant="outline" size="xs" disabled>
                      Redirected
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={() => handleButtonClick("redirect", complaint)}
                    >
                      Redirect
                    </Button>
                  )}
                </Flex>
              </Card>
            </Grid.Col>
          ))
        )}
      </Grid>
    </Paper>
  );
}

export default UnresolvedComplaints;
