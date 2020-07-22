<template>
    <div class="index">
        <div class="side-container">
            <ul class="side-option">
                <router-link to="/index">
                    <li class="big-li" id="all-option" @click="changeCurrent($event)">
                        <img src="../../assets/img/all.png" class="icon">
                        噪声过滤
                    </li>
                </router-link>
                <li class="big-li" style="padding-bottom: 0">
                    <div style="margin-bottom: 10px">
                        <img src="../../assets/img/one.png" class="icon">
                        根因定位
                    </div>
                    <ul class="part-option">
                        <router-link :to="{path:'/index/part', query:{name: currentChoose, options: JSON.stringify(optionsList)}}">
                            <li
                                v-for="(partOption, index) in partList"
                                :key="index"
                                @click="changeCurrent($event)"
                                :data-index="index"
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
      currentData: "",
      data: [],
      partList: [{item: "类型一"},{item: "类型二"}],
      dataList: [],
      optionsList: [],
      options1: [
        {
          value: 0,
          label: '测试集一'
        },
        {
          value: 1,
          label: '测试集二'
        },
        {
          value: 3,
          label: '测试集四'
        },
        {
          value: 4,
          label: '测试集五'
        },
        {
          value: 5,
          label: '测试集六'
        },
        {
          value: 6,
          label: '测试集七'
        },
        {
          value: 7,
          label: '测试集八'
        },
        {
          value: 8,
          label: '测试集九'
        },
        {
          value: 9,
          label: '测试集十'
        },
        {
          value: 10,
          label: '测试集十一'
        },
        {
          value: 11,
          label: '测试集十二'
        },
        {
          value: 13,
          label: '测试集十四'
        },
        {
          value: 14,
          label: '测试集十五'
        },
        {
          value: 16,
          label: '测试集十七'
        },
        {
          value: 18,
          label: '测试集十九'
        },
        {
          value: 19,
          label: '测试集二十'
        },
      ],
      options2: [
        {
          value: 2,
          label: '测试集三'
        },
        {
          value: 12,
          label: '测试集十三'
        },
        {
          value: 15,
          label: '测试集十六'
        },
        {
          value: 17,
          label: '测试集十八'
        }
      ],
    };
  },
  methods: {
    changeCurrent(e) {
      this.currentChoose = e.target.innerText;
      if(this.currentChoose == "类型一"){
        this.optionsList = this.options1;
      }else {
        this.optionsList = this.options2;
      }
    }
  },
  mounted() {
  // let that = this;
  // fetch("/api/topology/parts", {
  //   method: "get"
  // })
  //   .then(response => response.json())
  //   .then(data => {
  //     that.dataList = data;
  //     that.currentData = data[Object.keys(data)[0]];
  //     sessionStorage.setItem("currentData", JSON.stringify(data[Object.keys(data)[0]]));
  //   });
  }
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
  top: 16px;
  left: 40px;
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
  z-index: 1000;
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
  padding: 15px 0;
  margin-top: 40px;
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
