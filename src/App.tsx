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
  ButtonBase,
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
  alpha,
  createTheme,
} from "@mui/material";
import { delay, min } from "lodash";
import { useEffect, useRef } from "react";
import { useImageSize } from "react-image-size";
import { Parallax } from "react-parallax";
import { useHover, useWindowSize } from "usehooks-ts";
import "./App.css";
import { StackGrid, useStackGrid } from "./StackGrid";
import { TagListEditor } from "./TagListEditor";
import { ManagedModal, AppBarTitle as Title } from "./generic/Modal";
import Tilt from "react-parallax-tilt";

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
      <Tilt
        glareEnable
        glareMaxOpacity={0.4}
        glareColor="#ffffff"
        glarePosition="bottom"
        glareBorderRadius="20px"
        tiltMaxAngleX={4}
        tiltMaxAngleY={4}
      >
        <Card
          ref={ref}
          sx={{
            borderRadius: 6,
            aspectRatio: (dims?.width ?? 1) / (dims?.height ?? 1),
            boxShadow: "none",
            position: "relative",
          }}
        >
          <ButtonBase sx={{ width: "100%", height: "100%", display: "block" }}>
            <Parallax
              renderLayer={(r) => (
                <div
                  style={{
                    top: 0,
                    left: 0,
                    filter: isHover ? `blur(10px)` : "",
                    transition: "0.5s filter",
                    transform: `translateY(calc(${r * 200}px - 50%)) scale(2)`,
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
          </ButtonBase>
        </Card>
      </Tilt>
    </Box>
  );
}

const theme = createTheme({ palette: { mode: "dark" } });

function App() {
  const { width } = useWindowSize();
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
          <Box sx={{ mb: 3, mx: 4 }}>
            <Button
              variant="contained"
              startIcon={<AddOutlined />}
              sx={{ m: 1 }}
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
            <Button
              variant="contained"
              startIcon={<ImageOutlined />}
              sx={{ m: 1 }}
            >
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
        </CssBaseline>
      </ThemeProvider>
    </>
  );
}

export default App;
