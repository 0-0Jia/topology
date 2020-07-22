<template>
  <div class="entire">
    <h1>噪声过滤</h1>
    <div id="main" style="width: 550px;height: 550px;"></div>
    <div class="right-echart">
      <div class="echart-container" ref="echart">
        <div id="bar" style="width: 420px;height: 420px;"></div>
        <div id="scatter" style="width: 420px;height: 420px;"></div>
      </div>
    </div>
    <img src="../assets/img/next.png" class="icon next" @click="next" ref="next">
    <div class="select-container">
      <el-select v-model="value" placeholder="请选择" @change="selectData" no-data-text="测试集一">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
          >
        </el-option>
      </el-select>
      <div class="result-display">识别结果为：{{selectResult}}</div>
    </div>
  </div>
</template>

<script>
import "echarts/lib/chart/pie";

export default {
  name: "entire",
  data() {
    return {
      graph: {},
      bar: {},
      scatter: {},
      count: 0,
      dialogTableVisible: false,
      options: [
          {
            value: 0,
            label: '测试集一'
          },
          {
            value: 1,
            label: '测试集二'
          },
          {
            value: 2,
            label: '测试集三'
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
            value: 12,
            label: '测试集十三'
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
            value: 15,
            label: '测试集十六'
          },
          {
            value: 16,
            label: '测试集十七'
          },
          {
            value: 17,
            label: '测试集十八'
          },
          {
            value: 18,
            label: '测试集十九'
          },
          {
            value: 19,
            label: '测试集二十'
          }
        ],
      value: '测试集一',
      selectResult: ""
    };
  },
  methods: {
    creatGraph() {
      let that = this;
      var graph = JSON.parse(JSON.stringify(this.graph));
      let myChart = this.$echarts.init(document.getElementById("main"));

      let option = {
        title: {
          text: "拓扑图",
          subtext: "",
          top: "bottom",
          left: "right"
        },
        tooltip: {},
        legend: [
          {
            selectedMode: 'single',
            // data: graph.categories.map(function(a) {
            //   return a.name;
            // })
          }
        ],
        animation: true,
        series: [
          {
            name: that.value,
            type: "graph",
            layout: "force",
            data: graph.data,
            links: graph.line,
            categories: graph.categories,
            roam: true,
            label: {
              position: "right"
            },
            force: {
              repulsion: 100
            }
          }
        ]
      };

      myChart.setOption(option);
    },
    creatBar(){
      var bar = JSON.parse(JSON.stringify(this.bar));
      let myChart = this.$echarts.init(document.getElementById("bar"));

      let option = {
        title: {
          text: '节点间的关联分布'
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        xAxis: {
          name: "频次",
          type: 'category',
          data: bar.x
        },
        yAxis: {
          name: "分组",
          type: 'value'
        },
        series: [{
            data: bar.height,
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
                color: 'rgba(220, 220, 220, 0.8)'
            }
        }]
    };

      myChart.setOption(option);
    },
    creatScatter(){
      let scatter = JSON.parse(JSON.stringify(this.scatter));
      let normalData = [];
      let abnormalData = [];
      for(let i = 0; i < scatter.length; i++){
        if(scatter[i].isReason){
          abnormalData.push(scatter[i].data);
        }else {
          normalData.push(scatter[i].data);
        }
      }
      let myChart = this.$echarts.init(document.getElementById("scatter"));

      let option = {
        title: {
          text: '各节点首次出现时间'
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        xAxis: {
          name: "/秒"
        },
        yAxis: {
          name: ""
        },
        series: [{
          name: "normal",
          symbolSize: 20,
          data: normalData,
          type: 'scatter'
        },
        {
          name: "abnormal",
          symbolSize: 20,
          data: abnormalData,
          type: 'scatter'
        }
        ]
    };

      myChart.setOption(option);
    },
    next(){
      if(this.count%2 == 0){
        this.$refs.echart.style.left = "-420px";
        this.$refs.next.style.transform = "rotateY(180deg)"; 
      }else {
        this.$refs.echart.style.left = "0";
        this.$refs.next.style.transform = "rotateY(0)"; 
      }
      this.count++;
      
    },
    selectData(e){
      console.log(e)
      this.requestData(e);
    },
    requestData(id){
      let that = this;
      var opts = {
        method:"POST",
        body:"id=" + id,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
      fetch("/api/get_data",opts)
        .then((response) => {
            return response.json()
        })
        .then((data) => {
          console.log("噪声过滤", data)
          if(data.isReason == 1){
            that.selectResult = "正常";
          }else{
            that.selectResult = "异常";
          }
          that.bar = data.bar;
          that.scatter = data.scatter;
          that.graph = data.topology;
          that.creatBar();
          that.creatScatter();
          that.creatGraph();

        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  //调用
  mounted() {
    
    this.requestData(0);
    // fetch("/api/topology/global", {
    //   method: "get"
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log("整体", data)
    //     that.graph = data;
    //     this.creatGraph();
    //   });

    // fetch("/api/bar", {
    //   method: "get"
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log("bar", data)
    //     that.bar = data;
    //     that.creatBar();
    //   });

    // fetch("/api/scatter", {
    //   method: "get"
    // })
    //   .then(response => response.json())
    //   .then(data => {
    //     console.log("scatter", data)
    //     that.scatter = data;
    //     that.creatScatter();
    //   });
  }
};
</script>


<style scoped>
.entire {
  position: relative;
  overflow: hidden;
}
h1 {
  margin: 0;
  padding: 20px;
  text-align: left;
}

.select-container{
  position: absolute;
  top: 80px;
  left: 600px;
}

.right-echart {
  position: absolute;
  top: 200px;
  left: 600px;
  width: 420px;
  height: 420px;
  overflow: hidden;
}

.echart-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 840px;
  height: 420px;
  overflow: hidden;
  transition: left .4s;
}

#scatter {
  position: absolute;
  top: 0;
  left: 420px;
}

.icon {
  position: absolute;
  top: 320px;
  left: 1000px;
  z-index: 100;
  transition: transform .4s;
}

.result-display {
  display: inline;
  margin-left: 50px;
  font-size: 16px;
}
</style>
