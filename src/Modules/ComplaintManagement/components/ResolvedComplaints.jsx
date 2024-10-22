import React, { useState } from "react";
import { Card, Text, Divider, Group, Grid, Paper, Button } from "@mantine/core";
import PropTypes from "prop-types";

// Sample data for resolved complaints
const resolvedComplaints = [
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
];

function ResolvedComplaints() {
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [viewFeedback, setViewFeedback] = useState(false);

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

  return (
    <Grid mt="xl" style={{ paddingLeft: "49px", marginBottom: 0 }}>
      <Grid.Col span={12}>
        {!selectedComplaint ? (
          <Paper
            radius="md"
            px="lg"
            pt="sm"
            pb="xl"
            style={{
              borderLeft: "0.6rem solid #15ABFF",
              width: "60vw",
              minHeight: "45vh",
              maxHeight: "70vh",
              overflow: "hidden",
              marginTop: "-7px",
              marginLeft: "-7.5px",
            }}
            withBorder
            maw="1240px"
            backgroundColor="white"
          >
            <div style={{ maxHeight: "60vh", overflowY: "auto" }}>
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
                    <Text weight={500}>Complaint</Text>
                    <Text>{complaint.type}</Text>
                  </Group>
                  <Divider my="sm" />
                  <Text>
                    <strong>Student:</strong> {complaint.studentId}
                  </Text>
                  <Text>
                    <strong>Date:</strong> {complaint.date}
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
      </Grid.Col>
    </Grid>
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
        width: "60vw",
        minHeight: "45vh",
        maxHeight: "70vh",
        overflow: "hidden",
        marginBottom: "10px",
      }}
      withBorder
      maw="1240px"
      backgroundColor="white"
    >
      <div style={{ marginTop: "10px" }}>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Text weight={700} size="lg" mb="md">
            Detail
          </Text>
          <Divider my="sm" />
          <Text weight={600} mt="md">
            Complainer Details:
          </Text>
          <Text italic>
            Complainer: <strong>{complaint.studentId}</strong>
          </Text>
          <Text>
            Complainer ID: <strong>{complaint.studentId}</strong>
          </Text>
          <Divider my="sm" />
          <Text weight={600} mt="md">
            Complaint Details:
          </Text>
          <Text>
            Complaint ID: <strong>{complaint.id}</strong>
          </Text>
          <Text color="red">
            Complaint Details: <strong>{complaint.type}</strong>
          </Text>
          <Divider my="sm" />
          <Text>
            View Attachment: <strong>No Attachment available</strong>
          </Text>
          <Group position="right" mt="lg">
            <Button variant="outline" color="blue" onClick={onBack}>
              Back
            </Button>
          </Group>
        </Card>
      </div>
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
        width: "60vw",
        minHeight: "45vh",
        maxHeight: "70vh",
        overflow: "hidden",
        marginBottom: "10px",
      }}
      withBorder
      maw="1240px"
      backgroundColor="white"
    >
      <div style={{ marginTop: "10px" }}>
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Text weight={700} size="lg" mb="md">
            Feedback
          </Text>
          <Divider my="sm" />
          <Text weight={600} mt="md">
            Complainer Details:
          </Text>
          <Text italic>
            Complainer: <strong>{complaint.studentId}</strong>
          </Text>
          <Text>
            Complainer ID: <strong>{complaint.studentId}</strong>
          </Text>
          <Divider my="sm" />
          <Text weight={600} mt="md">
            Complaint Details:
          </Text>
          <Text>
            Complaint ID: <strong>{complaint.id}</strong>
          </Text>
          <Text>
            Complaint Type: <strong>{complaint.type}</strong>
          </Text>
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
      </div>
    </Paper>
  );
}

// PropTypes for ComplaintDetails
ComplaintDetails.propTypes = {
  complaint: PropTypes.shape({
    id: PropTypes.number.isRequired,
    studentId: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    feedback: PropTypes.string.isRequired,
  }).isRequired,
  onBack: PropTypes.func.isRequired,
};

// PropTypes for FeedbackDetails
FeedbackDetails.propTypes = {
  complaint: PropTypes.shape({
    id: PropTypes.number.isRequired,
    studentId: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    feedback: PropTypes.string.isRequired,
  }).isRequired,
  onBack: PropTypes.func.isRequired,
};

export default ResolvedComplaints;

ResolvedComplaints.propTypes = {};
