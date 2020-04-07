import React from "react";
import { makeStyles, Box } from "@material-ui/core";
import CardContent from "./cardContent";
import { LoremIpsum } from "lorem-ipsum";

// const LoremIpsum = require("lorem-ipsum").LoremIpsum;

const lorem = new LoremIpsum({
  sentencesPerParagraph: {
    max: 8,
    min: 4,
  },
  wordsPerSentence: {
    max: 16,
    min: 4,
  },
});

const useStyles = makeStyles((theme) => ({
  MainBox: {
    marginLeft: "25%",
    marginRight: "25%",
    [theme.breakpoints.down("md")]: {
      marginLeft: "5%",
      marginRight: "5%",
    },
  },
}));

function NewsContentShort() {
  const styles = useStyles();
  let CardContents = [];

  for (let i = 0; i < 10; i++) {
    CardContents.push(
      <CardContent key={i} textHeader={lorem.generateSentences(1)} />
    );
  }
  return <Box className={styles.MainBox}>{CardContents}</Box>;
}

export default NewsContentShort;
