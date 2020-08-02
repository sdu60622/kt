<template>
  <div id="navback">
    <nav class="navbar navbar-dark fixed-top  flex-md-nowrap p-0 shadow">
      <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">KT後台</a>
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a class="nav-link" href="#"  @click.prevent="signout">登出</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>

export default {
  components: {
    // Register your component
  },
  methods: {
    goto (link) {
      if (this.$route.path !== link) {
        this.$router.push(link)
      }
    },
    signout () {
      const api = `${process.env.VUE_APP_APIPATH}/logout`
      // const api = `${process.env.VUE_APP_APIPATH}/signin`
      const vm = this
      this.$http.post(api).then((response) => {
        console.log(response.data)
        if (response.data.success) {
          vm.$router.push('/login')
        }
      })
    }
  }
}

</script>
