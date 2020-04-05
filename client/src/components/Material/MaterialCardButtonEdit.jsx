import React from "react";
import Button from '@material-ui/core/Button';
import { NavLink } from "react-router-dom";

const MaterialCardButtonEdit = props => {
  return (
    <NavLink
      to={{ pathname: "/edit", state: { material: props.material } }}
      className="link"
      key="edit"
    >
      <Button key={"edit"}>Edit</Button>
    </NavLink>
  );
};

export default MaterialCardButtonEdit;
