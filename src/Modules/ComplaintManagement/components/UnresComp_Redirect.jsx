import { Button, Text, Flex } from "@mantine/core";
import { useState } from "react";
import PropTypes from "prop-types";
import { forwardComplaint } from "../routes/api"; // Import the forwarding function
import { host } from "../../../routes/globalRoutes/index";

function UnresComp_Redirect({ complaint, onBack, onForward }) {
  const [isForwarded, setIsForwarded] = useState(false);
  const [noFiles, setNoFiles] = useState(false); // Track if files are missing

  if (!complaint) return null;

  const token = localStorage.getItem("authToken");

  // Function to handle forwarding the complaint
  const handleForward = async () => {
    // Check if a file is attached before attempting to forward
    try {
      const response = await forwardComplaint(complaint.id, token);

      if (response.success) {
        const { status } = response.data;
        if (!complaint.upload_complaint) {
          alert("Complaint forwarded, but no files are attached.");
        } else {
          alert("Complaint forwarded successfully.");
        }

        setIsForwarded(true);
        if (status === 206) setNoFiles(true);
        if (onForward) onForward();
        onBack();
      } else {
        throw new Error(response.error || "Unknown error");
      }
    } catch (error) {
      console.error("Error forwarding the complaint:", error);
      alert("There was an issue forwarding the complaint.");
    }
  };

  // Function to handle viewing the attachment
  const handleViewAttachment = () => {
    if (!complaint.upload_complaint) {
      alert("No attachment found for this complaint.");
      return;
    }
    const attachmentUrl = `${host}${complaint.upload_complaint}`;
    window.open(attachmentUrl, "_blank");
  };

  return (
    <Flex direction="column" gap="xs">
      <Text size="24px" weight="bold">
        Redirect
      </Text>
      <Text mb="1rem" size="14px">
        If you want to redirect this complaint, you can pass this complaint to
        specific Incharge.
      </Text>

      <Text size="14px" weight={500}>
        <strong>Complainer ID:</strong> {complaint.complainer}
      </Text>
      <Text size="14px">
        <strong>Complaint ID:</strong> {complaint.id}
      </Text>
      <Text size="14px">
        <strong>Complaint Type:</strong>{" "}
        {complaint.complaint_type.toUpperCase()}
      </Text>
      <Text size="14px" mb="1rem">
        <strong>Location:</strong>{" "}
        {`${complaint.location}, ${complaint.specific_location}`}
      </Text>

      {/* Button to view the attachment */}
      <Flex direction="row" gap="xs" align="center">
        <Text size="14px" style={{ fontWeight: "bold" }}>
          View attachment:
        </Text>
        <Button onClick={handleViewAttachment} px={10} py={0}>
          View
        </Button>
      </Flex>

      <Flex direction="row" justify="flex-end" gap="sm">
        <Button variant="outline" color="blue" onClick={onBack}>
          BACK
        </Button>
        {isForwarded ? (
          noFiles ? (
            <Text size="md" weight={500}>
              Redirected (No files attached)
            </Text>
          ) : (
            <Text size="md" weight={500}>
              Redirected
            </Text>
          )
        ) : (
          <Button variant="outline" onClick={handleForward}>
            FORWARD
          </Button>
        )}
      </Flex>
    </Flex>
  );
}

UnresComp_Redirect.propTypes = {
  complaint: PropTypes.shape({
    id: PropTypes.number.isRequired,
    complaint_date: PropTypes.string.isRequired,
    complaint_finish: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    specific_location: PropTypes.string.isRequired,
    comment: PropTypes.string,
    complainer: PropTypes.string,
    complaint_type: PropTypes.string,
    upload_complaint: PropTypes.string, // Ensure this prop exists
  }),
  onBack: PropTypes.func.isRequired,
  onForward: PropTypes.func.isRequired,
};

export default UnresComp_Redirect;
