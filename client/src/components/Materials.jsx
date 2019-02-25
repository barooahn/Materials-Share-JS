import React, { Component } from "react";
import axios from "axios";
import MaterialCard from "./MaterialCard";
import { Paper, Grid, Typography } from "@material-ui/core";
import Material from "./Material/Material";

class Materials extends Component {
  constructor(props) {
    super(props);
    this.state = {
      materials: [],
      material: false,
      materialDetails: []
    };
  }
  handleClick = material => {
    this.setState({ material: true, materialDetails: material });
  };
  getMaterials = async () => {
    try {
      const response = await axios.get("/api/materials");

      this.setState({
        materials: response.data
      });
      console.log("response", response.data);
    } catch (error) {
      console.error(error);
    }
  };

  componentDidMount() {
    this.getMaterials();
  }

  render() {
    console.log("state materials", this.state.materials);
    if (this.state.material) {
      return <Material material={this.state.materialDetails} />;
    } else {
      return (
        <Paper style={styles.paperCenter} elevation={1}>
          <Typography gutterBottom variant="h4" component="h1">
            Teaching Material
          </Typography>
          <Grid container spacing={16}>
            {this.state.materials.map(material => (
              <Grid key={material.title} item xs={12} md={6}>
                <MaterialCard
                  style={styles.card}
                  material={material}
                  handleClick={this.handleClick}
                />
              </Grid>
            ))}
          </Grid>
        </Paper>
      );
    }
  }
}

const styles = {
  paperCenter: {
    width: "91%",
    margin: "10px auto",
    padding: "10px"
  },
  button: {
    margin: 15
  },
  p_wrap: {
    whiteSpace: "pre-line"
  },
  selectSpans: {
    display: "block"
  },
  card: {
    margin: "10px auto"
  }
};

export default Materials;
