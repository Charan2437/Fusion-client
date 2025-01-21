import React, { useState, useEffect } from "react";
import {
  Text,
  Divider,
  Group,
  Paper,
  Button,
  Center,
  Loader,
  Grid,
  Flex,
} from "@mantine/core";
import PropTypes from "prop-types";
import ComplaintDetails from "./ComplaintDetails";
import { getComplaintsByRole } from "../routes/api"; // Import the API function

function ResolvedComplaints() {
  const token = localStorage.getItem("authToken");
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [viewFeedback, setViewFeedback] = useState(false);
  const [resolvedComplaints, setResolvedComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchResolvedComplaints = async () => {
      setIsLoading(true);
      try {
        const response = await getComplaintsByRole("caretaker", token); // Use the API function
        if (response.success) {
          const filteredComplaints = response.data.filter(
            (complaint) => complaint.status === 2
          );
          setResolvedComplaints(filteredComplaints);
          setIsError(false);
        } else {
          throw new Error(response.error);
        }
      } catch (error) {
        console.error("Error fetching complaints:", error);
        setIsError(true);
      }
      setIsLoading(false);
    };

    fetchResolvedComplaints();
  }, []);

  const handleDetailsClick = (complaint) => {
    setSelectedComplaint(complaint);
    setViewFeedback(false);
  };

  const handleFeedbackClick = (complaint) => {
    setSelectedComplaint(complaint);
    setViewFeedback(true);
  };

  const handleBackClick = () => {
    setSelectedComplaint(null);
    setViewFeedback(false);
  };

  const formatDateTime = (datetimeStr) => {
    const date = new Date(datetimeStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}-${month}-${year}, ${hours}:${minutes}`; // Format: DD-MM-YYYY HH:MM
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
          overflow: "auto",
          width: "100%",
        }}
        withBorder
      >
        {!selectedComplaint ? (
          <div>
            {isLoading ? (
              <Center>
                <Loader size="xl" variant="bars" />
              </Center>
            ) : isError ? (
              <Center>
                <Text color="Red">
                  Failed to fetch complaints. Please try again.
                </Text>
              </Center>
            ) : (
              <div style={{ overflowY: "auto" }}>
                <Grid gutter="sm">
                  {resolvedComplaints.map((complaint) => (
                    <Grid.Col xs={12} sm={6} lg={4} key={complaint.id}>
                      <Paper
                        radius="md"
                        px="lg"
                        pt="sm"
                        pb="xl"
                        style={{
                          border: "1px solid #e8e8e8",
                          margin: "10px 0",
                        }}
                        withBorder
                      >
                        <Group position="apart">
                          <Text size="sm" style={{ fontWeight: "bold" }}>
                            Complaint Id: {complaint.id}
                          </Text>
                          <Text
                            size="sm"
                            style={{
                              borderRadius: "50px",
                              padding: "5px 10px",
                              backgroundColor: "#14ABFF",
                              color: "white",
                            }}
                          >
                            {complaint.complaint_type.toUpperCase()}
                          </Text>
                        </Group>
                        <Flex direction="column" gap="xs" mt="md">
                          <Text size="sm">
                            <strong>Date:</strong>{" "}
                            {formatDateTime(complaint.complaint_date)}
                          </Text>
                          <Text size="sm">
                            <strong>Location:</strong>{" "}
                            {complaint.specific_location}, {complaint.location}
                          </Text>
                        </Flex>
                        <Divider my="sm" />
                        <Flex direction="row" justify="space-between">
                          <Text size="sm">
                            <strong>Description:</strong> {complaint.details}
                          </Text>
                          <Flex direction="row" gap="xs" ml="auto">
                            <Button
                              variant="outline"
                              size="xs"
                              onClick={() => handleDetailsClick(complaint)}
                            >
                              Details
                            </Button>
                            <Button
                              variant="outline"
                              size="xs"
                              onClick={() => handleFeedbackClick(complaint)}
                            >
                              Feedback
                            </Button>
                          </Flex>
                        </Flex>
                      </Paper>
                    </Grid.Col>
                  ))}
                </Grid>
              </div>
            )}
          </div>
        ) : viewFeedback ? (
          <FeedbackDetails
            complaint={selectedComplaint}
            onBack={handleBackClick}
          />
        ) : (
          <ComplaintDetails
            complaintId={selectedComplaint.id}
            onBack={handleBackClick}
          />
        )}
      </Paper>
    </Grid>
  );
}

export default ResolvedComplaints;
