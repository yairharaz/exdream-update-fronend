<script>
  import { Doughnut } from 'vue-chartjs'
  import moment from "moment";

  export default {
    name: 'doughnut-chart',
    props:['exps'],
    extends: Doughnut,
    data () {
      return {
        chartData: {
          labels: this.getLabels(),
          datasets: [{
              borderWidth: 1,
              borderColor: [
              'rgba(255,99,132,1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)'                
              ],
              backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',                
              ],
              data: this.getData()
            }]
        },
        options: {
          legend: {
            display: true
          },
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    methods:{
      getLabels(){
        const dates = this.exps.map((exp) => exp.date );
        dates.sort((a, b) => new Date(a) - new Date(b));
        return dates.map((date) => moment(date).format("DD/MM/YY"));
      },
      getData(){
        return this.exps.map((exp) => {
                    const tickets = exp.participants.reduce(
                        (acc, participant) => {
                            return acc + participant.numOfTickets;
                        },0);
                    return tickets*exp.currPrice
        })
      }
    },
    mounted () {
      this.renderChart(this.chartData, this.options)
    }
  }
</script>

<style>
</style>