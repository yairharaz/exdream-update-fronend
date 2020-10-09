 <script>
import { Bar } from "vue-chartjs";
import moment from "moment";

export default {
    props: ["exps"],
    extends: Bar,
    data: () => ({
        chartData: {
            labels: [],
            datasets: [
                {
                    label: "Number of Participants/Experience",
                    backgroundColor: [
                        "#1e72e0",
                        "lightblue",
                        "lightpink",
                        "lightgreen",
                        "lightblakc",
                    ],
                    data: [],
                },
            ],
        },
        options: {
            responsive: false,
            maintainAspectRatio: false,
            title: {
                fontSize: 10,
            },
            scales: {
                yAxes: [
                    {
                        ticks: {
                            fontSize: 15,
                            min: 0,
                            max: "",
                            stepSize: 1,
                        },
                    },
                ],
                xAxes: [
                    {
                        ticks: {
                            fontSize: 15,
                            min: 0,
                            max: "",
                            stepSize: 10,
                            categorySpacing: 0.1,
                            barPercentage: 0.1,
                            barThickness: 0.2,
                            mixBarThickness: 0.3,
                        },
                    },
                ],
            },
        },
    }),
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
                    return tickets
                });
      }
    },
    mounted() {
        
        this.chartData.labels= this.getLabels()
        this.chartData.datasets[0].data = this.getData();
        this.options.scales.yAxes[0].ticks.max = Math.max.apply(
            null,
            this.getData()
        );
        this.renderChart(this.chartData, this.options);
    },
};
</script>
