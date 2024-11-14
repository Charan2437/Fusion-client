import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  Paper,
  TextInput,
  Textarea,
  FileInput,
  Select,
  Button,
  Grid,
  Title,
  Text,
  Group,
} from "@mantine/core";

function ComplaintForm() {
  const host = "http://127.0.0.1:8000";
  const role = useSelector((state) => state.user.role);
  const [complaintType, setComplaintType] = useState("");
  const [location, setLocation] = useState("");
  const [specificLocation, setSpecificLocation] = useState("");
  const [complaintDetails, setComplaintDetails] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [key, setKey] = useState(0); // State to force re-render

  const resetFormFields = () => {
    setComplaintType("");
    setLocation("");
    setSpecificLocation("");
    setComplaintDetails("");
    setFile(null);
    setIsSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setIsSuccess(false);

    const token = localStorage.getItem("authToken");

    const url = role.includes("supervisor")
      ? `${host}/complaint/supervisor/lodge/`
      : role.includes("caretaker") || role.includes("convener")
        ? `${host}/complaint/caretaker/lodge/`
        : `${host}/complaint/user/`;

    const formData = new FormData();
    formData.append("complaint_type", complaintType);
    formData.append("location", location);
    formData.append("specific_location", specificLocation);
    formData.append("details", complaintDetails);
    if (file) {
      formData.append("upload_complaint", file);
    }

    try {
      const response = await axios.post(url, formData, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      setIsSuccess(true);
      console.log("Complaint registered:", response.data);

      setTimeout(() => {
        resetFormFields();
        setKey((prevKey) => prevKey + 1); // Change the key to force re-render
      }, 2000);
    } catch (error) {
      const errorResponse = error.response?.data || error.message;
      setErrorMessage(
        errorResponse.detail ||
          "Error registering complaint. Please try again.",
      );
      console.error("Error registering complaint:", errorResponse);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Grid mt="xl" style={{ paddingLeft: "49px" }}>
      <Paper
        key={key}
        radius="md"
        px="lg"
        pt="sm"
        pb="xl"
        style={{
          borderLeft: "0.6rem solid #15ABFF",
          width: "60vw",
          backgroundColor: "white",
          minHeight: "45vh",
          maxHeight: "70vh",
        }}
        withBorder
        maw="1240px"
      >
        <Title order={3} mb="md">
          Add a new Complaint
        </Title>

        {errorMessage && (
          <Text color="red" mb="md">
            {errorMessage}
          </Text>
        )}

        <form onSubmit={handleSubmit}>
          <Grid>
            <Grid.Col span={6}>
              <Select
                label="Complaint Type"
                placeholder="Select Complaint Type"
                value={complaintType}
                onChange={setComplaintType}
                data={[
                  "Electricity",
                  "carpenter",
                  "plumber",
                  "garbage",
                  "dustbin",
                  "internet",
                  "other",
                ]}
                required
                mb="md"
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Select
                label="Location"
                placeholder="Select Location"
                value={location}
                onChange={setLocation}
                data={[
                  "hall-1",
                  "hall-3",
                  "hall-4",
                  "library",
                  "computer center",
                  "core_lab",
                  "LHTC",
                  "NR2",
                  "NR3",
                  "Admin building",
                  "Rewa_Residency",
                  "Maa Saraswati Hostel",
                  "Nagarjun Hostel",
                  "Panini Hostel",
                ]}
                required
                mb="md"
              />
            </Grid.Col>
          </Grid>
          <TextInput
            label="Specific Location"
            placeholder="Room number, Floor, Block, etc."
            value={specificLocation}
            onChange={(e) => setSpecificLocation(e.target.value)}
            required
            mb="md"
          />
          <Textarea
            label="Complaint Details"
            placeholder="What is your complaint?"
            value={complaintDetails}
            onChange={(e) => setComplaintDetails(e.target.value)}
            required
            mb="md"
          />
          <FileInput
            label="Attach Files (PDF, JPEG, PNG, JPG)"
            placeholder="Choose File"
            accept=".pdf,.jpeg,.png,.jpg"
            onChange={setFile}
            mb="md"
          />
          <Group position="right" mt="lg">
            <Text size="sm" color="dimmed" align="right">
              Complaint will be registered with your User ID.
            </Text>
          </Group>
          <Group position="right" mt="xs">
            <Button
              type="submit"
              style={{
                width: "150px",
                backgroundColor: isSuccess ? "#2BB673" : undefined,
                color: isSuccess ? "black" : "white",
              }}
              variant="filled"
              color="blue"
              loading={loading}
            >
              {loading ? "Loading..." : isSuccess ? "Submitted" : "Submit"}
            </Button>
          </Group>
        </form>
      </Paper>
    </Grid>
  );
}

export default ComplaintForm;
