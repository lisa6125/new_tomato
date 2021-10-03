<script>
import { Line } from "vue-chartjs";
import { mapGetters } from "vuex";

export default {
  extends: Line,
  data() {
    return {
      gradient: null,
    };
  },
  computed: {
    ...mapGetters(["tomatosChart"])
  },
  mounted() {
    const lable = this.tomatosChart.map(day => {
      return day.day;
    });
    const data = this.tomatosChart.map(day => {
      return day.tomatos;
    });
    this.gradient = this.$refs.canvas
      .getContext("2d")
      .createLinearGradient(0, 0, 0, 450);

    this.gradient.addColorStop(0, "rgba(255,255,255,0.8)");
    this.gradient.addColorStop(0.5, "rgba(255,255,255,0.8)");
    this.gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

    this.renderChart(
      {
        labels: lable,
        datasets: [
          {
            label: "Data One",
            color:"white",
            borderColor: "white",
            pointBackgroundColor: "white",
            borderWidth: 1,
            pointBorderColor: "white",
            backgroundColor: this.gradient,
            data: data,
            
          }
        ],
        options: {
          layout: {
            padding: {
              left: 0,
              right: 0,
              top: 0,
              bottom: 0
            }
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  display: false,
                  color: "#fff"
                }
              }
            ],
            yAxes: [
              {
                gridLines: {
                  display: false,
                  color: "#fff"
                }
              }
            ]
          },
          legend: {
            display: false
          }
        }
      },
      { responsive: true, maintainAspectRatio: false,
          scales: {
            xAxes: [
              {
                barPercentage: 1.6,
                gridLines: {
                  drawBorder: true,
                  color: "rgba(225,78,202,0)",
                  zeroLineColor: "transparent"
                },
                ticks: {
                  padding: 20,
                  fontColor: "#F2F0C9"
                }
              }
            ],
            yAxes: [
              {
                barPercentage: 1.6,
                gridLines: {
                  drawBorder: false,
                  color: "rgba(255,255,255,0.2)",
                  zeroLineColor: "transparent"
                },
                ticks: {
                  suggestedMin: 0,
                  suggestedMax: 10,
                  padding: 20,
                  fontColor: "#F2F0C9"
                }
              }
            ],
          },
          legend: {
            display: false
          } }
    );

  }
};
</script>
