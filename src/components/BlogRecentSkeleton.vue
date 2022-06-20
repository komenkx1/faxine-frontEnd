<template>
    <li class="recent-posts" v-for="berita in 4" :key="berita">
        <div class="recent-posts-image recent-posts-image-skeleton">
        </div>
        <div class="recent-posts-body">
            <span class="recent-posts-meta recent-posts-skeleton mb-2"></span>
            <h6 class="recent-posts-title recent-posts-title-skeleton">
            </h6>
        </div>
    </li>
</template>


<script>
export default {
    name: 'BlogRecentSkeleton',

}
</script>