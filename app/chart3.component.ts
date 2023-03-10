import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChartDataSets, ChartOptions, Chart } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'chart3',
  //template: `<h1>Hello {{name}}!</h1>`,
  templateUrl: './chart3.component.html',
  styles: [
    `h1 { font-family: 'RobotoRegular', Helvetica, Arial, sans-serif; }`,
  ],
})
export class Chart3Component {
  @ViewChild('myCanvas3') canvas: ElementRef;

  ngOnInit() {
    this.configureTooltipBehavior();
    const gradient = this.canvas.nativeElement
      .getContext('2d')
      .createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, '#ffffff');
    gradient.addColorStop(1, '#ffffff');
    this.lineChartColors = [
      {
        backgroundColor: gradient,
      },
    ];
  }

  configureTooltipBehavior() {
    Chart.plugins.register({
      beforeRender: function (chart: any) {
        console.log(chart);
        if (!chart.config.options.showAllTooltips) {
          console.log('show all tips');
          // create an array of tooltips
          // we can't use the chart tooltip because there is only one tooltip per chart
          chart.pluginTooltips = [];
          chart.config.data.datasets.forEach(function (dataset, i) {
            chart.getDatasetMeta(i).data.forEach(function (sector, j) {
              chart.pluginTooltips.push(
                new Chart.Tooltip(
                  {
                    _chart: chart.chart,
                    _chartInstance: chart,
                    _data: chart.data,
                    _options: chart.options.tooltips,
                    _active: [sector],
                  },
                  chart
                )
              );
            });
          });

          // turn off normal tooltips
          chart.options.tooltips.enabled = false;
        }
      },
      afterDraw: function (chart: any, easing: any) {
        if (!chart.config.options.showAllTooltips) {
          // we don't want the permanent tooltips to animate, so don't do anything till the animation runs atleast once
          if (!chart.allTooltipsOnce) {
            if (easing !== 1) return;
            chart.allTooltipsOnce = true;
          }

          // turn on tooltips
          chart.options.tooltips.enabled = false;
          Chart.helpers.each(chart.pluginTooltips, function (tooltip) {
            tooltip.initialize();
            tooltip.update(true);
            // we don't actually need this since we are not animating tooltips
            tooltip.pivot();
            tooltip.transition(easing).draw();
          });
          chart.options.tooltips.enabled = false;
        }
      },
    });
  }
  public lineChartData: ChartDataSets[] = [
    {
      data: [{}, {}, {}, {}, {}, {}, {}],
      label: '',
    },
  ];
  public lineChartLabels: Label[] = ['', '', '', '', '', '', ''];
  public lineChartOptions: ChartOptions & {} = {
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            // stacked: true,
            display: true,
            min: 0,
            max: 3,
            stepSize: 1,
          },
        },
      ],
      xAxes: [
        {
          gridLines: {
            display: false,
          },
        },
      ],
    },
    tooltips: {
      // Disable the on-canvas tooltip
      enabled: false,

      custom: function (tooltipModel) {
        // Tooltip Element
        let index = tooltipModel.dataPoints[0].index;
        let label = tooltipModel.dataPoints[0].yLabel;
        let id = 'chart3' + index;
        let htmlDom = document.getElementById(id);
        if (htmlDom == null) {
          const toolTips = [
            `<div style='margin:-120% 0% 0% 450%; height:80px;width: 150px;background-color: #fce7ce;color: #000;padding: 10px;box-shadow: 0 0 3px 3px #fce7ce; border-radius: 5px;'>Validate Client - <br/>account information<br/> with eBill eligible <br/>biller</div>
          <br/>`,
            `
          <br/><div style='margin:-150% 0% 0% 550%; height:80px;width:160px;background-color: #fce7ce;color: #000;padding: 10px;box-shadow: 0 0 3px 3px #fce7ce; border-radius: 5px;'><span style="background: #4f86f7;border-radius: 30px;color: #fff;content: attr(badge);font-size: 11px;min-width: 20px;padding: 2px;position: absolute;text-align: center;margin: 4% 0% 0% -15%;">3</span>Determine if<br>payment is fraud;<br>cancel payment if<br>fraud</div><br>`,

            `<div style='margin:-153% 0% 0% 653%; height:70px;width: 165px;background-color: #ddc4f0;color: #000;padding: 10px;box-shadow: 0 0 3px 3px #ddc4f0; border-radius: 5px;'>Payment made- <br>	Payment file are sent <br> for debit</div><br/>
          <div style=' height:80px;width: 165px;background-color: #ddc4f0;color: #000;padding: 10px;margin:0% 0% 0% 653%;box-shadow: 0 0 3px 3px #ddc4f0; border-radius: 5px;'><span style="background: #4f86f7;border-radius: 30px;color: #fff;content: attr(badge);font-size: 11px;min-width: 20px;padding: 2px;position: absolute;text-align: center;margin-left:-12%">5</span>Payment files are sent <br/>from FISERV to Bank of <br>America</div>`,
            '',
            '',
            '',
            '',
          ];
          var tooltipEl = document.getElementById('chartjs-label');
          const content = toolTips[index];
          // Create element on first render
          if (!tooltipEl) {
            tooltipEl = document.createElement('div');
            tooltipEl.id = 'chartjs-tooltip';
            tooltipEl.innerHTML = '<table id=' + id + '></table>';
            document
              .getElementsByTagName('kendo-pdf-export')[0]
              .appendChild(tooltipEl);
          }

          // Hide if no tooltip
          if (tooltipModel.opacity === 0) {
            tooltipEl.style.opacity = '0';
            return;
          }

          // Set caret Position
          tooltipEl.classList.remove('above', 'below', 'no-transform');
          if (tooltipModel.yAlign) {
            tooltipEl.classList.add(tooltipModel.yAlign);
          } else {
            tooltipEl.classList.add('no-transform');
          }

          function getBody(bodyItem) {
            return bodyItem.lines;
          }

          // Set Text
          if (tooltipModel.body) {
            var titleLines = tooltipModel.title || [];
            var bodyLines = tooltipModel.body.map(getBody);

            var innerHtml = '<thead>';
            var colors = [
              '#5aa0be',
              '#f8b364',
              '#f8b364',
              '#ae74de',
              '#a825ec',
            ];
            titleLines.forEach(function (title) {
              innerHtml +=
                '<tr><th style="color:' +
                colors[index - 1] +
                ';">' +
                title +
                '</th></tr>';
            });
            innerHtml += '</thead><tbody>';

            // var colors = tooltipModel.labelColors[i];
            // var style = 'background:' + colors.backgroundColor;
            // style += '; border-color: blue';
            // style += '; border-width: 2px';
            // var span = '<span style="' + style + '"></span>';
            if (index < 6) {
              innerHtml += '<tr><td>' + toolTips[index] + '</td></tr>';
              innerHtml += '</tbody>';

              var tableRoot = tooltipEl.querySelector('table');
              tableRoot.innerHTML = innerHtml;
              console.log(tableRoot, 'table root');
            }
          }

          // `this` will be the overall tooltip
          var position = this._chart.canvas.getBoundingClientRect();

          // Display, position, and set styles for font
          tooltipEl.style.opacity = '1';
          tooltipEl.style.position = 'absolute';
          tooltipEl.style.left =
            position.left + window.pageXOffset + tooltipModel.caretX + 'px';
          tooltipEl.style.top =
            position.top + window.pageYOffset + tooltipModel.caretY + 'px';
          tooltipEl.style.fontFamily = tooltipModel._bodyFontFamily;
          tooltipEl.style.fontSize = tooltipModel.bodyFontSize + 'px';
          tooltipEl.style.fontStyle = tooltipModel._bodyFontStyle;
          tooltipEl.style.padding =
            tooltipModel.yPadding + 'px ' + tooltipModel.xPadding + 'px';
          tooltipEl.style.pointerEvents = 'none';
        }
      },
    },
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];
  public lineChartLegend = false;
  public lineChartType = 'line';
  public lineChartPlugins = [];
}
