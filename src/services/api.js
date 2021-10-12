import axios from "axios";
import Cookies from "js-cookie";
import qs from "qs";

axios.defaults.baseURL = `${process.env.REACT_APP_API_BASE_URL}`;

class ApiHelper {
  static async call(url, method = "GET", authenticated = false, data = {}) {
    const options = {
      method,
      url,
      headers: authenticated
        ? {
            Authorization: `Token ${Cookies.get("token")}`,
          }
        : {},
      paramsSerializer: (params) => {
        return qs.stringify(params, { arrayFormat: "repeat" });
      },
    };
    if (method === "GET") {
      options.params = data;
    } else {
      options.data = data;
    }
    return (await axios(options)).data;
  }
}

export default ApiHelper;
