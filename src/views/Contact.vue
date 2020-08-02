<template>
<!-- https://www.emailjs.com/docs/sdk/installation/ -->
<!-- https://www.npmjs.com/package/fms-form-design -->
  <div  id="contact">
    <div>

  <b-navbar variant="faded" type="light">
    <b-navbar-brand href="#">
      <a id="home" href="#"><span @click="goto('/')"><img src="../../public/img/logo1.png"></span></a>
    </b-navbar-brand>
  </b-navbar>
</div>

    <div class="container">
      <div class="col-12 pt-3" >
        <h2>聯絡我們 | <span>CONTACT US</span> </h2>
      </div>
      <div class="col-12 text-center">
        <img src="../../public/img/logo.png">
      </div>

          <form class="contact-form p-4 " @submit.prevent="sendEmail">
            <div class="form-row">
              <div class="col-12 pb-4">
                <label>姓名 | Name</label>
                <select class="form-control" name="option">
                  <option>請選擇分類</option>
                  <option>加盟洽詢</option>
                  <option>一般諮詢</option>
                  <option>行銷合作</option>
                  <option>意見反饋</option>
                  <option>其他</option>
                </select>
              </div>

                <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 pb-4">
                  <label>姓名 | Name</label>
                  <input type="text" name="name" class="form-control" placeholder="請輸入姓名"  v-bind:class="{ 'is-invalid': usernameError }" v-model="username">
                  <div class="invalid-feedback">{{ userErrMsg }}</div>
                </div>

                <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 pb-4">
                  <label>電話 | Phone</label>
                  <input type="text" name="phone" class="form-control" placeholder="請輸入連絡電話">
                </div>
                <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 pb-4">
                  <label>電子信箱 | Email</label>
                  <input type="email" name="email" class="form-control" placeholder="請輸入電子信箱">
                </div>
                <div class="col-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 pb-4">
                  <label>通訊地址 | Address</label>
                  <input type="text" name="address" class="form-control" placeholder="請輸入通訊地址">
                </div>

              <div class="col-12 pb-4">
                <label>其他 | Other</label>
                <textarea class="form-control" name="message" rows="5"></textarea>
              </div>
              <div class="col-12 text-center">
                <button type="button submit" class="btn btn-outline-gold"  >送出</button>
              </div>
            </div>
          </form>

      </div>

  </div>
</template>

<style>
body{
  background: #262626;
}
</style>

<script>
import emailjs from 'emailjs-com'

export default {
  data () {
    return {
      username: ''
    }
  },
  methods: {
    goto (link) {
      if (this.$route.path !== link) {
        this.$router.push(link)
      }
    },
    sendEmail: (e) => {
      emailjs.sendForm('sdu60622_gmail', 'kt', e.target, 'user_g4K6TLA69bSjmFaphmrbR')
        .then((result) => {
          alert('已收到您的資料,將有專人與你聯絡,謝謝')
        }, (error) => {
          console.log('FAILED...', error)
        })
    }
  },
  watch: {
    username: function () {
      var isText = /^[0-9]*$/
      if (!isText.test(this.username)) {
        this.usernameError = true
        this.userErrMsg = '請輸入阿拉伯數字'
      } else {
        this.usernameError = false
      }
    }
  }
}
</script>
