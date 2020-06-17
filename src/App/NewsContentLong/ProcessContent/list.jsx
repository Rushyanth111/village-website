import PropTypes from "prop-types";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Typography } from "@material-ui/core";

function ListComponent({ value }) {
  return (
    <Typography component={"span"}>
      <ReactMarkdown source={value} />
    </Typography>
  );
}

ListComponent.propTypes = {
  value: PropTypes.string,
};

export default ListComponent;
