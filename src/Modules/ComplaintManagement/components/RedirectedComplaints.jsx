import React, { useState } from "react";
import {
  Text,
  Button,
  Flex,
  Grid,
  Divider,
  Badge,
  Paper,
  Card,
} from "@mantine/core";

import RedirectedComplaintsDetails from "./RedirectedComplaintsDetails.jsx";
import RedirectedComplaintsChangeStatus from "./UnresComp_ChangeStatus.jsx";

function RedirectedComplaints() {
  const [activeComponent, setActiveComponent] = useState("list");
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  const complaints = [
    {
      id: 1,
      studentId: "2205BCS06",
      date: "XX/XX/20XX",
      location: "C-111",
      issue: "Not able to connect to internet because of fault in LAN port.",
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
  ];

  const handleButtonClick = (component, complaint) => {
    setActiveComponent(component);
    setSelectedComplaint(complaint);
  };

  const handleBack = () => {
    setSelectedComplaint(null);
    setActiveComponent("list");
  };

  //   const markComplaintAsRedirected = (complaintId) => {
  //     setRedirectedComplaints((prev) => [...prev, complaintId]);
  //   };

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
            <RedirectedComplaintsDetails
              complaint={selectedComplaint}
              onBack={handleBack}
            />
          ) : activeComponent === "changeStatus" ? (
            <RedirectedComplaintsChangeStatus
              complaint={selectedComplaint}
              onBack={handleBack}
            />
          ) : (
            complaints.map((complaint) => (
              <Grid.Col span={12} key={complaint.id}>
                <Card
                  shadow="sm"
                  p="lg"
                  radius="md"
                  withBorder
                  style={{ width: "100%" }}
                >
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
                      style={{
                        cursor: "default",
                        fontWeight: "normal",
                        textAlign: "left",
                      }}
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
                      size="xs"
                      onClick={() => handleButtonClick("details", complaint)}
                    >
                      Details
                    </Button>
                    <Button
                      variant="outline"
                      size="xs"
                      onClick={() =>
                        handleButtonClick("changeStatus", complaint)
                      }
                    >
                      Change Status
                    </Button>
                    {/* 
                    {redirectedComplaints.includes(complaint.id) ? (
                      <Button variant="outline" size="xs" disabled>
                        Redirected
                      </Button>
                    ) : (
                      <Button
                        variant="outline"
                        size="xs"
                        onClick={() => handleButtonClick("redirect", complaint)}
                      >
                        Redirect
                      </Button>
                    )} */}
                  </Flex>
                </Card>
              </Grid.Col>
            ))
          )}
        </Grid>
      </Paper>
    </Grid>
  );
}

export default RedirectedComplaints;
