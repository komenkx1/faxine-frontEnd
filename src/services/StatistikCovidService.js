import axios from "axios";

const http = axios.create({
    baseURL: 'https://corona.lmao.ninja/v2/countries',
    headers: {
      'Content-type': 'application/json',
    },
  });

  const httpVaksin = axios.create({
    baseURL: 'http://localhost:8080/public/api',
    headers: {
      'Content-type': 'application/json',
    },
  });

  class StatistikCovidService {
    getStatistik() {
      return http.get("/indonesia?yesterday&strict&query");
    }
    getStatistikVaksinasi() {
      return httpVaksin.get("/pemeriksaan-vaksinasi.json");
    }
}

export default new StatistikCovidService();