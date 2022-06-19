<template>
    <div>
        <main>
            <!-- breadcrumb section start -->
            <div class="breadcrumb-area bg-img" data-bg="assets/img/banner/page-banner.jpg">
                <div class="container">
                    <div class="row">
                        <div class="col-12">
                            <div class="breadcrumb-wrap">
                                <nav aria-label="breadcrumb">
                                    <h2 class="breadcrumb-title">Blog</h2>
                                    <ul class="breadcrumb">
                                        <li class="breadcrumb-item"><a href="index.html">Home</a></li>
                                        <li class="breadcrumb-item active" aria-current="page">Blog Left Sidebar</li>
                                    </ul>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <!-- breadcrumb section end -->
            <BeritaDetail/>
        </main>
    </div>
</template>
<script>
import BeritaDetail from '@/components/BeritaDetail.vue';
import CustomAlert from '@/components/CustomAlert.vue';
// import { Swal } from "sweetalert2/dist/sweetalert2";

export default {
    name: 'BeritaVue',

    components: { BeritaDetail },

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