import {
  Box,
  IconButton,
  InputBase,
  fade,
  makeStyles,
} from "@material-ui/core";

import PropTypes from "prop-types"
import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import { connect } from "react-redux";
import { setSearchKeyword } from "../Redux";

const useStyles = makeStyles((theme) => ({
  SearchBox: {
    flex: 1,
    display: "flex",
    backgroundColor: fade(theme.palette.common.black, 0.2),
    borderRadius: "1rem"
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

SearchBox.propTypes = {
  setSearchKeyword: PropTypes.func
}

function mapDispatchToProps(dispatch) {
  return {
    setSearchKeyword: (val) => dispatch(setSearchKeyword(val)),
  };
}

export default connect(null, mapDispatchToProps)(SearchBox);
