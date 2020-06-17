import PropTypes from "prop-types";
import React from "react";
import { Typography } from "@material-ui/core";

function Title({ title, variant }) {
  return <Typography variant={variant}>{title}</Typography>;
}

Title.propTypes = {
  title: PropTypes.string,
  variant: PropTypes.string,
};

export default Title;
