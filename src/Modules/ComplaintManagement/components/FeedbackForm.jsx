import React, { useState } from "react";
import {
  Button,
  Flex,
  Grid,
  Loader,
  Text,
  Textarea,
  Select,
  Center,
  CheckIcon,
} from "@mantine/core";
import PropTypes from "prop-types";
import axios from "axios";

function FeedbackForm({ complaint, setSelectedComplaint }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [rating, setRating] = useState(null);
  const host = "http://127.0.0.1:8000";

  const handleBackButtonClick = () => {
    setSelectedComplaint(null);
  };

  const token = localStorage.getItem("authToken");

  const handleSubmitButtonClick = async () => {
    if (!feedback || !rating) {
      alert("Please provide feedback and a rating.");
      return;
    }

    setIsLoading(true);
    setIsSuccess(false);

    try {
      const response = await axios.post(
        `${host}/complaint/user/${complaint.id}/`,
        {
          complaint_id: complaint.id,
          feedback,
          rating,
        },
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      );

      console.log("Feedback submitted:", response.data);
      setIsSuccess(true);

      setTimeout(() => {
        setSelectedComplaint(null);
      }, 1000);
    } catch (error) {
      console.error("Error submitting feedback:", error);
      alert("Failed to submit feedback. Please try again.");
    } finally {
      setIsLoading(false);
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
    <Flex
      direction="column"
      gap="lg"
      style={{ textAlign: "left", width: "100%" }}
    >
      <Flex direction="column">
        <Text size="22px" style={{ fontWeight: "bold" }}>
          Submit Feedback
        </Text>
        <Text size="22px" style={{ fontWeight: "bold" }}>
          Complaint id: {complaint.id}
        </Text>
      </Flex>

      <Grid columns="2" style={{ width: "100%" }}>
        <Grid.Col span={1}>
          <Flex direction="column" gap="xs">
            <Text size="18px" style={{ fontWeight: "bold" }}>
              Register Date:
            </Text>
            <Text weight="300" size="18px">
              {formatDateTime(complaint.complaint_date)}
            </Text>
          </Flex>
        </Grid.Col>
        <Flex direction="column" gap="xs">
          <Text size="18px" style={{ fontWeight: "bold" }}>
            Finished Date:
          </Text>
          <Text weight="300" size="18px">
            {formatDateTime(complaint.complaint_finish)}
          </Text>
        </Flex>
      </Grid>

      <Grid columns="2" style={{ width: "100%" }}>
        <Grid.Col span={1}>
          <Flex direction="column" gap="xs">
            <Text size="18px" style={{ fontWeight: "bold" }}>
              Location:
            </Text>
            <Text weight="300" size="18px">
              {complaint.location}
            </Text>
          </Flex>
        </Grid.Col>
        <Flex direction="column" gap="xs">
          <Text size="18px" style={{ fontWeight: "bold" }}>
            Specific Location:
          </Text>
          <Text weight="300" size="18px">
            {complaint.specific_location}
          </Text>
        </Flex>
      </Grid>

      <Flex direction="column" gap="xs">
        <Text size="18px" style={{ fontWeight: "bold" }}>
          Caretaker comment on your complaint:
        </Text>
        <Text weight="300" size="18px">
          {complaint.comment || "No comment"}
        </Text>
      </Flex>

      <Flex direction="column" gap="xs">
        <Text size="18px" style={{ fontWeight: "bold" }}>
          Please fill feedback*
        </Text>
        <Textarea
          placeholder="Please fill feedback"
          required
          variant="filled"
          style={{ width: "100%" }}
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          backgroundColor="gray"
          cols={50}
          rows={3}
        />
      </Flex>

      <Flex direction="row" gap="xs">
        <Text size="18px" style={{ fontWeight: "bold" }}>
          Give some rating:
        </Text>
        <Select
          placeholder="Rating"
          size="xs"
          required
          value={rating}
          onChange={setRating}
          data={[
            { value: "1", label: "1" },
            { value: "2", label: "2" },
            { value: "3", label: "3" },
            { value: "4", label: "4" },
            { value: "5", label: "5" },
          ]}
        />
      </Flex>

      <Text size="sm" color="dimmed">
        Complaint will be registered with your User ID.
      </Text>

      <Flex direction="row-reverse" gap="xs">
        <Button
          size="sm"
          variant="filled"
          color="black"
          style={{
            width: "100px",
            backgroundColor: isSuccess ? "#2BB673" : undefined,
            color: isSuccess ? "black" : "white",
          }}
          onClick={handleSubmitButtonClick}
          disabled={isLoading || isSuccess}
        >
          {isLoading ? (
            <Center>
              <Loader color="black" size="xs" />
            </Center>
          ) : isSuccess ? (
            <Center>
              <CheckIcon size="16px" color="black" />
            </Center>
          ) : (
            "Submit"
          )}
        </Button>
        <Button
          size="sm"
          variant="filled"
          color="black"
          onClick={handleBackButtonClick}
          disabled={isLoading || isSuccess}
        >
          Back
        </Button>
      </Flex>
    </Flex>
  );
}

export default FeedbackForm;

FeedbackForm.propTypes = {
  complaint: PropTypes.shape({
    id: PropTypes.number.isRequired,
    complaint_date: PropTypes.string.isRequired,
    complaint_finish: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    specific_location: PropTypes.string.isRequired,
    comment: PropTypes.string,
  }).isRequired,
  setSelectedComplaint: PropTypes.func.isRequired,
};
