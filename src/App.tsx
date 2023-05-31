import { ThemeProvider } from "@emotion/react";
import { AddOutlined, FilterListOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  CssBaseline,
  Fade,
  Stack,
  alpha,
  createTheme,
} from "@mui/material";
import { delay, range } from "lodash";
import { useEffect, useRef } from "react";
import { useImageSize } from "react-image-size";
import { useHover } from "usehooks-ts";
import "./App.css";
import { QueryListEditor } from "./QueryListEditor";
import { StackGrid, useStackGrid } from "./StackGrid";
import { ManagedModal, AppBarTitle as Title } from "./generic/Modal";

const images = [
  "https://images.unsplash.com/photo-1614597396930-cd6760b99f7c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
  "https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=872&q=80",
  "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  "https://images.unsplash.com/photo-1505855265981-d52719d1f64e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=930&q=80",
];

function ImageCard({ image }: { image?: string }) {
  const ref = useRef(null);
  const isHover = useHover(ref);

  const stackGrid = useStackGrid();
  const [dims, state] = useImageSize(image ?? "");
  useEffect(
    () => void delay(() => stackGrid?.updateLayout(), 300),
    [state.loading, stackGrid]
  );

  return (
    <Box sx={{ padding: 1 }}>
      <Card
        ref={ref}
        sx={{
          borderRadius: 4,
          aspectRatio: (dims?.width ?? 1) / (dims?.height ?? 1),
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          boxShadow: "none",
        }}
      >
        <Fade in={isHover}>
          <Box
            sx={{
              width: "100%",
              height: "100%",
              background: alpha("#000", 0.6),
            }}
          >
            <CardContent>
              <Stack gap={1}>
                <Chip clickable label="Sky" />
                <Chip clickable label="Mountain" />
              </Stack>
            </CardContent>
            <CardActions
              sx={{
                justifyContent: "center",
              }}
            >
              <Button size="small">Edit Tags</Button>
              <Button size="small">Delete</Button>
            </CardActions>
          </Box>
        </Fade>
      </Card>
    </Box>
  );
}

const theme = createTheme({ palette: { mode: "dark" } });

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Box sx={{ pt: 16 }}>
            <h1>8 Images</h1>
          </Box>{" "}
          <Button
            variant="contained"
            startIcon={<AddOutlined />}
            sx={{ mb: 4, mr: 2 }}
          >
            Upload
          </Button>
          <ManagedModal
            appBar={{ children: <Title>Filter by Tags</Title> }}
            trigger={(open) => (
              <Button
                variant="contained"
                startIcon={<FilterListOutlined />}
                onClick={open}
                sx={{ mb: 4 }}
              >
                Filter by Tags
              </Button>
            )}
          >
            <Box sx={{ maxWidth: 500, margin: "auto", p: 2.5 }}>
              <QueryListEditor />
            </Box>
          </ManagedModal>
          <StackGrid
            columnWidth={390}
            style={{ width: "80vw", margin: "auto" }}
          >
            {images.map((k, i) => (
              <ImageCard key={i} image={k} />
            ))}
          </StackGrid>
        </CssBaseline>
      </ThemeProvider>
    </>
  );
}

export default App;
