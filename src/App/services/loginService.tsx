import ApiBack from ".././utils/domains/ApiBack";

class LoginService {
  public static async consumeService(myObj: any) {
    const information = {
      method: "POST",
      body: JSON.stringify(myObj),
      headers: { "Content-Type": "application/json; charset=UTF-8" },
    };
    const URL = ApiBack.URL + ApiBack.LOGIN;
    const resultApi = fetch(URL, information)
      .then((reciveInfo) => reciveInfo.json())
      .then((myInfo) => {
        return myInfo;
      })
      .catch((myError) => {
        return myError;
      });
    return resultApi;
  }
}
export default LoginService;
