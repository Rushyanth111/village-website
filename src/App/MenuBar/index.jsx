import PropTypes from "prop-types";
import React from "react";
import { SwipeableDrawer } from "@material-ui/core";
import { connect } from "react-redux";
import { setMenuBar } from "../Redux";

function MenuBar({ isMenuOpen, setMenuClose }) {
  function handleOnMenuClose() {
    setMenuClose();
  }

  return (
    <SwipeableDrawer open={isMenuOpen} onClose={handleOnMenuClose}>
      HAHAHA
    </SwipeableDrawer>
  );
}

MenuBar.propTypes = {
  isMenuOpen: PropTypes.bool,
  setMenuClose: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    isMenuOpen: state.isMenuOpen,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setMenuClose: () => dispatch(setMenuBar(false)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar);
