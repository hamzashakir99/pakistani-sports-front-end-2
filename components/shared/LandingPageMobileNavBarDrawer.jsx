import React from "react";
import {
  Box,
  List,
  ListItem,
  Button,
  ListItemButton,
} from "@mui/material";
import { appPages } from "../../utils/data.constraints"
const LandingPageMobileNavBarDrawer = () => {
  return (
    <>
      <Box
        sx={{ width: "auto", backgroundColor: "#008066" }}
        role="presentation"
      >
        <List>
          {appPages.map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
              <Button
                  key={text}
                  sx={{ display: "block" }}
                  color="primary"
                >
                  {text}
                </Button>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </>
  );
};

export default LandingPageMobileNavBarDrawer;