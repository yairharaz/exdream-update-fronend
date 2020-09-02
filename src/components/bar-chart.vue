 <script>
import { Bar } from 'vue-chartjs'

export default {
    props:['cData', 'cLabels'],
  extends: Bar,
  data: () => ({
    chartdata: {
      labels: [],
      datasets: [
        {
          label: 'Number of Participants/Experience',
          backgroundColor: ['#1e72e0', 'lightblue', 'lightpink', 'lightgreen', 'lightblakc'],
          data: []
        }
      ]
    },
    options: {
      responsive: false,
      maintainAspectRatio: false,
      title:{
        fontSize:10
      },
      scales: {
        yAxes: [{
        ticks: {
          fontSize:15,
          min: 0,
          max: '',
          stepSize: 1,
        }}],
        xAxes: [{
        ticks: {
          fontSize:15,
          min: 0,
          max: '',
          stepSize: 10,
          categorySpacing: 0.1,
          barPercentage:0.1,
          barThickness: 0.2,
          mixBarThickness: 0.3,
        }}]},
    }
  }),
  mounted() {
      this.chartdata.labels = this.cLabels
      this.chartdata.datasets[0].data = this.cData
      this.options.scales.yAxes[0].ticks.max = Math.max.apply(null, this.cData)
      this.renderChart(this.chartdata, this.options);
  },
};
</script>
