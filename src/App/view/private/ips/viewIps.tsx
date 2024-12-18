import ApiBack from "../../../utils/domains/ApiBack";
import IPS from "../../../models/Ips";
import IPSView from "../../../models/ipsView";
import Municipio from "../../../models/municipio";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ServicePrivate from "../../../services/ServicePrivate";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { MessageToastify } from "../../../utils/funtions/MessageToastify";
import { useForm } from "../../../utils/hooks/useForm";
import { jwtDecode } from "jwt-decode";
import { useRef } from "react";

export const ViewIps = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [process, setProcess] = useState<boolean>(false);
  const [arrayjIps, setArrayIps] = useState<IPSView[]>([]);
  const [proccess, setProccess] = useState<boolean>();
  const [showFinal, setShowFinal] = useState(false);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);
  type formaHtml = React.FormEvent<HTMLFormElement>;
  const handleClose = () => setShow(false);
  const handleClose2 = () => setShow2(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [id_municipio, setIdMunicipio] = useState<number>(0);
  const [arrayMunicipio, setArrayMunicipio] = useState<Municipio[]>([]);
  const [nombreIps, setNombreIps] = useState("");
  const [codIps, setCodIps] = useState("");

  //function to error the Token on the time, using when token is invalid or expired

  let {
    id,
    nombre_ips,
    cod_ips,
    is_active,
    id_municipio_id,
    doubleLink,
    object,
  } = useForm<IPS>(
    new IPS(0, "", "", true, new Municipio(0, "", ""), 0) // Incluye `id_municipio` con un valor inicial
  );

  const [objips, setObjips] = useState<IPSView>(
    new IPSView(0, "", "", false, new Municipio(0, "", ""))
  );

  const handleTokenError = () => {
    navigate("/"); // Go to login session
  };
  const getMunicipios = async () => {
    setLoading(true);
    try {
      const results = await ServicePrivate.requestGET(ApiBack.MUNICIPIOS_LIST);
      setArrayMunicipio(results);
    } catch (error) {
      console.error("Error fetching formats:", error);
      handleTokenError();
    } finally {
      setLoading(false);
    }
  };

  const updateSupportDetails = async (myipsid: number, isActive: boolean) => {
    setProccess(true);

    try {
      // Encuentra el soporte por ID en el array
      const updatedSupport = arrayjIps.find((myIps) => myIps.id === myipsid);

      if (!updatedSupport) {
        console.error("Soporte no encontrado");
        return;
      }

      // Crea un objeto con el valor de is_active basado en el parámetro
      const updatedObject = {
        is_active: isActive,
      };

      const urlUpdate = ApiBack.IPS_UPDATED + "/" + myipsid;
      const response = await ServicePrivate.requestPUT(
        urlUpdate,
        updatedObject
      );

      if (response.OK) {
        MessageToastify(
          "error",
          "Error en el momento de Actualizar el ID del usuario.",
          7000
        );
        getAllConsents();
      } else {
        MessageToastify("success", "ID actualizado del usuario.", 7000);
        setShowFinal(false);
        getAllConsents();
      }
    } catch (error) {
      console.error("Error actualizando el ID del usuario:", error);
      MessageToastify(
        "error",
        "Error en el momento de Actualizar el ID del usuario en el servidor.",
        7000
      );
      setShow(false);
    } finally {
      setProccess(false);
      setShow(false);
    }
  };

  const getOneIps = async (id: number) => {
    try {
      const urlGetUser = ApiBack.IPS_LIST_ONE + "/" + id;
      const result = await ServicePrivate.requestGET(urlGetUser);
      setObjips(result);
      setShow(true);
    } catch (error) {
      console.error("Error fetching profesional:", error);
      setShow(false);
      const token = localStorage.getItem("access");
      if (token === null) {
        handleTokenError(); // Manejar el error de token
      }
    }
  };

  const resetCreateForm = (form: HTMLFormElement) => {
    form.reset();

    // Restablecer el objeto que maneja los datos del formulario
    object.nombre_ips = "";
    object.cod_ips = "";

    // Limpiar los campos de entrada y selección directamente
    (form.querySelector('[name="nombre_ips"]') as HTMLInputElement).value = "";
    (form.querySelector('[name="cod_ips"]') as HTMLInputElement).value = "";
    (
      form.querySelector('[name="id_municipio_id"]') as HTMLSelectElement
    ).value = "";

    // Restablecer el estado de los valores
    setNombreIps(""); // Restablecer el estado del nombre de la IPS
    setCodIps("");

    // Eliminar cualquier clase de validación aplicada previamente
    form.classList.remove("was-validated");
  };

  const getAllConsents = async () => {
    try {
      const results = await ServicePrivate.requestGET(ApiBack.IPS_VIEW);
      if (results) {
        console.log(results);

        setArrayIps(results);
        setLoading(false);
      } else {
        setLoading(true);
      }
    } catch (error) {
      console.error("Error fetching consents:", error);
      const token = localStorage.getItem("access");
      if (token === null) {
        handleTokenError();
      }
    }
  };

  function submitHandler(e: any) {
    e.preventDefault();
  }

  const sendForm = async (fh: formaHtml) => {
    try {
      fh.preventDefault();
      setProcess(true);
      const form = fh.currentTarget;

      form.classList.add("was-validated");

      if (form.checkValidity() === false) {
        fh.preventDefault();
        fh.stopPropagation();
        setProcess(false);
        MessageToastify(
          "error",
          "Por favor, completa todos los campos requeridos.",
          7000
        );
        return;
      }

      const myAccess: any = sessionStorage.getItem("access");
      const decodedToken: any = jwtDecode(myAccess);
      const userId = decodedToken.user_id;

      // Crear el objeto para enviar con los campos proporcionados
      const formData = {
        nombre_ips: object.nombre_ips,
        cod_ips: object.cod_ips,
        is_active: true,
        id_municipio_id: object.id_municipio_id, // Asegúrate de enviar solo el ID del municipio
      };
      console.log(formData);

      // Realizar la solicitud POST
      const response = await ServicePrivate.requestPOST(
        ApiBack.IPS_CREATE,
        formData
      );

      if (response.OK) {
        setProcess(false);
        MessageToastify("error", "error al momento de crear el soporte.", 7000);
      } else {
        setProcess(false);
        MessageToastify("success", "soporte creado", 7000);
        handleClose2();
        getAllConsents();
      }
    } catch (error) {
      setProcess(false);
      MessageToastify("error", "Error en el momento  crear el soporte.", 7000);
    }
  };

  useEffect(() => {
    getAllConsents();
    getMunicipios();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div>
        <div className="row">
          <div className="page-header">
            <div className="col-lg-6 col-sm-12">
              <h3 className="page-title fs-3 fw-bold">
                <i className="fa-solid fa-users"></i>&nbsp;IPS
              </h3>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb breadcrumb-chevron"></ol>
              </nav>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-6 col-sm-12">
                    <h4 className="card-title fs-4">
                      <i className="fa-solid fa-list"></i>&nbsp;Listado
                    </h4>
                  </div>
                  <div className="col-lg-6 col-sm-12">
                    <div className="d-flex justify-content-end">
                      <button
                        className={
                          "badge fs-6 py-1 pe-2 text-success-emphasis bg-success-subtle border border-success-subtle rounded-pill"
                        }
                        type="button"
                        onClick={() => setShow2(true)}
                        style={{ marginLeft: "10px" }}
                      >
                        <i className="fa-solid fa-plus"></i>&nbsp;Crear
                      </button>
                    </div>
                  </div>
                </div>

                <div className="row d-flex"></div>
                <div className="table-responsive">
                  <table className="table table-striped table-sm rounded-table">
                    <thead className="table-dark">
                      <tr>
                        <th>Municipio</th>
                        <th>Nombre ips</th>
                        <th>cod</th>
                        <th>Estado</th>
                      </tr>
                    </thead>
                    <tbody className="table-group-divider">
                      {arrayjIps.map((myIps, count) => (
                        <tr key={count + 1}>
                          <td>
                            <p>{myIps.municipio_id?.nombre_municipio}</p>
                          </td>
                          <td>
                            <p>{myIps.nombre_ips}</p>
                          </td>
                          <td>
                            <p>{myIps.cod_ips}</p>
                          </td>

                          <td>
                            <p>
                              <button
                                className={
                                  myIps.is_active
                                    ? "badge fs-6 py-1 pe-2 text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-pill"
                                    : "badge fs-6 py-1 pe-2 text-success-emphasis bg-success-subtle border border-success-subtle rounded-pill"
                                }
                                type="button"
                                onClick={() => getOneIps(myIps.id)}
                                style={{ marginLeft: "10px" }}
                              >
                                {myIps.is_active ? (
                                  <>Inactivar</>
                                ) : (
                                  <>Activar</>
                                )}
                              </button>
                            </p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="d-flex align-items-center justify-content-center m-3"></div>
                </div>

                <Modal
                  show={show}
                  onHide={handleClose}
                  backdrop="static"
                  keyboard={false}
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                >
                  <Modal.Header closeButton>
                    <Modal.Title className="text-center fw-bold">
                      <i className="fa-regular fa-circle-xmark"></i>
                      &nbsp;Desactivar la ips
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    ¿Realmente desea cambiar el estado de la ips?
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={() => {
                        setShow(false);
                      }}
                    >
                      <i className="fa-solid fa-backward"></i>
                      &nbsp;Cancelar
                    </Button>
                    <Button
                      variant="success"
                      onClick={() => {
                        console.log("ID de la ips:", id);
                        updateSupportDetails(objips.id, !objips.is_active);
                      }}
                    >
                      Confirmar
                    </Button>
                  </Modal.Footer>
                </Modal>

                <Modal
                  show={show2}
                  onHide={handleClose2}
                  backdrop="static"
                  keyboard={false}
                  aria-labelledby="contained-modal-title-vcenter"
                  centered
                >
                  <Modal.Header closeButton>
                    <Modal.Title className="text-center fw-bold">
                      <i className="fa-solid fa-folder-plus"></i>
                      &nbsp;Formulario de creación
                    </Modal.Title>
                  </Modal.Header>
                  <Form
                    className="forms-sample"
                    validated={process}
                    onSubmit={sendForm}
                    noValidate
                    ref={formRef}
                  >
                    <Modal.Body>
                      {/* Campo para nombre_ips */}
                      <Form.Group controlId="nombre_ips" className="mb-3 w-100">
                        <Form.Label
                          className="fw-bold mb-2 mt-2"
                          htmlFor="nombre_ips"
                        >
                          Nombre IPS:
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
                          name="nombre_ips"
                          className="form-control"
                          id="nombre_ips"
                          placeholder="Escriba el nombre de la IPS"
                          value={nombre_ips}
                          onChange={(e) => {
                            let value = e.target.value.toUpperCase(); // Convierte a mayúsculas
                            // Validar que solo contenga letras y limitar a 60 caracteres
                            if (
                              /^[A-Za-z\s]*$/.test(value) &&
                              value.length <= 60
                            ) {
                              e.target.value = value; // Establece el valor en mayúsculas
                              doubleLink(e); // Llama a tu función existente
                            }
                          }}
                          autoComplete="off"
                          maxLength={60} // Limita a 60 caracteres
                        />
                        <Form.Control.Feedback type="invalid">
                          Nombre de la IPS es obligatorio.
                        </Form.Control.Feedback>
                      </Form.Group>

                      {/* Campo para cod_ips */}
                      <Form.Group controlId="cod_ips" className="mb-3 w-100">
                        <Form.Label
                          className="fw-bold mb-2 mt-2"
                          htmlFor="cod_ips"
                        >
                          Código IPS:
                        </Form.Label>
                        <Form.Control
                          required
                          type="text"
                          name="cod_ips"
                          className="form-control"
                          id="cod_ips"
                          placeholder="Escriba el código de la IPS"
                          value={cod_ips}
                          onChange={(e) => {
                            const value = e.target.value;
                            // Permitir solo números y limitar a 20 caracteres
                            if (/^\d*$/.test(value) && value.length <= 20) {
                              doubleLink(e); // Llama a tu función existente
                            }
                          }}
                          autoComplete="off"
                          maxLength={20} // Limita a 20 caracteres
                        />
                        <Form.Control.Feedback type="invalid">
                          Código de la IPS es obligatorio.
                        </Form.Control.Feedback>
                      </Form.Group>

                      {/* Campo para seleccionar municipio */}
                      <Form.Group
                        controlId="id_municipio_id"
                        className="mb-3 w-100"
                      >
                        <Form.Label
                          className="fw-bold mb-2 mt-2"
                          htmlFor="id_municipio_id"
                        >
                          Municipio:
                        </Form.Label>
                        <Form.Select
                          id="id_municipio_id"
                          name="id_municipio_id"
                          value={id_municipio_id}
                          onChange={doubleLink}
                        >
                          <option value="">Selecciona un municipio</option>
                          {arrayMunicipio.map((municipio) => (
                            <option key={municipio.id} value={municipio.id}>
                              {municipio.nombre_municipio}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="success" onClick={handleClose2}>
                        <i className="fa-solid fa-backward"></i>&nbsp;Cancelar
                      </Button>
                      <Button
                        variant="success"
                        type="submit"
                        onClick={() => {}}
                      >
                        <i className="fa-solid fa-plus"></i>&nbsp;Guardar
                      </Button>
                    </Modal.Footer>
                  </Form>
                  <ToastContainer />
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
