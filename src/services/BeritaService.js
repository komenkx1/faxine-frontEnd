import http from "./http-common";

class BeritaService {
    getAll() {
      return http.get("/berita");
    }
    convertDate(date){
      const objectDate = new Date(date);
      const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]
      return `${months[objectDate.getMonth()]} ${objectDate.getDate()}, ${objectDate.getFullYear()}`
    }
    sortByDate(data){
      return data.sort((a,b)=>Number(b.tanggal_pembuatan)-Number(a.tanggal_pembuatan))
    }
    get(id) {
      
      return http.get(`/berita/${id}`);
    }
    create(data) {
      return http.post("/berita", data);
    }
    update(id, data) {
      return http.put(`/berita/${id}`, data);
    }
    delete(id) {
      return http.delete(`/berita/${id}`);
    }


  }
  export default new BeritaService();