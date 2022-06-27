import axios from "axios";

// const http = axios.create({
//     baseURL: 'https://corona.lmao.ninja/v2/countries',
//     headers: {
//         'Access-Control-Allow-Origin': '*',
//       'Content-type': 'application/json',
//     },
//   });

  const http = axios.create({
    baseURL: 'https://apicovid19indonesia-v2.vercel.app/api/',
    // baseURL: 'http://localhost:8080/public/api',
    headers: {
      'Content-type': 'application/json',
    },
  });

  class StatistikCovidService {
    getStatistik() {
      return http.get("/indonesia");
    }
    getStatistikVaksinasi() {
      return http.get("/pemeriksaan-vaksinasi.json");
    }
}

export default new StatistikCovidService();
