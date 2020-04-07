import React from "react";
import {
  Box,
  makeStyles,
  Typography,
  Card,
  CardMedia,
  fade
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "10px",
    margin: "10px",
    borderRadius: 16,
    raised: true,
    borderColor: fade(theme.palette.info.main, 0.5),
    "&:hover": {},
  },
  text: {
    padding: "10px",
    margin: "2px",
    alignItems: "left",
    fontWeight: 500,
  },
  image: {
    alignSelf: "right",
    minWidth: "100px",
    minHeight: "100px",
    maxWidth: "100px",
    maxHeight: "100px",
    borderRadius: 16,
  },
}));

function CardContent(props) {
  const styles = useStyles();
  return (
    <Card className={styles.card} variant="outlined">
      <Typography variant="body1" display="block" className={styles.text}>
        {props.textHeader}
      </Typography>
      <CardMedia
        className={styles.image}
        image="https://picsum.photos/200/200"
      />
    </Card>
  );
}

export default CardContent;
