<template>
  <div>
    <h2><%= 1 ></h2>
    <div class="block">
      <p><%= 2 ></p>
    </div>
    <div class="block">
      <h3><%= 3 ></h3>
      <p><%= 4 ></p>
    </div>
    <div class="block">
      <h3><%= 5 ></h3>
      <el-row :gutter="20">
        <el-col :span="9">
          <p><%= 6 ></p>
        </el-col>
        <el-col :span="15" class="nav-demos">
          <img src="~examples/assets/images/navbar_1.png" alt="<%= 7 >" @click="enlarge(846, $event)">
          <h5><%= 7 ></h5>
          <p><%= 8 ></p>
          <img src="~examples/assets/images/navbar_2.png" alt="<%= 9 >" @click="enlarge(846, $event)">
          <h5><%= 9 ></h5>
          <p><%= 10 ></p>
          <img src="~examples/assets/images/navbar_3.png" alt="<%= 11 >" @click="enlarge(846, $event)">
          <h5><%= 11 ></h5>
          <p><%= 12 ></p>
        </el-col>
      </el-row>
    </div>
    <div class="block">
      <h3><%= 13 ></h3>
      <el-row>
        <el-col :span="10">
          <p><%= 14 ></p>
        </el-col>
        <el-col :span="14" class="nav-demos">
          <img src="~examples/assets/images/navbar_0.png" alt="" @click="enlarge(846, $event)">
          <p><%= 15 ></p>
        </el-col>
      </el-row>
    </div>
    <transition name="fade">
      <div class="mask" v-show="showDialog" @click="showDialog = false"></div>
    </transition>
    <transition name="zoom">
      <div class="dialog-img" :style='imgWrapStyle' v-show="showDialog" @click="showDialog = false">
        <div class="imgWrap" :style="imgStyle">
          <img :src="imgUrl" alt="">
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        imgUrl: '',
        imgBound: {},
        showDialog: false,
        imgStyle: {},
        imgWrapStyle: {}
      };
    },
    watch: {
      showDialog(val) {
        document.body.style.overflow = val ? 'hidden' : '';
      }
    },
    methods: {
      enlarge(imgWidth, ev) {
        var imgNode = ev.target;
        // var bound = imgNode.getBoundingClientRect();
        var offset = {};
        var doc = document;

        offset.left = (doc.body.scrollWidth - imgWidth) / 2;
        offset.top = 100;

        this.imgUrl = imgNode.src;
        this.imgBound = imgNode.getBoundingClientRect();

        this.imgWrapStyle.transformOrigin = `${ev.clientX}px ${ev.clientY}px`;
        // this.imgStyle.transformOrigin = `${ev.clientX}px ${ev.clientY}px`;
        this.imgStyle.width = imgWidth + 'px';
        this.showDialog = true;
      }
    }
  };
</script>
