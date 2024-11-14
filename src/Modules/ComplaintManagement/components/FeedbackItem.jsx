import React from "react";
import { Button, Flex, Paper, Text, CheckIcon, Divider } from "@mantine/core";
import PropTypes from "prop-types";

// Helper function to format date and time
const formatDateTime = (datetimeStr) => {
  const date = new Date(datetimeStr);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}-${month}-${year}, ${hours}:${minutes}`; // Format: DD-MM-YYYY, HH:MM
};

function FeedbackItem({ complaint, setSelectedComplaint }) {
  const handleFeedbackButtonClick = () => {
    setSelectedComplaint(complaint);
  };

  return (
    <Paper
      radius="md"
      px="lg"
      pt="sm"
      pb="xl"
      style={{ width: "100%", border: "1.5px solid #000000", margin: "10px 0" }}
      withBorder
      maw="1240px"
      backgroundColor="white"
    >
      <Flex direction="column" style={{ width: "100%" }}>
        <Flex direction="row" justify="space-between" style={{ width: "100%" }}>
          <Flex
            direction="row"
            gap="xs"
            align="center"
            style={{ width: "100%", padding: "10px 0px" }}
          >
            <Text size="19px" style={{ fontWeight: "Bold" }}>
              Complaint Id: {complaint.id}
            </Text>
            <Text
              size="14px"
              style={{
                borderRadius: "50px",
                padding: "10px 20px",
                backgroundColor: "#14ABFF",
              }}
            >
              {complaint.complaint_type}
            </Text>
          </Flex>
          <CheckIcon
            size="35px"
            style={{
              color: "white",
              backgroundColor: "2BB673",
              padding: "10px",
              borderRadius: "50px",
            }}
          />
        </Flex>

        <Flex
          direction="row"
          justify="space-between"
          align="center"
          style={{ width: "100%" }}
        >
          <Flex direction="column" gap="xs">
            <Text size="15px">
              Date: {formatDateTime(complaint.complaint_date)}
            </Text>
            <Text size="15px">
              Location: {complaint.specific_location}, {complaint.location}
            </Text>
            {complaint.feedback !== "" && (
              <Text size="15px">Feedback: {complaint.feedback}</Text>
            )}
          </Flex>
          {complaint.feedback === "" && (
            <Button
              size="md"
              color="#14ABFF"
              radius="lg"
              onClick={handleFeedbackButtonClick}
            >
              Give Feedback
            </Button>
          )}
        </Flex>

        <Divider my="md" size="sm" />

        <Text size="15px">Description: {complaint.details}</Text>
      </Flex>
    </Paper>
  );
}

export default FeedbackItem;

FeedbackItem.propTypes = {
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
  }).isRequired,
  setSelectedComplaint: PropTypes.func.isRequired,
};
