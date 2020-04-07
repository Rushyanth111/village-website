import React, { useState } from "react";
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography,
  InputBase,
  makeStyles,
  fade,
  Box,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles((theme) => ({
  AppBar: {
    backgroundColor: "white",
  },
  Menu: {},
  Typography: {},
  Search: {
    flexGrow: 1,
    backgroundColor: fade(theme.palette.common.black, 0.1),
    "&:hover": { backgroundColor: fade(theme.palette.common.white, 0.3) },
    borderRadius: 10,
    maxWidth: "30%",
    position: "relative",
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

function NavigationAppBar() {
  const styles = useStyles();

  const [isMobile, setIsMobile] = useState(window.innerWidth > 480);

  const handleWindowResize = () => {
    setIsMobile(window.innerWidth > 480);
  };

  window.addEventListener("resize", handleWindowResize);

  return (
    <AppBar position="sticky" color="default" className={styles.AppBar}>
      <Toolbar>
        <IconButton edge="start">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6">Government Schemes</Typography>
        <Box className={styles.Search} hidden={!isMobile}>
          <IconButton>
            <SearchIcon />
          </IconButton>
          <InputBase placeholder="Search..." />
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavigationAppBar;
