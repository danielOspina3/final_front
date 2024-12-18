import IPS from "./Ips";
import User from "./user";
import Typerequest from "./type_of_request";
import Subtype_of_request from "./sub_type_of_request";

class Support {
  public id: number;
  public id_ips: IPS;
  public id_ips_id: number;
  public id_CustomerUser: User;
  public id_CustomerUser_id: number;
  public role2: string;
  public medio: string;
  public name_solicited: string;
  public number: string;
  public email: string;
  public requirement: string;
  public answer: string;
  public is_active: boolean;
  public is_close: boolean;
  public id_CustomerUser2: User;
  public id_CustomerUser2_id: number;
  public how_it_conclude: string;
  public typerequest_id: Typerequest;
  public id_type_request_id: number;
  public subtype_request: Subtype_of_request;
  public id_Subtype_request_id: number;
  public support_date: Date;
  public create_date: Date;
  public update_date: Date;

  /******  0ef88235-17af-47f1-b0e7-614d959ce859  *******/ constructor(
    id: number,
    id_ips: IPS,
    id_ips_id: number,
    id_CustomerUser: User,
    id_CustomerUser_id: number,
    role2: string,
    medio: string,
    name_solicited: string, //ya
    number: string, //ya
    email: string, //ya
    requirement: string, //ya
    answer: string, //ya
    is_active: boolean, //ya
    is_close: boolean,
    id_CustomerUser2: User,
    id_CustomerUser2_id: number,
    how_it_conclude: string,
    typerequest_id: Typerequest,
    id_type_request_id: number,
    subtype_request: Subtype_of_request,
    id_Subtype_request_id: number,
    support_date: Date,
    create_date: Date,
    update_date: Date
  ) {
    this.id = id;
    this.id_ips = id_ips;
    this.id_ips_id = id_ips_id;
    this.id_CustomerUser = id_CustomerUser;
    this.id_CustomerUser_id = id_CustomerUser_id;
    this.role2 = role2;
    this.medio = medio;
    this.name_solicited = name_solicited;
    this.number = number;
    this.email = email;
    this.requirement = requirement;
    this.answer = answer;
    this.is_active = is_active;
    this.is_close = is_close;
    this.id_CustomerUser2 = id_CustomerUser2;
    this.id_CustomerUser2_id = id_CustomerUser2_id;
    this.how_it_conclude = how_it_conclude;
    this.typerequest_id = typerequest_id;
    this.id_type_request_id = id_type_request_id;
    this.subtype_request = subtype_request;
    this.id_Subtype_request_id = id_Subtype_request_id;
    this.support_date = support_date;
    this.update_date = update_date;
    this.create_date = create_date;
  }
}
export default Support;
