import Form from "react-bootstrap/Form";
// import imgLogo from "../../../assets/images/Rocky/LOGOROCKY.png";
import { useState } from "react";
import logo from "../../../assets/images/Rocky/LOGOROCKY.png";

import { useNavigate } from "react-router-dom";
import { useForm } from "../../../utils/hooks/useForm";
import AccessUser from "../../../models/AccessUser";
import LoginService from "../../../services/loginService";
import { MessageToastify } from "../../../utils/funtions/MessageToastify";
import { ToastContainer } from "react-toastify";
import { Button } from "react-bootstrap";

export const Login = () => {
  //Modal const
  //   const [show, setShow] = useState(false);
  //   const handleClose = () => setShow(false);

  //Variables for login, using useNavigate, formHtml, process and Access login
  const myNavigate = useNavigate();
  type formHtml = React.FocusEvent<HTMLFormElement>;
  const [inProcess, setProcess] = useState<boolean>(false);
  let { email, password, doubleLink, object } = useForm<AccessUser>(
    new AccessUser("", "")
  );
  const [showPassword, setShowPassword] = useState(false);
  //function login access
  //clear box
  // const cleanBoxs = (myForm: HTMLFormElement) => {
  //   myForm.reset();

  //   object.email = "";
  //   object.password = "";
  //   object.num_document = "";

  //   myForm.email.value = "";
  //   myForm.password.value = "";
  //   myForm.num_document.value = "";
  //   myForm.classList.remove("was-validate");
  // };
  const handleShowPasswordToggle = (e: any) => {
    setShowPassword(!showPassword);
  };

  //function to error the Token on the time, using when token is invalid or expired
  const handleTokenError = (e: any) => {
    MessageToastify("error", "El usuario no está activo.", 7000);
  };
  const toLowerCase = (text: string) => {
    return text.toLowerCase();
  };

  const converter = (object: any) => {
    object.email = toLowerCase(object.email);
    // eslint-disable-next-line no-self-assign
    object.password = object.password;
    // eslint-disable-next-line no-self-assign
    return object;
  };

  //function procces form create all log to use apiback
  const proccesForm = async (fh: formHtml) => {
    try {
      fh.preventDefault();
      setProcess(true);
      const formCurrent = fh.currentTarget;
      formCurrent.classList.add("was-validate");

      if (formCurrent.checkValidity() === false) {
        fh.preventDefault();
        fh.stopPropagation();
      } else {
        const lowerText = converter(object);
        const result = await LoginService.consumeService(lowerText);
        //comparte result access for enter to apiback, using url form apiBack.tsx
        if (result.access) {
          // const objJWT = jwt_decode(result.access);
          localStorage.setItem("access", result.access);
          sessionStorage.setItem("access", result.access);
          myNavigate("/home/main");
          setProcess(false);
        }
        if (result.error) {
          // cleanBoxs(formCurrent);
          const message = "Error: " + result.error;
          MessageToastify("error", message, 7000);
        }
      }
    } catch (e) {
      handleTokenError(e);
    }
  };

  return (
    <>
      <div
        className="container-fluid light-gray-background d-flex justify-content-center align-items-center vh-100"
        style={{
          background:
            "linear-gradient($color-background-gradient-start, $color-background-gradient-end)",
        }}
      >
        <div
          className="login-wrapper p-4 rounded"
          style={{
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            width: "450px",

            boxShadow: "0px 2px 19px rgba(217, 147, 19, 0.9)",
          }}
        >
          <h1
            style={{
              fontSize: "48px", // Tamaño grande
              fontWeight: "bold", // Negrilla
              color: "#d9931175", // Color específico
              fontFamily: "Arial, sans-serif", // Fuente diferente
              textAlign: "center", // Centrar el texto
              marginTop: "2%", // Margen superior del 50%
              textShadow: "2px 2px 4px black", // Sombra negra alrededor del texto
            }}
          >
            Rocky
            <img
              src={logo}
              alt="Logo Rocky"
              style={{
                width: "150px",
                height: "auto",
                marginLeft: "10px",
              }}
            />
          </h1>

          <Form
            noValidate
            validated={inProcess}
            onSubmit={proccesForm}
            autoComplete="off"
          >
            <Form.Group controlId="email">
              <Form.Label className="text-black">Usuario:</Form.Label>
              <Form.Control
                required
                name="email"
                className="form-control"
                type="email"
                placeholder="Introduce tu usuario"
                value={email}
                onChange={doubleLink}
                autoComplete="off"
                style={{
                  color: "$color-primary-text",
                  borderRadius: "20px", // Ajusta el radio del borde aquí
                  border: "1px solid black", // Borde negro por defecto
                  textAlign: "center", // Centrar el texto
                  outline: "none", // Quitar la sombra azul
                }}
              />
              <Form.Control.Feedback type="invalid">
                El usuario es requerido para entrar.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="password" className="mt-3">
              <Form.Label className="text-black">Contraseña:</Form.Label>
              <Form.Control
                required
                name="password"
                className="form-control"
                type={showPassword ? "text" : "password"}
                placeholder="Introduce tu contraseña"
                value={password}
                onChange={doubleLink}
                autoComplete="off"
                style={{
                  color: "$color-primary-text",
                  borderRadius: "20px", // Ajusta el radio del borde aquí
                  border: "1px solid black", // Borde negro por defecto
                  textAlign: "center", // Centrar el texto
                  outline: "none", // Quitar la sombra azul
                }}
              />
              <Form.Control.Feedback type="invalid">
                La contraseña es requerida para ingresar.
              </Form.Control.Feedback>
            </Form.Group>

            <button
              className="btn btn-block login-btn mt-4 w-100"
              type="submit"
              style={{
                backgroundColor: "$color-button-background",
                color: "$color-primary-text",
                borderRadius: "20px", // También puedes redondear el botón
                boxShadow: "0px 4px 6px #d9931175!important", // Sombra para el botón
              }}
            >
              Iniciar sesión
            </button>
          </Form>
        </div>
      </div>
    </>
  );
};
