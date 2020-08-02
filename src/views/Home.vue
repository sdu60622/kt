<template>
<div id="home">
  <div>
      <Nav></Nav>
    </div>
   <go-top :max-width='992' :size="50" :right="100" :bottom="50"></go-top>
<!-- 輪播圖 -->
  <div>
    <b-carousel
      id="carousel"
      v-model="slide"
      :interval="3000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=1"></b-carousel-slide>
      <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=2"></b-carousel-slide>
      <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=3"></b-carousel-slide>
    </b-carousel>
  </div>

  <!-- 店家特色 -->
  <div id="about">
  <div class="special pt-5 pb-5">
    <div class="container">

      <div class="col-12 col-lg-12">
        <span><font-awesome-icon :icon="['fas', 'home']" class="fa-2x"></font-awesome-icon>  關於我們 | About</span>
      </div>

      <div class="special01 text-center">
        <div class="col-lg-12 col-12 pt-5">
        <div><h2>品質堅持 ‧ 道道驚喜</h2></div>
        <div><h5>OUR FAMILY STYLE CUISINE</h5></div>
        <div><p class="pt-3">KT是一家在泰國的台灣鹽酥雞店，我們店的宗旨是傳達台灣小吃文化，與泰國人分享台灣美食，品牌理念是製作出值得顧客懷念的好味道。主打商品有台灣蒜味鹽酥雞以及茶葉蛋。</p></div>
        </div>

        <!-- 重點特色 -->
        <div class="row">
          <div class="col-xl-3 col-lg-3 col-md-3 col-12 col-sm-12 " >
            <u-animate-container>
              <u-animate
              name="fadeInUp"
              delay="0s"
              duration="1s"
              :iteration="1"
              :offset="0"
              animateClass="animated"
              :begin="false"
              >
                <img src="../../public/img/sp1.svg" class="pb-2" >
                <h6>INGREDIENTS</h6>
                <h6>嚴選食材</h6>
              </u-animate>
            </u-animate-container>
          </div>

          <div class="col-xl-3 col-lg-3 col-md-3 col-12 col-sm-12 " >
            <u-animate-container>
              <u-animate
              name="fadeInUp"
              delay="0s"
              duration="1s"
              :iteration="1"
              :offset="0"
              animateClass="animated"
              :begin="false"
              >
                <img src="../../public/img/sp2.svg" class="pb-2" >
                <h6>Fragrance</h6>
                <h6>茶香四溢</h6>
              </u-animate>
            </u-animate-container>
          </div>

          <div class="col-xl-3 col-lg-3 col-md-3 col-12 col-sm-12 " >
            <u-animate-container>
              <u-animate
              name="fadeInUp"
              delay="0s"
              duration="1s"
              :iteration="1"
              :offset="0"
              animateClass="animated"
              :begin="false"
              >
                <img src="../../public/img/sp3.svg" class="pb-2" >
                <h6>UNIQUE SAUCE</h6>
                <h6>100%台灣口味</h6>
              </u-animate>
            </u-animate-container>
          </div>

          <div class="col-xl-3 col-lg-3 col-md-3 col-12 col-sm-12 " >
            <u-animate-container>
              <u-animate
              name="fadeInUp"
              delay="0s"
              duration="1s"
              :iteration="1"
              :offset="0"
              animateClass="animated"
              :begin="false"
              >
                <img src="../../public/img/sp4.svg" class="pb-2" >
                <h6>JOIN US</h6>
                <h6>完整加盟體系</h6>
              </u-animate>
            </u-animate-container>
          </div>

        </div>

      </div>
    </div>
  </div>
  </div>

  <!-- card輪播圖 -->
  <!-- https://www.npmjs.com/package/vue-owl-carousel -->
  <div id="menu" class="col-12 pt-5 pb-5 ">

    <div class="container">

    <div class="col-12 col-lg-12">
        <span><font-awesome-icon :icon="['fas', 'heart']" class="fa-2x"></font-awesome-icon>  精選菜單 | Menu</span>
      </div>

    <carousel class="owlCarousel pt-5" :autoplay="true" :margin="20" :nav="false" :responsive="{0:{items:1,nav:false},768:{items:3,nav:false}}">
    <div>
      <b-card
      title="正宗道地台灣鹽酥雞"
      img-src="../../public/img/menu/menu01.jpg"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 600px;"
      class="mb-2"
      >
        <b-card-text>
          正宗台灣鹽酥雞,由多種中藥及獨門秘方醃製而成,必點招牌鹽酥雞。
        </b-card-text>

        <button type="button" class="btn btn-danger" @click="goto('/menu')">MORE</button>
      </b-card>
    </div>

    <div>
      <b-card
      title="飄香茶葉蛋"
      img-src="../../public/img/menu/menu02.jpg"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 600px;"
      class="mb-2"
      >
        <b-card-text>
          多種中藥煮至入味的茶葉蛋
        </b-card-text>

        <button type="button" class="btn btn-danger" @click="goto('/menu')">MORE</button>
      </b-card>
    </div>

    <div>
      <b-card
      title="炸甜不辣"
      img-src="../../public/img/menu/menu03.jpg"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 600px;"
      class="mb-2"
      >
        <b-card-text>
          酥脆的甜不辣，讓你一口接一口。
        </b-card-text>

        <button type="button" class="btn btn-danger" @click="goto('/menu')">MORE</button>
      </b-card>
    </div>

    <div>
      <b-card
      title="台灣雞排"
      img-src="../../public/img/menu/menu04.jpg"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 600px;"
      class="mb-2"
      >
        <b-card-text>
          厚切、肉嫩多汁美味雞排。
        </b-card-text>

        <button type="button" class="btn btn-danger" @click="goto('/menu')">MORE</button>
      </b-card>
    </div>

  </carousel>
  </div>
</div>

  <!-- 產品輪播 -->
  <div id="product">

  </div>

  <!-- 加盟 -->
  <div id="join">
    <div class="container">
      <div class="col-12 col-lg-12 pt-5 pb-5">
        <span><font-awesome-icon :icon="['fas', 'flag']" class="fa-2x"></font-awesome-icon>  加盟資訊 | JOIN</span>

        <div class="col-12 text-center pt-5 ">
          <u-animate-container>
              <u-animate
              name="fadeInUp"
              delay="0s"
              duration="1s"
              :iteration="1"
              :offset="0"
              animateClass="animated"
              :begin="false"
              >
                <img src="../../public/img/logo.png">
            </u-animate>
          </u-animate-container>
        </div>

        <div class="col-12 text-center pt-3 join">
          <u-animate-container>
              <u-animate
              name="fadeInUp"
              delay="0s"
              duration="1s"
              :iteration="1"
              :offset="0"
              animateClass="animated"
              :begin="false"
              >
                <a id="news" href="#"><span @click="goto('/contact')"><font-awesome-icon :icon="['fas', 'star']" class="fa-1x mr-1"></font-awesome-icon> JOIN US  <font-awesome-icon :icon="['fas', 'star']" class="fa-1x mr-1"></font-awesome-icon></span></a>
            </u-animate>
          </u-animate-container>
        </div>

      </div>
    </div>
  </div>

<!-- follow -->
<div id="follow" class=" pt-4 pb-4">
  <div class="container">
    <div class="col-12 text-center">
      <p>FOLLOW</p>
    </div>
    <div class="row ">
      <div class="col-12 text-center pt-1">
        <a href="#"><font-awesome-icon :icon="['fab', 'line']" class="fa-3x mr-5"/></a>
        <a href="#"><font-awesome-icon :icon="['fab', 'facebook-square']" class="fa-3x mr-5"/></a>
        <a href="#"><font-awesome-icon :icon="['fab', 'instagram']" class="fa-3x mr-5"/></a>
        <a href="#"><font-awesome-icon :icon="['fab', 'youtube']" class="fa-3x"/></a>
      </div>
    </div>
    <div class="col-12 text-center pt-1">
      <div class="footer-copyright text-center py-3">Copyright © 2020 KT TAIWAN  All rights reserved.
  </div>
    </div>

  </div>
</div>

</div>
</template>

<script>
import carousel from 'vue-owl-carousel'
import { UAnimateContainer, UAnimate } from 'vue-wow'
import GoTop from '@inotom/vue-go-top'
import Nav from '../components/Nav.vue'

export default {

  data () {
    return {
      slide: 0,
      sliding: null
    }
  },
  methods: {
    goto (link) {
      if (this.$route.path !== link) {
        this.$router.push(link)
      }
    },
    onSlideStart (slide) {
      this.sliding = true
    },
    onSlideEnd (slide) {
      this.sliding = false
    }
  },
  components: {
    carousel,
    UAnimateContainer,
    UAnimate,
    GoTop,
    Nav
  }
}
</script>
