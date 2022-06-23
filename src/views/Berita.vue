<template>
    <div>
        <main>
            <!-- breadcrumb section start -->
            <div class="breadcrumb-area bg-img bg-img-berita">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <div class="breadcrumb-wrap">
                                <nav aria-label="breadcrumb">
                                    <h2 class="breadcrumb-title">Berita</h2>
                                    <ul class="breadcrumb">
                                        <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
                                        <li class="breadcrumb-item active" aria-current="page">Berita</li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- breadcrumb section end -->
            <BeritaList/>
        </main>
    </div>
</template>
<script>
import BeritaList from '@/components/BeritaList.vue';
import CustomAlert from '@/components/CustomAlert.vue';
// import { Swal } from "sweetalert2/dist/sweetalert2";

export default {
    name: 'BeritaVue',

    components: { BeritaList },

    methods: {
        async showAlert() {
        // Use sweetalert2
        CustomAlert.fire({
            icon: 'success',
            title: 'Success'
        })
        },
    },
    mounted() {
        this.showAlert();
    },
};
</script>