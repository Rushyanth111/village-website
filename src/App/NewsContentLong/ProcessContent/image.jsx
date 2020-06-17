import PropTypes from "prop-types";
import React from "react";
function Image({ Image }) {
  return (
    <img
      src={Image}
      style={{ minWidth: 200, minHeight: 200, display: "flex" }}
    />
  );
}
Image.propTypes = {
  Image: PropTypes.string,
};
export default Image;
