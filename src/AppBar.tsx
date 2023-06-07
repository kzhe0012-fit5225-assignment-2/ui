import { PersonOutline } from "@mui/icons-material";
import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";

export function AppBar({
  user,
  signOut,
}: {
  signOut?: () => void;
  user?: any;
}) {
  const name = user?.attributes ? (
    <>
      <Typography component="span" sx={{ pr: 1 }}>
        {user?.attributes?.given_name} {user?.attributes?.family_name}
      </Typography>
      <Typography component="span" color="textSecondary">
        {user?.attributes?.email}
      </Typography>
    </>
  ) : (
    user?.username
  );
  return (
    <List sx={{ maxWidth: "100vw" }}>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <PersonOutline />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          sx={{
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
            overflow: "hidden",
            maxWidth: "min-content",
          }}
        >
          {name}
        </ListItemText>
        <Button
          variant="text"
          onClick={signOut}
          sx={{ flex: 0, minWidth: "max-content" }}
        >
          Sign Out
        </Button>
      </ListItem>
    </List>
  );
}
