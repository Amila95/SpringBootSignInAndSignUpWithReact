import React, { Component } from "react";

class Dashboard extends Component {
  data = [{ itemId: 1234, name: "majutharan" }];
  componentDidMount() {
    this.active();
  }
  active() {
    console.log(this.data[0].itemId);
  }
  state = {};
  render() {
    return (
      <div>
        <h1>mandy</h1>
      </div>
    );
  }
}

export default Dashboard;
