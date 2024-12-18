import { useEffect, useRef, useState } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import ServicePrivate from "../../../services/ServicePrivate";
import ApiBack from "../../../utils/domains/ApiBack";
import { Link, useNavigate } from "react-router-dom";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { MessageToastify } from "../../../utils/funtions/MessageToastify";
import { ToastContainer } from "react-toastify";
import Support from "../../../models/support";
import IPS from "../../../models/Ips";
import User from "../../../models/user";
import Municipio from "../../../models/municipio";

import Typerequest from "../../../models/type_of_request";
import Subtype_of_request from "../../../models/sub_type_of_request";
import { useForm } from "../../../utils/hooks/useForm";
import { jwtDecode } from "jwt-decode";

export const ViewSupport = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [process, setProcess] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [arraySupport, setArraySupport] = useState<Support[]>([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [isAdmin, setIsAdmin] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [selectedIps, setSelectedIps] = useState<string>("");
  const [arrayIps, setArrayIps] = useState<IPS[]>([]);
  const [id_type_request, setIdTypeRequest] = useState<number>(0);
  const [arrayTypeRequest, setArrayTypeRequest] = useState<Typerequest[]>([]);

  const [selectedType, setselectedType] = useState<string>("");

  const [arrayCustomerUser, setArrayCustomerUser] = useState<User[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);
  const [arrayUsers, setArrayUsers] = useState<User>();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [show, setShow] = useState(false);
  const [showFinal, setShowFinal] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleClose = () => setShow(false);
  const handleCloseFinal = () => setShowFinal(false);

  const ips: IPS = {
    is_active: true,
    nombre_ips: "",
    cod_ips: "",
    id: 0,
    municipio_id: new Municipio(0, "", ""),
    id_municipio_id: 0,
  };
  const type_of_request: Typerequest = { typerequest: "", id: 0 };
  type formaHtml = React.FormEvent<HTMLFormElement>;
  const subtype_of_request: Subtype_of_request = {
    subtype_request: "",
    type_request_id: type_of_request,
    id: 0,
  };
  const user: User = {
    id: 0,
    name: "",
    email: "",
    password: "",
    last_name: "",
    num_document: "",
    is_active: true,
    document_type: "",
    role: "",
  };
  let { id_CustomerUser2_id, how_it_conclude, answer, doubleLink, object } =
    useForm<Support>(
      new Support(
        0,
        new IPS(0, "", "", true, new Municipio(0, "", ""), 0),
        0,
        new User(0, "", "", "", "", false, "", "", ""),
        0,
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        false,
        false,
        new User(0, "", "", "", "", false, "", "", ""),
        0,
        "",
        new Typerequest(0, ""),
        0,
        new Subtype_of_request(0, "", new Typerequest(0, "")),
        0,
        new Date(),
        new Date(),
        new Date()
      )
    );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [objSupport, setObjProfessional] = useState<Support>(
    new Support(
      0,
      ips,
      0,
      user,
      0,
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      true,
      false,
      user,
      0,
      "",
      type_of_request,
      0,
      subtype_of_request,
      0,
      new Date(),
      new Date(),
      new Date()
    )
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [proccess, setProccess] = useState<boolean>();

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    if (!id_type_request) {
      MessageToastify("error", "Debe seleccionar un tipo de requisito", 3000);
      return;
    }

    console.log("Iniciando búsqueda con tipo de requisito:", id_type_request); // Verifica que se ejecute
    console.log("Tipo de Requisito:", id_type_request);
    try {
      getSupport();
    } catch (error) {
      console.error("Error en la búsqueda:", error);
      MessageToastify("error", "Ocurrió un error en la búsqueda", 3000);
    }
  };

  const getOneSupport = async (id: number) => {
    try {
      const urlGetUser = ApiBack.SUPPORT_LIST_ONE + "/" + id;
      const result = await ServicePrivate.requestGET(urlGetUser);
      setObjProfessional(result);
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

  // const fetchSupports = async () => {
  //   try {
  //     const response = await axios.get(ApiBack.SUPPORT_VIEW); // Asegúrate de usar la URL correcta
  //     setArrayUser(response.data); // Actualiza el estado con los datos de la API
  //   } catch (error) {
  //     console.error("Error al obtener los soportes:", error);
  //   }
  // };

  const getOneSupportFinal = async (id: number) => {
    console.log(id);

    try {
      const urlGetUser = ApiBack.SUPPORT_LIST_ONE + "/" + id;
      const result = await ServicePrivate.requestGET(urlGetUser);
      setObjProfessional(result);
      setShowFinal(true);
    } catch (error) {
      setShow(false);
      const token = localStorage.getItem("access");
      if (token === null) {
        handleTokenError(); // Manejar el error de token
      }
    }
  };

  const getAllUsers = async () => {
    try {
      const results = await ServicePrivate.requestGET(ApiBack.USER_VIEW);
      setArrayCustomerUser(results);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching info USERS:", error);
      setLoading(false);
      // handleTokenError(error); // Manejar el error de token
    }
  };

  const getAllIps = async () => {
    try {
      const results = await ServicePrivate.requestGET(ApiBack.IPS_VIEW);
      setArrayIps(results);
    } catch (error) {
      console.error("Error al obtener las IPS:", error);
      MessageToastify("error", "No se pudieron cargar las IPS.", 7000);
    }
  };
  const getAllTypesrequest = async () => {
    try {
      const results = await ServicePrivate.requestGET(
        ApiBack.TYPE_OF_REQUEST_lIST
      );
      setArrayTypeRequest(results);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching info USERS:", error);
      setLoading(false);
      // handleTokenError(error); // Manejar el error de token
    }
  };

  const handleTokenError = () => {
    navigate("/"); // Go to login session
  };

  const updateProfessionalId = async (supportId: number, newId: number) => {
    const sendUpdatedId = async (currentId: number, newId: number) => {
      setProccess(true);
      console.log("Support ID recibido:", supportId);

      try {
        // Encuentra el soporte en el array
        const updatedProfessional = arraySupport.find(
          (prof) => prof.id === supportId
        );

        if (!updatedProfessional) {
          MessageToastify("error", "Profesional no encontrado.", 7000);
          return;
        }

        // Crear el objeto con el id que deseas actualizar
        const updatedObject = {
          id_CustomerUser2_id: newId,
        };

        const urlUpdate = ApiBack.SUPPORT_UPDATE_USER + "/" + supportId;
        console.log("URL de actualización:", urlUpdate);

        // Realiza la solicitud PUT para actualizar el soporte
        const response = await ServicePrivate.requestPUT(
          urlUpdate,
          updatedObject
        );

        console.log("Respuesta completa:", response); // Verifica la respuesta completa

        // Verificar si la respuesta es exitosa
        if (response?.status === 200) {
          console.error("Error al actualizar el ID:", response?.data);
          MessageToastify(
            "success",
            "Error al actualizar el ID del usuario.",
            7000
          );
        } else {
          MessageToastify("success", "ID actualizado del usuario.", 7000);
          getAllUsers(); // Actualizar la lista de usuarios
          setShow(false); // Cerrar el modal o acción actual
        }
      } catch (error) {
        console.error("Error actualizando el ID del usuario:", error);
        MessageToastify(
          "error",
          "Error al actualizar el ID del usuario en el servidor.",
          7000
        );
      } finally {
        setProccess(false); // Desactivar el proceso cuando termine
      }
    };

    // Llamar a sendUpdatedId con los parámetros necesarios
    sendUpdatedId(supportId, newId);
  };

  const updateSupportDetails = async (
    supportId: number,
    howItConclude: string,
    answer: string
  ) => {
    setProccess(true);
    console.log(supportId);

    try {
      // Encuentra el soporte por ID en el array
      const updatedSupport = arraySupport.find(
        (support) => support.id === supportId
      );

      if (!updatedSupport) {
        console.error("Soporte no encontrado");
        return;
      }

      // Crea un objeto con los campos a actualizar
      const updatedObject = {
        how_it_conclude: howItConclude, // Aquí asignas el nuevo valor
        answer: answer,
        is_active: false,
      };

      const urlUpdate = ApiBack.SUPPORT_UPDATE_DETAILS + "/" + supportId;
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
        getSupport();
      } else {
        MessageToastify("success", "ID actualizado del usuario.", 7000);
        setShowFinal(false);
        getAllUsers();
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

  const getProfessionals = async () => {
    try {
      const myAccess: any = sessionStorage.getItem("access");
      const decodedToken: any = jwtDecode(myAccess);
      const userId = decodedToken.user_id;

      const url = ApiBack.USER_LIST_ONE_ROLE + "/" + userId;
      const results = await ServicePrivate.requestGET(url);

      if (results.role === "ADMINISTRADOR") {
        setIsAdmin(true); // Solo establece isAdmin si el usuario es ADMINISTRADOR
      }
    } catch (error) {
      console.error("Error fetching professionals:", error);
      setLoading(false);
    }
  };

  // const getOneSupport = async (id: number) => {
  //   try {
  //     const urlGetUser = ApiBack.SUPPORT_LIST_ONE + "/" + id;
  //     const result = await ServicePrivate.requestGET(urlGetUser);
  //     setObjProfessional(result);
  //     setShow(true);
  //   } catch (error) {
  //     console.error("Error fetching support:", error);
  //     setShow(false);
  //     const token = localStorage.getItem("access");
  //     if (token === null) {
  //       handleTokenError(); // Manejar el error de token
  //     }
  //   }
  // };

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
      console.log(userId);

      // Crear el objeto para enviar con los campos proporcionados
      const formData = {
        id_ips_id: object.id_ips_id,
        id_CustomerUser_id: userId,
        name_solicited: object.name_solicited,
        number: object.number,
        email: object.email.toLowerCase(), // Convertir email a minúsculas
        requirement: object.requirement,
        answer: object.answer,
        // is_active: isActive, // Variable booleana is_active
        // is_close: isClose, // Variable booleana is_close
        id_CustomerUser2_id: object.id_CustomerUser2_id,
        how_it_conclude: object.how_it_conclude,
        id_type_request_id: object.id_type_request_id,
        id_Subtype_request_id: object.id_Subtype_request_id,
        support_date: object.support_date,
        create_date: object.create_date,
        update_date: object.update_date,
      };

      // Realizar la solicitud POST
      const response = await ServicePrivate.requestPOST(
        ApiBack.SUPPORT_CREATE,
        formData
      );

      if (response.OK) {
        setProcess(false);
        MessageToastify("error", "error al momento de crear el soporte.", 7000);
      } else {
        setProcess(false);
        MessageToastify("success", "soporte creado", 7000);
        navigate("/home/support-view");
      }
    } catch (error) {
      setProcess(false);
      MessageToastify("error", "Error en el momento  crear el soporte.", 7000);
    }
  };
  // const refreshData = () => {
  //   fetchSupports();
  // };
  const fetchIpsData = async () => {
    setProccess(true);

    try {
      const url = ApiBack.IPS_LIST_ONE; // Usa la URL que corresponda para obtener la lista de IPS
      const response = await ServicePrivate.requestGET(url);

      if (response.OK) {
        // Asumiendo que la respuesta viene con los datos de las IPS
        setArrayIps(response.data);
      } else {
        MessageToastify("error", "No se pudieron cargar las IPS.", 7000);
      }
    } finally {
      // catch (error) {
      //   console.error("Error obteniendo los datos de las IPS:", error);
      //   MessageToastify(
      //     "error",
      //     "Error al obtener los datos de las IPS.",
      //     7000
      //   );
      // }
      setProccess(false);
    }
  };

  const getSupport = async () => {
    setLoading(true);
    try {
      // Construye la URL con el filtro de tipo de requerimiento
      const url = `${ApiBack.SUPPORT_VIEW}?page=${page}&limit=${limit}${
        selectedIps ? `&ips=${selectedIps}` : ""
      }${selectedType ? `&typerequest_id=${selectedType}` : ""}`;

      // Realiza la solicitud GET a la API
      const response = await ServicePrivate.requestGET(url);
      console.log(response);

      if (response.results) {
        let filteredResults = response.results;

        // Filtro por tipo de requerimiento (si existe un filtro seleccionado)
        if (
          objSupport.id_type_request_id &&
          objSupport.id_type_request_id !== 0
        ) {
          filteredResults = filteredResults.filter(
            (support: Support) =>
              support.id_type_request_id === objSupport.id_type_request_id
          );
        }

        // Actualiza el estado con los resultados filtrados
        setArraySupport(filteredResults);
        setTotalItems(response.total_count);
        setTotalPages(response.total_pages);
      }
    } catch (error) {
      console.error("Error fetching supports:", error);
      const token = localStorage.getItem("access");
      if (!token) handleTokenError(); // Maneja el error de token si es necesario
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSupport();
  }, [page]);

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const handleIpsChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedIps(event.target.value); // Actualiza el ID de IPS seleccionada
    setPage(1); // Reinicia la paginación al filtrar
  };
  const handleTyoeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setselectedType(event.target.value); // Actualiza el ID de IPS seleccionada
    setPage(1); // Reinicia la paginación al filtrar
  };

  useEffect(() => {
    getSupport();
    getAllUsers();
    getAllTypesrequest();
    getProfessionals();
    getAllIps();
    fetchIpsData();

    // fetchSupports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div>
        <div className="row">
          <div className="page-header">
            <div className="col-lg-2 col-sm-12">
              <h3 style={{ fontWeight: "bold" }}>Soportes</h3>
            </div>

            <div className="col-lg-5 col-sm-6 d-flex align-items-center">
              <Form.Group className="mb-3 me-2 flex-grow-1" controlId="formIps">
                <Form.Label>Seleccionar IPS</Form.Label>
                <Form.Select value={selectedIps} onChange={handleIpsChange}>
                  <option value="">Todas las IPS</option>
                  {arrayIps.map((ips) => (
                    <option key={ips.id} value={ips.id}>
                      {ips?.municipio_id?.nombre_municipio} - {ips.nombre_ips} (
                      {ips.cod_ips})
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <div className="col-lg-5 col-sm-12">
                <Form.Group className="mb-3" controlId="formIps">
                  <Form.Label>Seleccionar tipo de solicitud</Form.Label>
                  <Form.Select value={selectedType} onChange={handleTyoeChange}>
                    <option value="">Todas las solicitudes</option>
                    {arrayTypeRequest.map((type) => (
                      <option key={type.id} value={type.id}>
                        {type.typerequest}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </div>

              <Button
                type="submit"
                className="badge fs-6 p-2 pe-2 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-pill"
                variant="primary"
                onClick={getSupport}
                style={{ marginRight: "10px", marginTop: "18px" }}
              >
                <i className="fa-solid fa-magnifying-glass"></i>&nbsp;Buscar
              </Button>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="page-header">
            <div className="col-lg-6 col-sm-12"></div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 grid-margin stretch-card">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title fs-4">
                  <i className="fa-solid fa-list"></i>&nbsp;Listado
                </h4>
                <div
                  className="pagination-info"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <p className="boldText">
                    Total de soportes en esta página: {arraySupport.length}
                  </p>
                  <p className="boldText">Total de soportes: {totalItems}</p>
                  <p className="boldText">Total de páginas: {totalPages}</p>
                </div>
                <div className="table-responsive">
                  <table className="table table-striped table-sm rounded-table">
                    <thead className="table-dark">
                      <tr>
                        <th scope="col">Solicitante del soporte</th>
                        <th scope="col">Tipo de solicitud</th>
                        <th scope="col">Estado del requerimiento</th>
                        <th scope="col">IPS</th>
                        <th scope="col">Heredar</th>
                      </tr>
                    </thead>
                    <tbody className="table-group-divider">
                      {arraySupport.length === 0 && (
                        <tr>
                          <td colSpan={6} className="text-center">
                            <p>No hay resultados</p>
                          </td>
                        </tr>
                      )}
                      {arraySupport.length > 0 &&
                        arraySupport.map((support) => (
                          <tr key={support.id}>
                            <td>
                              <p>{support.name_solicited}</p>
                            </td>

                            <td>
                              <p>{support.typerequest_id?.typerequest}</p>
                            </td>
                            <td
                              className={
                                support.is_active ? "inactive" : "active"
                              }
                            >
                              <p>
                                {support.is_active
                                  ? "Sin Resolver"
                                  : "Resuelto"}
                              </p>
                            </td>
                            <td>
                              <p>{support.id_ips.nombre_ips}</p>
                            </td>
                            <td>
                              <p>
                                <button
                                  className={
                                    support.id_CustomerUser2
                                      ? "badge fs-6 py-1 pe-2 text-success-emphasis bg-success-subtle border border-success-subtle rounded-pill"
                                      : "badge fs-6 py-1 pe-2 text-success-emphasis bg-success-subtle border border-success-subtle rounded-pill"
                                  }
                                  type="button"
                                  onClick={() => getOneSupport(support.id)}
                                >
                                  {support.id_CustomerUser2
                                    ? "Cambiar"
                                    : "Activar"}
                                </button>
                                <button
                                  className={
                                    support.answer || support.how_it_conclude
                                      ? "badge fs-6 py-1 pe-2 text-success-emphasis bg-success-subtle border border-success-subtle rounded-pill"
                                      : "badge fs-6 py-1 pe-2 text-success-emphasis bg-success-subtle border border-success-subtle rounded-pill"
                                  }
                                  type="button"
                                  onClick={() => getOneSupportFinal(support.id)}
                                  style={{ marginLeft: "10px" }}
                                >
                                  {support.answer || support.how_it_conclude
                                    ? "Continuar"
                                    : "Finalizar"}
                                </button>
                              </p>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                <div className="d-flex align-items-center justify-content-center m-3">
                  <nav className="d-flex align-items-center justify-content-center">
                    <button
                      className="badge fs-6 p-3 pe-2 px-2 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-pill"
                      onClick={handlePreviousPage}
                      disabled={page === 1}
                    >
                      <i className="fa-solid fa-arrow-left"></i>&nbsp;Anterior
                    </button>
                    <span className="fs-6">
                      Página {page} de {totalPages}
                    </span>
                    <button
                      className="badge fs-6 p-3 pe-2 px-2 text-primary-emphasis bg-primary-subtle border border-primary-subtle rounded-pill"
                      onClick={handleNextPage}
                      disabled={page === limit}
                    >
                      Siguiente&nbsp;
                      <i className="fa-solid fa-arrow-right"></i>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
            {/* Modal para eliminar */}
            {/* ***************************/}
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
                  <i className="fa-regular fa-circle-xmark"></i>&nbsp;Cambiar
                  Encargado
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                ¿Realmente desea cambiar el encargado del soporte?
                <br />
                Encargado actual:&nbsp;
                <strong>{objSupport.id_CustomerUser.name}</strong>
                <br />
                <div className="col-lg-12">
                  <Form
                    className="forms-sample"
                    validated={process}
                    onSubmit={sendForm} // Se encarga de guardar el objeto actualizado
                    noValidate
                    ref={formRef}
                  >
                    <Form.Group controlId="id_CustomerUser2_id">
                      <Form.Label
                        className="fw-bold mb-2 mt-2"
                        htmlFor="id_CustomerUser2_id"
                      >
                        Nuevo Encargado:
                      </Form.Label>
                      <Form.Select
                        required
                        id="id_CustomerUser2_id"
                        name="id_CustomerUser2_id"
                        value={id_CustomerUser2_id}
                        onChange={doubleLink}
                        className="form-select"
                      >
                        <option value="">Seleccione al nuevo encargado</option>
                        {arrayCustomerUser.map((user) => (
                          <option value={user.id} key={user.id}>
                            {`${user.role} - ${user.name}`}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        Seleccione al nuevo encargado.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Form>
                </div>
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
                    console.log("ID del nuevo encargado:", id_CustomerUser2_id);
                    updateProfessionalId(objSupport.id, id_CustomerUser2_id);
                  }}
                >
                  {objSupport.id_CustomerUser2_id ? (
                    <>
                      <i className="fas fa-exchange-alt"></i>
                      &nbsp;Cambiar
                    </>
                  ) : (
                    <>Confirmar</>
                  )}
                </Button>
              </Modal.Footer>
            </Modal>

            <Modal
              show={showFinal}
              onHide={handleCloseFinal}
              backdrop="static"
              keyboard={false}
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title className="text-center fw-bold">
                  <i className="fa-regular fa-circle-xmark"></i>&nbsp;Finalizar
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                ¿Realmente desea finalizar el soporte?
                <br />
                Como concluye el soporte?
                <br />
                <div className="col-lg-12">
                  <Form
                    className="forms-sample"
                    validated={process}
                    onSubmit={(e) => {
                      e.preventDefault(); // Evita el envío del formulario por defecto
                      // Llama a la función para actualizar el soporte
                      updateSupportDetails(
                        objSupport.id,
                        how_it_conclude,
                        answer
                      );
                    }}
                    noValidate
                    ref={formRef}
                  >
                    <Form.Group controlId="how_it_conclude">
                      <Form.Label className="fw-bold mb-2 mt-2">
                        Como concluye:
                      </Form.Label>
                      <Form.Select
                        required
                        name="how_it_conclude"
                        className="form-select shadow-lg border-2 border-yellow-500"
                        id="how_it_conclude"
                        value={how_it_conclude}
                        onChange={doubleLink}
                      >
                        <option value="">Selecciona una opción</option>
                        <option value="EXISTOSO">EXISTOSO</option>
                        <option value="NO_EXISTOSO">NO EXISTOSO</option>
                        <option value="EN_PROGRESO">EN PROGRESO</option>
                        <option value="PENDIENTE">PENDIENTE</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        Como concluye es obligatorio
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="answer">
                      <Form.Label className="fw-bold mb-2 mt-2">
                        Respuesta:
                      </Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="answer"
                        className="form-control shadow-lg border-2 border-yellow-500"
                        id="answer"
                        value={answer}
                        onChange={doubleLink}
                        autoComplete="off"
                      />
                      <Form.Control.Feedback type="invalid">
                        Respuesta:
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Form>
                </div>
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
                  onClick={(e) => {
                    e.preventDefault(); // Evita el envío del formulario por defecto
                    // Llama a la función para actualizar el soporte
                    updateSupportDetails(
                      objSupport.id,
                      how_it_conclude,
                      answer
                    );
                  }}
                >
                  {objSupport.id_CustomerUser2_id ? (
                    <>
                      <i className="fas fa-exchange-alt"></i>
                      &nbsp;Cambiar
                    </>
                  ) : (
                    <>Confirmar</>
                  )}
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
