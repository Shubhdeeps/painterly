import React, { useEffect, useState } from "react";
import ModalWrapper from "./ModalWrapper";
import { Box, Typography, Button } from "@mui/material";
import { getAllAvailableMentors } from "@/services/firestore/profile/getAdvisorUsers";
import { Profile } from "@/models/Profile";
import Member from "../userProfile/components/Member";
import { mui_consts } from "@/styles/mui";
import { requestMentorForReview } from "@/services/firestore/requests/timeline";
import { Timeline } from "@/models/Timeline";

export default function RequestReviewModal({
  isOpen,
  setOpen,
  timelineData,
}: {
  isOpen: boolean;
  setOpen: Function;
  timelineData: Timeline;
}) {
  const [advisorProfiles, setAdvisorProfiles] = useState<Profile[]>([]);
  const [selectedAdvisor, setSelectedAdvisors] = useState<string[]>(
    () => timelineData.requestedTo
  );
  useEffect(() => {
    (async () => {
      const _advisorProfiles = await getAllAvailableMentors();
      setAdvisorProfiles(_advisorProfiles);
    })();
  }, []);

  if (!isOpen) {
    return <></>;
  }

  function selectOrRemoveMember(uid: string) {
    const doesIncludedALready = selectedAdvisor.includes(uid);
    if (doesIncludedALready) {
      setSelectedAdvisors((prev) => prev.filter((x) => x !== uid));
    } else {
      setSelectedAdvisors((prev) => [...prev, uid]);
    }
  }

  async function sendRequest() {
    await requestMentorForReview(timelineData, selectedAdvisor);
    setOpen(false);
  }
  console.log(selectedAdvisor);
  return (
    <ModalWrapper>
      <Box
        sx={{
          background: mui_consts.secondary,
          width: "70%",
          minWidth: "280px",
          p: 3,
          borderRadius: "12px",
        }}
      >
        <Typography>Advisors</Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            mt: "-26px",
            gap: 2,
            background: mui_consts.secondaryTransparent,
            p: 2,
            borderRadius: "12px",
          }}
        >
          {advisorProfiles.map((advisor) => {
            return (
              <Box
                sx={{
                  background: selectedAdvisor.includes(advisor.uid)
                    ? mui_consts.secondaryTransparent
                    : "none",
                  borderRadius: "12px",
                  p: 0.5,
                  px: 0.8,
                }}
                key={advisor.uid}
                onClick={() => selectOrRemoveMember(advisor.uid)}
              >
                <Member
                  disableLink
                  size="sm"
                  src={advisor.profileURL}
                  title={advisor.displayName}
                  uid={advisor.uid}
                />
              </Box>
            );
          })}
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            mt: 2,
          }}
        >
          <Button
            variant="outlined"
            sx={{
              background: mui_consts.secondary,
              py: 1,
              borderRadius: "18px",
              width: "fit-content",
              px: 5,
              color: mui_consts.fontPrimary,
              "&:hover": {
                border: `1px solid white`,
              },
              "&:focus": {
                border: "none",
                outline: "none",
              },
            }}
            onClick={() => setOpen(false)}
          >
            Cancel{" "}
          </Button>
          <Button
            variant="outlined"
            onClick={sendRequest}
            disabled={!selectedAdvisor.length}
            sx={{
              ml: 1,
              background: mui_consts.secondary,
              py: 1,
              borderRadius: "18px",
              width: "fit-content",
              px: 3,
              color: mui_consts.primary,
              "&:hover": {
                border: `1px solid ${mui_consts.primary}`,
              },
              "&:focus": {
                border: "none",
                outline: "none",
              },
            }}
          >
            Send request
          </Button>
        </Box>
      </Box>
    </ModalWrapper>
  );
}
