import axios from "axios";

const API_URL = "http://localhost:8087/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  
  register(data) {
    return axios.post(API_URL + "signup", data);
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }

  getAll() {
    return axios.get(API_URL + "");
  }

   get(id) {
    return axios.get(API_URL + `${id}`);
  }

  update(id, data) {
    return axios.put(API_URL + `${id}`, data);
  }
  delete(id) {
    return axios.delete(API_URL + `${id}`);
  }

  deleteAll() {
    return axios.delete(API_URL);
  }

  
  findByTitle(title) {
    return axios.get(API_URL + `?username=${title}`);
  }
}

export default new AuthService();
