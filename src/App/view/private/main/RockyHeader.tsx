/* eslint-disable react/jsx-no-target-blank */
import { Link } from "react-router-dom";
import logo from "../../../assets/images/Rocky/LOGOROCKY.png";
import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import User from "../../../models/user";
import ApiBack from "../../../utils/domains/ApiBack";
import ServicePrivate from "../../../services/ServicePrivate";
import { jwtDecode } from "jwt-decode";
export const RockyHeader = () => {
  const [arrayUsers, setArrayUsers] = useState<User>();
  const [loading, setLoading] = useState(false);
  const myNavigate = useNavigate();

  const handleTokenError = () => {
    myNavigate("/"); // Redirigir a la página de inicio de sesión
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

  useEffect(() => {
    getProfessionals();
    const tokenTimeout = setTimeout(() => {
      localStorage.removeItem("access");
      console.log("Token eliminado después de 12 hora");
      handleTokenError(); // Redirect to login
    }, 43200000); // 12 hours

    return () => clearTimeout(tokenTimeout); // clean to setTimeout next to token expiration
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="container mt-4rem ">
        <div
          className="nav-profile-text"
          style={{
            padding: "20px",
            borderRadius: "10px",
            backgroundColor: "#f0f0f0",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            textAlign: "center",
            marginLeft: "20%",
            marginRight: "20%",
          }}
        >
          <strong
            style={{
              color: "#d9931175", // Color específico
              fontFamily: "Arial", // Fuente diferente
              textShadow: "1px 1px 2px black", // Sombra del texto
              fontSize: "28px", // Tamaño grande
              display: "block", // Esto asegura que se tome el ancho completo
              margin: "0", // Eliminar márgenes adicionales
              padding: "0", // Eliminar padding adicional
            }}
          >
            ¡Bienvenido!
          </strong>

          <p className="text-black fs-6" style={{ marginTop: "10px" }}>
            Acabas de iniciar sesión, <strong>{arrayUsers?.name}</strong>!
            Esperamos que disfrutes tu experiencia aquí.
          </p>
        </div>

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

        <div
          style={{
            border: "1px solid #ccc", // Borde de la tarjeta
            borderRadius: "10px", // Bordes redondeados
            padding: "40px", // Espacio exterior
            fontFamily: "Arial, sans-serif", // Fuente del texto
            fontSize: "16px", // Tamaño de la fuente
            lineHeight: "1.6", // Altura de la línea
            textAlign: "justify", // Alineación del texto
            color: "#333", // Color del texto
            backgroundColor: "#f9f9f9", // Color de fondo
          }}
        >
          <p style={{ margin: 0 }}>
            <strong>"</strong>Este es un aplicativo diseñado para el registro de
            soportes, cuyo objetivo es mejorar el manejo de la información en el
            sector de servicios. Buscamos facilitar la organización y gestión de
            datos, consolidando todo en un solo lugar para una experiencia más
            clara y sencilla.<strong>"</strong>
          </p>
        </div>
      </div>
    </>
  );
};
