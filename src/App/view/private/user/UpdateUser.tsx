import React, { useEffect, useRef, useState } from "react";
import { Button, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useForm } from "../../../utils/hooks/useForm";
import ApiBack from "../../../utils/domains/ApiBack";
import ServicePrivate from "../../../services/ServicePrivate";
import { MessageToastify } from "../../../utils/funtions/MessageToastify";
import User from "../../../models/user";

export const UpdateUser = () => {
  let { id } = useParams();
  type formaHtml = React.FormEvent<HTMLFormElement>;
  const formRef = useRef<HTMLFormElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);
  const [process, setProcess] = useState<boolean>(false);
  const [allReady, setAllReady] = useState<boolean>(false);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [passwordMatch, setPasswordMatch] = useState(true);

  let chagerEnd = allReady !== undefined;

  let {
    email,
    num_document,
    name,
    last_name,
    is_active,
    password,
    document_type,
    role,
    doubleLink,
    object,
  } = useForm<User>(new User(0, "", "", "", "", false, "", "", ""));

  const [isActive, setIsActive] = useState<boolean>(is_active);
  const [errorPassword, setErrorPassword] = useState<string>("");
  //close and open popup functions

  const handleShowPasswordToggle = (e: any) => {
    setShowPassword(!showPassword);
    // setConfirmPassword(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    doubleLink(e);
    const { name, value } = e.target;
    if (name === "password") {
      object.password = value;
    }
    if (name === "confirmPassword") {
      setConfirmPassword(value);
    }
    setPasswordMatch(object.password === confirmPassword);
  };

  const getOneUser = async () => {
    try {
      const urlChargerOneProfessional = ApiBack.USER_LIST_ONE + "/" + id;
      const professionalResponse = await ServicePrivate.requestGET(
        urlChargerOneProfessional
      );
      console.log(professionalResponse);

      // console.log(professionalResponse);
      object.email = professionalResponse.email;
      object.password = professionalResponse.password;
      object.num_document = professionalResponse.num_document;
      object.name = professionalResponse.first_name;
      object.last_name = professionalResponse.last_name;
      object.document_type = professionalResponse.type_document;
      object.is_active = professionalResponse.is_active;
      if (professionalResponse) {
        setAllReady(true);
      }
    } catch (error) {
      setLoading(false);
      handleTokenError(error);
    }
  };

  const handleTokenError = (error: any) => {
    console.error("Token error:", error);
    navigate("/"); // Redirigir a la página de inicio de sesión
  };

  const sendForm = async (fh: formaHtml) => {
    fh.preventDefault();
    setProcess(true);
    const formCurrent = fh.currentTarget;
    formCurrent.classList.add("was-validated");

    if (formCurrent.checkValidity() === false) {
      fh.preventDefault();
      fh.stopPropagation();
    } else {
      if (password !== confirmPassword) {
        setErrorPassword("Las contraseñas no coinciden.");
        setProcess(false);
        return;
      }
      const capitalizedFirstName =
        object.name.charAt(0).toUpperCase() + object.name.slice(1);
      const capitalizedLastName =
        object.last_name.charAt(0).toUpperCase() + object.last_name.slice(1);
      //implementation object to capitalize
      object.name = capitalizedFirstName;
      object.last_name = capitalizedLastName;
      object.is_active = isActive;
      const urlUpdate = ApiBack.USER_UPDATE + "/" + id;
      const response = await ServicePrivate.requestPUT(urlUpdate, object);

      if (response.OK) {
        setProcess(false);
        MessageToastify(
          "error",
          "Error en el momento de actualizar al usurio.",
          7000
        );
      } else {
        MessageToastify("success", "usurio actualizado.", 7000);
        navigate("");
      }
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setIsActive(checked);
    object.is_active = checked; // Actualiza también el objeto
  };

  const renderTooltip = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
      Este switch activa o desactiva el estado del usuario.
    </Tooltip>
  );

  useEffect(() => {
    getOneUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div>
        <div className="page-header">
          <div className="row">
            <div className="col-lg-12 col-sm-12">
              <h3 className="page-title fs-3 fw-bold">
                <i className="fa-solid fa-users"></i>&nbsp;Usuarios
              </h3>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb breadcrumb-chevron">
                  <li className="breadcrumb-item">
                    <Link
                      className="link-body-emphasis text-decoration-none"
                      to="#"
                    >
                      <i className="fa-solid fa-house-user"></i> &nbsp; Inicio
                    </Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link
                      className="link-body-emphasis fw-semibold text-decoration-none"
                      to="#"
                    >
                      Usuario
                    </Link>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Actualizar
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>
        <div className="row d-flex">
          <div className="col-12 grid-margin stretch-card justify-content-center">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title fs-4">Formulario de actualización</h4>
                {chagerEnd ? (
                  <Form
                    className="forms-sample"
                    validated={process}
                    onSubmit={sendForm}
                    noValidate
                    ref={formRef}
                  >
                    <div className="row ms-lg-5 me-lg-5">
                      <div className="row">
                        <div className="col-lg-6 col-sm-12">
                          <Form.Group controlId="first_name">
                            <Form.Label
                              className="fw-bold mb-2 mt-2"
                              htmlFor="first_name"
                            >
                              Primer nombre:
                            </Form.Label>
                            <Form.Control
                              required
                              type="text"
                              name="first_name"
                              className="form-control"
                              id="first_name"
                              placeholder="Escriba el primer nombre."
                              value={name}
                              onChange={doubleLink}
                              autoComplete="off"
                            />
                            <Form.Control.Feedback type="invalid">
                              Primer nombre obligatorio.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </div>
                        <div className="row ">
                          <div className="col-lg-6 col-sm-12">
                            <Form.Group controlId="last_name">
                              <Form.Label
                                className="fw-bold mb-2 mt-2"
                                htmlFor="last_name"
                              >
                                Primer apellido:
                              </Form.Label>
                              <Form.Control
                                required
                                type="text"
                                name="last_name"
                                className="form-control"
                                id="last_name"
                                placeholder="Escriba el primer apellido."
                                value={last_name}
                                onChange={doubleLink}
                                aria-describedby="last_name"
                                autoComplete="off"
                              />
                              <Form.Control.Feedback type="invalid">
                                Primer apellido obligatorio.
                              </Form.Control.Feedback>
                            </Form.Group>
                          </div>
                        </div>
                        <div className="col-lg-4 col-sm-12">
                          <Form.Group controlId="email">
                            <Form.Label
                              className="fw-bold mb-2 mt-2"
                              htmlFor="email"
                            >
                              Correo electrónico:
                            </Form.Label>
                            <Form.Control
                              required
                              type="email"
                              name="email"
                              className="form-control"
                              id="email"
                              placeholder="Escriba correo electrónico."
                              value={email}
                              onChange={doubleLink}
                              autoComplete="off"
                            />
                            <Form.Control.Feedback type="invalid">
                              Email obligatorio.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </div>
                        <div className="col-lg-3 col-sm-12">
                          <Form.Group controlId="password">
                            <Form.Label
                              className="fw-bold mb-2 mt-2"
                              htmlFor="password"
                            >
                              Contraseña:
                            </Form.Label>
                            <Form.Control
                              required
                              type={showPassword ? "text" : "password"}
                              name="password"
                              className="form-control"
                              id="password"
                              placeholder="Escriba la contraseña para entrar al sistema."
                              value={password}
                              onChange={handlePasswordChange}
                              autoComplete="off"
                            />
                            {errorPassword && (
                              <div className="text-danger">{errorPassword}</div>
                            )}
                            <Form.Control.Feedback type="invalid">
                              Contraseña obligatoria.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </div>
                      </div>
                      <div className="col-lg-3 col-sm-12">
                        <Form.Group controlId="confirmPassword">
                          <Form.Label
                            className="fw-bold mb-2 mt-2"
                            htmlFor="confirmPassword"
                          >
                            Confirme la contraseña:
                          </Form.Label>
                          <div className="row">
                            <div className="col-lg-10">
                              <Form.Control
                                required
                                type={showPassword ? "text" : "password"}
                                name="confirmPassword"
                                className="form-control"
                                id="confirmPassword"
                                placeholder="Escriba la contraseña para entrar al sistema."
                                value={confirmPassword}
                                onChange={handlePasswordChange}
                                autoComplete="off"
                              />
                            </div>
                            <div className="col-lg-2">
                              <Button
                                className="text-dark"
                                variant="outline-secondary"
                                onClick={handleShowPasswordToggle}
                              >
                                {showPassword ? (
                                  <i className="fa-regular fa-eye-slash"></i>
                                ) : (
                                  <i className="fa-regular fa-eye"></i>
                                )}
                              </Button>
                            </div>
                            {errorPassword && (
                              <div className="text-danger">{errorPassword}</div>
                            )}
                          </div>
                          <Form.Control.Feedback type="invalid">
                            Contraseña obligatoria.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </div>
                    </div>
                    <div className="row ms-lg-5 me-lg-5">
                      <div className="col-lg-6 col-sm-12">
                        <div className="row">
                          <div className="col-lg-6">
                            <Form.Group controlId="type_document">
                              <Form.Label
                                className="fw-bold mb-2 mt-2"
                                htmlFor="type_document"
                              >
                                Tipo de documento:
                              </Form.Label>
                              <Form.Select
                                required
                                id="type_document"
                                name="type_document"
                                value={document_type}
                                onChange={doubleLink}
                                className="form-select"
                                disabled={true}
                              >
                                <option value="">
                                  Seleccione el tipo de documento
                                </option>
                                <option value={"AS"}>
                                  ADULTO SIN IDENTIDAD
                                </option>
                                <option value={"CC"}>
                                  CEDULA DE CIUDADANIA
                                </option>
                                <option value={"CE"}>CEDULA EXTRANJERIA</option>
                                <option value={"MS"}>
                                  MENOR SIN IDENTIDAD
                                </option>
                                <option value={"NU"}>NUMERO UNICO ID</option>
                                <option value={"PA"}>PASAPORTE</option>
                                <option value={"PE"}>
                                  PERMISO ESPEC PERMAN
                                </option>
                                <option value={"PT"}>PERM PROT TEMPORAL</option>
                                <option value={"RC"}>REGISTRO CIVILL</option>
                                <option value={"TI"}>TARJETA IDENTIDAD</option>
                              </Form.Select>
                              <Form.Control.Feedback type="invalid">
                                El tipo de documento es obligatorio.
                              </Form.Control.Feedback>
                            </Form.Group>
                          </div>
                          <div className="col-lg-6">
                            <Form.Group controlId="num_document">
                              <Form.Label
                                className="fw-bold mb-2 mt-2"
                                htmlFor="num_document"
                              >
                                Número de documento:
                              </Form.Label>
                              <Form.Control
                                required
                                type="text"
                                name="num_document"
                                className="form-control"
                                id="num_document"
                                placeholder="Escriba número de cédula sin puntos."
                                value={num_document}
                                onChange={doubleLink}
                                autoComplete="off"
                                disabled={true}
                              />
                              <Form.Control.Feedback type="invalid">
                                Numero de cédula obligatorio.
                              </Form.Control.Feedback>
                            </Form.Group>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="row ms-lg-5 me-lg-5">
                      <div className="col-lg-2 col-sm-12">
                        <Form.Group controlId="is_active">
                          <Form.Label
                            className="fw-bold mb-2 mt-2"
                            htmlFor="is_active"
                          >
                            Estado:
                          </Form.Label>
                          <OverlayTrigger
                            placement="right"
                            overlay={renderTooltip}
                          >
                            <Button variant="link" className="text-dark">
                              <i className="fa-solid fa-circle-info"></i>
                            </Button>
                          </OverlayTrigger>
                          <Form.Check
                            type="switch"
                            id="is_active"
                            name="is_active"
                            checked={isActive}
                            onChange={handleCheckboxChange}
                            className=""
                            label={isActive ? "Activo" : "Inactivo"}
                            disabled={true}
                          />
                        </Form.Group>
                      </div>
                    </div>
                    <div className="row ms-lg-5 me-lg-5">
                      <div className="col-lg-12 col-sm-12 mt-3  d-flex justify-content-center">
                        <button
                          type="submit"
                          className="btn btn-outline-info button-create badge d-flex align-items-center fs-6 p-3 pe-3 text-warning-emphasis bg-warning-subtle border border-warning-subtle rounded-pill"
                        >
                          <i className="fa-solid fa-plus"></i>&nbsp;Actualizar
                        </button>
                        <button
                          type="button"
                          onClick={() => navigate(-1)}
                          className="badge d-flex align-items-center fs-6 p-3 pe-2 text-info-emphasis bg-info-subtle border border-info-subtle rounded-pill"
                        >
                          <i className="fa-solid fa-arrow-left-long"></i>
                          &nbsp;Regresar
                        </button>
                        &nbsp;
                        {/* <button
                          type="button"
                          onClick={() => {
                            if (formRef.current) {
                              cleanBox(formRef.current);
                            }
                          }}
                          className="badge d-flex align-items-center fs-6 p-3 pe-2 text-danger-emphasis bg-danger-subtle border border-danger-subtle rounded-pill"
                        >
                          <i className="fa-solid fa-broom"></i>
                          &nbsp;Limpiar
                        </button> */}
                      </div>
                    </div>
                  </Form>
                ) : (
                  <div>
                    <div className="d-flex align-items-center text-center error-page bg-primary pt-5 pb-4 h-100">
                      <div className="row flex-grow">
                        <div className="col-lg-8 mx-auto text-white">
                          <div className="row align-items-center d-flex flex-row">
                            <div className="col-lg-6 text-lg-right pr-lg-4">
                              <h1 className="display-1 mb-0">402</h1>
                            </div>
                            <div className="col-lg-6 error-page-divider text-lg-left pl-lg-4">
                              <h2>Error!</h2>
                              <h3 className="font-weight-light">
                                Error cargando los datos.
                              </h3>
                            </div>
                          </div>
                          <div className="row mt-5">
                            <div className="col-12 text-center mt-xl-2">
                              <Link
                                className="text-white font-weight-medium"
                                to="/home"
                              >
                                Volver al inicio
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};
