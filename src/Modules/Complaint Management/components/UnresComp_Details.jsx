import { Card, Text, Button, Flex, Grid, Select } from "@mantine/core";

const UnresComp_Details = ({ complaint, onBack }) => {
  if (!complaint) return null; // Return null if no complaint is provided

  return (
    <Grid.Col style={{ height: "100%" }}> {/* Ensure the column takes full height */}
      <Flex direction="column" justify="space-between" style={{ height: "100%" }}> {/* Ensures the content takes full height and spaces properly */}
        <Flex direction="column" style={{ flexGrow: 1 }}> {/* This flex will grow to take all available space */}
          <Text size="lg" style={{ fontWeight: 'bold' }}>Complaint Details</Text>
          <Text size="sm" style={{ marginTop: '1rem' }}>
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
        <Flex justify="flex-end" mt="xl"> {/* Margin top to space from content */}
          <Button variant="outline" size="md" onClick={onBack}>BACK</Button>
        </Flex>
      </Flex>
    </Grid.Col>
  );
};

export default UnresComp_Details;
