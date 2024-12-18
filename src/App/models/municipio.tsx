class Municipio {
  public id: number;
  public nombre_municipio: string;
  public codigo_municipio: string;

  constructor(id: number, nombre_municipio: string, codigo_municipio: string) {
    this.id = id;
    this.nombre_municipio = nombre_municipio;
    this.codigo_municipio = codigo_municipio;
  }
}

export default Municipio;
