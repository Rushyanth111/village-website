import PropTypes from "prop-types";
import React from "react";
import ReactMarkdown from "react-markdown/with-html";
import { Typography } from "@material-ui/core";
import { connect } from "react-redux";

function TestComponent({ value, searchKeyword }) {
  const rexp = new RegExp("(" + searchKeyword.split(" ").join("|") + ")");
  const hval = value.replace(rexp, function (a, b) {
    return `<span style="background-color: #FFFF00">${b}</span>`;
  });

  return (
    <Typography component={"span"}>
      <ReactMarkdown source={hval} escapeHtml={false} />
    </Typography>
  );
}

TestComponent.propTypes = {
  value: PropTypes.string,
  searchKeyword: PropTypes.string,
};

function mapStateToProps(state) {
  return {
    searchKeyword: state.searchKeyword,
  };
}

export default connect(mapStateToProps)(TestComponent);
