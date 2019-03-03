import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  CardActions,
  Button,
  Grid
} from "@material-ui/core";
import Viewer from "./Viewer/Viewer";
import MaterialCardButtonEdit from "./MaterialCardButtonEdit";

const styles = {
  card: {
    margin: "0 auto",
    padding: 10
  },
  media: {
    height: 140
  },
  spans: {
    display: "block"
  }
};

const MaterialCard = props => {
  const { classes, material, handleClick } = props;

  const filePath = Array.isArray(material.files)
    ? material.files[0]
    : material.files;

  return (
    <React.Fragment>
      <Card className={classes.card} onClick={() => handleClick(material)}>
        <CardActionArea>
          <div className="viewer">
            <Viewer file={filePath} />
          </div>
          <CardContent>
            <Typography gutterBottom variant="h4" component="h2">
              {material.title}
            </Typography>
            <Typography gutterBottom variant="h6" component="h4">
              Objective
            </Typography>
            <Typography variant="body1">{material.objective} </Typography>
            <br />
            <Grid container spacing={16}>
              <Grid item xs={12} md={3}>
                <Typography gutterBottom variant="h6" component="h4">
                  Preparation Time (mins)
                </Typography>
                <Typography variant="body1">{material.preparation}</Typography>
              </Grid>

              <Grid item xs={12} md={3}>
                <Typography gutterBottom variant="h6" component="h4">
                  Class Time (mins)
                </Typography>
                <Typography variant="body1">{material.timeInClass}</Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography gutterBottom variant="h6" component="h4">
                  Pupil Tasks
                </Typography>
                <Typography variant="body1">
                  {material.pupilTask.map(pupilTask => (
                    <span style={styles.spans} key={pupilTask.label}>
                      {pupilTask.label}
                    </span>
                  ))}
                </Typography>
              </Grid>
              <Grid item xs={12} md={3}>
                <Typography gutterBottom variant="h6" component="h4">
                  Level
                </Typography>
                <Typography variant="body1">
                  {material.level.map(level => (
                    <span style={styles.spans} key={level.label}>
                      {level.label}
                    </span>
                  ))}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </CardActionArea>
        <CardActions>
          {props.edit
            ? [
                <MaterialCardButtonEdit
                  material={material}
                  size="small"
                  color="primary"
                >
                  Edit
                </MaterialCardButtonEdit>
              ]
            : null}
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
    </React.Fragment>
  );
};

MaterialCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MaterialCard);
