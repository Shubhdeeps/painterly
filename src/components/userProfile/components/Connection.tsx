import {
  connectWithNewUser,
  getCurrUserRelation,
} from "@/services/realtimeDB/relations";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React, { useEffect, useState } from "react";

type Request = "REQUEST" | "DISCONNECT" | "CANCEL-REQUEST" | "ACCEPT";
type Follow = "UN-FOLLOW" | "FOLLOW";

const requestAction: { [key in Request]: Request } = {
  REQUEST: "CANCEL-REQUEST",
  DISCONNECT: "REQUEST",
  "CANCEL-REQUEST": "REQUEST",
  ACCEPT: "DISCONNECT",
};

const requestButtonName: { [key in Request]: string } = {
  REQUEST: "CANCEL REQUEST",
  DISCONNECT: "REQUEST TO CONNECT",
  "CANCEL-REQUEST": "REQUEST TO CONNECT",
  ACCEPT: "DISCONNECT",
};

const followAction: { [key in Follow]: Follow } = {
  "UN-FOLLOW": "FOLLOW",
  FOLLOW: "UN-FOLLOW",
};

const followButtonName: { [key in Follow]: string } = {
  "UN-FOLLOW": "FOLLOW",
  FOLLOW: "UNFOLLOW",
};

export default function Connection({
  profileAuthorUid,
}: {
  profileAuthorUid: string;
}) {
  const [currUserRelationWithAuthor, setCurrUserRelation] =
    useState<Request | null>(null);
  const [currentUserFollowStatusWithAuthor, setFollowStatus] =
    useState<Follow>("FOLLOW");

  useEffect(() => {
    (async function () {
      const currUserRelations = await getCurrUserRelation();
      const {
        connections,
        otherUserRequests,
        requestedToConnect,
        userFollowings,
      } = currUserRelations;

      //if in curr user's following list
      if (userFollowings.includes(profileAuthorUid)) {
        setFollowStatus("UN-FOLLOW");
      }
      if (connections.includes(profileAuthorUid)) {
        return setCurrUserRelation("DISCONNECT");
      }

      if (requestedToConnect.includes(profileAuthorUid)) {
        return setCurrUserRelation("CANCEL-REQUEST");
      }

      if (otherUserRequests.includes(profileAuthorUid)) {
        return setCurrUserRelation("ACCEPT");
      }
      setCurrUserRelation("REQUEST");
    })();
  }, [profileAuthorUid]);

  if (!currUserRelationWithAuthor && !currentUserFollowStatusWithAuthor) {
    return <></>;
  }

  const handleRequest = (action: Request) => {
    setCurrUserRelation(requestAction[action]);
    connectWithNewUser(profileAuthorUid, action);
  };
  const handleFollow = (action: Follow) => {
    setFollowStatus(followAction[action]);
    connectWithNewUser(profileAuthorUid, action);
  };
  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={1}>
      <Button
        onClick={() => handleRequest(currUserRelationWithAuthor!)}
        sx={{
          borderRadius: "20px",
          px: 4,
          my: 1,
          outline: "none !important",
        }}
        color="secondary"
        variant="text"
      >
        {requestButtonName[currUserRelationWithAuthor!]}
      </Button>
      <Button
        onClick={() => handleFollow(currentUserFollowStatusWithAuthor)}
        sx={{
          borderRadius: "20px",
          px: 4,
          my: 1,
          outline: "none !important",
        }}
        color="secondary"
        variant="text"
      >
        {followButtonName[currentUserFollowStatusWithAuthor]}
      </Button>
    </Box>
  );
}
