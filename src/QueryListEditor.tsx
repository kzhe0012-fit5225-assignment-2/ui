import { Box } from "@mui/material";
import { debounce } from "lodash";
import { QueryEditor } from "./QueryEditor";
import { ListEditor } from "./generic/ListEditor";
import { ImageTag } from "./types";

export function QueryListEditor() {
  return (
    <Box sx={{ overflow: "auto hidden", width: "100%" }}>
      <Box sx={{ mb: 2 }}>
        <ListEditor<ImageTag & { key: string }>
          icon={null}
          value={[]}
          useDelete
          useEdit={false}
          editor={(v) => <QueryEditor value={v} />}
          create={() => ({
            tag: "person",
            count: 1,
          })}
          onChange={debounce((v) => {}, 1000)}
          addItemLabel="Tag"
          placeholderText="Click the button below to add a tag."
        />
      </Box>
    </Box>
  );
}
