<template>
  <div id="login">
  <loading :active.sync="isLoading" ></loading>

  <div>
    <b-navbar variant="faded" type="light">
      <b-navbar-brand href="#">
        <a id="home" href="#"><span @click="goto('/')"><img src="../../public/img/logo1.png"></span></a>
      </b-navbar-brand>
    </b-navbar>
  </div>

    <div class="container">
      <div class="col-12 text-center">
        <form class="form-signin" @submit.prevent="signin">
          <h1 class="h3 mb-3 font-weight-normal">店家登入</h1>
          <label for="inputEmail" class="sr-only">Email address</label>
          <input type="email" id="inputEmail" class="form-control mb-3" placeholder="請輸入信箱" v-model="user.username" required autofocus>
          <label for="inputPassword" class="sr-only">Password</label>
          <input type="password" id="inputPassword" class="form-control" placeholder="請輸入密碼" v-model="user.password" required>
          <button class="btn btn-lg btn-outline-gold mt-3" type="submit">Sign in</button>

        </form>
      </div>
    </div>
  </div>
</template>

<style>
#login{
  background: #262626;
  height: 100vh !important;
  color: white;
}
</style>

<script>
export default {
  data () {
    return {
      isLoading: false,
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    signin () {
      const api = `${process.env.VUE_APP_APIPATH}/admin/signin`
      const vm = this
      vm.isLoading = true
      this.$http.post(api, vm.user).then((response) => {
        vm.isLoading = false
        if (response.data.success) {
          vm.$router.push('/admin/products')
        }
      })
    },
    goto (link) {
      if (this.$route.path !== link) {
        this.$router.push(link)
      }
    }

  }
}
</script>
