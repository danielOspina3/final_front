import { useEffect, useState } from "react";
import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import ServicePrivate from "../../../services/ServicePrivate";
import ApiBack from "../../../utils/domains/ApiBack";
import { useNavigate } from "react-router-dom";
import { MessageToastify } from "../../../utils/funtions/MessageToastify";
import { ToastContainer } from "react-toastify";
import User from "../../../models/user";

export const ViewUser = () => {
  const [arrayUser, setarrayUser] = useState<User[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [search, setSearch] = useState("");
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [objProfessional, setObjProfessional] = useState<User>(
    new User(0, "", "", "", "", false, "", "", "")
  );
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [proccess, setProccess] = useState<boolean>();

  function submitHandler(e: any) {
    e.preventDefault();
  }

  // const getProfessionals = async () => {
  //   try {
  //     const results = await ServicePrivate.requestGET(ApiBack.USER_VIEW);
  //     console.log(results.result);
  //     setarrayUser(results.result);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error("Error fetching professionals:", error);
  //     setLoading(false);
  //     const token = localStorage.getItem("access");
  //     if (token === null) {
  //       handleTokenError(); // Manejar el error de token
  //     }
  //   }
  // };

  const getOneUser = async (id: number) => {
    try {
      const urlGetUser = ApiBack.USER_LIST_ONE + "/" + id;
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
  const getUsers = async () => {
    setLoading(true);
    try {
      const response = await ServicePrivate.requestGET(
        `${ApiBack.USERS_VIEW}?page=${page}&limit=${limit}`
      );
      console.log(response.results);

      if (response.results) {
        setarrayUser(response.results);
        setTotalItems(response.total_count);
        setTotalPages(response.total_pages);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      const token = localStorage.getItem("access");
      if (!token) handleTokenError();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsers();
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

  const handleTokenError = () => {
    navigate("/"); // Go to login session
  };

  const sendIsActivated = async (id: number) => {
    setProccess(true);
    const token = localStorage.getItem("access");
    if (token === null) handleTokenError();

    try {
      // Encuentra el profesional por ID en el array
      const updatedProfessional = arrayUser.find((prof) => prof.id === id);

      if (!updatedProfessional) {
        console.error("Profesional no encontrado");
        return;
      }

      // Invierte el estado is_active
      const updatedObject = {
        ...updatedProfessional,
        is_active: !updatedProfessional.is_active,
      };

      const urlUpdate = ApiBack.USER_UPDATE_STATUS + "/" + id;
      const response = await ServicePrivate.requestPUT(
        urlUpdate,
        updatedObject
      );

      if (response.OK) {
        MessageToastify(
          "error",
          "Error en el momento de Actualizar al usuario.",
          7000
        );
      } else {
        MessageToastify("success", "Estado actualizado del usuario.", 7000);
        getUsers();
      }
    } catch (error) {
      console.error("Error updating usuario:", error);
      MessageToastify(
        "error",
        "Error en el momento de Actualizar al usuario en el servidor.",
        7000
      );
    } finally {
      setProccess(false);
    }
  };

  //hook for create and use actions necessary to use in this page
  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div>
        <div className="row">
          <div className="page-header">
            <div className="col-lg-6 col-sm-12">
              <h3 className="page-title fs-3 fw-bold">
                <i className="fa-solid fa-users"></i>&nbsp;Usuarios
              </h3>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb breadcrumb-chevron"></ol>
              </nav>
            </div>
            <div className="col-lg-6 col-sm-12">
              <Form
                role="search"
                id="form-professional"
                onSubmit={submitHandler}
              >
                <InputGroup className="">
                  <Form.Control
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Buscar usuario"
                  ></Form.Control>
                </InputGroup>
              </Form>
            </div>
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
                    Total de soportes en esta página: {arrayUser.length}
                  </p>
                  <p className="boldText">Total de soportes: {totalItems}</p>
                  <p className="boldText">Total de páginas: {totalPages}</p>
                </div>
                {/* <p className="card-description"> Add className <code>.table-striped</code>
                </p> */}
                <div className="table-responsive">
                  <table className="table table-striped table-sm rounded-table">
                    <thead className="table-dark">
                      <tr>
                        <th scope="col">Nombres</th>
                        <th scope="col">Apellidos</th>
                        <th scope="col">Email</th>
                        <th scope="col">Documento</th>
                        <th scope="col">Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {arrayUser
                        .filter((myProfessional) => {
                          return search === ""
                            ? myProfessional
                            : myProfessional.name
                                .toLowerCase()
                                .includes(search.toLowerCase());
                        })
                        .map((myProfessional, count) => (
                          <tr key={count + 1}>
                            <td>
                              <p>{myProfessional.name}&nbsp;</p>
                            </td>
                            <td>
                              <p>{myProfessional.last_name}&nbsp;</p>
                            </td>
                            <td>
                              <p>{myProfessional.email}</p>
                            </td>
                            <td>
                              <p>
                                {myProfessional.document_type}{" "}
                                {myProfessional.num_document}
                              </p>
                            </td>
                            <td>
                              {/* <button
                                className="btn btn-danger rounded-pill px-3"
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  setShow(true);
                                  setObjProfessional(myProfessional);
                                }}
                              >
                                <i className="fa-solid fa-trash"></i>
                                &nbsp;
                              </button> */}
                              <button
                                className={
                                  myProfessional.is_active
                                    ? "badge fs-6 py-1 pe-2 text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-pill"
                                    : "badge fs-6 py-1 pe-2 text-success-emphasis bg-success-subtle border border-success-subtle rounded-pill"
                                }
                                type="button"
                                onClick={() => getOneUser(myProfessional.id)}
                              >
                                {myProfessional.is_active ? (
                                  <>
                                    <i className="fas fa-times"></i>
                                    &nbsp;Inactivar
                                  </>
                                ) : (
                                  <>
                                    <i className="fas fa-check"></i>
                                    &nbsp;Activar
                                  </>
                                )}
                              </button>
                              &nbsp;&nbsp;
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
            {/* *********************************************************************************/}
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
                  <i className="fa-regular fa-circle-xmark"></i>&nbsp;
                  {objProfessional.is_active
                    ? "Inactivar usuario"
                    : "Activar usuario"}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                ¿Realmente desea{" "}
                {objProfessional.is_active ? "inactivar" : "activar"} al
                usuario?
                <br />
                Documento:&nbsp;
                <strong>{objProfessional.num_document}</strong>
                <br />
                Nombre:&nbsp;
                <strong>
                  {objProfessional.name} {objProfessional.last_name}
                </strong>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={(e) => {
                    setShow(false);
                  }}
                >
                  <i className="fa-solid fa-backward"></i>
                  &nbsp; Cancelar
                </Button>
                <Button
                  variant="success"
                  onClick={(e) => {
                    sendIsActivated(objProfessional.id);
                    setShow(false);
                  }}
                >
                  {/* <i className="fa-solid fa-circle-xmark"></i>
                  &nbsp;Confirmar */}
                  {objProfessional.is_active ? (
                    <>
                      <i className="fas fa-times"></i>
                      &nbsp;Inactivar
                    </>
                  ) : (
                    <>
                      <i className="fas fa-check"></i>
                      &nbsp;Activar
                    </>
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
