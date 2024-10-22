// ComplaintForm.jsx
import React, { useState } from "react";
import PropTypes from "prop-types";
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

function ComplaintForm({ onSubmit }) {
  const [complaintType, setComplaintType] = useState("");
  const [location, setLocation] = useState("");
  const [specificLocation, setSpecificLocation] = useState("");
  const [complaintDetails, setComplaintDetails] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({
      complaintType,
      location,
      specificLocation,
      complaintDetails,
      file,
    });
  };

  return (
    <Grid mt="xl" style={{ paddingLeft: "49px", marginBottom: 0 }}>
      {" "}
      {/* Set marginBottom to 0 */}
      <Paper
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
          marginBottom: 0, // Ensure Paper has no margin
        }}
        withBorder
        maw="1240px"
      >
        <Title order={3} mb="md">
          Add a new Complaint
        </Title>
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
                  "Carpenter",
                  "Plumber",
                  "Garbage",
                  "Dustbin",
                  "Internet",
                  "Other",
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
                  "Hall-1",
                  "Hall-3",
                  "Hall-4",
                  "Nagarjun Hostel",
                  "Maa Saraswati Hostel",
                  "Panini Hostel",
                  "LHTC",
                  "CORE LAB",
                  "CC1",
                  "CC2",
                  "Rewa Residency",
                  "NR2",
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
              Complaint will be registered with your User ID: 22BCS197
            </Text>
          </Group>
          <Group position="right" mt="xs">
            <Button
              type="submit"
              style={{ width: "150px" }}
              variant="filled"
              color="blue"
            >
              Submit
            </Button>
          </Group>
        </form>
      </Paper>
    </Grid>
  );
}

ComplaintForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default ComplaintForm;
