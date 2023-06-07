import {
  AddOutlined,
  CloseOutlined,
  FilterListOutlined,
  ImageOutlined,
  RefreshOutlined,
} from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import { API, Auth } from "aws-amplify";
import { fileDialog as file } from "file-select-dialog";
import { cloneDeep, isEmpty, map, min } from "lodash";
import pluralize from "pluralize";
import { useCallback, useEffect, useState } from "react";
import { useWindowSize } from "usehooks-ts";
import "./App.css";
import { AppBar } from "./AppBar";
import { ImageCard } from "./ImageCard";
import { StackGrid } from "./StackGrid";
import { TagListEditor } from "./TagListEditor";
import { apiName as api } from "./config";
import { ManagedModal, AppBarTitle as Title } from "./generic/Modal";
import { useSnackbar } from "./generic/Snackbar";

function ext(s: string) {
  return s.split(".").pop();
}

const toBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () =>
      resolve(`${reader.result}`.replace(/^data:image\/[a-z]+;base64,/, ""));
    reader.onerror = reject;
  });

const call = async (path: string, body: any) => {
  const token = (await Auth.currentSession()).getIdToken().getJwtToken();
  return await API.post(api, path, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: "Bearer " + token,
    },
    body,
  });
};

const defaultQuery = {
  type: "find-image-by-tags",
  payload: {},
};
function App({ signOut, user }: { signOut?: () => void; user?: any }) {
  resetPath();
  type Query = {
    type: string;
    payload: any;
  };

  const [query, setQuery] = useState<Query>(defaultQuery);
  const [[currentQuery, results], setResults] = useState<[Query, any[]]>([
    { type: "", payload: {} },
    [],
  ]);

  const refresh = useCallback(async () => {
    setQuery(cloneDeep(query));
  }, [query]);

  // Reactive
  useEffect(() => {
    call(`/${query.type}`, query.payload).then((results) => {
      setResults([query, results]);
    });
  }, [query]);
  // Polling
  useEffect(() => {
    const interval = setInterval(refresh, 10000);
    return () => clearInterval(interval);
  }, [refresh]);

  const enqueue = useSnackbar();
  const { width } = useWindowSize();
  return (
    <Box sx={{ my: -8, minHeight: "100vh" }}>
      <AppBar signOut={signOut} user={user} />
      <Divider />
      <Box sx={{ pt: 16 }}>
        <h1>
          {query === currentQuery ? (
            <>
              {pluralize("Image", (results ?? []).length, true)}{" "}
              {!isEmpty(query.payload)
                ? query.type === "find-image-by-tags" &&
                  !isEmpty(query.payload.tags)
                  ? `with ${map(query.payload.tags, ({ count, tag }) =>
                      pluralize(tag, count, true)
                    ).join(", ")}`
                  : ""
                : ""}
            </>
          ) : (
            <CircularProgress />
          )}
        </h1>
      </Box>{" "}
      <Box sx={{ mb: 3, mx: 4 }}>
        <Button
          variant="contained"
          startIcon={<AddOutlined />}
          sx={{ m: 1 }}
          onClick={async () => {
            const f = await file({
              accept: [".jpg", ".png"],
              strict: true,
            });
            if (f) {
              enqueue("Uploading...");
              await call("/upload-to-s3", {
                image: await toBase64(f),
                type: ext(f.name),
              });
              enqueue(`Uploaded ${f.name}, detection results show up soon`);
            }
          }}
        >
          Upload
        </Button>
        <ManagedModal
          appBar={{
            children: <Title>Filter by Tags</Title>,
          }}
          trigger={(open) => (
            <Button
              variant="contained"
              startIcon={<FilterListOutlined />}
              onClick={open}
              sx={{
                m: 1,
              }}
            >
              Filter by Tags
            </Button>
          )}
        >
          {({ close }) => (
            <Box
              sx={{
                maxWidth: 500,
                margin: "auto",
                p: 2.5,
              }}
            >
              <TagListEditor
                defaultValue={
                  query.type === "find-image-by-tags"
                    ? query.payload?.tags
                    : undefined
                }
                onApply={(v) => {
                  close();
                  return setQuery({
                    type: "find-image-by-tags",
                    payload: { tags: v },
                  });
                }}
              />
            </Box>
          )}
        </ManagedModal>
        <Button variant="contained" startIcon={<ImageOutlined />} sx={{ m: 1 }}>
          Filter by Image
        </Button>
        {!isEmpty(query.payload) && (
          <Button
            variant="text"
            startIcon={<CloseOutlined />}
            sx={{ m: 1 }}
            onClick={() => setQuery(defaultQuery)}
          >
            Clear Filters
          </Button>
        )}
        <Button
          variant="text"
          startIcon={<RefreshOutlined />}
          sx={{ m: 1 }}
          onClick={refresh}
        >
          Refresh
        </Button>
      </Box>
      {results?.length ? (
        <StackGrid
          columnWidth={min([360, 0.8 * width]) ?? 1}
          style={{ width: "80vw", margin: "auto" }}
        >
          {(results ?? []).map(({ key, url, tags, author }) => (
            <ImageCard
              key={key}
              image={url}
              tags={tags}
              author={author}
              setQuery={(type, payload) => setQuery({ type, payload })}
            />
          ))}
        </StackGrid>
      ) : (
        <Typography sx={{ p: 8 }} color="textSecondary">
          You have no images. Click + UPLOAD to upload a new image.
        </Typography>
      )}
      <Box sx={{ p: 4 }}></Box>
    </Box>
  );
}

export default App;
function resetPath() {
  window.history.replaceState(
    {},
    document.title,
    window.location.origin + window.location.pathname
  );
}
