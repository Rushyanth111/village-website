import React from "react";
import {
  Box,
  IconButton,
  InputBase,
  makeStyles,
  fade,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { connect } from "react-redux";

import { setSearchKeyword } from "../Redux";
const useStyles = makeStyles((theme) => ({
  SearchBox: {
    flex: 1.5,
    display: "flex",
    backgroundColor: fade(theme.palette.common.black, 0.07),
    borderRadius: 10,
    width: "100%",
  },
  SearchInput: {
    flex: 1,
  },
}));

function SearchBox({ setSearchKeyword }) {
  const styles = useStyles();
  var searchTimer = 0;
  function onSearchHandler(event) {
    var e = event.target.value;
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      setSearchKeyword(e);
    }, 1000);
  }

  return (
    <Box className={styles.SearchBox}>
      <IconButton>
        <SearchIcon />
      </IconButton>
      <InputBase
        placeholder="Search..."
        className={styles.SearchInput}
        onInput={onSearchHandler}
      />
    </Box>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    setSearchKeyword: (val) => dispatch(setSearchKeyword(val)),
  };
}

export default connect(null, mapDispatchToProps)(SearchBox);
