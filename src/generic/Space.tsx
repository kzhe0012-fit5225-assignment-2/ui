import { Box } from "@mui/material";
import { BoxProps } from "@material-ui/system";

export function Space(props: BoxProps) {
  return <Box px={0.5} display="inline-block" {...props} />;
}
