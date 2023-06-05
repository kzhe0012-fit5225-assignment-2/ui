import {
  AddOutlined,
  FilterListOutlined,
  ImageOutlined,
} from "@mui/icons-material";
import { Box, Button, Divider } from "@mui/material";
import { min } from "lodash";
import { useWindowSize } from "usehooks-ts";
import "./App.css";
import { ImageCard, images } from "./ImageCard";
import { StackGrid } from "./StackGrid";
import { TagListEditor } from "./TagListEditor";
import { ManagedModal, AppBarTitle as Title } from "./generic/Modal";
import { AppBar } from "./AppBar";

function App({ signOut, user }: { signOut?: () => void; user?: any }) {
  const { width } = useWindowSize();
  return (
    <>
      <AppBar signOut={signOut} user={user} />
      <Divider />
      <Box sx={{ pt: 16 }}>
        <h1>{images.length} Images</h1>
      </Box>{" "}
      <Box sx={{ mb: 3, mx: 4 }}>
        <Button variant="contained" startIcon={<AddOutlined />} sx={{ m: 1 }}>
          Upload
        </Button>
        <ManagedModal
          appBar={{ children: <Title>Filter by Tags</Title> }}
          trigger={(open) => (
            <Button
              variant="contained"
              startIcon={<FilterListOutlined />}
              onClick={open}
              sx={{ m: 1 }}
            >
              Filter by Tags
            </Button>
          )}
        >
          <Box sx={{ maxWidth: 500, margin: "auto", p: 2.5 }}>
            <TagListEditor />
          </Box>
        </ManagedModal>
        <Button variant="contained" startIcon={<ImageOutlined />} sx={{ m: 1 }}>
          Filter by Image
        </Button>
      </Box>
      <StackGrid
        columnWidth={min([360, 0.8 * width]) ?? 1}
        style={{ width: "80vw", margin: "auto" }}
      >
        {images.map((k, i) => (
          <ImageCard key={i} image={k} />
        ))}
      </StackGrid>
      <Box sx={{ p: 4 }}></Box>
    </>
  );
}

export default App;
