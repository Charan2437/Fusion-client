import React from "react";
import PropTypes from "prop-types"; // Import PropTypes for validation
import { Text, Button, Flex, Grid } from "@mantine/core";

function RedirectedComplaintsDetails({ complaint, onBack }) {
  if (!complaint) return null; // Return null if no complaint is provided

  return (
    <Grid.Col style={{ height: "100%" }}>
      {" "}
      {/* Ensure the column takes full height */}
      <Flex
        direction="column"
        justify="space-between"
        style={{ height: "100%" }}
      >
        <Flex direction="column" style={{ flexGrow: 1 }}>
          <Text size="lg" weight="bold">
            {" "}
            {/* Use the Mantine `weight` prop */}
            Complaint Details
          </Text>
          <Text size="sm" mt="1rem">
            {" "}
            {/* Use Mantine's `mt` for margin-top */}
            <strong>Complainer:</strong> Student Name
          </Text>
          <Text size="sm">
            <strong>Complainer ID:</strong> {complaint.studentId}
          </Text>
          <Text size="sm">
            <strong>Complaint ID:</strong> 007
          </Text>
          <Text size="sm">
            <strong>Date:</strong> {complaint.date}
          </Text>
          <Text size="sm">
            <strong>Location:</strong> {complaint.location}
          </Text>
          <Text size="sm">
            <strong>Issue:</strong> {complaint.issue}
          </Text>
        </Flex>

        {/* Flex container for the buttons, anchored at the bottom */}
        <Flex justify="flex-end" mt="xl">
          {" "}
          {/* Margin top to space from content */}
          <Button variant="outline" size="md" onClick={onBack}>
            BACK
          </Button>
        </Flex>
      </Flex>
    </Grid.Col>
  );
}

// Prop type validation for the component
RedirectedComplaintsDetails.propTypes = {
  complaint: PropTypes.shape({
    studentId: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    issue: PropTypes.string.isRequired,
  }),
  onBack: PropTypes.func.isRequired, // Validation for the onBack function
};

export default RedirectedComplaintsDetails;
