import { Textarea, Text, Button, Flex, Grid, Select } from "@mantine/core";
import { useState } from "react"; // Import useState to manage local state

const UnresComp_ChangeStatus = ({ complaint, onBack }) => {
    if (!complaint) return null; // Return null if no complaint is provided

    const [status, setStatus] = useState(""); // State for selected status
    const [comments, setComments] = useState(""); // State for comments

    // Function to handle the submission
    const handleSubmit = () => {
        // Check if the user has selected a status
        if (!status) {
            alert("Please select an option before submitting."); // Alert if no option is selected
            return; // Exit the function early
        }

        alert("Thank you for resolving the complaint");

        onBack();
    };

    return (
        <Grid.Col>
            <Text size="lg" style={{ fontWeight: 'bold' }}>Change Status</Text>
            <Text size="sm" style={{ marginTop: '1rem' }}>
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
            <Text>
                Has the issue been resolved?
            </Text>
            <Text>
                If you say no, the status of the complaint will automatically be set to "Declined".
            </Text>
            <Select
                label="Please select an option"
                placeholder="Choose an option"
                data={[
                    { value: 'yes', label: 'Yes' },
                    { value: 'no', label: 'No' },
                ]}
                value={status} // Bind the value to the state
                onChange={(value) => setStatus(value)} // Update state on selection
                style={{ marginTop: '1rem' }} // Optional spacing
            />
            <Text>Any Comments</Text>
            <Textarea
                placeholder="Write your comments here"
                label="Comments"
                autosize
                minRows={2}
                maxRows={4}
                value={comments} // Bind the value to the comments state
                onChange={(event) => setComments(event.currentTarget.value)} // Update comments state
                style={{ marginTop: '1rem' }} // Optional spacing
            />

            {/* Adding a Flex container for the buttons at the bottom */}
            <Flex justify="space-between" mt="xl"> {/* Adjusted margin-top */}
                <Button variant="outline" size="md" onClick={onBack}>BACK</Button>
                {/* The submit button calls handleSubmit when clicked */}
                <Button variant="filled" size="md" onClick={handleSubmit}>
                    Submit
                </Button>
            </Flex>
        </Grid.Col>
    );
};

export default UnresComp_ChangeStatus;
