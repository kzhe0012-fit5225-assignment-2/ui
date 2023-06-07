import { CheckOutlined } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { useState } from "react";
import { TagEditor } from "./TagEditor";
import { ListEditor } from "./generic/ListEditor";
import { ImageTag } from "./types";

export function TagListEditor({
  defaultValue,
  onApply,
}: {
  defaultValue?: ImageTag[];
  onApply?: (tags: ImageTag[]) => void;
}) {
  const [value, setValue] = useState(
    (defaultValue ?? []).map((c, i) => ({
      ...c,
      key: `${i}`,
    }))
  );
  return (
    <Box sx={{ overflow: "auto hidden", width: "100%" }}>
      <Box sx={{ mb: 2 }}>
        <ListEditor<ImageTag & { key: string }>
          icon={null}
          value={value}
          useDelete
          useEdit={false}
          editor={(v) => <TagEditor value={v} />}
          create={() => ({
            tag: "person",
            count: 1,
          })}
          onChange={(v) => setValue(v)}
          addItemLabel="Tag"
          placeholderText="Click the button below to add a tag."
        />
      </Box>
      <Button
        variant="contained"
        startIcon={<CheckOutlined />}
        onClick={() => onApply?.(value)}
      >
        Apply Filter
      </Button>
    </Box>
  );
}
