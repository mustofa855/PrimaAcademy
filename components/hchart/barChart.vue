<template>
    <div class="w-full">
        <div v-if="chart && chart===true">
            <highchart 
                :options="chartOptions" :setOptions="disableAnimation"
            />
        </div>
        <div v-else>
            <highchart 
                :options="chartOptions" 
            />
        </div>
    </div>
</template>

<script>
    export default {
        props: ['kategori', 'dataSeries','chart','height','noLegend'],
        data() {
            return {
                // kategori: ['Produk', 'Acara', "Blog"],
                // dataSeries: [{
                //     name: 'Overview - Total Konten',
                //     data: [100, 25, 75],
                //     totalData: 200
                // }]  
            }
        },
        computed: {
            disableAnimation() {
                return {
                    plotOptions: {
                        series: {
                            animation:false
                        }
                    }
                }
            },
            chartOptions() {
                const ini = this
                const parseLegend = this.noLegend ? false : true
                const ch ={
                    chart: {
                        type: 'bar',
                    },
                    title: {
                        text: null,
                    },
                    subtitle: {
                        text: null,
                    },
                    xAxis: {
                        categories: this.kategori,
                        title: {
                            text: null
                        },
                        gridLineWidth: 1,
                        lineWidth: 0
                    },
                    yAxis: {
                        min: 0,
                        title: {
                            text: null,
                        },
                        labels: {
                            overflow: 'justify'
                        },
                        gridLineWidth: 0
                    },
                    tooltip: {
                        useHtml:true,
                        formatter:function() {
                            var pct = (this.y / this.series.options.totalData) * 100;
                            return '<b>'+this.x + ':</b> ' +this.y + ' ' +' / ' + Math.round(pct) + '%'
                        }
                    },
                    plotOptions: {
                        bar: {
                            dataLabels: {
                                enabled: true,
                                formatter:function() {
                                    var pct = (this.y / this.series.options.totalData) * 100;
                                    return this.y
                                }
                            },
                            groupPadding: 0.1
                        }
                    },
                    legend: {
                        enabled: parseLegend 
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'top',
                        x: -40,
                        y: 80,
                        floating: true,
                        borderWidth: 1,
                        backgroundColor:
                            '#FFFFFF',
                        shadow: true
                    },
                    credits: {
                        enabled: false
                    },
                    colors: ['#D61D31', '#63D3EA'],
                    series: this.dataSeries
                }
                if (this.height) {
                    ch.chart.height = this.height
                }
                return ch;
            }
        },

        methods: {
        }
    }
</script>