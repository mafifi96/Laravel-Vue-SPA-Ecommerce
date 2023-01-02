<template>

<nav aria-label="Page navigation example">
  <ul class="pagination justify-content-center">

<template v-for="(page , index) in pages" :key="index">

    <li  :class="{ active : page.active , disabled : page.url == null}" class="page-item">

         <a class="page-link" @click.prevent="$emit('changePage',page.url)" v-html="page.label"></a>

    </li>
</template>

  </ul>
</nav>
</template>

<script>


export default {
    props : ['pages']
}
</script>

<style scope>

.page-link{
    cursor: pointer;
}
</style>
