import { TextField } from "@mui/material";
import { Flex } from "./generic/Flex";
import { Space } from "./generic/Space";
import { ImageTag } from "./types";
import { max } from "lodash";

type QueryEditorProps = {
  value: ImageTag;
  onValueChange?: (v: ImageTag) => void;
  properties?: string[];
};

export function TagEditor({
  value,
  onValueChange: onChange,
}: QueryEditorProps) {
  function handleChange(next: Partial<ImageTag>) {
    onChange?.({ ...value, ...next });
  }
  return (
    <Flex sx={{ mt: 1 }}>
      <TextField
        label="Tag"
        placeholder="Tag"
        sx={{ minWidth: 160 }}
        onChange={(e) => handleChange({ tag: e.target.value })}
        value={value.tag}
      />
      <Space />
      <TextField
        label="Count"
        placeholder="Count"
        type="number"
        sx={{
          minWidth: 140,
        }}
        onChange={(e) =>
          handleChange({ count: max([+e.target.value || 0, 0]) })
        }
        value={`${value.count}`}
      />
    </Flex>
  );
}
