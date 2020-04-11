import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Viewer from "../Viewer/Viewer";
import Button from "@material-ui/core/Button";
import { NavLink } from "react-router-dom";

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

const MaterialCard = ({ material }) => {
  return (
    <React.Fragment>
      <Card>
        <CardContent>
          <Typography gutterBottom variant="h4" component="h2">
            {material.title}
          </Typography>
          <div className="attachement">
            {material.files.map(file => {
              return <Viewer file={file} key={file} />;
            })}
          </div>

          <Typography gutterBottom variant="h6" component="h4">
            Objective
          </Typography>
          <Typography variant="body1">{material.objective} </Typography>
          <br />
          <Grid container spacing={10}>
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
        <CardActions>
          <NavLink
            to={{ pathname: "/edit/" + material._id }}
            className="link"
            key="edit"
          >
            <Button key={"edit"}>Edit</Button>
          </NavLink>
          <NavLink
            to={{ pathname: "/material/" + material._id }}
            className="link"
            key="ma"
          >
          <Button size="small" color="primary">
            Learn More
          </Button>
          </NavLink>
        </CardActions>
      </Card>
    </React.Fragment>
  );
};

MaterialCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MaterialCard);
