import { Card, Text, Button, Flex, Grid, Divider, Badge, Paper } from "@mantine/core";
import { IconEdit, IconPlus } from "@tabler/icons-react";
import { useState } from "react";

import UnresComp_Details from "./UnresComp_Details.jsx";
import UnresComp_ChangeStatus from "./UnresComp_ChangeStatus.jsx";
import UnresComp_Redirect from "./UnresComp_Redirect.jsx";

const UnresolvedComplaints = () => {
  const [activeComponent, setActiveComponent] = useState("list"); // Default to list view
  const [selectedComplaint, setSelectedComplaint] = useState(null); // To store the currently selected complaint for detail viewing
  const [redirectedComplaints, setRedirectedComplaints] = useState([]); // Track redirected complaints

  const complaints = [
    {
      id: 1,
      studentId: "2205BCS06",
      date: "XX/XX/20XX",
      location: "C-111",
      issue: "Not able to connect to internet because of Fault in Lan port.",
    },
    {
      id: 2,
      studentId: "2205BCS06",
      date: "XX/XX/20XX",
      location: "C-112",
      issue: "Wi-Fi connection dropping frequently.",
    },
    {
      id: 3,
      studentId: "2205BCS06",
      date: "XX/XX/20XX",
      location: "C-113",
      issue: "Printer not working in the lab.",
    },
    {
      id: 4,
      studentId: "2205BCS06",
      date: "XX/XX/20XX",
      location: "C-114",
      issue: "Air conditioning not functioning.",
    },
  ];

  // Function to handle different button clicks
  const handleButtonClick = (component, complaint = null) => {
    setActiveComponent(component);
    setSelectedComplaint(complaint); 
  };

  // Function to handle "Back" button in details view
  const handleBack = () => {
    setSelectedComplaint(null); // Reset selected complaint
    setActiveComponent("list"); // Switch back to list view
  };

  // Function to mark a complaint as redirected
  const markComplaintAsRedirected = (complaintId) => {
    setRedirectedComplaints([...redirectedComplaints, complaintId]);
  };

  return (
    <Paper
      radius="md"
      px="lg"
      pt="sm"
      pb="xl"
      style={{
        borderLeft: "0.6rem solid #15ABFF",
        width: "70vw",
        maxHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        overflow: "auto",
      }}
      withBorder
      maw="1240px"
      backgroundColor="white"
    >
      <Grid style={{ flexGrow: 1 }}>
        {activeComponent === "details" ? (
          <UnresComp_Details complaint={selectedComplaint} onBack={handleBack} />
        ) : activeComponent === "changeStatus" ? (
          <UnresComp_ChangeStatus complaint={selectedComplaint} onBack={handleBack}/>
        ) : activeComponent === "redirect" ? (
          <UnresComp_Redirect
            complaint={selectedComplaint}
            onBack={handleBack}
            onForward={() => markComplaintAsRedirected(selectedComplaint.id)}
          />
        ) : (
          // Render complaints list if no other component is active
          complaints.map((complaint) => (
            <Grid.Col span={12} key={complaint.id}>
              <Card shadow="sm" p="lg" radius="md" withBorder width="80%">
                <Flex align="center" mb="sm">
                  <Text size="sm" style={{ fontWeight: "bold" }}>
                    Complaint
                  </Text>
                  <Badge
                    color="blue"
                    radius="xl"
                    variant="filled"
                    mx="md"
                    size="lg"
                    style={{ cursor: "default", fontWeight: "normal", textAlign: "left" }}
                  >
                    Complaint Type
                  </Badge>
                </Flex>
                <Text size="sm">Student: {complaint.studentId}</Text>
                <Text size="sm">Date: {complaint.date}</Text>
                <Text size="sm">Location: {complaint.location}</Text>
                <Divider my="md" size="sm" />
                <Text size="sm">{complaint.issue}</Text>

                <Flex justify="flex-end" gap="sm" mt="md">
                  <Button
                    variant="outline"
                    leftIcon={<IconEdit size={16} />}
                    size="xs"
                    onClick={() => handleButtonClick("details", complaint)} 
                  >
                    <Text style={{ fontFamily: "Manrope" }}>Details</Text>
                  </Button>
                  <Button
                    leftIcon={<IconEdit size={16} />}
                    variant="outline"
                    size="xs"
                    onClick={() => handleButtonClick("changeStatus", complaint)} 
                  >
                    <Text style={{ fontFamily: "Manrope" }}>Change Status</Text>
                  </Button>
                  {redirectedComplaints.includes(complaint.id) ? (
                    <Button
                      leftIcon={<IconPlus size={16} />}
                      variant="outline"
                      size="xs"
                      disabled
                      style={{ cursor: "default", color: "gray" }} // Styled to match other buttons but disabled
                    >
                      <Text style={{ fontFamily: "Manrope" }}>Redirected</Text>
                    </Button>
                  ) : (
                    <Button
                      leftIcon={<IconPlus size={16} />}
                      variant="outline"
                      size="xs"
                      onClick={() => handleButtonClick("redirect", complaint)} 
                    >
                      <Text style={{ fontFamily: "Manrope" }}>Redirect</Text>
                    </Button>
                  )}
                </Flex>
              </Card>
            </Grid.Col>
          ))
        )}
      </Grid>
    </Paper>
  );
};

export default UnresolvedComplaints;
