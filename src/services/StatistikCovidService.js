import axios from "axios";

const http = axios.create({
    baseURL: 'https://corona.lmao.ninja/v2/countries',
    headers: {
        'Access-Control-Allow-Origin': '*',
      'Content-type': 'application/json',
    },
  });

  class StatistikCovidService {
    getStatistik() {
      return http.get("/indonesia?yesterday&strict&query");
    }
}

export default new StatistikCovidService();
