import React from "react";
import { Box } from "@material-ui/core";
import NavigationAppBar from "./AppBar";
//import NewsContentShort from "./NewsContentShort";
import NewsContentLong from "./NewsContentLong";
function App() {
  return (
    <Box>
      <NavigationAppBar />
      <NewsContentLong />
    </Box>
  );
}

export default App;
