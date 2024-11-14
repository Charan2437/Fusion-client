import { Button, Text, Grid, Flex } from "@mantine/core";
import { useState } from "react";

const UnresComp_Redirect = ({ complaint, onBack, onForward }) => {
    const [isForwarded, setIsForwarded] = useState(false); // State to track if the complaint is forwarded

    if (!complaint) return null;

    // Function to handle forwarding the complaint
    const handleForward = () => {
        alert("Complaint forwarded"); // Display alert
        setIsForwarded(true); // Set the state to mark as forwarded
        onForward(); // Call the passed in function to update the complaint state
        onBack(); // Navigate back after forwarding
    };

    return (
        <Grid.Col span={12} md={6}>
            <Text size="lg" style={{ fontWeight: 'bold' }}>Redirect</Text>
            <Text size="md" weight={500} style={{ marginBottom: '1rem' }}>
                <strong>If you want to redirect this complaint, you can pass this complaint to a specific Incharge.</strong>
            </Text>

            <Text size="sm" weight={500}>
                <strong>Complainer:</strong> {complaint.studentId}
            </Text>
            <Text size="sm">
                <strong>Complaint ID:</strong> {complaint.id}
            </Text>
            <Text size="sm">
                <strong>Complaint Type:</strong> {complaint.issue}
            </Text>
            <Text size="sm">
                <strong>Location:</strong> {complaint.location}
            </Text>

            <Flex justify="space-between" mt="md" my="xl" gap="sm">
                <Button variant="outline" size="md" onClick={onBack}>BACK</Button>
                {isForwarded ? (
                    <Text size="md" weight={500}>Redirected</Text> // Display "Redirected" text if forwarded
                ) : (
                    <Button variant="filled" size="md" onClick={handleForward}>
                        FORWARD
                    </Button>
                )}
            </Flex>
        </Grid.Col>
    );
};

export default UnresComp_Redirect;
