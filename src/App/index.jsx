import React from "react";
import { Box } from "@material-ui/core";
import NavigationAppBar from "./AppBar";
import NewsContentShort from "./NewsContentShort";
function App() {
  return (
    <Box>
      <NavigationAppBar />
      <NewsContentShort />
    </Box>
  );
}

export default App;
