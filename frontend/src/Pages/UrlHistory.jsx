import { useEffect, useState } from "react";
import {
  Container,
  Title,
  Text,
  Table,
  Group,
  Loader,
  Alert,
  Center,
  Anchor,
  Tooltip,
  Button,
  Modal,
  TextInput,
} from "@mantine/core";
import { IconAlertCircle, IconEdit, IconTrash } from "@tabler/icons-react";
import Service from "../utils/http";

// Initialize service once
const service = new Service();

function UrlHistory() {
  const [urls, setUrls] = useState([]); // store fetched URLs
  const [loading, setLoading] = useState(true); // show loader while fetching
  const [error, setError] = useState(null); // handle errors
  const [open, setOpen] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState(null);

  const editSelectedUrl = async () => {
    if (!selectedUrl) return;

    try {
      const response = await service.patch(`s/${selectedUrl.shortCode}`, {
        originalUrl: selectedUrl.originalUrl,
        title: selectedUrl.title,
      });
      // Update the URL in the local state
      setUrls((prevUrls) =>
        prevUrls.map((url) =>
          url._id === selectedUrl._id ? { ...url, ...response.url } : url
        )
      );
      setOpen(false);
    } catch (err) {
      console.error("Failed to edit URL:", err);
    }
  };
  // Fetch data on component mount
  useEffect(() => {
    async function fetchUrls() {
      try {
        setLoading(true);
        const response = await service.get("user/my/urls?page=1&limit=10");
        setUrls(response.urls || []);

        setError(null);
      } catch (err) {
        setError(err.message || "Failed to fetch URLs");
      } finally {
        setLoading(false);
      }
    }

    fetchUrls();
  }, []);

  // Loading state
  if (loading) {
    return (
      <Center mih={300}>
        <Loader size="xl" />
        <Text ml="md">Loading your short URLs...</Text>
      </Center>
    );
  }

  // Error state
  if (error) {
    return (
      <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red">
        {error}
      </Alert>
    );
  }

  // No URLs found
  if (urls.length === 0) {
    return (
      <Alert
        icon={<IconAlertCircle size={16} />}
        title="No URLs Found"
        color="blue"
        variant="light"
      >
        <Text>You haven’t created any short URLs yet.</Text>
      </Alert>
    );
  }

  // Table rows
  const rows = urls.map((url) => (
    <Table.Tr key={url._id}>
      <Table.Td>
        <Anchor
          href={url.originalUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Tooltip label={url.originalUrl} withArrow>
            <span>
              {url.originalUrl.length > 25
                ? `${url.originalUrl.slice(0, 25)}...`
                : url.originalUrl}
            </span>
          </Tooltip>
        </Anchor>
      </Table.Td>
      <Table.Td>
        <Anchor
          href={`${service.getBaseURL()}/api/s/${url.shortCode}`}
          target="_blank"
        >
          {url.shortCode}
        </Anchor>
      </Table.Td>
      <Table.Td>{url.clickCount}</Table.Td>
      <Table.Td>{new Date(url.createdAt).toLocaleDateString()}</Table.Td>
      <Table.Td>
        <Button variant="subtle" mx={10} onClick={() =>{
          setSelectedUrl(url);
          setOpen(true)
        }}>
          <IconEdit/>
        </Button>
        <Button variant="subtle" color="red">
          <IconTrash/>
        </Button>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Container size="lg" my="md">
      <Modal opened={open} onClose={() => setOpen(false)} title="Edit URL" centered>
        <TextInput label="Original URL" placeholder="Enter the original URL" value={selectedUrl ? selectedUrl.originalUrl : ''} />
        <TextInput label="Title" placeholder="Enter the title" value={selectedUrl ? selectedUrl.title : ''} mt="md"/>
        <Button fullWidth mt="md" onClick={editSelectedUrl}>Edit URL</Button>
      </Modal>
      <Group justify="space-between" align="center" mb="md">
        <Title order={3}>My Short URLs</Title>
      </Group>

      <Table
        striped
        highlightOnHover
        withTableBorder
        withColumnBorders
        c={"blue"}
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Original URL</Table.Th>
            <Table.Th>Short Link</Table.Th>
            <Table.Th>Clicks</Table.Th>
            <Table.Th>Created On</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Container>
  );
}

export default UrlHistory;