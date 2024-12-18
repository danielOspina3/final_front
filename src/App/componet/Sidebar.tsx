import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useLocation, useNavigate } from "react-router-dom";
import imgDash from "../assets/images/Rocky/LOGOROCKYPeque.png";
// import { jwtDecode } from "jwt-decode";
// import ApiBack from "../utils/domains/ApiBack";
// import ServicePrivate from "../services/ServicePrivate";
// import User from "../models/user";

export const Sidebar = () => {
  const location = useLocation();
  // const [state, setMenuState] = useState<{ [key: string]: boolean }>({});
  //Variables to all tsx
  const myNavigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);
  const [isSupportMenuOpen, setIsSupportMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isIpsMenuOpen, setIsIpsMenuOpen] = useState(false);
  // const toggleMenuState = (menuState: string) => {
  //   setMenuState((prevState) => {
  //     const newState = Object.keys(prevState).reduce((acc, key) => {
  //       acc[key] = false;
  //       return acc;
  //     }, {} as { [key: string]: boolean });

  //     newState[menuState] = !prevState[menuState];
  //     return newState;
  //   });
  // };

  const toggleSupportMenu = () => {
    setIsSupportMenuOpen(!isSupportMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const toggleIpsMenu = () => {
    setIsIpsMenuOpen(!isIpsMenuOpen);
  };
  const onRouteChanged = () => {
    const sidebar = document.querySelector("#sidebar");
    if (sidebar) {
      sidebar.classList.remove("active");
    }

    const dropdownPaths = [
      { path: "/apps", state: "appsMenuOpen" },
      { path: "/basic-ui", state: "basicUiMenuOpen" },
      { path: "/advanced-ui", state: "advancedUiMenuOpen" },
      { path: "/form-elements", state: "formElementsMenuOpen" },
    ];

    dropdownPaths.forEach((obj) => {
      // if (isPathActive(obj.path)) {
      //   setMenuState((prevState) => ({ ...prevState, [obj.state]: true }));
      // }
    });
  };

  // const isPathActive = (path: string): boolean => {
  //   return location.pathname.startsWith(path);
  // };
  //function to error the Token on the time, using when token is invalid or expired
  const handleTokenError = () => {
    myNavigate("/"); // Redirigir a la página de inicio de sesión
  };

  const getProfessionals = async () => {
    try {
      // const myAccess: any = sessionStorage.getItem("access");
      // const decodedToken: any = jwtDecode(myAccess);
      // const userId = decodedToken.user_id;
      // const url = ApiBack.USER_LIST_ONE + "/" + userId;

      const token = localStorage.getItem("access");
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

  // console.log(Rol);
  useEffect(() => {
    onRouteChanged();
    getProfessionals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);
  return (
    <>
      <nav
        className="sidebar sidebar-offcanvas d-block position-fixed"
        id="sidebar"
        style={{
          background: "linear-gradient(to right, #0F0F6F 86%, #EBEFF3 101%)", // Degradado de #0F0F6F a #EBEFF3
          paddingLeft: "0!important",
          marginLeft: "0!important",
          borderRight: "1px solid #ccc",
          height: "100vh", // Asegúrate de que la barra lateral ocupe toda la altura de la ventana
        }}
      >
        <img
          src={imgDash}
          alt="Logo Rocky"
          style={{
            width: "30px",
            height: "auto",
            marginLeft: "90px",
            marginTop: "30px",
          }}
        />
        <ul
          className="nav"
          style={{
            overflowY: "auto",
            margin: "0",
            background: "transparent", // Hacer el fondo transparente para que herede el degradado del nav
          }}
        >
          <li className="nav-item navbar-brand-mini-wrapper">
            <Link className="nav-link navbar-brand brand-logo-mini" to="/home">
              {/* <img src={imgDash} alt="logo" /> */}
            </Link>
          </li>
          <li className="nav-item navbar-brand nav-profile sidebar-offcanvas"></li>

          <li style={{ margin: "0 !important" }} className="nav-item">
            <span
              className="nav-link fs-5 fw-bold text-white"
              onClick={toggleSupportMenu}
              style={{
                cursor: "pointer",
                paddingLeft: "15px",
                marginLeft: "0 !important",
                color: "white !important",
                backgroundColor: "transparent !important",
              }}
            >
              Soporte
            </span>

            {/* Menú desplegable */}
            {isSupportMenuOpen && (
              <ul
                className="nav flex-column ms-3"
                style={{
                  color: "white",
                  paddingLeft: "0",
                  background: "transparent",
                }} // Hacer el fondo transparente
              >
                <li className="nav-item">
                  <Link
                    className="nav-link text-white"
                    to="/home/create-support"
                    style={{
                      padding: "10px 15px !important",
                      color: "white !important",
                      borderRadius: "8px !important",
                      boxShadow: "0 0 10px yellow !important",
                      // Mantener el mismo degradado
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Creación
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link text-white"
                    to="/home/support-view"
                    style={{
                      padding: "10px 15px !important",
                      color: "white !important",
                      borderRadius: "8px !important",
                      boxShadow: "0 0 10px yellow !important",
                      // Mantener el mismo degradado
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Soportes
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link text-white"
                    to="/home/support-view-final"
                    style={{
                      padding: "10px 15px !important",
                      color: "white !important",
                      borderRadius: "8px !important",
                      boxShadow: "0 0 10px yellow !important",
                      // Mantener el mismo degradado
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Finalizados
                  </Link>
                </li>
                <li className="nav-item" style={{ color: "white" }}>
                  <Link
                    className="nav-link"
                    to="/home/view-mysupport"
                    style={{ color: "white", paddingLeft: "30px" }}
                  >
                    Mis Soportes
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li style={{ color: "black" }} className="nav-item">
            <span
              className="nav-link fs-5 fw-bold text-white"
              onClick={toggleUserMenu}
              style={{
                cursor: "pointer",
                padding: "10px 15px",
                color: "white !important",
                backgroundColor: "transparent !important",
              }}
            >
              Usuarios
            </span>

            {/* Menú desplegable de Usuarios */}
            {isUserMenuOpen && (
              <ul
                className="nav flex-column ms-3"
                style={{ background: "transparent" }}
              >
                <li className="nav-item">
                  <Link
                    className="nav-link text-white"
                    to="/home/create-user"
                    style={{
                      padding: "10px 15px !important",
                      color: "white !important",
                      borderRadius: "8px !important",
                      boxShadow: "0 0 10px yellow !important",
                      // Mantener el mismo degradado
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Creación
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className="nav-link text-white"
                    to="/home/view-user"
                    style={{
                      padding: "10px 15px !important",
                      color: "white !important",
                      borderRadius: "8px !important",
                      boxShadow: "0 0 10px yellow !important",
                      // Mantener el mismo degradado
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Usuarios
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li className="nav-item">
            <span
              className="nav-link fs-5 fw-bold text-white"
              onClick={toggleIpsMenu}
              style={{
                cursor: "pointer",
                padding: "10px 15px",
                color: "white !important",
                backgroundColor: "transparent !important",
              }}
            >
              IPS
            </span>

            {/* Menú desplegable de IPS */}
            {isIpsMenuOpen && (
              <ul
                className="nav flex-column ms-3"
                style={{ background: "transparent" }}
              >
                <li className="nav-item">
                  <Link
                    className="nav-link text-white"
                    to="/home/ips-view"
                    style={{
                      padding: "10px 15px !important",
                      color: "white !important",
                      borderRadius: "8px !important",
                      boxShadow: "0 0 10px yellow !important",
                      // Mantener el mismo degradado
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    IPS
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </>
  );
};
