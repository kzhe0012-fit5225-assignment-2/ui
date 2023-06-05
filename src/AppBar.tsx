import { PersonOutline } from "@mui/icons-material";
import {
  Avatar,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";

export function AppBar({
  user,
  signOut,
}: {
  signOut?: () => void;
  user?: any;
}) {
  return (
    <List>
      <ListItem>
        <ListItemAvatar>
          <Avatar>
            <PersonOutline />
          </Avatar>
        </ListItemAvatar>
        <ListItemText>
          {user?.attributes?.email ?? user?.username}
          <Button variant="text" onClick={signOut}>
            Sign Out
          </Button>
        </ListItemText>
      </ListItem>
    </List>
  );
}
