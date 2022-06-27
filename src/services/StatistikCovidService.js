import axios from "axios";

// const http = axios.create({
//     baseURL: 'https://corona.lmao.ninja/v2/countries',
//     headers: {
//         'Access-Control-Allow-Origin': '*',
//       'Content-type': 'application/json',
//     },
//   });

  const http = axios.create({
    baseURL: 'https://data.covid19.go.id/public/api',
    // baseURL: 'http://localhost:8080/public/api',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    },
  });

  class StatistikCovidService {
    getStatistik() {
      return http.get("/update.json",{
        mode: 'no-cors',
      });
    }
    getStatistikVaksinasi() {
      return http.get("/pemeriksaan-vaksinasi.json",{
        mode: 'no-cors',
      });
    }
}

export default new StatistikCovidService();
