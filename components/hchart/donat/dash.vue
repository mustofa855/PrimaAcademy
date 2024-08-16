<template>
    <highchart :options="chartOptions" :modules="['exporting']" :exporting="exporting?exporting:false" style="width:100%;" />
</template>
<script>
export default {
    props: ['ukuran', 'seriesData', 'seriesName','title', 'colors', 'legend', 'innerSize','titleCenter','exporting'],
    data() {
        return {
            // defaultColors: ['#D61D31','#63D3EA', '#4347B2', '#90EB35', '#951877']
        }
    },
    computed: {

        // defaultWarna() {
        //     return this.$store.state.def.chartLegendColor
        // },
        defaultColors() {
            return this.$store.state.opsi.chartColors
        },

        chartOptions() {
                return {
                    colors: this.colors ? this.colors: this.defaultColors,
                    chart: {
                        type: 'pie',
                        // margin:0,
                        marginTop: 0,
                        marginLeft:0,
                        height: this.ukuran ? this.ukuran : 400,
                        style: {
                            fontFamily: "'Public Sans', sans-serif"
                        }

                    },
                    accessibility: {
                        point: {
                            valueSuffix: '%'
                        }
                    },
                    title: {
                        text: this.title,
                        align:'left'

                    },
                    subtitle: {
                        text: this.titleCenter ? this.titleCenter : null,
                        align: 'center',
                        verticalAlign: 'middle'
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