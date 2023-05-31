import { Box, BoxProps } from "@mui/material";

export type FlexProps = {
  vertical?: boolean;
} & BoxProps;

export function Flex({ vertical, ...props }: FlexProps) {
  return (
    <Box
      position="relative"
      height="100%"
      width="100%"
      display="flex"
      flexDirection={vertical ? "column" : "row"}
      {...props}
    />
  );
}
