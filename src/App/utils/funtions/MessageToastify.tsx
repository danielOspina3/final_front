import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const MessageToastify = (tipo: string, texto: string, milisegundos: number) => {
  const opcion = String(tipo.toLowerCase());
  switch (opcion) {
    case "error":
      toast.error(texto,
        {
          position: "top-center", autoClose: milisegundos, hideProgressBar: false, closeOnClick: true, 
          pauseOnHover: true, draggable: true, progress: undefined, theme: "light",
        }
      );
      break;
      case "success":
        toast.success(texto,
          {
            position: "top-center", autoClose: milisegundos, hideProgressBar: false, closeOnClick: true, 
            pauseOnHover: true, draggable: true, progress: undefined, theme: "light",
          }
        );
        break;
        case "info":
            toast.info(texto,
              {
                position: "top-center", autoClose: milisegundos, hideProgressBar: false, closeOnClick: true, 
                pauseOnHover: true, draggable: true, progress: undefined, theme: "light",
              }
            );
        break;
        case "warning":
            toast.warning(texto,
              {
                position: "top-center", autoClose: milisegundos, hideProgressBar: false, closeOnClick: true, 
                pauseOnHover: true, draggable: true, progress: undefined, theme: "dark",
              }
            );
        break;
    default:
        console.log("No existe la copicón", opcion);
      break;
  }
};
