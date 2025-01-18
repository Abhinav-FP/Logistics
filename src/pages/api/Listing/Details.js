import { Component } from "react";
import Api from "./Api";

class Details extends Component {
 async login(data) {
    return Api.post("/user/login", data);
  }

  async Usersget(data) {
    return Api.get(`/user/get/${data}`);
  }

  async profileVerify() {
    return Api.get("/user/get-role");
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