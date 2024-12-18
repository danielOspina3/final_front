import React from "react";
import { Carousel } from "react-bootstrap";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import Image1 from "./images/informes.jpg";
import Image2 from "./images/capacitacion.jpg";
import Image3 from "./images/image3.jpg";
export const index = () => {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Aclonica&family=Crimson+Text:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=DynaPuff:wght@400..700&family=Noto+Serif+Telugu:wght@100..900&family=Righteous&family=Rozha+One&display=swap"
        rel="stylesheet"
      />
      <div className="background">
        <Carousel
          className="carousel"
          interval={3000}
          controls={true}
          indicators={false}
        >
          <Carousel.Item>
            <img
              src={Image1}
              alt="foto de todo el team"
              className="full-background-image"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              src={Image2}
              alt="foto de todo el team"
              className="full-background-image"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              src={Image3}
              alt="foto de todo el team"
              className="full-background-image"
            />
          </Carousel.Item>
        </Carousel>

        <div className="navbar">
          <div>
            <a href="#">Inicio</a>
            <a href="/Conocenos">Conocenos</a>
            <a href="#servicios">Servicios</a>
            <a href="#footer">Contacto</a>
            <a href="#noticias">Noticias</a>
            <a href="#herramientas">Herramientas</a>
            <a href="/login" className="login-button">
              Iniciar sesión
            </a>
          </div>
          <div className="social-icons">
            <a href="#">
              <i className="fa fa-phone"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fa-brands fa-facebook"></i>
            </a>
          </div>
        </div>

        <div className="logo-container">
          <h1 className="logo">Rocky</h1>
          <p className="subtitle">Sistema de información primaria</p>
        </div>

        <a href="#" className="whatsapp">
          ¿Necesitas ayuda?
        </a>
      </div>

      {/* "Inicio" Section */}
      {/* <motion.div
        id="inicio"
        className="inicio-section"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2>Bienvenido a Rocky</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit...</p>
      </motion.div> */}

      {/* "Servicios" Section */}
      <motion.div
        id="servicios"
        className="servicios-section"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2
          style={{
            fontFamily: "Righteous, sans-serif",
            fontSize: "5em",
            background: "( #003366)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
          }}
        >
          Servicios
        </h2>

        <div className="servicios-grid">
          <div
            className="servicio-item"
            style={{ backgroundColor: "#003366", color: "#ffffff" }}
          >
            <h3 style={{ color: "#dabf5c" }}>Diseño del Software</h3>
            <p>
              Software es construido con un modelo evolutivo y abierto, el cual
              nos permite entregar resultados en tiempos óptimos y ajustados a
              la normativas vigente, el software sistema de información cuenta
              con nueve (9) aplicaciones básicas y que son de utilidad para
              nuestros clientes, ya que con estas se garantiza la prestación de
              servicio en salud de una manera rápida, eficiente confiable y
              segura.
            </p>
          </div>
          <div
            className="servicio-item"
            style={{ backgroundColor: "#003366", color: "#ffffff" }}
          >
            <h3 style={{ color: "#dabf5c" }}>Facturación Electrónica</h3>
            <p>
              Las facturas electrónicas es el soporte de transacciones de venta
              de bienes y servicios, en un sistema computacional que cumplen con
              las condiciones de expedición, recibo, rechazo y conservación, de
              acuerdo con la dirección de impuestos y aduanas nacionales de
              Colombia (DIAN).
            </p>
          </div>
          <div
            className="servicio-item"
            style={{ backgroundColor: "#003366", color: "#ffffff" }}
          >
            <h3 style={{ color: "#dabf5c" }}>Auditoria en calidad en Salud</h3>
            <p>
              Contestación de glosas, procesos de devoluciones de facturas,
              procesos de liquidaciones contractuales con las EPS y asistencia a
              los procesos de contratación con las EPS, procesos de
              pre-auditoria, alistamiento y radicación de cuentas medicas
              auditoria de calidad
            </p>
          </div>
          <div
            className="servicio-item"
            style={{ backgroundColor: "#003366", color: "#ffffff" }}
          >
            <h3 style={{ color: "#dabf5c" }}>Capacitaciones</h3>
            <p>
              Rocky brinda procesos de capacitación y entrenamiento al personal
              de casa IPS sobre el manejo y diligenciamiento del software
              sistema de información en atención primaria con todos sus
              aplicativos, Contamos con un enlace y correo electrónico para que
              el personal de la IPS solicite las capacitaciones y entrenamiento
              según necesidad del servicio.
            </p>
          </div>
          <div
            className="servicio-item"
            style={{ backgroundColor: "#003366", color: "#ffffff" }}
          >
            <h3 style={{ color: "#dabf5c" }}>Soporte Técnico</h3>
            <p>
              Soporte técnico del software sistema de información en atención
              primaria
            </p>
          </div>
          <div
            className="servicio-item"
            style={{ backgroundColor: "#003366", color: "#ffffff" }}
          >
            <h3 style={{ color: "#dabf5c" }}>
              Informes Para Entes De Control (EPS)
            </h3>
            <p>
              Generación, validación y cargue de informes a los entes de control
              en salud
            </p>
          </div>
          <div
            className="servicio-item"
            style={{ backgroundColor: "#003366", color: "#ffffff" }}
          >
            <h3 style={{ color: "#dabf5c" }}>Suministro de computadores</h3>
            <p>
              Soluciones tecnológicas e implementaciones para IPS, alquiler y
              venta de equipos, soporte de hardware y software, servidores, etc
            </p>
          </div>
          <div
            className="servicio-item"
            style={{ backgroundColor: "#003366", color: "#ffffff" }}
          >
            <h3 style={{ color: "#dabf5c" }}>Instalación de redes</h3>
            <p>
              écnicas profesionales en instalación y mantenimiento de cableado
              estructurado en redes de computo.
            </p>
          </div>
        </div>
        {/* "Noticias" Section */}
        <motion.div
          id="noticias"
          className="noticias-section"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2
            style={{
              fontFamily: "Righteous, sans-serif",
              fontSize: "5em",
              background: "( #003366)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
            }}
          >
            Noticias
          </h2>

          <div
            className="servicios-grid"
            style={{
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            {/* Noticia 1 */}
            <div
              className="noticias-item"
              style={{
                backgroundColor: "#ffffff",
                color: "#000000",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                width: "400px",
                height: "400px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                textAlign: "center",
              }}
            >
              <div>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_FF9PY1mN8ydvexpJEtP5ylsHu6kuY5uQLg&s"
                  alt="Cajacopi Logo"
                  style={{
                    width: "70%",
                    borderRadius: "8px",
                    marginBottom: "15px",
                  }}
                />
                <h3 style={{ color: "#003366", marginBottom: "10px" }}>
                  Plan de reorganización institucional CAJACOPI
                </h3>
                <p style={{ fontSize: "14px", marginBottom: "15px" }}>
                  La facturación con el NIT de Caja de Compensación Familiar
                  CAJACOPI Atlántico se hará hasta el 30 de noviembre de 2022, a
                  partir del 1 de diciembre se debe hacer al NIT de Cajacopi EPS
                  SAS.
                </p>
              </div>
              <a
                href="https://drive.google.com/file/d/1oE-Nix4Bw286JoT3hcBq5Q9Yv8ZDaIhE/view"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  backgroundColor: "#dabf5c",
                  color: "#003366",
                  padding: "10px 15px",
                  borderRadius: "5px",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Ver Resolución
              </a>
            </div>

            {/* Noticia 2 */}
            <div
              className="noticias-item"
              style={{
                backgroundColor: "#ffffff",
                color: "#000000",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                width: "400px",
                height: "400px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                textAlign: "center",
              }}
            >
              <div>
                <img
                  src="https://img.freepik.com/fotos-premium/manos-hombre-ocupado-trabajando-su-computadora-portatil-sentado-mesa-madera_38391-386.jpg"
                  alt="Reglamentación RIPS"
                  style={{
                    width: "50%",
                    borderRadius: "8px",
                    marginBottom: "15px",
                  }}
                />
                <h3 style={{ color: "#003366", marginBottom: "10px" }}>
                  Nueva reglamentación de los RIPS
                </h3>
                <p style={{ fontSize: "14px", marginBottom: "15px" }}>
                  Resolución 1036 de 2022, tiene por objeto reglamentar el
                  Registro Individual de Prestación de Servicios de Salud -
                  RIPS.
                </p>
              </div>
              <a
                href="https://drive.google.com/file/d/1HatFXM7AFFvp_8S-_KuEQSfWW87IlB4R/view"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  backgroundColor: "#dabf5c",
                  color: "#003366",
                  padding: "10px 15px",
                  borderRadius: "5px",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Ver Resolución
              </a>
            </div>

            {/* Noticia 3 */}
            <div
              className="noticias-item"
              style={{
                backgroundColor: "#ffffff",
                color: "#000000",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                width: "400px",
                height: "400px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                textAlign: "center",
              }}
            >
              <div>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Minsalud_Colombia.svg/800px-Minsalud_Colombia.svg.png"
                  alt="Minsalud"
                  style={{
                    width: "50%",
                    borderRadius: "8px",
                    marginBottom: "15px",
                  }}
                />
                <h3 style={{ color: "#003366", marginBottom: "10px" }}>
                  Resolución 510, del 30 de marzo de 2022
                </h3>
                <p style={{ fontSize: "14px", marginBottom: "15px" }}>
                  El Ministerio de Salud y Protección Social adopta los campos
                  de datos adicionales para la generación de la factura
                  electrónica de venta en el sector salud.
                </p>
              </div>
              <a
                href="https://drive.google.com/file/d/1d3cSVKrhvjeD7win-wKvdLTFPFL1q7vP/view"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  backgroundColor: "#dabf5c",
                  color: "#003366",
                  padding: "10px 15px",
                  borderRadius: "5px",
                  textDecoration: "none",
                  fontWeight: "bold",
                }}
              >
                Ver Resolución
              </a>
            </div>
          </div>
        </motion.div>
        {/* "Herramientas" Section */}
        <motion.div
          id="herramientas"
          className="noticias-section"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2
            style={{
              fontFamily: "Righteous, sans-serif",
              fontSize: "5em",
              background: "( #003366)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              color: "transparent",
            }}
          >
            Herramientas
          </h2>

          <div
            className="noticias-grid"
            style={{
              display: "flex",
              justifyContent: "space-around",
              flexWrap: "wrap",
              gap: "20px",
            }}
          >
            {/* Herramienta 1 */}
            <div
              className="herramienta-item"
              style={{
                backgroundColor: "#ffffff",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                width: "400px",
                height: "400px",
                textAlign: "center",
              }}
            >
              <a
                href="https://enlace1.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZwkAbYjurlhINZWOXtrg1LGMTpFDdBUVnPw&s"
                  alt="Herramienta 1"
                  style={{ width: "100%", borderRadius: "8px" }}
                />
              </a>
            </div>

            {/* Herramienta 2 */}
            <div
              className="herramienta-item"
              style={{
                backgroundColor: "#ffffff",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                width: "400px",
                height: "400px",
                textAlign: "center",
              }}
            >
              <a
                href="https://enlace2.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZwkAbYjurlhINZWOXtrg1LGMTpFDdBUVnPw&s"
                  alt="Herramienta 2"
                  style={{ width: "100%", borderRadius: "8px" }}
                />
              </a>
            </div>

            {/* Herramienta 3 */}
            <div
              className="herramienta-item"
              style={{
                backgroundColor: "#ffffff",
                padding: "20px",
                borderRadius: "8px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                width: "400px",
                height: "400px",
                textAlign: "center",
              }}
            >
              <a
                href="https://enlace3.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZwkAbYjurlhINZWOXtrg1LGMTpFDdBUVnPw&s"
                  alt="Herramienta 3"
                  style={{ width: "100%", borderRadius: "8px" }}
                />
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>

      <div id="footer" className="footer">
        <div className="footer-column">
          <h2>Rocky</h2>
          <p>Sistema de información primaria</p>
          <div className="footer-social-icons">
            <a href="#">
              <i className="fa fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fa fa-facebook"></i>
            </a>
          </div>
        </div>
        <div className="footer-column">
          <h2>Sedes</h2>
          <div className="footer-text">
            <p>
              <strong>Carrera 8 N 54A - 04 Prados del norte</strong>
            </p>
            <p>
              <strong>(Tunja - Boyacá)</strong>
            </p>
          </div>
        </div>
        <div className="footer-column">
          <h2>Contáctanos</h2>
          <div className="footer-text">
            <p>Tu opinión es importante...</p>
            <p>
              <i className="fa fa-phone"></i> (+57) 311 237 8357
            </p>
            <p>
              <i className="fa fa-envelope"></i> sistemarocky@hotmail.com
            </p>
          </div>
        </div>
      </div>

      <style>{`
        /* Reset */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
                 /* Animaciones */
        @keyframes slideIn {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes navbarSlideIn {
          from { transform: translateY(-50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }



        .background {
          position: relative;
          height: 100vh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
         

.full-background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}


        .carousel {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
        }

        .navbar {
          position: fixed;
          top: 0;
          width: 100%;
          display: flex;
          justify-content: space-around;
          padding: 25px;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 1000;
        }

        .navbar a { color: white; text-decoration: none; padding: 10px 20px; border-radius: 5px; }
        .navbar a:hover { background-color:#ffeb3b; }

        .inicio-section, .servicios-section {
          padding: 50px 20px;
          text-align: center;
          background-color: #f4f4f4;
          color: #333;
        }
.servicios-section h2 {
  font-family: 'Righteous', sans-serif;
  font-size: 2.5em;
  background: linear-gradient(90deg, #0000FF, #FFFF00); /* Degradado de azul a amarillo */
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; /* Asegura que el texto sea transparente en Safari y Chrome */
  color: transparent; /* Hace el texto transparente para ver el degradado */
}



        .servicios-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr); /* Cambiado para que muestre dos columnas */
          gap: 20px;
          margin-top: 20px;
        }
          .servicios-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
}

.noticias-item {
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}


        .servicio-item {
          border: 1px solid #ccc;
          border-radius: 10px;
          padding: 20px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          color: #333;
        }

      .logo-container {
          text-align: center;
          animation: fadeIn 1s ease-in-out;
        }

        .logo {  font-family: "Righteous", serif;
  font-weight: 400;
  font-style: normal;font-size: 10em;color : #dabf5c}
        .subtitle { font-size: 2em; font-family: "Righteous", sans-serif; }
.subtitle {
  font-size: 5em;
  font-family: "Righteous", sans-serif;
  color: #003366;
  text-align: center;
  text-shadow: 
    -1px -1px 0 #ffffff,  
    1px -1px 0 #ffffff,  
    -1px 1px 0 #ffffff,  
    1px 1px 0 #ffffff;
}



        .social-icons {
          position: absolute;
          top: 17px;
          right: 10px;
          display: flex;
          gap: 10px;
        }
        .social-icons a {
          color: black;
          background-color: white;
          border-radius: 50%;
          padding: 10px;
          font-size: 1.2em;
          display: inline-flex;
          justify-content: center;
          align-items: center;
        }

        .whatsapp {
          position: fixed;
          bottom: 20px;
          right: 20px;
          background-color: #25D366;
          color: white;
          padding: 10px 15px;
          border-radius: 50px;
          font-weight: bold;
        }

        .footer { background-color: #003366; color: #ffeb3b; display: flex; justify-content: space-around; padding: 20px; }
        .footer-text {color: white}
        .footer-column { padding: 20px; }
        .footer-column h2 { border-bottom: 1px solid #fff; padding-bottom: 10px; }
        .footer-social-icons a { color: white; }


      `}</style>
    </>
  );
};
