import React from "react";
import PropTypes from "prop-types"; // Import PropTypes for validation
import { Text, Button, Flex, Grid, useMantineTheme } from "@mantine/core";

function RedirectedComplaintsDetails({ complaint, onBack }) {
  const theme = useMantineTheme();

  if (!complaint) return null;

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
      style={{
        height: "100%",
        padding: theme.spacing.md,
      }}
    >
      <Grid.Col
        span={12}
        md={8}
        lg={6}
        style={{
          margin: "0 auto",
          maxWidth: "100%",
        }}
      >
        <Flex
          direction="column"
          justify="space-between"
          style={{
            height: "100%",
            gap: theme.spacing.md,
          }}
        >
          {/* Complaint Details Section */}
          <Flex direction="column" style={{ flexGrow: 1, gap: theme.spacing.xs }}>
            <Text size="lg" weight="bold">
              Complaint Details
            </Text>
            <Text size="sm">
              <strong>Complainer ID:</strong> {complaint.complainer}
            </Text>
            <Text size="sm">
              <strong>Complaint ID:</strong> {complaint.id}
            </Text>
            <Text size="sm">
              <strong>Date:</strong> {formatDateTime(complaint.complaint_date)}
            </Text>
            <Text size="sm">
              <strong>Location:</strong> {complaint.location} (
              {complaint.specific_location})
            </Text>
            <Text size="sm">
              <strong>Issue:</strong> {complaint.details}
            </Text>
          </Flex>

          {/* Action Buttons Section */}
          <Flex justify="flex-end" mt="xl" style={{ gap: theme.spacing.sm }}>
            <Button
              variant="outline"
              size="md"
              onClick={onBack}
              style={{
                flexShrink: 0,
              }}
            >
              BACK
            </Button>
          </Flex>
        </Flex>
      </Grid.Col>
    </Grid>
  );
}

// Prop type validation for the component
RedirectedComplaintsDetails.propTypes = {
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
  }),
  onBack: PropTypes.func.isRequired,
};

export default RedirectedComplaintsDetails;
