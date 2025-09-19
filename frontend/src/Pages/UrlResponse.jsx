import { Button, Container, CopyButton, Text } from "@mantine/core";
import { QRCodeSVG } from "qrcode.react";
import Service from "../utils/http";

const obj = new Service();

export default function UrlResponse(props) {
  const surl = obj.getBaseURL() + "/api/s/" + props?.response?.shortCode;

  return (
    <div>
      <Container size="xs" my={40} style={{ textAlign: "center" }}>
        <Text
          size="xl"
          fw={900}
          variant="gradient"
          gradient={{ from: "black", to: "grape", deg: 360 }}
        >
          Shortened URL:
        </Text>

        <Container bg={"blue.0"} p={10} mt={20} radius="md">
          <Text size="md">{surl}</Text>
        </Container>

        <br />

        <CopyButton mt="md" value={surl}>
          {({ copied, copy }) => (
            <Button color={copied ? "teal" : "blue"} onClick={copy}>
              {copied ? "Copied url" : "Copy url"}
            </Button>
          )}
        </CopyButton>

        <br />
        <br />
        <QRCodeSVG value={surl} size={400} />
        <br />
        <Text size="md" color="dimmed">
          Scan the QR code to visit the shortened URL.
        </Text>
      </Container>
    </div>
  );
}