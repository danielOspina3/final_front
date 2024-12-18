import React from "react";
import { Carousel } from "react-bootstrap";
import { motion } from "framer-motion";
import "bootstrap/dist/css/bootstrap.min.css";
import Image1 from "./images/informes.jpg";
import Image2 from "./images/capacitacion.jpg";
import Image3 from "./images/image3.jpg";
import teamImage from "./img/Exterior2.png";
import Adriana from "./img/AdrianaPicacoca.png";
import AdrianaR from "./img/AdrianaRamos.png";
import Diana from "./img/DianaTorres.png";
import Elsi from "./img/ElsiSosa.png";
import Francisco from "./img/FranciscoCardozo.png";
import Jeimy from "./img/JeimySanabria.png";
import Katherin from "./img/KatherinBeltran.png";
import Monica from "./img/MonicaGamboa.jpg";
import Olga from "./img/OlgaFranco.png";
import Oscar from "./img/OscarSuarez.png";
import Valentina from "./img/ValentinaFlorez.jpeg";
import Yoribe from "./img/YoribeMoreno.png";

export const Conocenos = () => (
  <>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" />
    <link
      href="https://fonts.googleapis.com/css2?family=Aclonica&family=DynaPuff:wght@400..700&family=Righteous&family=Rozha+One&display=swap"
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
          <img src={Image1} alt="" className="full-background-image" />
        </Carousel.Item>
        <Carousel.Item>
          <img src={Image2} alt="" className="full-background-image" />
        </Carousel.Item>
        <Carousel.Item>
          <img src={Image3} alt="" className="full-background-image" />
        </Carousel.Item>
      </Carousel>

      <div className="navbar2">
        <div className="">
          <a href="/">Inicio</a>
          <a href="/Conocenos">Conocenos</a>
          <a href="#/servicios">Servicios</a>
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
            <i className="fa-brands fa-whatsapp"></i>
          </a>
          <a href="#">
            <i className="fa-brands fa-instagram"></i>
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
    <br />
    {/* "Inicio" Section */}
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
        Conocenos
      </h2>
      <div className="row d-flex justify-content-center">
        <div className="col-lg-6">
          <div className="card">
            <div className="">
              <div className="servicio-item1">
                <p>
                  La empresa SISTEMA DE INFORMACIÓN EN ATENCIÓN EN SALUD ROCKY,
                  ha basado su EXPERIENCIA en el diseño, desarrollo e
                  implementación de soluciones de software para el sector Salud,
                  venta De Sistema De Información En Salud para las
                  Instituciones Prestadoras de Salud de Primer Nivel en lo
                  referente al suministro, actualización y soporte Técnico,
                  Auditoria Integral de Cuentas Medicas, Auditoria de Calidad,
                  Capacitaciones, Revisión, Generación, Validación y Cargue de
                  Informes a los Diferentes Entes de Control, Revisión de los
                  procesos de Facturación, Suministro de Computadores,
                  Servidores, Instalación y mantenimiento De Redes. Cuenta con
                  el respaldo de más de 115 Instituciones prestadoras de Salud
                  como clientes en todo el departamento de Boyacá, Santander,
                  Cesar y Sur de Bolívar, las cuales son la garantía que nos
                  permite seguir creciendo, ofreciendo un servicio profesional
                  de alta calidad, serio y eficiente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="servicios" className="servicios-section">
        <div className="servicios-grid">
          <div className="servicio-item2">
            <h3>
              Mision <i className="fa-solid fa-pencil"></i>
            </h3>

            <p>
              La empresa Rocky busca con el desarrollo e implementación del
              Software mejorar la calidad de la Información de los servicios de
              Salud en las IPS de primer Nivel, utilizando una tecnología
              apropiada, fácil de entender y manejar, valorando el talento
              Humano y compromiso de su equipo de trabajo, manteniendo nuestros
              principios y siendo sostenibles, basados en la calidad,
              eficiencia, seguridad y confiabilidad de la Información.
            </p>
          </div>
          <div className="servicio-item2">
            <h3>
              Vision <i className="fa-solid fa-binoculars"></i>
            </h3>
            Rocky como empresa se ve posicionada para el año 2023, como una
            Empresa líder, reconocida principalmente por las IPS de primer Nivel
            del departamento de Boyacá y porque no en los demás departamentos,
            ya que nuestro software brinda calidad, fácil manejo, seguridad en
            su información, ayudado por el soporte y capacitación brindado
            eficazmente por el trabajo en equipo cumpliendo con las expectativas
            de nuestros clientes, aportando en el desarrollo, crecimiento,
            estabilidad y funcionamiento de los procesos de Calidad de Cada IPS.
          </div>
        </div>
      </div>

      <motion.div
        id="noticias"
        className="noticias-section"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      ></motion.div>
    </motion.div>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <div className="row d-flex justify-content-center">
      <h3 className="tittle">Nuestro equipo</h3>
      <img className="Exterior" src={teamImage} alt="foto de todo el team" />

      <div className="col-lg-2 team-member">
        <img className="Integrantes" src={Francisco} alt="foto de Francisco" />
        <h4 className="member-name">Dr. Francisco Javier Cardozo</h4>
        <h4 className="member-position">Gerente</h4>
        <h4 className="member-department">Administrativo</h4>
      </div>
      <div className="col-lg-2 team-member">
        <img className="Integrantes" src={Elsi} alt="foto de Elsi" />
        <h4 className="member-name">Ing. Elsi Yohana Sosa</h4>
        <h4 className="member-position">Supervisora</h4>
        <h4 className="member-department">Administrativo</h4>
      </div>
      <div className="col-lg-2 team-member">
        <img className="Integrantes" src={Jeimy} alt="foto de Jeimy" />
        <h4 className="member-name">Jeimy Muñoz Sanabria</h4>
        <h4 className="member-position">Supervisora</h4>
        <h4 className="member-department">Informes</h4>
      </div>
      <div className="col-lg-2 team-member">
        <img className="Integrantes" src={Olga} alt="foto de Olga" />
        <h4 className="member-name">Olga Marlen Franco</h4>
        <h4 className="member-position">Supervisora</h4>
        <h4 className="member-department">Auditoria y Radicación</h4>
      </div>
      <div className="col-lg-2 team-member">
        <img className="Integrantes" src={Adriana} alt="foto de Adriana" />
        <h4 className="member-name">Adriana Niño Ramos</h4>
        <h4 className="member-position">Supervisora</h4>
        <h4 className="member-department">Soporte tecnico </h4>
      </div>
      <div className="col-lg-2 team-member">
        <img className="Integrantes" src={Oscar} alt="foto de Oscar" />
        <h4 className="member-name">Ing. Oscar Leonardo Suarez </h4>
        <h4 className="member-position">Supervisor</h4>
        <h4 className="member-department">Desarrollo</h4>
      </div>
      <div className="col-lg-2 team-member">
        <img className="Integrantes" src={Yoribe} alt="foto de Yoribe" />
        <h4 className="member-name">Yoribe Andrea Moreno </h4>
        <h4 className="member-position">Supervisora</h4>
        <h4 className="member-department">Capacitación</h4>
      </div>
      <div className="col-lg-2 team-member">
        <img className="Integrantes" src={Diana} alt="foto de Diana" />
        <h4 className="member-name">Diana Geraldine Torres</h4>
        <h4 className="member-position">Coordinadora</h4>
        <h4 className="member-department">Informes</h4>
      </div>
      <div className="col-lg-2 team-member">
        <img className="Integrantes" src={Adriana} alt="foto de Adriana" />
        <h4 className="member-name">Adriana Yasmin Piracoca </h4>
        <h4 className="member-position">Coordinadora</h4>
        <h4 className="member-department">Informes</h4>
      </div>
      <div className="col-lg-2 team-member">
        <img className="Integrantes" src={Katherin} alt="foto de Katherin" />
        <h4 className="member-name">Katherin Beltran Guerrero</h4>
        <h4 className="member-position">Coordinadora</h4>
        <h4 className="member-department">Auditoria y Radicación</h4>
      </div>
    </div>

    <div className="footer">
      <div className="footer-column">
        <h2>Rocky</h2>
        <div className="footer-text">
          <p>Sistema de información primaria</p>
        </div>
        <div className="footer-social-icons">
          <a href="#">
            Whattsapp <i className="fa-brands fa-whatsapp"></i>
          </a>
          <br />
          <a href="#">
            Instagram <i className="fa-brands fa-instagram"></i>
          </a>
        </div>
      </div>
      <div className="footer-column">
        <h2>Servicios</h2>
        <div className="footer-text">
          <ul>
            <li>Sistemas de informacion en salud</li>
            <li>Auditoria integral en salud</li>
            <li>Informes para entes de control (EPS)</li>
            <li>Preauditoria y Radicación de cuentas médicas</li>
            <li>Auditoría, procesos de cartera y contratación</li>
            <li>Suministro de equipos de cómputo</li>
            <li>Soporte técnico</li>
            <li>Rocky Learn (Procesos educativos)</li>
            <li>Instalación y mantenimiento de redes</li>
          </ul>
        </div>
      </div>
      <div className="footer-column">
        <h2>Sedes</h2>
        <div className="footer-text">
          <p>
            <strong>Carrera 8 N 54A - 04Prados del norte</strong>
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
  
  .Exterior{
  width: 100%; 
  height: auto;  
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

  .Integrantes {
    width: 150px;
    height: 150px; 
    border-radius: 50%;
    border: 3px solid #005cbf;
    object-fit: cover;
    margin: 10px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;}

  .Integrantes:hover {
    transform: scale(1.1); /* Aumenta el tamaño de la imagen al pasar el cursor */
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Añade sombra */
  }
  .team-member {
    text-align: center;
    margin: 20px;
}

  .member-name {
    font-size: 16px;
    font-weight: bold;
    color: #333;
    margin-top: 10px;
  }

  .member-position {
      font-size: 14px;
      font-weight: bold;
      color: #005cbf;
      margin: 5px 0;
  }

  .member-department {
      font-size: 14px;
      color: #666;
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
  .navbar a:hover { background-color: #003366; }
  
          .inicio-section, .servicios-section {
          padding: 50px 20px;
          text-align: center;
          background-color: #f4f4f4;
          color: #333;
          height: 100vh;
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
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-top: 20px;
        }

        .servicios-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
}
        .text{
        color: black;
        text-align: center;
        }
        .tittle{
        color: #003366;
        text-align: center;


        }

        .servicio-item1 {
          background-color: #003366;
          color: #ffffff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        .servicio-item2 {
          background-color: #003366;
          color: #ffffff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }

        .servicio-item2 h3 { color: #dabf5c; }
        .servicio-item1 h3 { color: #dabf5c; }

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
          text-decoration: none;
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

        .footer { background-color: #003366; color: #dabf5c; display: flex; justify-content: space-around; padding: 20px; }
        .footer-text {color: white}
        .footer-column { padding: 20px; }
        .footer-column h2 { border-bottom: 1px solid #fff; padding-bottom: 10px; }
        .footer-social-icons a { color: white; }        
`}</style>
  </>
);
