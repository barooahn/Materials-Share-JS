import React, { Component } from "react";
import AsyncCreatableSelect from "react-select/lib/AsyncCreatable";
import FormHelperText from "@material-ui/core/FormHelperText";

import axios from "axios";

class SelectBox extends Component {
  constructor(props) {
    super(props);
    this.state = { [this.props.name]: this.props.value };
  }

  getInputSelectOptions = field =>
    new Promise(resolve => {
      console.log("getting options...");
      resolve(
        axios
          .get("/api/material/field/" + field)
          .then(res => {
            return res.data.values.map(label => ({
              label: label,
              value: label.toLowerCase().replace(/\W/g, "")
            }));
          })
          .catch(function (err) {
            throw err;
          })
      );
    });

  handleChange = (newValue, actionMeta) => {
    this.props.handleSelectChange(this.props.name, newValue);
  };

  render() {
    return (
      <React.Fragment>
        <FormHelperText>{this.props.label}</FormHelperText>
        <br />
        <AsyncCreatableSelect
          defaultOptions
          isMulti
          name={this.props.name}
          loadOptions={() => this.getInputSelectOptions(this.props.name)}
          defaultValue={this.props.value}
          onChange={this.handleChange}
        />
      </React.Fragment>
    );
  }
}

export default SelectBox;
