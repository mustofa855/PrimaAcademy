<template>
    <highchart
      ref="sunburst"
      :options="chartOptions"
      :modules="['sunburst']"
      :exporting="exporting?exporting:false"
    />
  </template>
  
  <script>
  


  
  export default {
    props:['seriesData','exporting'],
    data() {
      return {
        dataSatu : [
            {
              id: '0.0',
              parent: '',
              name: 'Mitra'
            }, {
              parent: '0.0',
              name: 'Asia',
              value: 3
            }, {
              parent: '0.0',
              name: 'Africa',
              value: 4
            }, {
              parent: '0.0',
              name: 'America',
              value:5
            }, {
              parent: '0.0',
              name: 'Europe',
              value:9
            }, {
              parent: '0.0',
              name: 'Oceanic',
              value: 9
            },
          ]
      }
    },
    computed: {

      defaultColors() {
              return this.$store.state.opsi.chartColors
          },
      chartOptions() {
        const ini = this
        const baseColors = ['#FFFFFF'];
        const newColors = [...baseColors, ...this.defaultColors]
        return {
          chart: {
            height: '100%',
            showLoading:'Loadding.....',
            style: {
                fontFamily: "'Public Sans', sans-serif"
            }

          },
          title: {
            text: null
          },
          subtitle: {
            text: null
          },
          colors: newColors,
          legend: {
            enabled:true
          },
          series: [{
            type: 'sunburst',
            data: ini.seriesData,
            allowDrillToNode: true,
            cursor: 'pointer',
            showInLegend:true,
            dataLabels: {
              format: '{point.name}',
              style: {
                fontSize: '10px'
              },
              filter: {
                property: 'innerArcLength',
                operator: '>',
                value: 16
              },
              rotationMode: 'circular'
            },
            levels: [{
              level: 1,
              levelIsConstant: false,
              dataLabels: {
                filter: {
                  property: 'outerArcLength',
                  operator: '>',
                  value: 64
                }
              }
            }, {
              level: 2,
              colorByPoint: true
            },
            {
              level: 3,
              colorVariation: {
                key: 'brightness',
                to: -0.5
              }
            }, {
              level: 4,
              colorVariation: {
                key: 'brightness',
                to: 0.5
              }
            }]
  
          }],
          credits: {
            enabled:false
          },
          tooltip: {
            headerFormat: '',
            pointFormat: '<b>{point.name}</b>: <b>{point.value}</b>',

          }
        }
      }
    },



    mounted () {
      const HC = this.$refs.sunburst.highcharts
      if (HC.getOptions().colors[0] !== 'transparent') {
        HC.getOptions().colors.unshift('transparent')
      }
    },
    beforeUnmount () {
      const HC = this.$refs.sunburst.highcharts
      HC.getOptions().colors.splice(0, 1)
    }
  }
  </script>