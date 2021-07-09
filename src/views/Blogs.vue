<template>
  <div class="blogs">
    <h1>This is blogs page</h1>
    <div class="post" v-if="blogs">
      <div class="cover" @click="$router.push('/blog/0')">
        <img :src="blogs[0].thumbnail" alt="" style="width: 97.8%; height: 60vh; object-fit: cover">
        <div class="content">
          <span class="description" style="display: block; color: gray; text-transform: uppercase">{{ blogs[0].description }}</span>
            <h3 class="title">{{ blogs[0].title }}</h3>
            <em class="time" style="color: gray">{{ blogs[0].createdAt }}</em>
            <p>{{ blogs[0].content }}</p>
        </div>
      </div>
      <template 
        v-for="blog in visibleBlogs"
        v-bind:visibleBlogs="visibleBlogs"
        v-bind:currentPage="currentPage"
        v-bind:blog="blog"
      >
        <div class="blog-container" :key="'blog-'+blog.id" @click="$router.push(/blog/+blog.id)">
          <img class="photo" :src="blog.thumbnail" alt="#">
          <div class="content">
            <span class="description" style="display: block; color: gray; text-transform: uppercase">{{ blog.description }}</span>
            <h3 class="title">{{ blog.title }}</h3>
            <em class="time" style="color: gray">{{ blog.createdAt }}</em>
            <p>{{ blog.content }}</p>
          </div>
        </div>
      </template>

      <Pagination 
        v-bind:blogs="blogs"
        v-on:updatePage="updatePage"
        v-bind:currentPage="currentPage"
        v-bind:pageSize="pageSize"
      > 
      </Pagination>
    </div>
    <div v-else>
      <p>Not Found</p>
    </div>

    
  </div>
</template>

<script>
import axios from 'axios'
import Pagination from '../components/uncommon/Blogs/Pagination.vue'
export default ({
  name: 'Blogs',
  components: {
    Pagination
  },
  async created() {
    try {
      const response = await axios.get(`http://localhost:3000/blogs`)
      console.log(response)
      this.blogs = response.data
      this.updateVisibleBlogs();
    }
    catch(error){
      console.log(error)
    }
    
  },
  data() {
    return {
      blogs: [],
      currentPage: 0,
      pageSize: 3,
      visibleBlogs: [],
    }
  },
  // beforeMount: function() {
  //   this.updateVisibleBlogs();
  // },
  methods: {
    updatePage(pageNumber) {
      this.currentPage = pageNumber;
      this.updateVisibleBlogs();
    },
    updateVisibleBlogs() {
      console.log('blogs ne hehhe' + this.blogs)
      this.visibleBlogs = this.blogs.slice(this.currentPage * this.pageSize, (this.currentPage * this.pageSize) + this.pageSize);

      // if we have 0 visible Blogs, go back a page
      if (this.visibleBlogs.length == 0 && this.currentPage > 0) {
        this.updatePage(this.currentPage -1);
      }
    }
  }
      
})
</script>

<style scoped>
.blog{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
}
.blog-container{
  display: flex;
  align-items: center;
  padding: 1rem;
  box-shadow: 3px 4px 4px -5px rgba(0,0,0,0.71);
  width: 760px;
  margin: 1.6rem auto;
  text-align: left;
  font-size: 1rem;
  cursor: pointer;
  transition: 0.4s;
}
.blog-container:hover{
  box-shadow: 5px 8px 10px -5px rgba(0,0,0,0.71);
}
.cover{
  position: relative;
  margin: 30px auto;
  cursor: pointer;
}
.cover:hover .content{
  transform: scale(1.05);
}
.cover .content{
  position: absolute;
  z-index: 3;
  padding: 35px;
  top: 10%;
  left: 8%;
  width: 30%;
  background-color: white;
  text-align: left;
  transition: 0.4s;
}
.photo{
  width: 280px;
  height: 220px;
  object-fit: cover;
}
.content{
  padding: 10px 25px;
}
.content h3{
  margin: 10px 0;
  font-size: 1.2rem;
}
.content .time{
  font-size: 0.95rem;
}

/* Responsive */
@media screen and (max-width: 992px) {
  .cover .content{
    width: 40%;
    font-size: 0.95rem;
  }
  .content{
    font-size: 0.95rem;
  }
  .blog-container{
    width: 700px;
  }
  .photo{
    width: 250px;
    height: 210px;
  }
}
@media screen and (max-width: 768px) {
  .cover .content{
    width: 65%;
    font-size: 0.8rem;
  }
  .content{
    font-size: 0.8rem;
  }
  .blog-container .content p{
    display: none;
  }
  .blog-container{
    width: 530px;
  }
  .photo{
    width: 150px;
    height: 110px;
  }
}
@media screen and (max-width: 567px){
  .content h3{
    font-size: 1rem;
  }
  .content .description, .time{
    font-size: 0.8rem;
  }
  .blog-container{
    width: 90%;
  }
  .photo{
    width: 130px;
    height: 100px;
  }
}
@media screen and (max-width: 420px){
  .blog-container .content .time {
    display: none;
  }
}
</style>