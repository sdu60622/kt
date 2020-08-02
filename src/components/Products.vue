<template>
  <div>
    <loading :active.sync="isLoading" ></loading>

    <div class="text-right mt-4">
      <button class="btn btn-primary"  @click="openModal(true)">建立新的產品</button>
    </div>

    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" :class="{'disabled':!pagination.has_pre}">
          <a class="page-link" href="#" aria-label="Previous"  @click.prevent="getProducts(pagination.current_page-1)">
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
          </a>
        </li>
        <li class="page-item" v-for="page in pagination.total_pages" :key="page" :class="{'active':pagination.current_page==page}">
          <a class="page-link" href="#" @click.prevent="getProducts(page)">{{page}}</a>
        </li>
        <li class="page-item" :class="{'disabled':!pagination.has_next}">
          <a class="page-link" href="#" aria-label="Next" @click.prevent="getProducts(pagination.current_page+1)">
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>

    <table class="table mt-4">
      <thead>
        <tr>
          <th width="120">分類</th>
          <th>產品名稱</th>
          <th width="120">原價</th>
          <th width="120">售價</th>
          <th width="100">是否啟用</th>
          <th width="80">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item) in products" :key="item.id">
          <td>{{item.category}}</td>
          <td>{{item.title}}</td>
          <td class="text-right">{{item.origin_price | currency}}</td>
          <td class="text-right">{{item.price | currency}}</td>
          <td>
            <span v-if="item.is_enabled" class="text-success">啟用</span>
            <span v-else>未啟用</span>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm" @click="openModal(false,item)">編輯</button>
            <button class="btn btn-outline-primary btn-sm" @click="deleteModal(item)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- 建立新的產品modal -->
    <b-modal id="ProductModal" title="建立新產品" size="xl" hide-footer >
      <b-container fluid>
        <div class="row">
          <div class="col-sm-4">
            <div class="form-group">
              <label for="image">輸入圖片網址</label>
              <input type="text" class="form-control" id="image" v-model="tempProduct.imageUrl"
                placeholder="請輸入圖片連結">
            </div>
            <div class="form-group">
              <label for="customFile">或 上傳圖片
                <font-awesome-icon :icon="['fas', 'spinner']" class="fa-1x mr-1" spin v-if="status.fileUploading"></font-awesome-icon>
              </label>
              <input type="file" id="customFile" class="form-control"
                ref="files" @change="uploadFile">
            </div>
            <img img="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=828346ed697837ce808cae68d3ddc3cf&auto=format&fit=crop&w=1350&q=80"
              class="img-fluid" :src="tempProduct.imageUrl" alt="">
          </div>
          <div class="col-sm-8">
            <div class="form-group">
              <label for="title">標題</label>
              <input type="text" class="form-control" id="title" v-model="tempProduct.title"
                placeholder="請輸入標題">
            </div>

            <div class="form-row">
              <div class="form-group col-md-6">
                <label for="category">分類</label>
                <input type="text" class="form-control" id="category" v-model="tempProduct.category"
                  placeholder="請輸入分類">
              </div>
              <div class="form-group col-md-6">
                <label for="price">單位</label>
                <input type="unit" class="form-control" id="unit"  v-model="tempProduct.unit"
                  placeholder="請輸入單位">
              </div>
            </div>

            <div class="form-row">
              <div class="form-group col-md-6">
              <label for="origin_price">原價</label>
                <input type="number" class="form-control" id="origin_price" v-model="tempProduct.origin_price"
                  placeholder="請輸入原價">
              </div>
              <div class="form-group col-md-6">
                <label for="price">售價</label>
                <input type="number" class="form-control" id="price" v-model="tempProduct.price"
                  placeholder="請輸入售價">
              </div>
            </div>
            <hr>

            <div class="form-group">
              <label for="description">產品描述</label>
              <textarea type="text" class="form-control" id="description" v-model="tempProduct.description"
                placeholder="請輸入產品描述"></textarea>
            </div>
            <div class="form-group">
              <label for="content">說明內容</label>
              <textarea type="text" class="form-control" id="content" v-model="tempProduct.content"
                placeholder="請輸入產品說明內容"></textarea>
            </div>
            <div class="form-group">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" v-model="tempProduct.is_enabled" :true-value="1" :false-value="0"
                  id="is_enabled">
                <label class="form-check-label" for="is_enabled">
                  是否啟用
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-dismiss="modal" @click="$bvModal.hide('ProductModal')">取消</button>
          <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
        </div>

      </b-container>
    </b-modal>

    <!-- 刪除產品的modal -->
    <b-modal id="deleteproductmodal" centered title="刪除產品" hide-footer>
      <p class="my-4">確認刪除產品嗎?</p>
      <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-dismiss="modal"  @click="$bvModal.hide('deleteproductmodal')">取消</button>
          <button type="button" class="btn btn-primary" @click="confirmDeleteModal">確認</button>
        </div>
    </b-modal>
  </div>

</template>

<script>
export default {
  data () {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      isLoading: false,
      status: {
        fileUploading: false
      }

    }
  },
  methods: {
    openModal (isNew, item) {
      if (isNew) {
        this.tempProduct = {}
        this.isNew = true
      } else {
        this.tempProduct = Object.assign({}, item)
        this.isNew = false
      }
      const vm = this
      vm.$bvModal.show('ProductModal')
    },
    getProducts (page = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/products?page=${page}`
      const vm = this
      vm.isLoading = true
      this.$http.get(api).then((response) => {
        console.log(response.data)
        vm.isLoading = false
        vm.products = response.data.products
        vm.pagination = response.data.pagination
      })
    },
    updateProduct () {
      let api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product`
      let httpMethod = 'post'
      const vm = this
      if (!vm.isNew) {
        api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`
        httpMethod = 'put'
      }
      this.$http[httpMethod](api, { data: vm.tempProduct }).then((response) => {
        console.log(response.data)
        if (response.data.success) {
          vm.$bvModal.hide('ProductModal')
          vm.getProducts()
        } else {
          vm.$bvModal.hide('ProductModal')
          vm.getProducts()
          console.log('新增失敗')
        }
        // vm.products = response.data.products
      })
    },
    deleteModal (item) {
      const vm = this
      console.log(item)
      this.tempProduct = item // 透過傳進item，可以刪除指定id
      vm.$bvModal.show('deleteproductmodal')
    },
    confirmDeleteModal () {
      const vm = this
      const api = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/product/${vm.tempProduct.id}`
      const httpMethpd = 'delete'

      this.$http[httpMethpd](api).then((response) => {
        console.log(response.data)
        // 如果資料刪除成功 就關掉選單 並且再次取得資料
        if (response.data.success) {
          vm.$bvModal.hide('deleteproductmodal')
          vm.deleteConfirm = false
          vm.getProducts()
        } else {
          vm.$bvModal.hide('deleteproductmodal')
          vm.getProducts()
          console.log('刪除失敗')
        }
      })
    },
    uploadFile () {
      console.log(this)
      const uploadFile = this.$refs.files.files[0]
      const vm = this
      const formData = new FormData()
      formData.append('file-to-upload', uploadFile)
      const url = `${process.env.VUE_APP_APIPATH}/api/${process.env.VUE_APP_CUSTOMPATH}/admin/upload`
      vm.status.fileUploading = true
      this.$http.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then((response) => {
        console.log(response.data)
        vm.status.fileUploading = false
        if (response.data.success) {
          // vm.tempProduct.imageUrl = response.data.imageUrl
          // console.log(vm.tempProduct)
          vm.$set(vm.tempProduct, 'imageUrl', response.data.imageUrl)
        } else {
          this.$bus.$emit('message:push', response.data.message, 'danger')
        }
      })
    }
  },
  created () {
    this.getProducts()
  }
}
</script>
