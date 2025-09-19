import { Button, Container, CopyButton, Text, Textarea } from "@mantine/core";
import Service from "../utils/http";
import { QRCodeSVG } from "qrcode.react"
const obj = new Service();

export default function UrlResponse(props) {
  const surl = obj.getBaseURL() + "/api/s/" + props?.response?.shortCode;
  return (
    <div>
      {
        <Container size="xs" my={40} style={{ textAlign: "center" }}>
          <Text
            size="xl"
            fw={900}
            variant="gradient"
            gradient={{ from: "grape", to: "grape", deg: 360 }}
          >
            Shortned URL:
          </Text>
          <Container bg={"blue.0"} p={10} mt={20} radius="md">
            <Text size="md" radius="lg">
              {surl}
            </Text>
          </Container>
          <br />
          <CopyButton mt="xl" value={surl}>
            {({ copied, copy }) => (
              <Button color={copied ? "teal" : "blue"} onClick={copy}>
                {copied ? "Copied url" : "Copy url"}
              </Button>
            )}
          </CopyButton>
          <QRCodeSVG imageSettings={{
                     excavate: true,
                     src: '/HomeBackground.png',
                     height: 100,
                     width: 100
                 }} value={surl} size={400}>
                   <Image src={'/HomeBackground.png'} />
           </QRCodeSVG>
        </Container>
      }
    </div>
  );
}