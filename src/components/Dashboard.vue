<template>
  <div id="dashboard">
    <div>
        <NavBack></NavBack>
        <Alert></Alert>

      </div>
    <div class="container-fluid">
      <div class="row">
        <SlideBar></SlideBar>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4 mt-5">
          <router-view></router-view>
        </main>
      </div>

    </div>
  </div>
</template>

<script>

import NavBack from '../components/NavBack.vue'
import Alert from '../components/Alert.vue'
import SlideBar from '../components/SlideBar.vue'

export default {
  components: {
    NavBack,
    Alert,
    SlideBar
  },
  methods: {
    goto (link) {
      if (this.$route.path !== link) {
        this.$router.push(link)
      }
    },
    signout () {
      const api = 'https://vue-course-api.hexschool.io/logout'
      // const api = `${process.env.VUE_APP_APIPATH}/signin`
      const vm = this
      this.$http.post(api).then((response) => {
        console.log(response.data)
        if (response.data.success) {
          vm.$router.push('/')
        }
      })
    }
  }
}
</script>
