import { Component } from "react";
import Api from "./Api";

class Details extends Component {
 async login(data) {
    return Api.post("/user/login", data);
  }

  async Usersget(data) {
    return Api.get(`/user/get/${data}`);
  }

  async Carrierget() {
    return Api.get("/user/get-carrier");
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

  async getBrokerShipment() {
    return Api.get("/shipment/get-shipment-broker");
  }

  async deleteShipment(data) {
    return Api.get(`/shipment/delete/${data}`);
  }

  async createCarrier(data) {
    return Api.post("/user/create-carrier",data);
  }

  async createCustomer(data) {
    return Api.post("/user/create-customer",data);
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