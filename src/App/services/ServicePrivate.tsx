// import { NavigateFunction, useNavigate  } from "react-router-dom";
import ApiBack from ".././utils/domains/ApiBack";

class ServicePrivate {
  // Service with bearer to do request GET
  // *******************************************************************
  public static async requestGET(urlService: string) {
    const token = localStorage.getItem("access"); // Asegúrate de que el nombre de la clave es correcto
    if (!token) {
      throw new Error("No token found");
    }

    const bearer = "Bearer " + token;

    const dataSend = {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: bearer,
      },
    };

    const url = ApiBack.URL + urlService;

    try {
      const response = await fetch(url, dataSend);
      if (!response.ok) {
        const errorData = await response.json();
        return errorData;
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  // Service with bearer to do request POST
  // *******************************************************************
  public static async requestPOST(urlService: string, miJSON: any) {
    const token = localStorage.getItem("access"); // Asegúrate de que el nombre de la clave es correcto
    if (!token) {
      throw new Error("No token found");
    }

    const bearer = "Bearer " + token;

    const dataSend = {
      method: "POST",
      body: JSON.stringify(miJSON),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: bearer,
      },
    };

    const url = ApiBack.URL + urlService;

    try {
      const response = await fetch(url, dataSend);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Error fetching data");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  // Service with bearer to do request DELETE
  // *******************************************************************
  public static async requestDELETE(urlService: string) {
    const token = localStorage.getItem("access"); // Asegúrate de que el nombre de la clave es correcto
    if (!token) {
      throw new Error("No token found");
    }

    const bearer = "Bearer " + token;

    const dataSend = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: bearer,
      },
    };

    const url = ApiBack.URL + urlService;

    try {
      const response = await fetch(url, dataSend);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Error fetching data");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }

  // Service with bearer to do request PUT
  // *******************************************************************
  public static async requestPUT(urlService: string, miJSON: any) {
    const token = localStorage.getItem("access"); // Asegúrate de que el nombre de la clave es correcto
    if (!token) {
      throw new Error("No token found");
    }

    const bearer = "Bearer " + token;

    const dataSend = {
      method: "PUT",
      body: JSON.stringify(miJSON),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Authorization: bearer,
      },
    };

    const url = ApiBack.URL + urlService;

    try {
      const response = await fetch(url, dataSend);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Error fetching data");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error:", error);
      throw error;
    }
  }
}

export default ServicePrivate;
