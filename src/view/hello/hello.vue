<template>
    <div class="hello">
        <div class="bg">
            <h1 class="title">基于网络拓扑及告警的
                <br>故障根因定位系统实现及算法研究
                <router-link to="/index" class="enter">
                <img src="../../assets/img/enter.png" class="enter-icon">
                </router-link>
            </h1>
            <div class="stars">
                <div class="star" v-for="(item,index) in starsCount" :key="index" ref="star"></div>
            </div>
        </div>
    </div>
</template>

<script>
import "echarts/lib/chart/pie";

export default {
  name: "hello",
  data() {
    return {
      starsCount: 800, //数量
      distance: 600 //间距
    };
  },
  methods: {},
  //调用
  mounted() {
    let starArr = this.$refs.star;
    starArr.forEach(item => {
      var speed = 0.2 + Math.random() * 1;
      var distance = this.distance + Math.random() * 300;
      item.style.transformOrigin = `0 0 ${distance}px`;
      item.style.transform = `translate3d(0,0,-${distance}px) rotateY(${Math.random() *
        360}deg) rotateX(${Math.random() * -50}deg) scale(${speed},${speed})`;
    });
  }
};
</script>


<style scoped>
.hello {
  position: relative;
  background-image: url("../../assets/img/bg.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: fixed;
  background-position: 0 0;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}
.bg {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}
.title {
  position: absolute;
  top: 24%;
  right: 3%;
  color: rgba(255, 255, 255, 0.8);
  font-size: 50px;
}
.enter {
  display: block;
  margin-top: 20px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 30px;
  letter-spacing: 2px;
  font-weight: 600;
}
.enter-icon {
    width: 50px;
    height: 50px;
    padding: 5px;
}
.enter-icon:hover {
    width: 60px;
    height: 60px;
}


/*星空背景*/
.stars {
  position: absolute;
  left: 50%;
  bottom: -256px;
  transform: perspective(500px);
  transform-style: preserve-3d;
  perspective-origin: 50% 100%;
  animation: rotate 90s infinite linear;
}
.star {
  width: 2px;
  height: 2px;
  background: #fdfdbae1;
  border-radius: 50%;
  border: 1px solid #fdfdbae1;
  position: absolute;
  top: 0;
  left: 0;
  backface-visibility: hidden;
}
@keyframes rotate {
  0% {
    transform: perspective(400px) rotateZ(20deg) rotateX(-40deg) rotateY(0);
  }
  100% {
    transform: perspective(400px) rotateZ(20deg) rotateX(-40deg)
      rotateY(-360deg);
  }
}
</style>
