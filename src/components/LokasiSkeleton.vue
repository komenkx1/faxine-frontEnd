
<template>
  <div class="card mt-3" v-for="index in 4" :key="index">
    <div class="card-body">
      <div class="container">
        <div class="row d-flex align-items-center justify-content-between">
          <div class="col-md-11">
            <div class="d-flex align-items-center mt-2">
              <i class="icon-skeleton"></i>
              <p class="ml-3 content-lokasi-skeleton w-100"></p>
            </div>
            <div class="d-flex align-items-center mt-2">
              <i class="icon-skeleton"></i>
              <p class="ml-3 content-lokasi-skeleton w-100"></p>
            </div>
            <div class="d-flex align-items-center mt-2">
              <i class="icon-skeleton"></i>
              <p class="ml-3 content-lokasi-skeleton w-100"></p>
            </div>

          </div>
          <div class="col-12 col-lg-1 col-md-2">
            <hr class="d-md-none d-block">
            <div class="action-button">
              <div class=" button-skeleton m-md-2 mt-2 w-100"></div>
              <div class=" button-skeleton m-md-2  mt-2 w-100"></div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'LokasiSkeleton',

}
</script>