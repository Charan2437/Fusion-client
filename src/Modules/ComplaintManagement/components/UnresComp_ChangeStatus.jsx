import axios from "axios";
import { Textarea, Text, Button, Flex, Grid, Select } from "@mantine/core";
import { useState } from "react";
import PropTypes from "prop-types";

function UnresComp_ChangeStatus({ complaint, onBack }) {
  const [status, setStatus] = useState("");
  const [comments, setComments] = useState("");
  const host = "http://127.0.0.1:8000";
  const token = localStorage.getItem("authToken");

  if (!complaint) return null;

  const handleStatusChange = (value) => {
    setStatus(value);
  };

  const handleCommentsChange = (event) => {
    setComments(event.currentTarget.value);
  };

  const handleSubmit = async () => {
    if (!status) {
      alert("Please select an option before submitting.");
      return;
    }

    try {
      const response = await axios.post(
        `${host}/complaint/caretaker/pending/${complaint.id}/`,
        {
          yesorno: status,
          comment: comments,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      );

      if (response.data.success) {
        alert("Thank you for resolving the complaint.");
        onBack();
      }
    } catch (error) {
      console.error(
        "Error resolving the complaint:",
        error.response ? error.response.data : error.message,
      );
      alert("There was an issue submitting your response. Please try again.");
    }
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
    <Grid.Col>
      <Text size="lg" weight="bold">
        Change Status
      </Text>

      <Text size="sm" mt="1rem">
        <strong>Student ID:</strong> {complaint.complainer}
      </Text>
      <Text size="sm">
        <strong>Date:</strong> {formatDateTime(complaint.complaint_date)}
      </Text>
      <Text size="sm">
        <strong>Location:</strong> {complaint.location}
      </Text>
      <Text size="sm">
        <strong>Issue:</strong> {complaint.details}
      </Text>

      <Text mt="1rem">Has the issue been resolved?</Text>
      <Text>
        If you say no, the status of the complaint will automatically be set to
        "Declined".
      </Text>

      <Select
        label="Please select an option"
        placeholder="Choose an option"
        data={[
          { value: "Yes", label: "Yes" },
          { value: "No", label: "No" },
        ]}
        value={status}
        onChange={handleStatusChange}
        mt="1rem"
      />

      <Text mt="1rem">Any Comments</Text>
      <Textarea
        placeholder="Write your comments here"
        label="Comments"
        autosize
        minRows={2}
        maxRows={4}
        value={comments}
        onChange={handleCommentsChange}
        mt="1rem"
      />

      <Flex justify="space-between" mt="xl">
        <Button variant="outline" size="md" onClick={onBack}>
          BACK
        </Button>
        <Button variant="filled" size="md" onClick={handleSubmit}>
          Submit
        </Button>
      </Flex>
    </Grid.Col>
  );
}

UnresComp_ChangeStatus.propTypes = {
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

export default UnresComp_ChangeStatus;
