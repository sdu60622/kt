<template>
  <div id="itemcheck">
    <div>
      <Nav></Nav>
    </div>

      <div class="container">
        <div class="row">
          <div class="col-12 mt-5"><p>返回菜單</p></div>
          <div class="col-12 mt-3">
            <h2>精選菜單 | <span>Menu</span></h2>
            <hr>
          </div>
          <div class="itempic  mt-4 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
            <img :src="product.imageUrl" alt/>
          </div>
          <div class=" mt-4 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
            <h2 style="color:#E7C46E" class="mb-3">{{product.title}}</h2>
            <hr>
            <p style="font-size:17px">{{product.content}}</p>
            <div class="col-6 p-0">
              <p style="font-size:1rem;text-decoration:line-through">原價NT${{product.origin_price}}</p>
            </div>
            <div class="col-6 p-0">
              <p style="font-size:1.5rem;color:#E7C46E">網路價NT${{product.price}}</p>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import Nav from '../components/Nav.vue'

export default {
  data () {
    return {
      id: '',
      isLoading: false,
      product: {}
    }
  },
  components: {
    Nav
  },
  methods: {
    getProduct () {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${this.id}`
      vm.isLoading = true

      this.$http.get(url).then((response) => {
        console.log(response)
        response.data.product.num = 1
        vm.isLoading = false
        vm.product = response.data.product
      })
    }
  },
  created () {
    this.id = this.$route.params.id
    this.getProduct()
  }
}
</script>
