import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
// import imglogoR from "../../assets/images/Rocky/LOGOROCKY.png";
// import imglogoRp from "../../assets/images/Rocky/LOGOROCKYPeque.png";
// import userLogo from "../../assets/images/faces-clipart/pic-1.png";
import { jwtDecode } from "jwt-decode";
import ServicePrivate from "../services/ServicePrivate";
import ApiBack from "../utils/domains/ApiBack";
//import { MessageToastify } from "../utils/funtions/MessageToastify";
import User from "../models/user";
// import Rockyico from "../../assets/images/Rocky/LOGOROCKYPeque.png";

export const Navbar = () => {
  //Variables to all tsx
  const myNavigate = useNavigate();
  const [arrayUsers, setArrayUsers] = useState<User>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);

  //const [isOpen, setIsOpen] = useState(false); // Set initial state based on rightSidebar prop

  // const toggleOffcanvas = () => {
  //   setIsOpen(!isOpen); // Toggle open/closed state
  // };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("lastResponse");
    localStorage.removeItem("user");
    myNavigate("/");
  };
  //function to error the Token on the time, using when token is invalid or expired
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

  // UseEffect to fetch user data once professionals are loaded
  // UseEffect to set a timeout for token expiration
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
      <nav className="navbar default-layout-navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
        <div className="text-center  d-flex align-items-center justify-content-center">
          <Link className="navbar-brand brand-logo" to="/home">
            {/* <img src={imglogoR} alt="logo" width={50} height={50} /> */}
          </Link>
          <Link
            className="navbar-brand brand-logo-mini d-inline-block d-lg-none"
            to="/home/main"
          >
            {/* <img src={imglogoR} alt="logo" /> */}
          </Link>
        </div>
        <div className="navbar-menu-wrapper d-flex align-items-center">
          <Link to="/home/main" style={{ textDecoration: "none" }}>
            <h5
              className="mb-0 font-weight-medium d-none d-xl-flex fs-5 fw-bold"
              style={{
                color: "#d9931175", // Color específico
                fontFamily: "Arial", // Fuente diferente
                textShadow: "1px 1px 2px black", // Sombra negra alrededor del texto
              }}
            >
              &nbsp;ROCKY
            </h5>
          </Link>
          <ul className="navbar-nav navbar-nav-right">
            <li className="nav-item nav-profile d-none d-sm-flex">
              <Dropdown>
                <Dropdown.Toggle className="nav-link">
                  <div className="nav-profile-img">
                    {/* <img src="" alt="user" /> */}
                    <span className="availability-status online"></span>
                  </div>
                  <div className="nav-profile-text">
                    <p className="mb-1 fw-bold text-black fs-6">
                      <i className="fa-regular fa-user text-black fs-4"></i>
                      &nbsp; &nbsp;
                      {arrayUsers?.name}
                    </p>
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu className="navbar-dropdown">
                  <Dropdown.Item
                    href="!#"
                    onClick={(evt) => evt.preventDefault()}
                  >
                    <div className="dropdown-header text-center">
                      {/* <img
                        className="img-md rounded-circle"
                        src={userLogo}
                        alt="user"
                      /> */}
                      <p className="mb-1 mt-3 d-flex justify-content-center">
                        {/* {arrayUsers?.first_name} - {arrayUsers?.id_specialty} */}
                      </p>
                      <p className="font-weight-light text-muted mb-0">
                        {arrayUsers?.email}
                      </p>
                    </div>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={logout}>
                    <p className="preview-item d-flex align-items-center m-0 text-danger">
                      <i className="dropdown-item-icon icon-power mr-2">
                        <i className="fa-solid fa-arrow-right-from-bracket"></i>
                      </i>
                      &nbsp; Salir
                    </p>
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </li>
          </ul>
          {/* <button
            className="navbar-toggler navbar-toggler-right d-lg-none align-self-center"
            type="button"
            onClick={toggleOffcanvas}
          >
            <span className="icon-menu">dasda</span>
          </button> */}
        </div>
      </nav>
    </>
  );
};
