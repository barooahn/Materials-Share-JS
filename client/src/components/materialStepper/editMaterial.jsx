import React from "react"
import Layout from "../components/layout"
import MaterialStepper from "../components/MaterialStepper"

export default props => (
  <Layout>
    <MaterialStepper type="Edit" {...props.location.state} />
  </Layout>
)
