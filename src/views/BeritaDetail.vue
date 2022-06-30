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
                                    <h2 class="breadcrumb-title">Detail Berita</h2>
                                    <ul class="breadcrumb">
                                        <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
                                        <li class="breadcrumb-item active" aria-current="page">Detail Berita</li>
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
// import { Swal } from "sweetalert2/dist/sweetalert2";

export default {
    name: 'BeritaVue',

    components: { BeritaDetail },

    methods: {
    },
    mounted() {
    },
};
</script>