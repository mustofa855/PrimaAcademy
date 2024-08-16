<template>
    <highchart :options="chartOptions" />
</template>
<script>
export default {
    props: ['ukuran', 'seriesData', 'seriesName','title', 'colors', 'legend', 'innerSize','height'],
    data() {
        return {
        }
    },
    computed: {

        // defaultWarna() {
        //     return this.$store.state.def.chartLegendColor
        // },

        chartOptions() {
            const ini = this
            return {
                colors: this.colors,
                chart: {
                    align: 'top',
                    type: 'pie',
                    // margin:0,
                    marginTop:0,
                    marginLeft:0,
                    height: ini.height ? ini.height : '500px'
                },
                accessibility: {
                    point: {
                        valueSuffix: '%'
                    }
                },
                title: {
                    text: null
                },
                subtitle: {
                    text: null
                },
                tooltip: {
                    headerFormat: '<table style="min-width:100px; color:#212121;"><tr><td style="padding:0">{series.name}</td></tr>',
                    pointFormat: '<tr><td style="padding:0" ><b>{point.name}:</b> </td>' +
                        '<td style="padding:0"><b>{point.percentage:.0f}%  ({point.y})</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true,
                    shape:'callout',
                    split:true,
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: false,
                            format: '{point.name}: {y} %'
                        },
                        showInLegend: this.legend ? this.legend : false
                    }
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'top',
                    itemMarginTop: 30,
                    useHTML: true,
                    labelFormatter: function () {
                        return '<div style="width:50px;display:inline;">' + Math.round(this.percentage) + '</div>% - ' 
                        + this.name + ' ('+ this.y.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")  +')';
                    }
                },
                credits: {
                    enabled:false
                },
                series: [{
                    name: this.seriesName,
                    colorByPoint: true,
                    innerSize: this.innerSize ? this.innerSize : '60%',
                    data: this.seriesData
                    // data: [{
                    //     name: 'EV',
                    //     y: 68.1
                    // }, {
                    //     name: 'Hybrids',
                    //     y: 11.0
                    // }]
                }],
                responsive: {
                        rules:[
                            {
                                condition: {
                                    maxWidth:400
                                },
                                chartOptions: {
                                    chart: {
                                        height:300,
                                        width:200,
                                        marginTop:0,
                                        marginBottom:60
                                    },
                                    legend: {
                                        align: 'left',
                                        verticalAlign: 'bottom',
                                        layout: 'vertical',
                                        floating: true,
                                        itemDistance:0,
                                        
                                    }
                                }

                            }

                        ]
                    }
            }
        },
    },
    mounted() {
        this.initialize()
    },
    methods: {
        initialize() {

        }
    }
}
</script>