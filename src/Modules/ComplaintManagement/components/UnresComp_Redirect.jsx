import { Button, Text, Grid, Flex } from "@mantine/core";
import { useState } from "react";
import PropTypes from "prop-types"; // Import prop-types for type checking

function UnresComp_Redirect({ complaint, onBack, onForward }) {
  const [isForwarded, setIsForwarded] = useState(false); // State to track if the complaint is forwarded

  if (!complaint) return null; // Return null if no complaint is provided

  // Function to handle forwarding the complaint
  const handleForward = () => {
    alert("Complaint forwarded"); // Display alert
    setIsForwarded(true); // Set the state to mark as forwarded
    if (onForward) onForward(); // Call the passed-in function to update the complaint state
    if (onBack) onBack(); // Navigate back after forwarding
  };

  const { studentId, id, issue, location } = complaint; // Destructure complaint object for cleaner JSX

  return (
    <Grid.Col span={12} md={6}>
      <Text size="lg" weight="bold">
        Redirect
      </Text>
      <Text size="md" weight={500} mb="1rem">
        <strong>
          If you want to redirect this complaint, you can pass this complaint to
          a specific Incharge.
        </strong>
      </Text>

      <Text size="sm" weight={500}>
        <strong>Complainer:</strong> {studentId}
      </Text>
      <Text size="sm">
        <strong>Complaint ID:</strong> {id}
      </Text>
      <Text size="sm">
        <strong>Complaint Type:</strong> {issue}
      </Text>
      <Text size="sm">
        <strong>Location:</strong> {location}
      </Text>

      <Flex justify="space-between" mt="md" my="xl" gap="sm">
        <Button variant="outline" size="md" onClick={onBack}>
          BACK
        </Button>
        {isForwarded ? (
          <Text size="md" weight={500}>
            Redirected
          </Text> // Display "Redirected" text if forwarded
        ) : (
          <Button variant="filled" size="md" onClick={handleForward}>
            FORWARD
          </Button>
        )}
      </Flex>
    </Grid.Col>
  );
}

// Define prop types to ensure the right data is passed
UnresComp_Redirect.propTypes = {
  complaint: PropTypes.shape({
    studentId: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    issue: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
  }),
  onBack: PropTypes.func.isRequired,
  onForward: PropTypes.func.isRequired,
};

export default UnresComp_Redirect;
