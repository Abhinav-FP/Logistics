import { Component } from "react";
import Api from "./Api";

class Details extends Component {
 async login(data) {
    return Api.post("/user/login", data);
  }
  render() {
    return (
      <div>
        <></>
      </div>
    );
  }
}

export default Details;