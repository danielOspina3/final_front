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
import axios from "axios";

import Typerequest from "../../../models/type_of_request";
import Subtype_of_request from "../../../models/sub_type_of_request";
import { useForm } from "../../../utils/hooks/useForm";
import { jwtDecode } from "jwt-decode";
import Municipio from "../../../models/municipio";
import { jsPDF } from "jspdf";

export const ViewSupportFinal = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [process, setProcess] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);
  const [arraySupport, setArrayUser] = useState<Support[]>([]);
  const [arrayCustomerUser, setArrayCustomerUser] = useState<User[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);
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

  function submitHandler(e: any) {
    e.preventDefault();
  }

  // prettier-ignore

  const Excel = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/support-export', {
        responseType: "blob",
      });
  
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = "soportes_pacientes.xlsx";
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error("Error al exportar a Excel:", error);
      alert("No se pudo exportar el archivo. Intenta de nuevo.");
    }
  };

  const PDFExport = async () => {
    try {
      // Create a new jsPDF instance
      const doc = new jsPDF();

      // Add title or any custom content
      doc.setFontSize(18);
      doc.text("Soportes de Pacientes", 14, 22);

      // Set font size for the content
      doc.setFontSize(12);

      // Define starting Y position for the table content
      let startY = 30;

      // Loop through the array of data and add each row
      arraySupport.forEach((myProfessional, index) => {
        const content = [
          `Solicitante del soporte: ${myProfessional.name_solicited}`,
          `Teléfono: ${myProfessional.number}`,
          `Tipo de solicitud: ${myProfessional.typerequest_id.typerequest}`,
          `Respuesta: ${myProfessional.answer}`,
          `Cómo concluye: ${myProfessional.how_it_conclude}`,
          `Estado: ${myProfessional.is_active ? "Sin Resolver" : "Resuelto"}`,
        ];

        // Add the content to the PDF document
        content.forEach((line, lineIndex) => {
          doc.text(line, 14, startY + lineIndex * 10); // Adjust the line height as needed
        });

        // After each row of content, add some spacing before the next one
        startY += content.length * 10 + 5; // Adjust the spacing between rows
      });

      // Save the PDF to the user's device
      doc.save("soportes_pacientes.pdf");
    } catch (error) {
      console.error("Error al exportar a PDF:", error);
      alert("No se pudo exportar el archivo PDF. Intenta de nuevo.");
    }
  };

  const getSupport = async () => {
    try {
      const results = await ServicePrivate.requestGET(
        ApiBack.SUPPORT_VIEW_FINAL
      );
      console.log(results);
      setArrayUser(results);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching supports:", error);
      setLoading(false);
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

  const handleTokenError = () => {
    navigate("/"); // Go to login session
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

  useEffect(() => {
    getSupport();
    getAllUsers();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div>
        <div className="row">
          <div className="page-header">
            <div className="col-lg-6 col-sm-12">
              <h3 style={{ fontWeight: "bold" }}>Soportes</h3>
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
                        <th scope="col">Solicitante del soporte</th>
                        <th scope="col">Teléfono</th>
                        <th scope="col">Tipo de solicitud</th>
                        <th scope="col">Respuesta</th>
                        <th scope="col">Cómo concluye</th>
                        <th scope="col">Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {arraySupport.length === 0 && (
                        <tr>
                          <td colSpan={6} className="text-center">
                            <p>No hay resultados</p>
                          </td>
                        </tr>
                      )}

                      {arraySupport
                        .filter((myProfessional) => {
                          return search === ""
                            ? myProfessional
                            : myProfessional.id_CustomerUser_id;
                        })
                        .map((myProfessional, count) => (
                          <tr key={count + 1}>
                            <td>
                              <p>{myProfessional.name_solicited}</p>
                            </td>
                            <td>
                              <p>{myProfessional.number}&nbsp;</p>
                            </td>
                            <td>
                              <p>
                                {myProfessional.typerequest_id.typerequest}
                                &nbsp;
                              </p>
                            </td>
                            <td>
                              <p>{myProfessional.answer}&nbsp;</p>
                            </td>
                            <td>
                              <p>{myProfessional.how_it_conclude}&nbsp;</p>
                            </td>
                            <td
                              style={{
                                backgroundColor: myProfessional.is_active
                                  ? "lightcoral" // Color para "Sin Resolver"
                                  : "lightgreen", // Color para "Resuelto"
                              }}
                            >
                              <p>
                                {myProfessional.is_active
                                  ? "Sin Resolver"
                                  : "Resuelto"}
                              </p>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                  <div className="d-flex justify-content-center align-items-center">
                    <button
                      className="badge fs-6 p-3 pe-2 px-2 text-success-emphasis bg-success-subtle border border-success-subtle rounded-pill mx-2"
                      onClick={Excel}
                    >
                      Exportar&nbsp;
                      <i className="fa-solid fa-file-excel"></i>
                    </button>
                    <button
                      className="btn btn-outline-info button-create badge d-flex align-items-center fs-6 p-3 pe-3 text-warning-emphasis bg-warning-subtle border border-warning-subtle rounded-pill mx-2"
                      onClick={PDFExport}
                    >
                      Exportar a PDF&nbsp;
                      <i className="fa-solid fa-file-pdf"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Modal para eliminar */}
            {/* *********************************************************************************/}
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};
