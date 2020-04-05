import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { getSecret } from "../auth/helpers";
import axios from "axios";
import Material from "../components/Material/Material";
import MaterialCard from "../components/Material/MaterialCard";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: this.props.auth,
      materials: [],
      material: false,
      materialDetails: []
    };
  }

  showData = async () => {
    const data = await getSecret();
    await console.log(data);
    await this.setState({ data: data });
  };

  getUserMaterials = async () => {
    try {
      const response = await axios.get(
        "/api/materials/" + localStorage.getItem("USER_ID")
      );

      this.setState({
        materials: response.data
      });
      console.log("response", response.data);
    } catch (error) {
      console.error(error);
    }
  };

  componentDidMount() {
    this.getUserMaterials();
  }

  handleClick = material => {
    this.setState({ material: true, materialDetails: material });
  };

  render() {
    console.log("state materials", this.state.materials);
    if (this.state.material) {
      return <Material material={this.state.materialDetails} />;
    } else {
      return (
        <Paper style={styles.paperCenter} elevation={1}>
          <Typography gutterBottom variant="h4" component="h1">
            My Profile
          </Typography>
          <Typography gutterBottom variant="h5" component="h5">
            Materials I Have Made
          </Typography>
          <Grid container spacing={16}>
            {this.state.materials.map(material => (
              <Grid key={material.title} item xs={12} md={6}>
                <MaterialCard
                  edit={true}
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

export default Profile;
