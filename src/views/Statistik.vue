        <template>
    <div id="statistik-section">
        <main>
            <!-- breadcrumb section start -->
            <div class="breadcrumb-area bg-img bg-img-data">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <div class="breadcrumb-wrap">
                                <nav aria-label="breadcrumb">
                                    <h2 class="breadcrumb-title">Data</h2>
                                    <ul class="breadcrumb">
                                        <li class="breadcrumb-item">
                                            <router-link to="/">Home</router-link>
                                        </li>
                                        <li class="breadcrumb-item active" aria-current="page">Data</li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- breadcrumb section end -->
            <section class="content container mb-5 mt-5">
                <div class="header-content">
                    <h1 class="font-weight-bolder">Pantau informasi COVID-19 secara tepat dan akurat</h1>
                </div>
                <hr>
                      
                 <div class="row">
                    <div class="col-md-6 mb-3" v-for="(vaksinasiData, name, index) in vaksinasi" :key="vaksinasiData">
                        <div class="card">
                            <div class="content p-3">
                                <h1 class="case-statistic-color font-weight-bolder">
                                    Vaksin Dosis {{ index + 1 }}
                                </h1>
                                <h2 class="text-right cure-statistic-color font-weight-bold">{{ this.isLoading ? "- - - -" :
                                        this.formatNumber(vaksinasiData)
                                }}</h2>
                                <p class="text-right">dosis telah diberikan</p>
                            </div>

                        </div>
                    </div>
                    
                </div>
                <hr>
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <div class="card text-center">
                            <div class="content p-3">
                                <h1 class="angka-statistik case-statistic-color">{{ this.isLoading ? "- - - -" :
                                        this.formatNumber(this.cases)
                                }}</h1>
                                <span class="case-statistic-color">
                                    Terkonfirmasi
                                </span>
                            </div>

                        </div>
                    </div>
                    <div class="col-md-6 mb-3">
                        <div class="card text-center">
                            <div class="content p-3">
                                <h1 class="angka-statistik critical-statistic-color">{{ this.isLoading ? "- - - -" :
                                        this.formatNumber(this.critical)
                                }}</h1>
                                <span class="critical-statistic-color">
                                    Dirawat
                                </span>
                            </div>

                        </div>
                    </div>
                    <div class="col-md-6 mb-3">
                        <div class="card text-center">
                            <div class="content p-3">
                                <h1 class="angka-statistik cure-statistic-color">{{ this.isLoading ? "- - - -" :
                                        this.formatNumber(this.recovered)
                                }}</h1>
                                <span class="cure-statistic-color">
                                    Sembuh
                                </span>
                            </div>

                        </div>
                    </div>
                    <div class="col-md-6 mb-3">
                        <div class="card text-center">
                            <div class="content p-3">

                                <h1 class="angka-statistik death-statistic-color">{{ this.isLoading ? "- - - -" :
                                        this.formatNumber(this.deaths)
                                }}</h1>
                                <span class="death-statistic-color">
                                    Meninggal
                                </span>
                            </div>

                        </div>
                    </div>
                </div>
      
            </section>

        </main>
    </div>
</template>
        <script>
        import StatistikCovidService from '@/services/StatistikCovidService'
        import scrollToTop from "@/helper/ScrollToTopHelper";
        
        export default {
            name: 'StatistikVue',
            data() {
                return {
                    isLoading: false,
                    cases: 0,
                    deaths: 0,
                    recovered: 0,
                    critical: 0,
                    vaksinasi : []
                };
            },
            methods: {
                formatNumber(value) {
                    const formatter = new Intl.NumberFormat('id-ID', {
                        currency: 'IDR',
                        minimumFractionDigits: 0
                    });
                    return formatter.format(value);
        
                },
                getStatistik() {
                    this.isLoading = true;
                    StatistikCovidService.getStatistik().then(response => {
                        console.log(response.data);
                        this.cases = response.data.update.total.jumlah_positif
                        this.deaths = response.data.update.total.jumlah_meninggal
                        this.recovered = response.data.update.total.jumlah_sembuh
                        this.critical = response.data.update.total.jumlah_dirawat
                        this.isLoading = false
        
                    })
                },
                getStatistikVaksin() {
                    this.isLoading = true;
                    StatistikCovidService.getStatistikVaksinasi().then(response => {
                        console.log(response.data.vaksinasi.total);
                        this.vaksinasi = response.data.vaksinasi.total
                        this.isLoading = false
        
                    })
                }
            },
        
            mounted() {
                scrollToTop('statistik-section');
                this.getStatistik()
                this.getStatistikVaksin()
                window.setInterval(() => {
                    StatistikCovidService.getStatistik().then(response => {
                        this.cases = response.data.update.total.jumlah_positif
                        this.deaths = response.data.update.total.jumlah_meninggal
                        this.recovered = response.data.update.total.jumlah_sembuh
                        this.critical = response.data.update.total.jumlah_dirawat
                        this.isLoading = false
        
                    })
                }, 15000)
            }
        
        }
        </script>