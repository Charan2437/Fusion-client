import { Textarea, Text, Button, Flex, Grid, Select } from "@mantine/core";
import { useState } from "react";
import PropTypes from "prop-types";

function UnresComp_ChangeStatus({ complaint, onBack }) {
  const [status, setStatus] = useState("");
  const [comments, setComments] = useState("");

  if (!complaint) return null;

  const handleStatusChange = (value) => {
    setStatus(value);
  };

  const handleCommentsChange = (event) => {
    setComments(event.currentTarget.value);
  };

  const handleSubmit = () => {
    if (!status) {
      alert("Please select an option before submitting.");
      return;
    }

    alert("Thank you for resolving the complaint");
    onBack();
  };

  return (
    <Grid.Col>
      <Text size="lg" weight="bold">
        Change Status
      </Text>

      <Text size="sm" mt="1rem">
        <strong>Student ID:</strong> {complaint.studentId}
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

      <Text mt="1rem">Has the issue been resolved?</Text>
      <Text>
        If you say no, the status of the complaint will automatically be set to
        "Declined".
      </Text>

      <Select
        label="Please select an option"
        placeholder="Choose an option"
        data={[
          { value: "yes", label: "Yes" },
          { value: "no", label: "No" },
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
    studentId: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    issue: PropTypes.string.isRequired,
  }),
  onBack: PropTypes.func.isRequired,
};

export default UnresComp_ChangeStatus;
