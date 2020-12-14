import http from "../http-common";

class LandDataService {
  getAll() {
    return http.get("/lands");
  }

  get(id) {
    return http.get(`/lands/${id}`);
  }

  create(data) {
    return http.post("/lands", data);
  }

  update(id, data) {
    return http.put(`/lands/${id}`, data);
  }

  delete(id) {
    return http.delete(`/lands/${id}`);
  }

  deleteAll() {
    return http.delete(`/lands`);
  }

  findByTitle(title) {
    return http.get(`/lands?title=${title}`);
  }
}

export default new LandDataService();