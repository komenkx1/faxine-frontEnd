import http from "./http-common";

class LokasiService {
    getAll() {
      return http.get("/lokasi");
    }
    get(id) {
      
      return http.get(`/lokasi/${id}`);
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