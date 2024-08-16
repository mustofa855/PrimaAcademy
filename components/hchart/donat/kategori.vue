<template>
    <highchart :options="chartOptions" :modules="['exporting']" :exporting="true" style="width:100%;" />
</template>
<script>
export default {
    // props: ['ukuran', 'seriesData', 'seriesName','title', 'colors', 'legend', 'innerSize'],
    data() {
        return {
            defaultColors: ['#D61D31','#63D3EA', '#4347B2', '#90EB35', '#951877']
        }
    },
    computed: {

        // defaultWarna() {
        //     return this.$store.state.def.chartLegendColor
        // },

        chartOptions() {
                return {
                    colors: this.colors ? this.colors: this.defaultColors,
                    chart: {
                        type: 'pie',
                        // margin:0,
                        marginTop:0,
                        marginLeft:0,
                        height: this.ukuran ? this.ukuran : 400
                    },
                    accessibility: {
                        point: {
                            valueSuffix: '%'
                        }
                    },
                    title: {
                        text: this.title ? this.title : null,
                        align: 'center',
                        verticalAlign: 'middle'
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
                                enabled: true,
                                // format: '{point.name}: {y} %',
                                distance: -25,
                                rotationMode: 'circular'
                            },
                            showInLegend: this.legend ? this.legend : false
                        }
                    },
                    legend: {
                        itemStyle: {
                            fontSize:'12px',
                        },
                        layout: 'horizontal',
                        align: 'center',
                        verticalAlign: 'bottom',
                        itemMarginTop: 2,
                        itemMarginBottom: 2,
                        useHTML: true,
                        labelFormatter: function () {
                            return '<div style="width:50px;display:inline;">' + Math.round(this.percentage) + '</div>% - ' 
                            + this.name + ' ('+ this.y.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")  +')';
                        }

                    },

                    credits: {
                        enabled:false
                    },
                    categories:['satu','dua'],
                    series: [{
                        name: this.seriesName,
                        colorByPoint: true,
                        innerSize: this.innerSize ? this.innerSize : '60%',
                        // data: this.seriesData
                        data:[5,3],
                        data1: [{
                            // name: 'EV',
                            y: 68.1
                        }, {
                            // name: 'Hybrids',
                            y: 11.0
                        }]
                    }],

                    responsive: {
                        rules: [{
                            condition: {
                                maxWidth: 500
                            },
                            chartOptions: {
                                legend: {
                                    align: 'center',
                                    verticalAlign: 'bottom',
                                    layout: 'horizontal'
                                },
                            }
                        }]
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