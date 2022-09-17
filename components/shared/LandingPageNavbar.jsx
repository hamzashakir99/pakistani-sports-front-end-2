import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector } from "react-redux";
import Link from "next/link";
import { LandingPageMobileNavBarDrawer } from "../index";
import { appPages } from "../../utils/data.constraints";
const settings = ["Profile", "Dashboard", "Logout"];

const LandingPageNavbar = () => {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [drawerState, setDrawerState] = useState({
    top: false,
  });
  const profile = useSelector((state) => state.user.data);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setDrawerState({ ...drawerState, ["top"]: open });
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#008066" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <Box>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-app-bar"
                  aria-haspopup="true"
                  color="primary"
                >
                  &nbsp;
                  <MenuIcon onClick={toggleDrawer(true)} />
                </IconButton>
                <Drawer
                  anchor={"top"}
                  open={drawerState["top"]}
                  onClose={toggleDrawer(false)}
                >
                  <LandingPageMobileNavBarDrawer />
                </Drawer>
              </Box>
            </Box>
            <Typography variant="logo" component="h6" color="primary">
              <Link href="/">PS</Link>
            </Typography>
            <Box
              sx={{
                flexGrow: 1,
                justifyContent: "center",
                display: { xs: "none", md: "flex" },
              }}
            >
              {appPages.map((page) => (
                <Button
                  key={page}
                  sx={{ my: 2, mr: 2, display: "block" }}
                  color="primary"
                >
                  {page}
                </Button>
              ))}
            </Box>
            {/*
             * ! Profile image setting
             */}
            {profile ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt={profile.name ? profile.name : "PS"}
                      src={profile.profile_image ? profile.profile_image : "NA"}
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-app-bar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            ) : (
              <Button
                color="primary"
                variant="contained"
                sx={{ display: { xs: "none", md: "block" } }}
              >
                <Link href="/login">Login</Link>
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};
export default LandingPageNavbar;
