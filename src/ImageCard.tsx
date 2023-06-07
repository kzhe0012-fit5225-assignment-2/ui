import {
  Box,
  Button,
  ButtonBase,
  Card,
  CardActions,
  CardContent,
  Chip,
  Fade,
  Tooltip,
  Typography,
  alpha,
} from "@mui/material";
import { Dictionary, delay, entries, startCase } from "lodash";
import pluralize from "pluralize";
import { useEffect, useRef } from "react";
import { useImageSize } from "react-image-size";
import { Parallax } from "react-parallax";
import Tilt from "react-parallax-tilt";
import { useHover } from "usehooks-ts";
import { useStackGrid } from "./StackGrid";

export function ImageCard({
  image,
  tags = {},
  setQuery,
}: {
  image?: string;
  tags?: Dictionary<number>;
  author?: string;
  setQuery?: (type: string, payload: any) => void;
}) {
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
                  {entries(tags).length ? (
                    entries(tags).map(([k, v]) => (
                      <Tooltip
                        title={`See Images with At Least ${pluralize(
                          startCase(k),
                          v,
                          true
                        )}`}
                      >
                        <Chip
                          sx={{ p: 2.5, m: 0.5 }}
                          clickable
                          onClick={() =>
                            setQuery?.("find-image-by-tags", {
                              tags: [{ tag: k, count: v }],
                            })
                          }
                          label={pluralize(startCase(k), v, true)}
                        />
                      </Tooltip>
                    ))
                  ) : (
                    <Typography sx={{ p: 2 }} color="textSecondary">
                      This image has no tags
                    </Typography>
                  )}
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
