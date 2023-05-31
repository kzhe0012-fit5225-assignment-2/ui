import { SearchOutlined } from "@mui/icons-material";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  CssBaseline,
  InputAdornment,
  TextField,
} from "@mui/material";
import StackGrid from "react-stack-grid";
import "./App.css";
import { runQuery } from "./runQuery";
import { UploadImageQuery } from "./types";

const demoLink =
  "https://images.unsplash.com/photo-1682687219573-3fd75f982217?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1550&q=80";

function ImageCard() {
  return (
    <Card sx={{ borderRadius: 4 }}>
      <CardMedia image={demoLink}>
        <CardContent>
          <Chip label="Sky" />
          <Chip label="Mountain" />
        </CardContent>
        <CardActions>
          <Button size="small">Edit</Button>
          <Button size="small">Delete</Button>
        </CardActions>
      </CardMedia>
    </Card>
  );
}

function App() {
  runQuery<UploadImageQuery>({ url: "asdasd" }).then(console.log);
  return (
    <>
      <CssBaseline>
        <h1>3 Images</h1>
        <TextField
          placeholder="Search"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchOutlined />
              </InputAdornment>
            ),
          }}
        ></TextField>
        <StackGrid columnWidth={300} style={{ width: "80vw" }}>
          <ImageCard />
          <ImageCard />
          <ImageCard />
          <ImageCard />
          <ImageCard />
          <ImageCard />
          <ImageCard />
          <ImageCard />
        </StackGrid>
      </CssBaseline>
    </>
  );
}

export default App;
