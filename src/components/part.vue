<template>
    <div class="part">
      <h1>根因定位 {{name}}</h1>
      <div id="main" style="width: 800px;height: 550px;"></div>
      <div class="select-container">
        <el-select v-model="value" placeholder="请选择" @change="selectData">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
            >
          </el-option>
        </el-select>
      </div>
      <div class="remind">注：图中蓝色项为根因</div>
    </div>
</template>

<script>
export default {
  name: "part",
  props: {
    currentData: {
      type: Object,
      default: ()=>JSON.parse(sessionStorage.getItem("currentData")) 
    }
  },
  data() {
    return {
      graph: {},
      name: "",
      dialogTableVisible: false,
      options: [],
      value: '',
      selectResult: "",
      loading: ""
    };
  },
  methods: {
    creatEchart() {
      var graph = JSON.parse(JSON.stringify(this.graph));
      let myChart = this.$echarts.init(document.getElementById("main"));

      for(let i = 0; i < graph.data.length; i++){
        if(graph.data[i].name == graph.root){
          graph.data[i].itemStyle = {color: "rgba(2, 58, 90, 0.993)"};
        }
      }

      let option = {
        title: {
          text: "拓扑图",
          top: "bottom",
          left: "right"
        },
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: "quinticInOut",
        series: [
          {
            type: "graph",
            layout: 'force',
            force: {
              repulsion: 400,  
              edgeLength: [100, 300],
              gravity: 0.1
            },
            symbolSize: 50,
            roam: true,
            label: {
              show: true
            },
            edgeSymbol: ["circle", "arrow"],
            edgeSymbolSize: [4, 10],
            edgeLabel: {
              fontSize: 20
            },
            data: graph.data,
            links: graph.line,
            lineStyle: {
              opacity: 0.9,
              width: 2,
              curveness: 0
            }
          },
        ]
      };
      myChart.setOption(option);
    },
    selectData(e){
      console.log(e);
      this.requestData(e);
    },
    requestData(dataId){
      console.log(dataId,"...")
      this.openFullScreen();
      let that = this;
      this.options = JSON.parse(this.$route.query.options);
      this.name = this.$route.query.name;
      let id;
      if(this.name == "类型一" && dataId=="1000"){
        this.value = "测试集一";
        id = 0;
      }else if(this.name == "类型二" && dataId=="1000"){
        this.value = "测试集三";
        id = 2;
      }

      var opts = {
        method:"POST",
        body:"id=" + (dataId!="1000"? dataId:id),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
      fetch("/api/get_data_root",opts)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
          console.log("根因定位", data)
          that.graph = data;
          that.creatEchart();
          that.loading.close();
        })
        .catch((error) => {
          console.log(error)
          that.loading.close();
        })
    },
    openFullScreen() {
      this.loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
    }
  },
  //调用
  mounted() {
    this.requestData("1000");
  },
  watch: {
    '$route' (to, from) { //监听路由是否变化
      if(to.query.options != from.query.options){
      this.options = JSON.parse(to.query.options);
      if(to.query.name == "类型一"){
        this.value = "测试集一";
        this.requestData(0);
      }else{
        this.value = "测试集三";
        this.requestData(2);
      }
      this.name = to.query.name;
      // this.creatEchart();
		}
	}
  }
};
</script>


<style scoped>
.part {
  position: relative;
}
h1 {
  margin: 0;
  padding: 20px;
  text-align: left;
}

#main {
  margin: 0 auto;
}

.select-container{
  position: absolute;
  top: 100px;
  left: 850px;
}

.result-button {
  position: absolute;
  top: 590px;
  left: 50px;
  padding: 5px 10px;
  font-size: 16px;
  z-index: 100;
}

.result-display {
  display: inline;
  margin-left: 50px;
  font-size: 16px;
}

.remind {
  position: absolute;
  top: 580px;
  left: 50px;
}
</style>
