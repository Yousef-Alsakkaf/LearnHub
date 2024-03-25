import socket from "@/socket";
import { JaaSMeeting } from "@jitsi/react-sdk";
import { useEffect, useState } from "react";

function CourseVideoCall() {
  console.log("reached here");
  const courseName = "data structure";
  const [jwt, setJwt] = useState("");

  useEffect(() => {
    socket.emit("get-jwt", {});

    socket.on("get-jwt-response", (response: any) => {
      setJwt(response[0].token);
    });

    return () => {
      socket.off("get-jwt-response");
    };
  })

  return (
    <div style={{ height: "100vh", display: "grid", flexDirection: "column" }}>
      <JaaSMeeting
        appId={"vpaas-magic-cookie-c5fe3f41ced041b2a410174bffd4a537"}
        roomName={courseName}
        jwt={jwt}
        configOverwrite={{
          disableThirdPartyRequests: true,
          disableLocalVideoFlip: true,
          backgroundAlpha: 0.5,
        }}
        interfaceConfigOverwrite={{
          VIDEO_LAYOUT_FIT: "nocrop",
          MOBILE_APP_PROMO: false,
          TILE_VIEW_MAX_COLUMNS: 4,
        }}
        // spinner = { SpinnerView }
        onApiReady={() => {
          console.log("Meeting is ready");
        }}
      />
    </div>
  );
}

export default CourseVideoCall;
