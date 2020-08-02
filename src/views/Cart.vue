<template>
  <div id="carttable">
    <div>
      <Nav></Nav>
    </div>
    <loading :active.sync="isLoading" ></loading>

    <div class="container">
      <div class="row mt-4">
        <div class="col-12 mt-3">
          <h2 class="mb-4" style="color:white">訂單確認 | <span style="color:#E7C46E">Check</span></h2>
          <div style="border:1px solid white" ></div>
        </div>
      </div>

      <div class="col-12">
        <table class="table">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">品名</th>
              <th scope="col">數量</th>
              <th scope="col">單價</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in cartData" :key="item.id">
              <td></td>
              <td>{{item.product.title}}</td>
              <td>{{item.product.num}} / {{item.product.unit}}</td>
              <td>{{item.product.price}}</td>
            </tr>
            <tr>
              <td></td>
                <td></td>
                <td>總計</td>
                <td>{{cartTotalPrice}}
              </td>
            </tr>
          </tbody>
        </table>
<!-- <div class="input-group mb-3 input-group-sm">
  <input type="text" class="form-control" placeholder="請輸入優惠碼">
  <div class="input-group-append">
    <button class="btn btn-outline-secondary" type="button">
      套用優惠碼
    </button>
  </div>
</div> -->
      </div>
    </div>

  </div>
</template>

<script>
import Nav from '../components/Nav.vue'

export default {
  components: {
    Nav
  },
  data () {
    return {
      products: [],
      isLoading: false,
      product: {},
      id: ''
    }
  },
  methods: {
    getProducts () {
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products`
      const vm = this
      vm.isLoading = true
      this.$http.get(url).then((response) => {
        console.log(response)
        vm.isLoading = false
        vm.products = response.data.products
      })
    },
    getCart () {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      vm.isLoading = true
      this.$http.get(url).then((response) => {
        console.log(response)
        vm.isLoading = false
        this.cartData = response.data.data.carts
        this.cartTotalPrice = response.data.data.total
      })
    }
  },
  created () {
    this.getProducts()
    this.getCart()
  },
  props: ['cartData', 'cartTotalPrice']
}
</script>
