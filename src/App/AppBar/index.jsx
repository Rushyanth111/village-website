import React from "react";
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
    width:'100%'
  },
  Toolbar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  MenuAndTypography: {
    flex: 1
  },
  Spacer: {
    flex: 1,
    [theme.breakpoints.down('md')]:{
      display:"none"
    }
  },
  SearchBox: {
    flex: 1.5,
    display: "flex",
    backgroundColor: fade(theme.palette.common.black, 0.07),
    borderRadius: 10,
    width: "100%",
    [theme.breakpoints.down('md')]:{
      display:"none"
    }
  },
  SearchInput: {
    flex: 1
  },
}));

function NavigationAppBar() {
  const styles = useStyles();

  return (
    <AppBar position="sticky" color="default" className={styles.AppBar}>
      <Toolbar className={styles.Toolbar}>
        <Box className={styles.MenuAndTypography}>
          <IconButton edge="start">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" display="inline">
            Government Schemes
          </Typography>
        </Box>
        <Box className={styles.SearchBox}>
          <IconButton>
            <SearchIcon />
          </IconButton>
          <InputBase placeholder="Search..." className={styles.SearchInput} />
        </Box>
        <Box className={styles.Spacer}></Box>
      </Toolbar>
    </AppBar>
  );
}

export default NavigationAppBar;
