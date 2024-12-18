import Municipio from "./municipio";

class IPSView {
  public id: number;
  public nombre_ips: string;
  public cod_ips: string;
  public is_active: boolean;
  public municipio_id: Municipio; // Cambiado para reflejar el nombre de la columna del backend
  public id_municipio_id: number;
  constructor(
    id: number,
    nombre_ips: string,
    cod_ips: string,
    is_active: boolean,
    municipio_id: Municipio,
    id_municipio_id: number
  ) {
    this.id = id;
    this.nombre_ips = nombre_ips;
    this.cod_ips = cod_ips;
    this.is_active = is_active;
    this.municipio_id = municipio_id;
    this.id_municipio_id = id_municipio_id;
  }
}

export default IPSView;
