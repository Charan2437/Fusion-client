import React, { useState, useEffect } from "react";
import {
  Text,
  Button,
  Flex,
  Grid,
  Divider,
  Badge,
  Paper,
  Loader,
  Center,
} from "@mantine/core";
import { useSelector } from "react-redux";
import ComplaintDetails from "./ComplaintDetails.jsx";
import UnresCompChangeStatus from "./UnresComp_ChangeStatus.jsx";
import UnresCompRedirect from "./UnresComp_Redirect.jsx";
import { getComplaintsByRole } from "../routes/api";

function UnresolvedComplaints() {
  const [activeComponent, setActiveComponent] = useState("list");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [complaints, setComplaints] = useState([]);
  const [redirectedComplaints, setRedirectedComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const role = useSelector((state) => state.user.role);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchComplaints = async () => {
      setIsLoading(true);
      setIsError(false);
      const { success, data, error } = await getComplaintsByRole(role, token);

      if (success) {
        const unresolvedComplaints = data.filter(
          (complaint) => complaint.status === 1 || complaint.status === 0
        );
        setComplaints(unresolvedComplaints);
      } else {
        setIsError(true);
        console.error("Error fetching complaints:", error);
      }
      setIsLoading(false);
    };

    fetchComplaints();
  }, [role, token]);

  const handleButtonClick = (component, complaint) => {
    setSelectedComplaint(complaint);
    setActiveComponent(component);
  };

  const handleBack = () => {
    setSelectedComplaint(null);
    setActiveComponent("list");
  };

  const markComplaintAsRedirected = (complaintId) => {
    setRedirectedComplaints((prev) => [...prev, complaintId]);
  };

  const formatDateTime = (datetimeStr) => {
    const date = new Date(datetimeStr);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  return (
    <Grid
      mt="xl"
      style={{
        paddingInline: "5%",
        width: "100%",
      }}
    >
      <Paper
        radius="md"
        px="lg"
        pt="sm"
        pb="xl"
        style={{
          borderLeft: "0.6rem solid #15ABFF",
          backgroundColor: "white",
          minHeight: "45vh",
          maxHeight: "70vh",
          width: "100%",
          overflow: "auto",
        }}
        withBorder
      >
        <Flex direction="column">
          {isLoading ? (
            <Center style={{ flexGrow: 1 }}>
              <Loader size="xl" variant="bars" />
            </Center>
          ) : isError ? (
            <Center style={{ flexGrow: 1 }}>
              <Text color="red">Failed to fetch complaints. Please try again.</Text>
            </Center>
          ) : complaints.length === 0 ? (
            <Center style={{ flexGrow: 1 }}>
              <Text>No unresolved complaints available.</Text>
            </Center>
          ) : activeComponent === "details" ? (
            <ComplaintDetails
              complaintId={selectedComplaint.id}
              onBack={handleBack}
            />
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
              <Paper
                key={complaint.id}
                radius="md"
                px="lg"
                pt="sm"
                pb="xl"
                style={{
                  border: "1px solid #e8e8e8",
                  margin: "10px 0",
                  flexGrow: 1,
                }}
                withBorder
              >
                <Flex direction="column">
                  <Flex
                    direction="row"
                    justify="space-between"
                    align="center"
                    wrap="wrap"
                  >
                    <Text size="sm" style={{ fontWeight: "bold" }}>
                      Complaint Id: {complaint.id}
                    </Text>
                    <Badge
                      color={complaint.status === 1 ? "green" : "red"}
                      variant="filled"
                      size="lg"
                    >
                      {complaint.status === 1 ? "Redirected" : "Unresolved"}
                    </Badge>
                  </Flex>
                  <Divider my="sm" />
                  <Flex direction="row" wrap="wrap" gap="xs">
                    <Text size="sm">
                      <strong>Date:</strong> {formatDateTime(complaint.complaint_date)}
                    </Text>
                    <Text size="sm">
                      <strong>Location:</strong> {complaint.specific_location},{" "}
                      {complaint.location}
                    </Text>
                  </Flex>
                  <Divider my="sm" />
                  <Text size="sm">
                    <strong>Description:</strong> {complaint.details}
                  </Text>
                  <Flex mt="sm" justify="space-between" wrap="wrap">
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
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={() => handleButtonClick("redirect", complaint)}
                      disabled={redirectedComplaints.includes(complaint.id)}
                    >
                      {redirectedComplaints.includes(complaint.id)
                        ? "Redirected"
                        : "Redirect"}
                    </Button>
                  </Flex>
                </Flex>
              </Paper>
            ))
          )}
        </Flex>
      </Paper>
    </Grid>
  );
}

export default UnresolvedComplaints;
