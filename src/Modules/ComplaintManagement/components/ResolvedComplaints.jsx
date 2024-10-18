import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Card,
  Text,
  Divider,
  Container,
  Group,
  Paper,
  Button,
  Center,
  Loader,
} from "@mantine/core";
import PropTypes from "prop-types";

// Sample data for resolved complaints
/* const resolvedComplaints = [
  {
    id: 1,
    studentId: "22BCS106",
    date: "XXX/XX/20XX",
    location: "C-111",
    type: "Network Issue",
    description:
      "Not able to connect to internet because of Fault in Lan port.",
    feedback: "Resolved quickly, thanks!",
  },
  {
    id: 2,
    studentId: "22BCS107",
    date: "XXX/XX/20XX",
    location: "C-112",
    type: "Electricity Issue",
    description: "Light bulb not working in room.",
    feedback: "Issue fixed, great service!",
  },
  // Add more hardcoded complaints here
]; */

function ResolvedComplaints() {
  const token = localStorage.getItem("authToken");
  const host = "http://127.0.0.1:8000";
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [viewFeedback, setViewFeedback] = useState(false);
  const [resolvedComplaints, setResolvedComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchComplaints = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${host}/complaint/caretaker/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        console.log("Complaints fetched:", response.data);
        setResolvedComplaints(response.data);
        setIsError(false);
      } catch (error) {
        console.error("Error fetching complaints:", error);
        setIsError(true);
      }
      setIsLoading(false);
    };

    fetchComplaints();
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
    <Container>
      {!selectedComplaint ? (
        <Paper
          radius="md"
          px="lg"
          pt="sm"
          pb="xl"
          style={{
            borderLeft: "0.6rem solid #15ABFF",
            width: "70vw",
            minHeight: "45vh",
            maxHeight: "70vh",
            overflow: "hidden",
          }}
          withBorder
          maw="1240px"
          backgroundColor="white"
        >
          {isLoading || isError ? (
            <Center>
              {isLoading ? (
                <Loader size="xl" variant="bars" />
              ) : (
                <Text color="Red">
                  Failed to fetch complaints. Please try again.
                </Text>
              )}
            </Center>
          ) : (
            <div style={{ maxHeight: "50vh", overflowY: "auto" }}>
              {resolvedComplaints.map((complaint) => (
                <Card
                  shadow="sm"
                  padding="lg"
                  radius="md"
                  withBorder
                  mb="md"
                  key={complaint.id}
                >
                  <Group position="apart">
                    <Text weight={500}>Complaint id: {complaint.id}</Text>
                    <Text>{complaint.complaint_type}</Text>
                  </Group>
                  <Divider my="sm" />
                  <Text>
                    <strong>Complainer id:</strong> {complaint.complainer}
                  </Text>
                  <Text>
                    <strong>Date:</strong>{" "}
                    {formatDateTime(complaint.complaint_date)}
                  </Text>
                  <Text>
                    <strong>Location:</strong> {complaint.location}
                  </Text>
                  <Text mt="md">{complaint.description}</Text>
                  <Divider my="sm" />
                  <Group position="right">
                    <Button
                      variant="subtle"
                      onClick={() => handleDetailsClick(complaint)}
                    >
                      Details
                    </Button>
                    <Button
                      variant="subtle"
                      onClick={() => handleFeedbackClick(complaint)}
                    >
                      Feedback
                    </Button>
                  </Group>
                </Card>
              ))}
            </div>
          )}
        </Paper>
      ) : viewFeedback ? (
        <FeedbackDetails
          complaint={selectedComplaint}
          onBack={handleBackClick}
        />
      ) : (
        <ComplaintDetails
          complaint={selectedComplaint}
          onBack={handleBackClick}
        />
      )}
    </Container>
  );
}

function ComplaintDetails({ complaint, onBack }) {
  return (
    <Paper
      radius="md"
      px="lg"
      pt="sm"
      pb="xl"
      style={{
        borderLeft: "0.6rem solid #15ABFF",
        width: "70vw",
        minHeight: "45vh",
        maxHeight: "70vh",
        overflow: "hidden",
        marginBottom: "10px",
      }}
      withBorder
      maw="1240px"
      backgroundColor="white"
    >
      <Container size="md" style={{ marginTop: "20px" }}>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Text weight={700} size="lg" mb="md">
            Detail
          </Text>
          <Divider my="sm" />
          {/* <Text weight={600} mt="md">
            Complainer Details: {complaint.details}
          </Text>
          <Text italic>
            Complainer: <strong>{complaint.studentId}</strong>
          </Text> */}
          <Text>Complainer ID: {complaint.complainer}</Text>
          <Divider my="sm" />
          <Text weight={600} mt="md">
            Complaint Details:
          </Text>
          <Text>Complaint ID: {complaint.id}</Text>
          <Text color="red">Complaint Details: {complaint.complaint_type}</Text>
          <Divider my="sm" />
          <Text>View Attachment: No Attachment available</Text>
          <Group position="right" mt="lg">
            <Button variant="outline" color="blue" onClick={onBack}>
              Back
            </Button>
          </Group>
        </Card>
      </Container>
    </Paper>
  );
}

function FeedbackDetails({ complaint, onBack }) {
  return (
    <Paper
      radius="md"
      px="lg"
      pt="sm"
      pb="xl"
      style={{
        borderLeft: "0.6rem solid #15ABFF",
        width: "70vw",
        minHeight: "45vh",
        maxHeight: "70vh",
        overflow: "hidden",
        marginBottom: "10px",
      }}
      withBorder
      maw="1240px"
      backgroundColor="white"
    >
      <Container size="md" style={{ marginTop: "20px" }}>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Text weight={700} size="lg" mb="md">
            Feedback
          </Text>
          <Divider my="sm" />
          <Text weight={600} mt="md">
            Complainer Details:
          </Text>
          <Text>Complainer ID: {complaint.complainer}</Text>
          <Divider my="sm" />
          <Text weight={600} mt="md">
            Complaint Details:
          </Text>
          <Text>Complaint ID: {complaint.id}</Text>
          <Text>Complaint Type: {complaint.complaint_type}</Text>
          <Divider my="sm" />
          <Text>
            Feedback:{" "}
            <strong style={{ color: "red" }}>{complaint.feedback}</strong>
          </Text>
          <Group position="right" mt="lg">
            <Button variant="outline" color="blue" onClick={onBack}>
              Back
            </Button>
          </Group>
        </Card>
      </Container>
    </Paper>
  );
}

// PropTypes for ComplaintDetails
ComplaintDetails.propTypes = {
  complaint: PropTypes.shape({
    id: PropTypes.number.isRequired,
    complaint_type: PropTypes.string.isRequired,
    complaint_date: PropTypes.string.isRequired,
    complaint_finish: PropTypes.string,
    location: PropTypes.string.isRequired,
    specific_location: PropTypes.string.isRequired,
    details: PropTypes.string.isRequired,
    status: PropTypes.number.isRequired,
    feedback: PropTypes.string,
    comment: PropTypes.string,
    complainer: PropTypes.string,
  }).isRequired,
  onBack: PropTypes.func.isRequired,
};

// PropTypes for FeedbackDetails
FeedbackDetails.propTypes = {
  complaint: PropTypes.shape({
    id: PropTypes.number.isRequired,
    complaint_type: PropTypes.string.isRequired,
    complaint_date: PropTypes.string.isRequired,
    complaint_finish: PropTypes.string,
    location: PropTypes.string.isRequired,
    specific_location: PropTypes.string.isRequired,
    details: PropTypes.string.isRequired,
    status: PropTypes.number.isRequired,
    feedback: PropTypes.string,
    comment: PropTypes.string,
    complainer: PropTypes.string,
  }).isRequired,
  onBack: PropTypes.func.isRequired,
};

export default ResolvedComplaints;

ResolvedComplaints.propTypes = {};
