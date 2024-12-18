import { Button, Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "../../../utils/hooks/useForm";
import ServicePrivate from "../../../services/ServicePrivate";
import ApiBack from "../../../utils/domains/ApiBack";
import { MessageToastify } from "../../../utils/funtions/MessageToastify";
import { ToastContainer } from "react-toastify";
import User from "../../../models/user";

export const CreateUser = () => {
  const [process, setProcess] = useState<boolean>(false);
  const formRef = useRef<HTMLFormElement>(null);
  type formaHtml = React.FormEvent<HTMLFormElement>;
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
  const [showPassword, setShowPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [errorPassword, setErrorPassword] = useState<string>("");

  const cleanBox = (form: HTMLFormElement) => {
    form.reset();

    // Limpiar el objeto
    object.email = "";
    object.num_document = "";
    object.name = "";
    object.last_name = "";
    object.is_active = true;
    object.password = "";
    object.document_type = "";
    object.role = "";

    // Limpiar los campos del formulario
    (form.querySelector('[name="email"]') as HTMLInputElement).value = "";
    (form.querySelector('[name="num_document"]') as HTMLInputElement).value =
      "";
    (form.querySelector('[name="name"]') as HTMLInputElement).value = "";
    (form.querySelector('[name="last_name"]') as HTMLInputElement).value = "";
    (form.querySelector('[name="password"]') as HTMLInputElement).value = "";
    (form.querySelector('[name="document_type"]') as HTMLInputElement).value =
      "";
    (form.querySelector('[name="role"]') as HTMLInputElement).value = "";

    form.classList.remove("was-validated");
  };

  const handleShowPasswordToggle = (e: any) => {
    setShowPassword(!showPassword);
    setConfirmPassword(e.target.value);
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

  const customDoubleLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === "name" || name === "last_name") {
      // Convertir todo el texto a mayúsculas
      formattedValue = value.toUpperCase();
    }

    // Llamar directamente a setName o setLastName según el campo
    if (name === "name") {
      object.name = formattedValue;
    } else if (name === "last_name") {
      object.last_name = formattedValue;
    }

    // Usar la función original para actualizar el estado del formulario
    doubleLink(e);
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
      } else {
        if (password !== confirmPassword) {
          setErrorPassword("Las contraseñas no coinciden.");
          setProcess(false);
          return;
        }

        // Convertir nombre y apellido a mayúsculas completas
        object.name = object.name.toUpperCase();
        object.last_name = object.last_name.toUpperCase();
        object.email = object.email.toLowerCase();
        object.is_active = isActive;

        const response = await ServicePrivate.requestPOST(
          ApiBack.USER_CREATE,
          object
        );

        if (response.OK) {
          setProcess(false);
          MessageToastify(
            "error",
            "Error en el momento de crear al usuario.",
            7000
          );
        } else {
          MessageToastify("success", "Usuario creado.", 7000);
          navigate("/home/view-user");
        }
      }
    } catch (error) {
      setLoading(false);
      MessageToastify(
        "error",
        "Error en el momento de crear al profesional.",
        7000
      );
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setIsActive(checked);
    object.is_active = checked; // Actualiza también el objeto
  };

  const renderTooltip = (props: any) => (
    <Tooltip id="button-tooltip" {...props}>
      Este switch activa o desactiva el estado del usuario, siempre va a estar
      activo en la creación.
    </Tooltip>
  );
  const handleNumDocumentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    // Verificar que solo acepte hasta 22 números
    if (value.length <= 22 && /^[0-9]*$/.test(value)) {
      doubleLink(e); // Actualizar el estado si el valor es válido
    } else if (value.length > 22) {
      // Mostrar mensaje de error
      e.target.setCustomValidity(
        "El número de cédula no puede tener más de 22 dígitos."
      );
    } else {
      e.target.setCustomValidity("");
    }
  };

  useEffect(() => {}, []);
  return (
    <>
      <div>
        <div className="page-header">
          <div className="row">
            <div className="col-ls-6 col-sm-12">
              <h3 className="page-title fs-3 fw-bold">
                <i className="fa-solid fa-users"></i>&nbsp;Usuarios
              </h3>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb breadcrumb-chevron"></ol>
              </nav>
            </div>
          </div>
        </div>
        <div className="row d-flex">
          <div className="col-12 grid-margin stretch-card justify-content-center">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title">
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
                              name="name"
                              className="form-control"
                              id="name"
                              placeholder="Escriba el primer nombre."
                              value={name}
                              onChange={(e) => {
                                const value = e.target.value;
                                // Permitir solo letras y limitar a 60 caracteres
                                if (
                                  /^[A-Za-z\s]*$/.test(value) &&
                                  value.length <= 30
                                ) {
                                  doubleLink(e); // Llama a tu función existente
                                }
                              }}
                              autoComplete="off"
                              maxLength={30} // Limita a 60 caracteres
                            />
                            <Form.Control.Feedback type="invalid">
                              Primer nombre obligatorio.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </div>

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
                              onChange={(e) => {
                                const value = e.target.value;
                                // Permitir solo letras y limitar a 60 caracteres
                                if (
                                  /^[A-Za-z\s]*$/.test(value) &&
                                  value.length <= 30
                                ) {
                                  doubleLink(e); // Llama a tu función existente
                                }
                              }}
                              aria-describedby="last_name"
                              autoComplete="off"
                              maxLength={30} // Limita a 60 caracteres
                            />
                            <Form.Control.Feedback type="invalid">
                              Primer apellido obligatorio.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </div>
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
                    <div className="col-lg-4 col-sm-12">
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
                    <div className="col-lg-4 col-sm-12">
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
                    <div className="col-lg-12 col-sm-12">
                      <div className="row">
                        <div className="col-lg-4">
                          <Form.Group controlId="type_document">
                            <Form.Label
                              className="fw-bold mb-2 mt-2"
                              htmlFor="type_document"
                            >
                              Tipo de rol:
                            </Form.Label>
                            <Form.Select
                              required
                              id="role"
                              name="role"
                              value={role}
                              onChange={doubleLink}
                              className="form-select"
                            >
                              <option value="">Seleccione el rol</option>
                              <option value={"ADMINISTRADOR"}>
                                ADMINISTRADOR
                              </option>
                              <option value={"CAPACITACION"}>
                                CAPACITACION
                              </option>
                              <option value={"INFORMES"}>INFORMES</option>
                              <option value={"AUDITORIA"}>AUDITORIA</option>
                              <option value={"CONTRATACION"}>
                                CONTRATACION
                              </option>
                              <option value={"TESORERIA"}>TESORERIA</option>
                              <option value={"GERENCIA"}>GERENCIA</option>
                              <option value={"TI"}>TI</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                              El rol es obligatorio
                            </Form.Control.Feedback>
                          </Form.Group>
                        </div>
                        <div className="col-lg-4">
                          <Form.Group controlId="type_document">
                            <Form.Label
                              className="fw-bold mb-2 mt-2"
                              htmlFor="type_document"
                            >
                              Tipo de documento:
                            </Form.Label>
                            <Form.Select
                              required
                              id="document_type"
                              name="document_type"
                              value={document_type}
                              onChange={doubleLink}
                              className="form-select"
                            >
                              <option value="">
                                Seleccione el tipo de documento
                              </option>
                              <option value={"AS"}>ADULTO SIN IDENTIDAD</option>
                              <option value={"CC"}>CEDULA DE CIUDADANIA</option>
                              <option value={"CE"}>CEDULA EXTRANJERIA</option>
                              <option value={"MS"}>MENOR SIN IDENTIDAD</option>
                              <option value={"NU"}>NUMERO UNICO ID</option>
                              <option value={"PA"}>PASAPORTE</option>
                              <option value={"PE"}>PERMISO ESPEC PERMAN</option>
                              <option value={"PT"}>PERM PROT TEMPORAL</option>
                              <option value={"RC"}>REGISTRO CIVILL</option>
                              <option value={"TI"}>TARJETA IDENTIDAD</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                              El tipo de documento es obligatorio.
                            </Form.Control.Feedback>
                          </Form.Group>
                        </div>

                        <div className="col-lg-4">
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
                              Número de documento obligatorio.
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
                        <i className="fa-solid fa-plus"></i>&nbsp;Guardar
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
                      <button
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
