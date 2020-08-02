<template>
  <div id="menu">
    <div>
      <Nav></Nav>
    </div>
    <loading :active.sync="isLoading" ></loading>

    <!-- 產品卡片 -->
    <div class="container">
      <div class="row mt-4">
        <div class="col-12 mt-3">
          <h2 class="mb-4" style="color:white">精選菜單 | <span style="color:#E7C46E">Menu</span></h2>
          <div style="border:1px solid white" ></div>
        </div>
        <div class="col-md-4 mt-4 mb-4" v-for="item in products" :key="item.id">
          <div class="card border-0 shadow-sm">
            <div style="height: 150px; background-size: cover; background-position: center" :style="{backgroundImage : `url(${item.imageUrl})`}"></div>
            <div class="card-body">
              <span class="badge badge-secondary float-right ml-2">{{ item.category }}</span>
              <h5 class="card-title">
                <a href="#" class="text-dark">{{item.title}}</a>
              </h5>
              <p class="card-text">{{ item.content }}</p>
              <div class="d-flex justify-content-between align-items-baseline">
                <div class="h5" v-if="!item.price">{{ item.origin_price }} 元</div>
                <del class="h6" v-if="item.price">原價 {{ item.origin_price }} 元</del>
                <div class="h5" v-if="item.price">現在只要 {{ item.price }} 元</div>
              </div>
            </div>
            <div class="card-footer d-flex">
              <button type="button" class="btn btn-outline-secondary btn-sm" @click="getProduct(item.id)">
                <i class="fas fa-spinner fa-spin"></i>
                查看更多
              </button>
              <button type="button" class="btn btn-outline-danger btn-sm ml-auto" @click="addtoCart(item.id)">
                <i class="fas fa-spinner fa-spin" ></i>
                加到購物車
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--  -->

    <!-- itemModal -->
    <div>
        <b-modal id="ItemModal" size="xl" hide-footer>
          <template v-slot:modal-title>
            <p style="font-size:1.5rem;font-family: 'Noto Sans TC', sans-serif;">{{product.title}}</p>
          </template>
          <div class="d-block">
            <div class="container-fliud mb-3">
              <div class="row">
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12">
                  <img :src="product.imageUrl" alt style="width:100%"/>
                </div>
                <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mb-3">
                  <p style="font-size:1.5rem;font-family: 'Noto Sans TC', sans-serif;" class="mb-3">{{product.title}}</p>
                  <p style="font-size:1.2rem;font-family: 'Noto Sans TC', sans-serif;" class="mb-3">{{product.description}}</p>
                  <p style="font-size:1.2rem;font-family: 'Noto Sans TC', sans-serif;" class="mb-3">{{product.content}}</p>
                  <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 mb-3 p-0">
                    <p style="font-size:1rem;text-decoration:line-through">原價NT${{product.origin_price}}</p>
                    <p style="font-size:2rem;font-family: 'Noto Sans TC', sans-serif;" >網路價NT${{product.price}}</p>
                  </div>
                  <div class="col-12 p-0 mb-3">
                    <select name="" class="form-control mb-3" v-model="product.num">
                      <option :value="num" v-for="num in 10" :key="num">選購{{num}}{{product.unit}}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer ">
            <div class="text-muted text-nowrap mr-3">小計 <strong>{{product.num*product.price}}</strong></div>
            <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="addtoCart(product.id,product.num)">加入購物車</button>
          </div>
        </b-modal>
    </div>
  <!-- Modal截止 -->

  </div>
</template>

<script>
import Nav from '../components/Nav.vue'
// import $ from 'jquery'

export default {
  components: {
    Nav
  },
  data () {
    return {
      products: [],
      isLoading: false,
      product: {},
      id: '',
      cartData: [],
      cartTotalPrice: 0

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
    getProduct (id) {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`
      vm.isLoading = true
      this.$http.get(url).then((response) => {
        console.log(response)
        vm.isLoading = false
        vm.product = response.data.product
        vm.$bvModal.show('ItemModal')
      })
    },
    addtoCart (id, qty = 1) {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      vm.isLoading = true
      const cart = {
        product_id: id,
        qty
      }
      this.$http.post(url, { data: cart }).then((response) => {
        console.log(response)
        vm.isLoading = false
        vm.getCart()
        vm.$bvModal.hide('ItemModal')
      })
    },
    getCart () {
      const vm = this
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/cart`
      vm.isLoading = true
      this.$http.get(url).then((response) => {
        console.log(response)
        vm.isLoading = false
      })
    }
    // seeMore (id) {
    //   const vm = this
    //   const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/product/${id}`
    //   vm.id = id
    //   vm.isLoading = true
    //   vm.$http.get(url).then(response => {
    //     if (response.data.success) {
    //       vm.$router.push(`menu/${vm.id}`)
    //     }
    //     vm.isLoading = false
    //   })
    // }
  },
  created () {
    this.getProducts()
    this.getCart()
  },
  watch: {
    $route: function (to, from) {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    }
  }
}
</script>
