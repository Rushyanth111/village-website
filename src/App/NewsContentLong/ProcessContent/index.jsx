import Image from "./image";
import ListComponent from "./list";
import PropTypes from "prop-types";
import React from "react";
import TableComponent from "./table";
import TextComponent from "./text";
import Title from "./title";

function ProcessLongComponent({ jsonData }) {
  const components = [];
  for (const [d, v] of Object.entries(jsonData)) {
    for (const [dkey, val] of Object.entries(v)) {
      if (!dkey.localeCompare("000-title")) {
        components.push(<Title title={val} key={d + dkey} variant={"h4"} />);
      } else if (dkey.endsWith("title")) {
        components.push(<Title title={val} key={d + dkey} variant={"h6"} />);
      } else if (dkey.endsWith("image")) {
        components.push(
          <Image
            Image={`data:image/jpeg;base64,${val["encoded_image"]}`}
            key={d + dkey}
          />
        );
      } else if (dkey.endsWith("listElement")) {
        components.push(<ListComponent value={val} key={d + dkey} />);
      } else if (dkey.endsWith("normal")) {
        components.push(<TextComponent value={val} key={d + dkey} />);
      } else if (dkey.endsWith("table")) {
        components.push(<TableComponent TableData={val} key={d + dkey} />);
      } else {
        components.push(<div key={d} />);
      }
    }
  }

  return <>{components}</>;
}

ProcessLongComponent.propTypes = {
  jsonData: PropTypes.object,
};

export default ProcessLongComponent;
