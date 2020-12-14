import http from "../http-common";

class TypeProjectDataService {
  getAll() {
    return http.get("/typeProjects");
  }

  get(id) {
    return http.get(`/typeProjects/${id}`);
  }

  create(data) {
    return http.post("/typeProjects", data);
  }

  update(id, data) {
    return http.put(`/typeProjects/${id}`, data);
  }

  delete(id) {
    return http.delete(`/typeProjects/${id}`);
  }

  deleteAll() {
    return http.delete(`/typeProjects`);
  }

  
  findByTitle(title) {
    return http.get(`/typeProjects?title=${title}`);
  }
  checkTypeHasProjects(id){
    return http.get(`/projects/type/${id}`);
    
  }
}


export default new TypeProjectDataService();