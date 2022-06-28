import http from "./http-common";

class LokasiService {
    getAll() {
      return http.get("/lokasi");
    }
    getPerPage(page) {
      return http.get(`/lokasi?page=${page}`);
    }
    get(id) {
      
      return http.get(`/lokasi/${id}`);
    }
    search(query) {
      return http.get("/lokasi/search?query=" + query);
    }
    create(data) {
      return http.post("/lokasi", data);
    }
    update(id, data) {
      return http.put(`/lokasi/${id}`, data);
    }
    delete(id) {
      return http.delete(`/lokasi/${id}`);
    }


  }
  export default new LokasiService();