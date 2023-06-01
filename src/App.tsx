import { ThemeProvider } from "@emotion/react";
import {
  AddOutlined,
  FilterListOutlined,
  ImageOutlined,
  PersonOutline,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  CssBaseline,
  Divider,
  Fade,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  alpha,
  createTheme,
} from "@mui/material";
import { delay } from "lodash";
import { useEffect, useRef } from "react";
import { useImageSize } from "react-image-size";
import { useHover } from "usehooks-ts";
import "./App.css";
import { StackGrid, useStackGrid } from "./StackGrid";
import { TagListEditor } from "./TagListEditor";
import { ManagedModal, AppBarTitle as Title } from "./generic/Modal";
import { Parallax } from "react-parallax";

const images = [
  "https://images.unsplash.com/photo-1614597396930-cd6760b99f7c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80",
  "https://images.unsplash.com/photo-1554629947-334ff61d85dc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80",
  "https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280q=80",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80",
  "https://images.unsplash.com/photo-1505855265981-d52719d1f64e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1280&q=80",
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
          borderRadius: 6,
          aspectRatio: (dims?.width ?? 1) / (dims?.height ?? 1),
          boxShadow: "none",
          position: "relative",
        }}
      >
        <Parallax
          renderLayer={(r) => (
            <div
              style={{
                top: 0,
                left: 0,
                transform: `translateY(calc(${r * 100}px - 50%)) scale(2)`,
                position: "absolute",
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                width: "100%",
                height: "100%",
              }}
            />
          )}
          style={{ height: "100%" }}
          strength={100}
          blur={{ min: -10, max: 10 }}
        ></Parallax>
        <Fade in={isHover}>
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: alpha("#000", 0.6),
              overflow: "auto",
            }}
          >
            <CardContent>
              <Chip sx={{ p: 2.5, m: 0.5 }} clickable label="Landscape" />
              <Chip sx={{ p: 2.5, m: 0.5 }} clickable label="Clouds" />
              <Chip sx={{ p: 2.5, m: 0.5 }} clickable label="Sky" />
              <Chip sx={{ p: 2.5, m: 0.5 }} clickable label="Mountain" />
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
          <List>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <PersonOutline />
                </Avatar>
              </ListItemAvatar>
              <ListItemText>Not signed in</ListItemText>
            </ListItem>
          </List>
          <Divider />
          <Box sx={{ pt: 16 }}>
            <h1>{images.length} Images</h1>
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
                sx={{ mb: 4, mr: 2 }}
              >
                Filter by Tags
              </Button>
            )}
          >
            <Box sx={{ maxWidth: 500, margin: "auto", p: 2.5 }}>
              <TagListEditor />
            </Box>
          </ManagedModal>
          <Button
            variant="contained"
            startIcon={<ImageOutlined />}
            sx={{ mb: 4 }}
          >
            Filter by Image
          </Button>
          <StackGrid
            columnWidth={360}
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
