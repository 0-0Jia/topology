<template>
    <div class="index">
        <div class="side-container">
            <ul class="side-option">
                <router-link to="/index">
                    <li class="big-li" id="all-option" @click="changeCurrent($event)">
                        <img src="../../assets/img/all.png" class="icon">
                        整体
                    </li>
                </router-link>
                <li class="big-li" style="padding-bottom: 0">
                    <div style="margin-bottom: 10px">
                        <img src="../../assets/img/one.png" class="icon">
                        局部
                    </div>
                    <ul class="part-option">
                        <router-link :to="{path:'/index/part'}">
                            <li
                                v-for="(partOption, index) in partList"
                                :key="index"
                                @click="changeCurrent($event)"
                                :style="{color: currentChoose == partOption.item? 'rgba(2, 58, 90, 0.993)':'white', backgroundColor: currentChoose == partOption.item? 'white':'rgba(2, 58, 90, 0.993)'}"
                            >{{partOption.item}}</li>
                        </router-link>
                    </ul>
                </li>
            </ul>
        </div>
        <div class="main-container">
            <router-view :data="data"></router-view>
        </div>
    </div>
</template>

<script>
require("echarts/extension/dataTool");

export default {
  name: "index",
  data() {
    return {
      currentChoose: "",
      data: [
        {
          name: "节点1",
          x: 100,
          y: 100
        },
        {
          name: "节点2",
          x: 400,
          y: 300
        },
        {
          name: "节点3",
          x: 550,
          y: 100
        },
        {
          name: "节点4",
          x: 200,
          y: 500
        },
        {
          name: "节点5",
          x: 600,
          y: 620
        }
      ],
      partList: [
        { item: "选项一" },
        { item: "选项二" },
        { item: "选项三" },
        { item: "选项四" },
        { item: "选项五" },
        { item: "选项六" },
        { item: "选项七" },
        { item: "选项八" },
        { item: "选项九" },
        { item: "选项十" },
        { item: "选项十一" },
        { item: "选项十二" },
        { item: "选项十三" },
        { item: "选项十四" },
        { item: "选项十五" },
        { item: "选项十六" },
        { item: "选项十七" },
        { item: "选项十八" }
      ]
    };
  },
  methods: {
    changeCurrent(e) {
      this.currentChoose = e.target.innerText;
      if (this.currentChoose == "选项一") {
        this.data = [
          {
            name: "节点1",
            x: 250,
            y: 350
          },
          {
            name: "节点2",
            x: 400,
            y: 300
          },
          {
            name: "节点3",
            x: 300,
            y: 550
          },
          {
            name: "节点4",
            x: 420,
            y: 450
          },
          {
            name: "节点5",
            x: 500,
            y: 500
          }
        ];
      } else {
        this.data = [
          {
            name: "节点1",
            x: 100,
            y: 100
          },
          {
            name: "节点2",
            x: 400,
            y: 300
          },
          {
            name: "节点3",
            x: 550,
            y: 100
          },
          {
            name: "节点4",
            x: 200,
            y: 500
          },
          {
            name: "节点5",
            x: 600,
            y: 620
          }
        ];
      }
    }
  },
  //调用
  mounted() {}
};
</script>


<style scoped>
a {
  text-decoration: none;
  color: white;
}
ul {
  list-style: none;
}
::-webkit-scrollbar {
  display: none;
}

.icon {
  position: absolute;
  top: 11px;
  left: 50px;
  width: 20px;
  height: 20px;
}

.index {
  position: relative;
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
}

.side-container {
  position: fixed;
  width: 240px;
  height: 100vh;
  left: 0;
  top: 0;
  background-color: rgba(2, 70, 109, 0.829);
  box-shadow: 10px 10px 15px rgba(1, 55, 87, 0.719);
  overflow-x: auto;
}

.side-option {
  position: absolute;
  top: 10px;
  left: 0;
  margin: 0;
  padding: 0;
  width: 100%;
  color: white;
  text-align: center;
}
#all-option:hover {
  background-color: rgba(2, 58, 90, 0.993);
}
.big-li {
  position: relative;
  width: 100%;
  padding: 10px 0;
  margin-top: 10px;
  font-size: 22px;
  font-weight: 600;
  letter-spacing: 2px;
  background-color: rgba(3, 67, 104, 0.993);
  line-height: 22px;
  cursor: pointer;
}
/* .big-li:after {
  content: "";
  width: 0;
  height: 0;
  position: absolute;
  display: block;
  border-width: 24px;
  border-style: solid;
}
.big-li:after {
  right: -48px;
  top: 0;
  border-color: transparent transparent transparent rgba(3, 67, 104, 0.993);
} */
.part-option {
  position: relative;
  width: 100%;
  padding: 0;
  margin-top: 10px 0;
}
.part-option li {
  width: 100%;
  padding: 10px 0;
  font-size: 18px;
  background-color: rgba(2, 58, 90, 0.993);
  cursor: pointer;
}
.part-option li:hover {
  color: rgba(2, 58, 90, 0.993);
  background-color: white;
}

.main-container {
  margin-left: 250px;
}
</style>
