import Typerequest from "./type_of_request";

class Subtype_request {
  public id: number;
  public subtype_request: string;
  public type_request_id: Typerequest;

  constructor(id: number, name: string, Typerequest: Typerequest) {
    this.id = id;
    this.subtype_request = name;
    this.type_request_id = Typerequest;
  }
}
export default Subtype_request;
