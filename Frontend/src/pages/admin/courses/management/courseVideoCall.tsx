import { JaaSMeeting } from "@jitsi/react-sdk";

function CourseVideoCall() {
  console.log("reached here");
  const courseName = "data structure";

  return (
    <div style={{ height: "100vh", display: "grid", flexDirection: "column" }}>
      <JaaSMeeting
        appId={"vpaas-magic-cookie-c5fe3f41ced041b2a410174bffd4a537"}
        roomName={courseName}
        jwt={
          "eyJraWQiOiJ2cGFhcy1tYWdpYy1jb29raWUtYzVmZTNmNDFjZWQwNDFiMmE0MTAxNzRiZmZkNGE1MzcvODMxNDBkLVNBTVBMRV9BUFAiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJqaXRzaSIsImlzcyI6ImNoYXQiLCJpYXQiOjE3MTEyOTk1MTUsImV4cCI6MTcxMTMwNjcxNSwibmJmIjoxNzExMjk5NTEwLCJzdWIiOiJ2cGFhcy1tYWdpYy1jb29raWUtYzVmZTNmNDFjZWQwNDFiMmE0MTAxNzRiZmZkNGE1MzciLCJjb250ZXh0Ijp7ImZlYXR1cmVzIjp7ImxpdmVzdHJlYW1pbmciOnRydWUsIm91dGJvdW5kLWNhbGwiOnRydWUsInNpcC1vdXRib3VuZC1jYWxsIjpmYWxzZSwidHJhbnNjcmlwdGlvbiI6dHJ1ZSwicmVjb3JkaW5nIjp0cnVlfSwidXNlciI6eyJoaWRkZW4tZnJvbS1yZWNvcmRlciI6ZmFsc2UsIm1vZGVyYXRvciI6dHJ1ZSwibmFtZSI6ImFiZHVscmFobWFuYW5hczIwIiwiaWQiOiJhdXRoMHw2NjAwNThkYjMyZWRkNWEzOTc1NWM1ZWQiLCJhdmF0YXIiOiIiLCJlbWFpbCI6ImFiZHVscmFobWFuYW5hczIwQGdtYWlsLmNvbSJ9fSwicm9vbSI6IioifQ.Lo-remHj4mUqCAD5vsyRQFqIJzoAEVWgkfIm3TwBHXI6KzJesfLA0f6cOkxFZRcAyoYaPOoXapQjxbR_objG9W8kfPf7McBP-aDDO1K6t9B_TW3G3FUL7qq0gCeO-DX5d-1rhReiI0SILniR6fV4hHo_FvnbBqv0VfqIpiJGyWbp1YpXdMwA2aEcYfeldnhw7ynRDBoIx7Z38vk0DY-TVyIRRLXbOj6A3GI-dStfltFn70EKkJ03XwREtG4ZNZJdr559yESIwdQXJfcYRsXGK0ZPHpzI3GDHHN9dtmAK80lZzM41apKmI7mSflsVxuA5y1tLV0g0kl06MyNiZGwa-Q"
        }
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
        onApiReady={(externalApi) => {
          console.log("Meeting is ready");
        }}
      />
    </div>
  );
}

export default CourseVideoCall;
