import {
  List,
  ListItem,
  ListItemText,
  SwipeableDrawer,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { setGeography, setMenuBar } from "../Redux";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import url from "../../constants";

function MenuBar({ isMenuOpen, setMenu, setGeography }) {
  const [data, setData] = useState([]);
  const [dataAvailable, setDataAvailable] = useState(false);

  function handleOnMenuClose() {
    setMenu(false);
  }

  function handleOnMenuOpen() {
    setMenu(true);
  }

  function handleOnClick(index) {
    setGeography(data[index]);
    handleOnMenuClose();
  }
  useEffect(() => {
    async function getRegions() {
      var res = await fetch(url + "regions");
      res = await res.json();
      console.log(res);
      setData(res);
      setDataAvailable(true);
    }
    getRegions();
  }, []);

  return (
    <SwipeableDrawer
      open={isMenuOpen}
      onClose={handleOnMenuClose}
      onOpen={handleOnMenuOpen}
    >
      <List component="nav">
        {dataAvailable &&
          data.map((ele, index) => {
            return (
              <ListItem
                key={index}
                button
                onClick={() => {
                  handleOnClick(index);
                }}
              >
                <ListItemText
                  primary={ele.charAt(0).toUpperCase() + ele.slice(1)}
                />
              </ListItem>
            );
          })}
      </List>
    </SwipeableDrawer>
  );
}

MenuBar.propTypes = {
  isMenuOpen: PropTypes.bool,
  setMenu: PropTypes.func,
  setGeography: PropTypes.func,
};

function mapStateToProps(state) {
  return {
    isMenuOpen: state.isMenuOpen,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setMenu: (val) => dispatch(setMenuBar(val)),
    setGeography: (val) => dispatch(setGeography(val)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar);
