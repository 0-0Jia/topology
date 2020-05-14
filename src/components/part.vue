<template>
    <div class="part">
        <h1>局部</h1>
        <div id="main" style="width: 550px;height: 550px;"></div>
    </div>
</template>

<script>
export default {
  name: "part",
  props: ["data"],
  data() {
    return {};
  },
  methods: {
    creatEchart() {
      let that = this;
      let myChart = this.$echarts.init(document.getElementById("main"));
      let option = {
        title: {
          text: "局部拓扑图",
          top: "bottom",
          left: "right"
        },
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: "quinticInOut",
        series: [
          {
            type: "graph",
            layout: "none",
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
            data: that.data,
            // links: [],
            links: [
              {
                source: 0,
                target: 1,
                symbolSize: [5, 20],
                label: {
                  show: true
                },
                lineStyle: {
                  width: 5,
                  curveness: 0.2
                }
              },
              {
                source: "节点5",
                target: "节点1",
                label: {
                  show: true
                },
                lineStyle: {
                  curveness: 0.2
                }
              },
              {
                source: "节点5",
                target: "节点3"
              },
              {
                source: "节点2",
                target: "节点5"
              },
              {
                source: "节点1",
                target: "节点3"
              },
              {
                source: "节点2",
                target: "节点3"
              },
              {
                source: "节点2",
                target: "节点4"
              },
              {
                source: "节点1",
                target: "节点4"
              }
            ],
            lineStyle: {
              opacity: 0.9,
              width: 2,
              curveness: 0
            }
          }
        ]
      };
      myChart.setOption(option);
    }
  },
  //调用
  mounted() {
    this.creatEchart();
  },
  watch: {
    data: function(val) {
      this.data = val; // 接收父组件的值
      this.creatEchart();
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
</style>
