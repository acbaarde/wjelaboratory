<script>
import { Bar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins
export default {
    extends: Bar,
    mixins: [reactiveProp],
    props: ['options'],
    // mounted () {
    //     setTimeout(() => {
    //         this.renderChart(this.data,{
    //             responsive: true,
    //             maintainAspectRatio: false
    //         })
    //     }, 1000)
    // },

    mounted(){
        this.renderChart(this.chartData,{
                responsive: true,
                maintainAspectRatio: false
            })
    },
}
</script>

<style>

</style>