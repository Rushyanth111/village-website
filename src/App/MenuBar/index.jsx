import {
  List,
  ListItem,
  ListItemText,
  SwipeableDrawer,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setMenuBar } from "../Redux";
import url from "../../constants";

function MenuBar({ isMenuOpen, setMenu }) {
  const [data, setData] = useState([]);
  const [dataAvailable, setDataAvailable] = useState(false);

  function handleOnMenuClose() {
    setMenu(false);
  }

  function handleOnMenuOpen() {
    setMenu(true);
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
              <ListItem key={index} button>
                <ListItemText primary={ele} />
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
};

function mapStateToProps(state) {
  return {
    isMenuOpen: state.isMenuOpen,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setMenu: (val) => dispatch(setMenuBar(val)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuBar);
