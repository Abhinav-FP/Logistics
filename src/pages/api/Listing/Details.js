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

  async createShipment(data) {
    return Api.post("/shipment/create",data);
  }

  async getShipment() {
    return Api.get("/shipment/get");
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