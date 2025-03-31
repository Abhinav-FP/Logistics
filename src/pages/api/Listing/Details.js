import { Component } from "react";
import { Api, ApiallowFile } from "./Api";

class Details extends Component {
  async login(data) {
    return Api.post("/user/login", data);
  }

  async resetPassword(data) {
    return Api.post("/user/reset-password", data);
  }

  async Usersget(data) {
    return Api.get(`/user/get/${data}`);
  }

  async Customerget() {
    return Api.get(`/user/cous`);
  }

  async Carrierget() {
    return Api.get("/user/get-carrier");
  }

  async Driverget() {
    return Api.get("/user/get-driver");
  }

  async profileVerify() {
    return Api.get("/user/get-role");
  }

  async createShipment(data) {
    return ApiallowFile.post("/shipment/create", data);
  }

  async getcarrierShipment(data) {
    return Api.get(`/shipment/get-shipment-carrier/${data}`);
  }
  async getcustomerShipment(data) {
    return Api.get(`/shipment/get-shipment-customer/${data}`);
  }


  async UpdateShipment(Id, data) {
    return Api.post(`/shipment/update/${Id}`, data);
  }

  async DispatchSheet(Id, data) {
    return Api.post(`/shipment/update-sheet/${Id}`, data);
  }

  async getShipment() {
    return Api.get("/shipment/get");
  }
  async getShipmentById(Id) {
    return Api.get(`/shipment/get/${Id}`);
  }


  async getShipperShipment(data) {
    return Api.get(`/shipment/get-shipment-shipper/${data}`);
  }
  async getBrokerShipment(data) {
    return Api.get(`/shipment/get-shipment-broker/${data}`);
  }

  async deleteShipment(data) {
    return Api.get(`/shipment/delete/${data}`);
  }

  async createCarrier(data) {
    return Api.post("/user/create-carrier", data);
  }

  async createCustomer(data) {
    return Api.post("/user/create-customer", data);
  }

  async createDriver(data) {
    return Api.post("/user/create-driver", data);
  }

  async createShipperBroker(data) {
    return Api.post("/user/create-account", data);
  }

  async getBOL(shipmentId) {
    return Api.get(`/shipment/get-bol/${shipmentId}`, {
      responseType: 'blob',
    });
  }


  // ?direction
  async direction(data) {
    return Api.post(`/place/directions`, data);
  }

  async GetDirection(id) {
    return Api.get(`/place/get_direction/${id}`);
  }

  async UpdateDirection(data) {
    return Api.post(`/place/update_direction`, data);
  }


  // Get Notification
  async GetNotification() {
    return Api.get(`/user/get-notification`);
  }

  async MarkNotificationAsRead(data) {
    return Api.post(`/user/read-notification`, data);
  }


  // Dashboard
  async AdminDashboard() {
    return Api.get(`/user/dashboard/admin`);
  }
  async ShipperDashboard() {
    return Api.get(`/user/dashboard/shipper`);
  }
  async UserDashboard() {
    return Api.get(`/user/dashboard/customer`);
  }
  async Dashboard() {
    return Api.get(`/user/dashboard`);
  }

  async ForgotEmail(data) {
    return Api.post(`/app/forget_email`, data);
  }

  async ForgotPassword(data) {
    return Api.post(`/app/forget_password`, data);
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