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
  REQUEST: "CONNECT",
  DISCONNECT: "DISCONNECT",
  "CANCEL-REQUEST": "CANCEL REQUEST",
  ACCEPT: "ACCEPT REQUEST",
};

const followAction: { [key in Follow]: Follow } = {
  "UN-FOLLOW": "FOLLOW",
  FOLLOW: "UN-FOLLOW",
};

const followButtonName: { [key in Follow]: string } = {
  "UN-FOLLOW": "UNFOLLOW",
  FOLLOW: "FOLLOW",
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
  const handleFollow = (actionFollow: Follow) => {
    setFollowStatus(followAction[actionFollow]);
    connectWithNewUser(profileAuthorUid, actionFollow);
  };
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Button
        onClick={() => handleRequest(currUserRelationWithAuthor!)}
        sx={{
          borderRadius: "25px",
          px: 2,
          width: "160px",
          fontSize: "13px",
          mb: 1,
          outline: "none !important",
        }}
        color="secondary"
        variant="outlined"
      >
        {requestButtonName[currUserRelationWithAuthor!]}
      </Button>
      <Button
        onClick={() => handleFollow(currentUserFollowStatusWithAuthor)}
        sx={{
          borderRadius: "25px",

          px: 2,
          width: "160px",
          fontSize: "13px",

          outline: "none !important",
        }}
        color="secondary"
        variant="outlined"
      >
        {followButtonName[currentUserFollowStatusWithAuthor]}
      </Button>
    </Box>
  );
}
