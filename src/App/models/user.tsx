class User {
  public id: number;
  public password: string;
  public email: string;
  public num_document: string;
  public name: string;
  public last_name: string;
  public is_active: boolean;
  public document_type: string;
  public role: string;

  constructor(
    id: number,
    email: string,
    num_document: string,
    name: string,
    last_name: string,
    is_active: boolean,
    password: string,
    document_type: string,
    role: string
  ) {
    this.id = id;
    this.email = email;
    this.num_document = num_document;
    this.name = name;
    this.last_name = last_name;
    this.is_active = is_active;
    this.password = password;
    this.document_type = document_type;
    this.role = role;
  }
}
export default User;
