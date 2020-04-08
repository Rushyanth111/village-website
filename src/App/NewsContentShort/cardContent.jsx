import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles, Typography, Card, CardMedia } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  card: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: "10px",
    margin: "10px",
    borderRadius: 16,
  },
  text: {
    flex: 1,
    padding: "10px",
    alignItems: "left",
    fontWeight: 500,
  },
  image: {
    alignSelf: "right",
    width: 100,
    height: 100,
    borderRadius: 16,
  },
}));

function CardContent(props) {
  const styles = useStyles();

  const [elevation, setElevation] = useState(6);

  return (
    <Card
      className={styles.card}
      variant="elevation"
      elevation={elevation}
      onMouseEnter={() => {
        setElevation(20);
      }}
      onMouseLeave={() => {
        setElevation(6);
      }}
    >
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

CardContent.propTypes = {
  textHeader: PropTypes.string,
};

export default CardContent;
