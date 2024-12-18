import { jwtDecode } from "jwt-decode";
import React, { useEffect, useRef, useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import IPS from "../../../models/Ips";
import {
  default as Subtype_of_request,
  default as Subtype_request,
} from "../../../models/sub_type_of_request";
import Support from "../../../models/support";
import Typerequest from "../../../models/type_of_request";
import User from "../../../models/user";
import ServicePrivate from "../../../services/ServicePrivate";
import ApiBack from "../../../utils/domains/ApiBack";
import { MessageToastify } from "../../../utils/funtions/MessageToastify";
import { useForm } from "../../../utils/hooks/useForm";
import { Button } from "react-bootstrap";
import Municipio from "../../../models/municipio";

export const CreateSupport = () => {
  const [process, setProcess] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);

  const [arrayUsers, setArrayUsers] = useState<User>();
  const [seleccion, setSeleccion] = useState<"si" | "no" | null>(null);

  const [arrayIps, setArrayips] = useState<IPS[]>([]);
  const [arraytyperequest, setArraytype_request] = useState<Typerequest[]>([]);
  const [arraysubtype_of_request, setArraysubtype_of_request] = useState<
    Subtype_of_request[]
  >([]);
  const [data, setData] = useState([]);

  const [arrayCustomerUser, setArrayCustomerUser] = useState<User[]>([]);

  const [arrayCustomerUserLogin, setArrayCustomerUserlogin] = useState<User[]>(
    []
  );
  const [arrayCustomerUser2, setArrayCustomerUser2] = useState<User[]>([]);
  const [objUser, setObjUser] = useState<User>();
  const [allReady, setAllReady] = useState(false);
  type formaHtml = React.FormEvent<HTMLFormElement>;

  const [selectedTypeRequest, setSelectedTypeRequest] = useState("");
  const [subtypes, setSubtypes] = useState<Subtype_request[]>([]);
  const [supportDate, setSupportDate] = useState<string | null>(null);
  //constants for create user
  const [isProfessional, setIsProfessional] = useState(false);
  const navigate = useNavigate();
  const handleSupportDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSupportDate(event.target.value);
    object.support_date = new Date(event.target.value); // Actualiza el objeto principal
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);

  const myNavigate = useNavigate();

  const handleTokenError = () => {
    myNavigate("/"); // Redirigir a la página de inicio de sesión
  };

  const handleSubmit = () => {
    // Lógica para manejar el submit
    console.log("Botón guardado!");
  };
  const MyComponent = () => {
    const handleKeyDown = (event: React.KeyboardEvent) => {
      if (event.key === "Enter") {
        // Simula el clic del botón
        handleSubmit();
      }
    };
  };

  const getProfessionals = async () => {
    try {
      const myAccess: any = sessionStorage.getItem("access");
      const decodedToken: any = jwtDecode(myAccess);
      const userId = decodedToken.user_id;
      const url = ApiBack.USER_LIST_ONE + "/" + userId;
      const results = await ServicePrivate.requestGET(url);
      console.log(results);

      sessionStorage.setItem("user", results.num_document);
      if (results) {
        setArrayUsers(results);
        setLoading(false);
      }
      const token = sessionStorage.getItem("access");
      if (token === null) {
        handleTokenError(); // Manejar el error de token
      }
    } catch (error) {
      console.error("Error fetching professionals:", error);
      setLoading(false);
      const token = localStorage.getItem("access");
      if (token === null) {
        handleTokenError(); // Manejar el error de token
      }
    }
  };

  // constants for create user

  let {
    id_ips_id,
    id_CustomerUser_id,
    id_CustomerUser,
    role2,
    medio,
    name_solicited, //ya
    number,
    email,
    requirement,
    answer,
    is_active,
    is_close,
    id_CustomerUser2_id,
    id_CustomerUser2,
    how_it_conclude,
    id_type_request_id,
    typerequest_id,
    id_Subtype_request_id,
    support_date,
    create_date,
    update_date,
    doubleLink,
    object,
  } = useForm<Support>(
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
      true,
      false,
      new User(0, "", "", "", "", false, "", "", ""),
      0,
      "",
      new Typerequest(0, ""),
      0,
      new Subtype_request(0, "", new Typerequest(0, "")),
      0,
      new Date(),
      new Date(),
      new Date()
    )
  );

  const [isActive, setIsActive] = useState<boolean>(is_active);
  const [isClose, setIsClose] = useState<boolean>(is_close);

  // const getOneUser = async () => {
  //   try {
  //     const urlLoadOneUser = `${ApiBack.USER_LIST_ONE}/${id_CustomerUser2}`;
  //     const response = await ServicePrivate.requestGET(urlLoadOneUser);
  //     if (response) {
  //       setObjUser(response);
  //       setAllReady(true);
  //     }
  //   } catch (error) {
  //     setAllReady(false);
  //     MessageToastify("error", "Error al cargar los datos del usuario.", 7000);
  //   }
  // };

  const getAllUser = async () => {
    try {
      const myAccess: any = sessionStorage.getItem("access");
      const decodedToken: any = jwtDecode(myAccess);
      const userId = decodedToken.user_id;
      console.log(userId);

      const url = ApiBack.USER_LIST_ONE + "/" + userId;
      const results = await ServicePrivate.requestGET(url);
      console.log(results);

      // Extraer solo el ID del usuario
      const customerUserId = results.id_CustomerUser?.id; // Asigna null si no existe

      // Almacenar solo el ID en sessionStorage
      if (customerUserId !== null) {
        sessionStorage.setItem("user", customerUserId.toString());
      }

      setLoading(false); // Finaliza la carga

      const token = sessionStorage.getItem("access");
      if (token === null) {
        handleTokenError(); // Manejar el error de token
      }
    } catch (error) {
      console.error("Error fetching professionals:", error);
      setLoading(false);
      const token = localStorage.getItem("access");
      if (token === null) {
        handleTokenError(); // Manejar el error de token
      }
    }
  };

  const cleanBox = (form: HTMLFormElement) => {
    form.reset();

    object.name_solicited = "";
    object.role2 = "";
    object.medio = "";
    object.id_CustomerUser = new User(0, "", "", "", "", false, "", "", "");
    object.number = "";
    object.email = "";
    object.requirement = "";
    object.answer = "";
    object.is_active = true;
    object.is_close = false;
    object.id_CustomerUser2 = new User(0, "", "", "", "", false, "", "", "");
    object.how_it_conclude = "";
    object.typerequest_id = new Typerequest(0, "");
    object.subtype_request = new Subtype_of_request(
      0,
      "",
      new Typerequest(0, "")
    );
    object.support_date = new Date();
    object.create_date = new Date();
    object.update_date = new Date();
    object.id_ips_id = 0;

    // Limpiar cada campo de entrada directamente
    (form.querySelector('[name="name_solicited"]') as HTMLInputElement).value =
      "";
    (form.querySelector('[name="role2"]') as HTMLInputElement).value = "";
    (form.querySelector('[name="number"]') as HTMLInputElement).value = "";
    (form.querySelector('[name="email"]') as HTMLInputElement).value = "";
    (form.querySelector('[name="requirement"]') as HTMLInputElement).value = "";

    // Restablecer el estado de selección para la opción "Sí" y "No"
    setSeleccion(null); // o el valor inicial que desees

    form.classList.remove("was-validated");
  };

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
        // Aquí NO llamamos a cleanBox, ya que queremos que los datos permanezcan en los campos
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
        role2: object.role2,
        medio: object.medio,
        name_solicited: object.name_solicited,
        number: object.number,
        email: object.email.toLowerCase(), // Convertir email a minúsculas
        requirement: object.requirement,
        answer: object.answer || "",
        is_active: object.how_it_conclude || object.answer ? false : isActive, // Condicional para is_active
        is_close: object.how_it_conclude || object.answer ? true : isClose, // Condicional para is_close
        id_CustomerUser2_id: arrayUsers?.id,
        how_it_conclude: object.how_it_conclude || "",
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
        MessageToastify("error", "Error al momento de crear el soporte.", 7000);
      } else {
        setProcess(false);
        MessageToastify("success", "Soporte creado exitosamente.", 5000);
        // Limpiar el formulario solo si deseas hacerlo al final
        setTimeout(() => {
          cleanBox(form); // Comentado para que no limpie los campos después de "Guardar"
        }, 5000);
      }
    } catch (error) {
      setProcess(false);
      MessageToastify(
        "error",
        "Error en el momento de crear el soporte. VERIFIQUE LOS DATOS INGRESADOS.",
        7000
      );
    }
  };

  const handleSiClick = () => setSeleccion("si");
  const handleNoClick = () => setSeleccion("no");
  // const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const checked = event.target.checked;
  //   setIsActive(checked);
  //   object.is_active = checked; // Actualiza también el objeto
  // };

  // const handleRoleChange = (e: any) => {
  //   const selectedRole = e.target.value;
  //   object
  //   console.log(selectedRole);
  //   doubleLink(e);
  //   // eslint-disable-next-line eqeqeq
  //   if (selectedRole == 2) {
  //     setIsProfessional(true);
  //   }
  //   // eslint-disable-next-line eqeqeq
  //   if (selectedRole != 2) {
  //     setIsProfessional(false);
  //   }
  // };

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
      const results = await ServicePrivate.requestGET(ApiBack.IPS_VIEW_ACTIVE);
      setArrayips(results);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching info ips:", error);
      setLoading(false);
      // handleTokenError(error); // Manejar el error de token
    }
  };

  const getAllTypesrequest = async () => {
    try {
      const results = await ServicePrivate.requestGET(
        ApiBack.TYPE_OF_REQUEST_lIST
      );
      setArraytype_request(results);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching info type request:", error);
      setLoading(false);
      // handleTokenError(error); // Manejar el error de token
    }
  };

  const getSubtypesByType = async (typerequestId: string) => {
    try {
      const results = await ServicePrivate.requestGET(
        `${ApiBack.SUBTYPE_OF_REQUEST_LIST_TYPE}/${typerequestId}`
      );
      setSubtypes(results);
      console.log(results);
    } catch (error) {
      console.error("Error fetching subtypes:", error);
    }
  };

  // const handleTypeRequestChange = async (
  //   e: React.ChangeEvent<HTMLSelectElement>
  // ) => {
  //   const selectedType = e.target.value;
  //   setSelectedTypeRequest(selectedType);

  //   // Llamar a la función para obtener los subtipos
  //   if (selectedType) {
  //     await getSubtypesByType(selectedType);
  //   }
  // };

  // const handleCheckboxChange2 = (
  //   event: React.ChangeEvent<HTMLInputElement>
  // ) => {
  //   const checked = event.target.checked;
  //   setIsClose(checked);
  //   object.is_close = checked; // Actualiza aquí el objeto
  // };
  const fetchData = async () => {
    const response = await fetch(ApiBack.SUPPORT_VIEW); // Llama a la API para obtener los datos
    const result = await response.json();
    setData(result); // Actualiza el estado con los datos obtenidos
  };

  useEffect(() => {
    getAllIps();
    getAllUsers();
    getAllTypesrequest();
    getAllUser();
    fetchData();
    MyComponent();
    getProfessionals();
    // getSubtypesByType("");
  }, []);
  return (
    <>
      <div>
        <div className="page-header">
          <div className="row">
            <div className="col-ls-6 col-sm-12">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb breadcrumb-chevron"></ol>
              </nav>
            </div>
          </div>
        </div>
        <div className="row d-flex">
          <div className="col-12 grid-margin stretch-card justify-content-center">
            <div className="card">
              <div className="card-body,padding-5">
                <h4
                  className="card-title"
                  style={{ textAlign: "center", padding: "10px" }}
                >
                  <i className="fa-solid fa-folder-plus"></i> &nbsp;Formulario
                  de creación
                </h4>
                <Form
                  className="forms-sample"
                  validated={process}
                  onSubmit={sendForm}
                  noValidate
                  ref={formRef}
                >
                  <div className="row ms-lg-5 me-lg-5">
                    <div className="row">
                      <div className="row">
                        <div className="col-lg-8 col-sm-6">
                          <Form.Group controlId="id_ips_id">
                            <Form.Label
                              className="fw-bold mb-2 mt-2"
                              htmlFor="id_ips_id"
                            >
                              Ips:
                            </Form.Label>
                            <Form.Select
                              required
                              id="id_ips_id"
                              name="id_ips_id"
                              value={id_ips_id}
                              onChange={doubleLink}
                              className="form-select"
                            >
                              <option value="">Seleccione la ips.</option>
                              {arrayIps.map((myRol) => (
                                <option value={myRol.id} key={myRol.nombre_ips}>
                                  {myRol.nombre_ips}
                                </option>
                              ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                              Seleccione la ips.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                          <Form.Group controlId="role_id">
                            <Form.Label
                              className="fw-bold mb-2 mt-2"
                              htmlFor="role_id"
                              style={{ color: "black" }} //
                            >
                              Tipo de requerimiento:
                            </Form.Label>
                            <Form.Select
                              required
                              id="id_type_request_id"
                              name="id_type_request_id"
                              value={id_type_request_id}
                              onChange={async (e) => {
                                const selectedId = e.target.value;

                                // Llama a la función doubleLink
                                doubleLink(e);

                                // Llama a la función asincrónica para obtener los subtipos
                                await getSubtypesByType(selectedId);
                              }}
                              className="form-select"
                            >
                              <option value="">
                                Seleccione el tipo de requerimiento.
                              </option>
                              {arraytyperequest.map((myRol) => (
                                <option
                                  value={myRol.id}
                                  key={myRol.typerequest}
                                >
                                  {myRol.typerequest}
                                </option>
                              ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                              Seleccione el requerimiento
                            </Form.Control.Feedback>
                          </Form.Group>
                        </div>

                        <div className="col-lg-4 col-sm-6">
                          <Form.Group controlId="role_id">
                            <Form.Label
                              className="fw-bold mb-2 mt-2"
                              htmlFor="sub_type"
                            >
                              Sub-Tipo de requerimiento:
                            </Form.Label>
                            <Form.Select
                              required
                              id="id_Subtype_request_id"
                              name="id_Subtype_request_id"
                              value={id_Subtype_request_id}
                              onChange={doubleLink}
                              className="form-select"
                            >
                              <option value="">Seleccione el sub-tipo</option>
                              {subtypes.map((myRol) => (
                                <option value={myRol.id} key={myRol.id}>
                                  {myRol.subtype_request}
                                </option>
                              ))}
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                              Seleccione el sub-tipo
                            </Form.Control.Feedback>
                          </Form.Group>
                        </div>
                        <div className="col-lg-8 col-sm-6">
                          <Form.Group controlId="first_name">
                            <Form.Label
                              className="fw-bold mb-2 mt-2"
                              htmlFor="name_solicited"
                            >
                              Solicitante:
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              name="name_solicited"
                              className="form-control"
                              id="name_solicited"
                              placeholder="Solicitante."
                              value={name_solicited}
                              onChange={(e) => {
                                const value = e.target.value;
                                // Permitir solo letras y limitar a 60 caracteres
                                if (
                                  /^[A-Za-z\s]*$/.test(value) &&
                                  value.length <= 60
                                ) {
                                  doubleLink(e); // Llama a tu función existente
                                }
                              }}
                              autoComplete="off"
                              maxLength={60} // Limita a 60 caracteres
                            />
                            <Form.Control.Feedback type="invalid">
                              Nombre solicitante obligatorio.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </div>

                        <div className="col-lg-2" style={{ width: "235px" }}>
                          <Form.Group controlId="type_document">
                            <Form.Label
                              className="fw-bold mb-2 mt-2"
                              htmlFor="type_document"
                            >
                              Tipo de rol:
                            </Form.Label>
                            <Form.Select
                              required
                              id="role2"
                              name="role2"
                              value={role2}
                              onChange={doubleLink}
                              className="form-select"
                            >
                              <option value="">Selección</option>
                              <option value="SECRETARIA_GENERAL">
                                SECRETARÍA GENERAL
                              </option>
                              <option value="PLANIFICACION">
                                PLANIFICACIÓN
                              </option>
                              <option value="CONTROL_INTERNO">
                                CONTROL INTERNO
                              </option>
                              <option value="GESTION_SOCIAL">
                                GESTIÓN SOCIAL
                              </option>
                              <option value="COMUNICACIONES">
                                COMUNICACIONES
                              </option>
                              <option value="RECURSOS_HUMANOS">
                                RECURSOS HUMANOS
                              </option>
                              <option value="FINANZAS">FINANZAS</option>
                              <option value="SISTEMAS">SISTEMAS</option>
                              <option value="TRANSPORTE">TRANSPORTE</option>
                              <option value="LOGISTICA">LOGÍSTICA</option>
                              <option value="GERENCIA">GERENCIA</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                              El rol es obligatorio
                            </Form.Control.Feedback>
                          </Form.Group>
                        </div>

                        <div className="col-lg-2" style={{ width: "155px" }}>
                          <Form.Group controlId="type_document">
                            <Form.Label
                              className="fw-bold mb-2 mt-2"
                              htmlFor="type_document"
                            >
                              Plataforma:
                            </Form.Label>
                            <Form.Select
                              required
                              id="medio"
                              name="medio"
                              value={medio}
                              onChange={doubleLink}
                              className="form-select"
                            >
                              <option value="">Selección</option>
                              <option value="CORREO"> CORREO</option>
                              <option value="WHATSAPP">WHATSAPP</option>
                              <option value="TELEFONO"> TELEFONO</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                              El rol es obligatorio
                            </Form.Control.Feedback>
                          </Form.Group>
                        </div>

                        <div
                          className="col-lg-4 col-sm-8"
                          style={{ width: "175px" }}
                        >
                          <Form.Group controlId="number">
                            <Form.Label
                              className="fw-bold mb-2 mt-2"
                              htmlFor="number"
                            >
                              Número telefónico:
                            </Form.Label>
                            <Form.Control
                              type="text" // Cambiado a 'text' para facilitar la validación
                              name="number"
                              className="form-control"
                              id="number"
                              placeholder="3112227777"
                              value={number}
                              onChange={(e) => {
                                const value = e.target.value;
                                // Permitir solo números y limitar a 13 caracteres
                                if (/^\d*$/.test(value) && value.length <= 13) {
                                  doubleLink(e); // Llama a tu función existente
                                }
                              }}
                              autoComplete="off"
                              maxLength={13} // Limita a 13 caracteres
                            />
                            <Form.Control.Feedback type="invalid">
                              Número telefónico obligatorio.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </div>
                        <div
                          className="col-lg-5 col-sm-12"
                          style={{ width: "470px" }}
                        >
                          <Form.Group controlId="email">
                            <Form.Label
                              className="fw-bold mb-2 mt-2"
                              htmlFor="email"
                            >
                              Correo electrónico:
                            </Form.Label>
                            <Form.Control
                              type="email"
                              name="email"
                              className="form-control"
                              id="email"
                              placeholder="Escriba su correo electrónico."
                              value={email}
                              onChange={(e) => doubleLink(e)} // Llama a tu función existente
                              autoComplete="off"
                              isInvalid={
                                !email.includes("@") && email.length > 0
                              } // Muestra el error si falta "@"
                            />
                            <Form.Control.Feedback type="invalid">
                              Correo electrónico debe contener "@".
                            </Form.Control.Feedback>
                          </Form.Group>
                        </div>
                      </div>
                      <div
                        className="col-lg-12 col-sm-4"
                        style={{ width: "1035px" }}
                      >
                        <Form.Group controlId="last_name">
                          <Form.Label
                            className="fw-bold mb-2 mt-2"
                            htmlFor="requirement"
                          >
                            Descripción:
                          </Form.Label>
                          <Form.Control
                            required
                            as="textarea"
                            name="requirement"
                            className="form-control"
                            id="requirement"
                            placeholder="Descripción del requerimiento:"
                            value={requirement}
                            onChange={doubleLink}
                            aria-describedby="requirement"
                            autoComplete="off"
                            rows={2}
                          />
                          <Form.Control.Feedback type="invalid">
                            Requerimiento
                          </Form.Control.Feedback>
                        </Form.Group>
                        <br />
                        <div className="form-group">
                          <label htmlFor="support_date">
                            <strong>Fecha y hora de soporte:</strong>
                          </label>
                          <input
                            type="datetime-local"
                            id="support_date"
                            name="support_date"
                            className="form-control"
                            value={
                              supportDate ||
                              new Date(
                                new Date().getTime() -
                                  new Date().getTimezoneOffset() * 60000
                              )
                                .toISOString()
                                .slice(0, 16)
                            } // Convertir UTC a hora local
                            onChange={handleSupportDateChange}
                            required
                          />
                        </div>
                      </div>

                      <div style={{ marginTop: "10px" }}>
                        <i>
                          <strong>Seleccione si tuvo una respuesta:</strong>
                        </i>
                        <Button
                          onClick={handleSiClick}
                          variant={seleccion === "si" ? "primary" : "secondary"}
                          style={{
                            marginLeft: "10px",
                            fontSize: "12px", // Tamaño de fuente pequeño
                            color: "gray", // Color de texto gris
                            backgroundColor: "#f0f0f0", // Fondo claro para contraste
                            borderRadius: "20px", // Bordes redondeados
                            padding: "5px 10px", // Tamaño de padding ajustado
                            border: "1px solid #ccc", // Borde sutil para mejorar el aspecto
                            cursor: "pointer", // Cambiar el cursor para indicar clic
                          }}
                        >
                          Sí
                        </Button>
                        <Button
                          onClick={handleNoClick}
                          variant={seleccion === "no" ? "primary" : "secondary"}
                          style={{
                            fontSize: "12px", // Tamaño de fuente pequeño
                            color: "gray", // Color de texto gris
                            backgroundColor: "#f0f0f0", // Fondo claro para contraste
                            borderRadius: "20px", // Bordes redondeados
                            padding: "5px 10px", // Tamaño de padding ajustado
                            border: "1px solid #ccc", // Borde sutil para mejorar el aspecto
                            cursor: "pointer", // Cambiar el cursor para indicar clic
                          }}
                        >
                          No
                        </Button>

                        {seleccion === "si" && (
                          <div>
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
                                <option value="EN_PROGRESO">EN PROGRESO</option>
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
                          </div>
                        )}

                        {seleccion === "no" && (
                          <div className="col-lg-2">
                            <Form.Group controlId="role_id">
                              <Form.Label
                                className="fw-bold mb-2 mt-2"
                                htmlFor="role_id"
                              >
                                Encargado:
                              </Form.Label>
                              <Form.Select
                                required
                                id="id_CustomerUser2_id"
                                name="id_CustomerUser2_id"
                                value={id_CustomerUser2_id}
                                onChange={doubleLink}
                                className="form-select"
                              >
                                <option value="">
                                  Seleccione al encargado
                                </option>
                                {arrayCustomerUser.map((myRol) => (
                                  <option value={myRol.id} key={myRol.name}>
                                    {`${myRol.role} - ${myRol.name}`}
                                  </option>
                                ))}
                              </Form.Select>
                              <Form.Control.Feedback type="invalid">
                                Seleccione al encargado.
                              </Form.Control.Feedback>
                            </Form.Group>
                          </div>
                        )}
                      </div>
                    </div>
                    {/* <div className="col-lg-2">
                      <Form.Group controlId="role_id">
                        <Form.Label
                          className="fw-bold mb-2 mt-2"
                          htmlFor="role_id"
                        >
                          Encargado:
                        </Form.Label>
                        <Form.Select
                          id="id_CustomerUser2_id"
                          name="id_CustomerUser2_id"
                          value={id_CustomerUser2_id}
                          onChange={doubleLink}
                          className="form-select"
                        >
                          <option value="">Seleccione al encargado</option>
                          {arrayCustomerUser.map((myRol) => (
                            <option value={myRol.id} key={myRol.name}>
                              {`${myRol.role} - ${myRol.name}`}
                            </option>
                          ))}
                        </Form.Select>
                        <Form.Control.Feedback type="invalid">
                          Seleccione al encargado.
                        </Form.Control.Feedback>
                      </Form.Group>
                    </div> */}

                    <div
                      className="col-lg-5 col-sm-5 mt-7  d-flex justify-content-center"
                      style={{
                        marginTop: "20px",
                        marginLeft: "30%",
                        padding: "10px",
                      }}
                    >
                      <button
                        type="submit"
                        className="btn btn-outline-info button-create badge d-flex align-items-center fs-6 p-3 pe-3 text-warning-emphasis bg-warning-subtle border border-warning-subtle rounded-pill"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "10px 20px",
                          backgroundColor: "#FFF7E0", // Fondo amarillo claro
                          border: "2px solid transparent", // Sin borde
                          borderRadius: "50px", // Bordes redondeados
                          color: "#835C0E", // Texto marrón
                          fontWeight: "bold",
                          cursor: "pointer",
                          transition: "background-color 0.3s ease",
                          height: "70px",
                        }}
                      >
                        <i className="fa-solid fa-plus"></i>&nbsp;Guardar
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (formRef.current) {
                            cleanBox(formRef.current);
                          }
                        }}
                        className="badge d-flex align-items-center fs-6 p-3 pe-2 text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-pill"
                      >
                        <i className="fa-solid fa-broom"></i>&nbsp;Limpiar
                      </button>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};
