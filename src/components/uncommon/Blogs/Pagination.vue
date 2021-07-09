<template>
  <div v-if="totalPages() > 0" class="pagination">
    <span v-if="showPrevious()" class="pagination-btn" @click="updatePage(currentPage - 1)"> Previous </span>

    {{ currentPage + 1 }} of {{ totalPages() }}

    <span v-if="showNext()" class="pagination-btn" @click="updatePage(currentPage + 1)"> Next </span>
  </div>
</template>

<script>
export default {
  name: 'pagination',
  props: ['blogs', 'currentPage', 'pageSize'],
  methods: {
    updatePage(pageNumber) {
      this.$emit('updatePage', pageNumber)
    },
    totalPages(){
      //return the smallest integer greater than or equal given number
      return Math.ceil(this.blogs.length / this.pageSize);
    },
    showPrevious() {
      return this.currentPage == 0 ? false : true;
    },
    showNext() {
      return this.currentPage == (this.totalPages() -1) ? false : true;
    }
  }
};
</script>

<style scoped>
.pagination-btn {
  display: inline-block;
  cursor: pointer;
  margin: 0 10px;
  border-bottom: 1px solid;
  transition: 0.3s;
}
.pagination-btn:hover{
  color: black;
}
</style>
