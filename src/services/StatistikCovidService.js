import http from "./http-common";


  class StatistikCovidService {
    getStatistik() {
      return http.get("/statistik/covid");
    }
    getStatistikVaksinasi() {
      return http.get("/statistik/vaksin",{
        mode: 'no-cors',
      });
    }
}

export default new StatistikCovidService();
