import React, { useState, useEffect } from "react";
import { Loader, Center, Paper, Grid, Text } from "@mantine/core";
import axios from "axios";
import FeedbackForm from "./FeedbackForm";
import FeedbackList from "./FeedbackList";

function Feedback() {
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const token = localStorage.getItem("authToken");
  const host = "http://127.0.0.1:8000";
  const [complaints, setComplaints] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchComplaints = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${host}/complaint/user/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        console.log("Complaints fetched:", response.data);
        setComplaints(response.data);
        setIsError(false);
      } catch (error) {
        console.error("Error fetching complaints:", error);
        setIsError(true);
      }
      setIsLoading(false);
    };

    fetchComplaints();
  }, [selectedComplaint]);

  const renderFormTabContent = () => {
    if (isLoading) {
      return (
        <Center>
          <Loader size="xl" variant="bars" />
        </Center>
      );
    }

    if (isError || complaints.length === 0) {
      return (
        <Center>
          {isError ? (
            <Text color="Red">
              Failed to fetch complaints. Please try again.
            </Text>
          ) : (
            <Text>No resolved complaints available</Text>
          )}
        </Center>
      );
    }

    if (selectedComplaint == null) {
      return (
        <FeedbackList
          complaints={complaints}
          setSelectedComplaint={setSelectedComplaint}
        />
      );
    }

    return (
      <FeedbackForm
        complaint={selectedComplaint}
        setSelectedComplaint={setSelectedComplaint}
      />
    );
  };

  return (
    <Grid mt="xl" style={{ paddingLeft: "49px" }}>
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
        }}
        withBorder
        maw="1240px"
        backgroundColor="white"
      >
        {renderFormTabContent()}
      </Paper>
    </Grid>
  );
}

export default Feedback;
