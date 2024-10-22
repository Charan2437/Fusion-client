import React, { useState } from "react";
import {
  Paper,
  Group,
  Badge,
  Text,
  Divider,
  Button,
  Stack,
  Grid,
  Title,
  ScrollArea,
} from "@mantine/core";
import detailIcon from "../../../assets/detail.png";
import declinedIcon from "../../../assets/declined.png";
import resolvedIcon from "../../../assets/resolved.png";

function ComplaintHistory() {
  const [activeTab, setActiveTab] = useState("pending");

  const complaintsData = {
    pending: [
      {
        date: "2024-10-01",
        type: "Faulty Lan Port",
        location: "Room no: C-111",
        details:
          "Not able to connect to the Internet because of a faulty LAN port.",
      },
      {
        date: "2024-10-02",
        type: "Power Issue",
        location: "Room no: D-102",
        details: "Power outage reported in the room.",
      },
      {
        date: "2024-10-03",
        type: "Water Leakage",
        location: "Room no: E-210",
        details: "Water leakage observed in bathroom.",
      },
      {
        date: "2024-10-04",
        type: "AC Malfunction",
        location: "Room no: A-101",
        details: "Air conditioner is not cooling properly.",
      },
      {
        date: "2024-10-05",
        type: "Internet Down",
        location: "Room no: B-305",
        details: "Unable to connect to the Internet for the past 3 days.",
      },
    ],
    resolved: [
      {
        date: "2024-09-20",
        type: "Noise Complaint",
        location: "Room no: B-202",
        details: "Resolved noise issue from the adjacent room.",
      },
    ],
    declined: [
      {
        date: "2024-08-10",
        type: "Internet Issue",
        location: "Room no: E-310",
        details: "Complaint declined due to insufficient information.",
      },
    ],
  };

  const getComplaints = () => complaintsData[activeTab];

  return (
    <Grid mt="xl" justify="left" style={{ paddingLeft: "49px" }}>
      <Grid.Col span={8}>
        <Paper
          padding="lg"
          shadow="sm"
          withBorder
          style={{
            borderLeft: "0.6rem solid #15ABFF",
            backgroundColor: "white",
            width: "60vw",
            maxWidth: "1240px",
            maxHeight: "66vh",
            marginTop: "-7px",
            marginLeft: "-7.5px",
            padding: "12px", // Added padding of 10px
          }}
        >
          <Title order={3} mb="md">
            Complaint History
          </Title>

          {/* Tab Menu */}
          <Group spacing="sm" mb="md">
            <Button
              variant={activeTab === "pending" ? "filled" : "outline"}
              onClick={() => setActiveTab("pending")}
            >
              Pending Complaints
            </Button>
            <Button
              variant={activeTab === "resolved" ? "filled" : "outline"}
              onClick={() => setActiveTab("resolved")}
            >
              Resolved Complaints
            </Button>
            <Button
              variant={activeTab === "declined" ? "filled" : "outline"}
              onClick={() => setActiveTab("declined")}
            >
              Declined Complaints
            </Button>
          </Group>

          {/* Scrollable Complaint List */}
          <ScrollArea style={{ height: "50vh", padding: "10px" }}>
            <Stack spacing="sm">
              {getComplaints().map((complaint, index) => (
                <Paper
                  key={index}
                  padding="md"
                  shadow="xs"
                  withBorder
                  style={{ padding: "10px" }}
                >
                  {/* Complaint Header */}
                  <Group position="apart" align="center">
                    <Text weight={500}>{complaint.type}</Text>
                    <Badge
                      color={
                        activeTab === "pending"
                          ? "yellow"
                          : activeTab === "resolved"
                            ? "green"
                            : "red"
                      }
                    >
                      {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
                    </Badge>
                    {activeTab === "pending" && (
                      <Button
                        variant="subtle"
                        onClick={() => console.log("Navigate to details page")}
                        aria-label="Details"
                      >
                        <img
                          src={detailIcon}
                          alt="Details"
                          style={{ width: "24px" }}
                        />
                      </Button>
                    )}
                    {activeTab === "resolved" && (
                      <img
                        src={resolvedIcon}
                        alt="Resolved"
                        style={{ width: "24px" }}
                      />
                    )}
                    {activeTab === "declined" && (
                      <img
                        src={declinedIcon}
                        alt="Declined"
                        style={{ width: "24px" }}
                      />
                    )}
                  </Group>

                  {/* Complaint Details */}
                  <Text mt="sm">
                    <b>Date:</b> {complaint.date}
                  </Text>
                  <Text>
                    <b>Location:</b> {complaint.location}
                  </Text>
                  <Text>
                    <b>Complaint:</b> {complaint.details.split(".")[0]}
                  </Text>

                  {/* Horizontal rule */}
                  <Divider my="md" />

                  {/* Full complaint description */}
                  <Text>{complaint.details}</Text>
                </Paper>
              ))}
            </Stack>
          </ScrollArea>
        </Paper>
      </Grid.Col>
    </Grid>
  );
}

export default ComplaintHistory;
