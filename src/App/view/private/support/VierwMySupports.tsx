import { useEffect, useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import ServicePrivate from "../../../services/ServicePrivate";
import ApiBack from "../../../utils/domains/ApiBack";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { jwtDecode } from "jwt-decode";

export const ViewSupportMY = () => {
  const [arraySupport, setArraySupport] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [selectedSupport, setSelectedSupport] = useState<any>(null);
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);

  const getPatientId = (): number | null => {
    const token = localStorage.getItem("access");
    if (!token) return null;
    const decodedToken: any = jwtDecode(token);
    return decodedToken.user_id; // Asegúrate de que 'user_id' es el campo correcto
  };

  const getMySupports = async () => {
    const patientId = getPatientId();
    if (!patientId) {
      navigate("/"); // Redirige si no hay token
      return;
    }

    try {
      const results = await ServicePrivate.requestGET(
        `${ApiBack.SUPPORT_MY}/${patientId}`
      );
      console.log("Resultados de la API:", results);

      // Asegúrate de que results sea un arreglo
      if (Array.isArray(results)) {
        setArraySupport(results);
      } else {
        console.error("Los datos recibidos no son un arreglo:", results);
        setArraySupport([]); // Resetea el estado si no es un arreglo
      }
    } catch (error) {
      console.error("Error fetching supports:", error);
      navigate("/"); // Redirige si hay un error
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => setShow(false);

  const handleShow = (support: any) => {
    setSelectedSupport(support);
    setShow(true);
  };

  useEffect(() => {
    getMySupports();
  }, []);

  return (
    <>
      <div>
        <div className="row">
          <div className="page-header">
            <div className="col-lg-6 col-sm-12">
              <h3 style={{ fontWeight: "bold" }}>Mis Soportes</h3>
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
                <div className="table-responsive">
                  <table className="table table-striped table-sm rounded-table">
                    <thead className="table-dark">
                      <tr>
                        <th>Solicitante</th>
                        <th>Teléfono</th>
                        <th>Tipo de solicitud</th>
                        <th>Requerimiento</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan={5} className="text-center">
                            Cargando...
                          </td>
                        </tr>
                      ) : (
                        <>
                          {arraySupport.length === 0 ? (
                            <tr>
                              <td colSpan={5} className="text-center">
                                <p>No hay resultados</p>
                              </td>
                            </tr>
                          ) : (
                            arraySupport
                              .filter((support) =>
                                search === ""
                                  ? true
                                  : support.requirement
                                      .toLowerCase()
                                      .includes(search.toLowerCase())
                              )
                              .map((support) => (
                                <tr key={support.id}>
                                  <td>{support.name_solicited}</td>
                                  <td>{support.number}</td>
                                  <td>{support.typerequest_id?.typerequest}</td>
                                  <td>{support.requirement}</td>
                                  <td>
                                    <button
                                      className={
                                        support.id_CustomerUser2
                                          ? "badge fs-6 py-1 pe-2 text-warning-emphasis bg-warning-subtle border border-warning-subtle rounded-pill"
                                          : "badge fs-6 py-1 pe-2 text-warning-emphasis bg-warning-subtle border border-warning-subtle rounded-pill"
                                      }
                                      type="button"
                                      onClick={() => handleShow(support)}
                                    >
                                      <i className="fas fa-eye"></i>
                                      &nbsp;Ver
                                    </button>
                                  </td>
                                </tr>
                              ))
                          )}
                        </>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal para ver detalles del soporte */}
        <Modal show={show} onHide={handleClose} size="lg" centered>
          <Modal.Header closeButton>
            <Modal.Title>Detalles del Soporte</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedSupport && (
              <div>
                <p>
                  <strong>Solicitante:</strong> {selectedSupport.name_solicited}
                </p>
                <p>
                  <strong>Teléfono:</strong> {selectedSupport.number}
                </p>
                <p>
                  <strong>Requerimiento:</strong> {selectedSupport.requirement}
                </p>
                <p>
                  <strong>Conclusión:</strong>{" "}
                  {selectedSupport.how_it_conclude || "Sin información"}
                </p>
                <p>
                  <strong>Respuesta:</strong> {selectedSupport.answer}
                </p>
                <p>
                  <strong>Estado:</strong>{" "}
                  {selectedSupport.is_active ? "Activo" : "Inactivo"}
                </p>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>

        <ToastContainer />
      </div>
    </>
  );
};
