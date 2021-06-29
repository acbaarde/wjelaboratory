<script>
import { Line } from 'vue-chartjs'
export default {
    extends: Line,
    props: ['data','options'],
    mounted () {
        setTimeout(() => {
            this.renderChart(this.data,{
                responsive: true,
                maintainAspectRatio: false
            })
        }, 1000)
    }
}
</script>

<style>

</style>