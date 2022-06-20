
<template>
       <div class="col-md-6" v-for="berita in 4" :key="berita">
                    <div class="blog-item mt-40">
                      <div class="blog-thumb blog-thumb-skeleton">
                      </div>
                      <div class="blog-content ">
                        <h3 class="blog-title blog-title-skeleton">
                        </h3>
                        <p class="desc-blog-skeleton"></p>
                        <div class="blog-meta meta-blog-skeleton">
                        </div>
                      </div>
                    </div>
                  </div>
</template>
<script>
export default {
    name: 'BlogItemSkeleton',

}
</script>