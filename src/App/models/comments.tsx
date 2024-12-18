class Comments {
  public id: number;
  public id_support: number;
  public text: string;
  public image: string;

  constructor(id: number, id_support: number, text: string, image: string) {
    this.id = id;
    this.id_support = id_support;
    this.text = text;
    this.image = image;
  }
}
export default Comments;
