import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ChartDataSets, ChartOptions, Chart } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'chart2',
  //template: `<h1>Hello {{name}}!</h1>`,
  templateUrl: './chart2.component.html',
  styles: [
    `h1 { font-family: 'RobotoRegular', Helvetica, Arial, sans-serif; }`,
  ],
})
export class Chart2Component {
  @ViewChild('myCanvas2') canvas: ElementRef;

  ngOnInit() {
    this.configureTooltipBehavior();
    const gradient = this.canvas.nativeElement
      .getContext('2d')
      .createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, '#E2F8B5');
    gradient.addColorStop(1, '#FFE9E9');
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
      data: [
        { y: 3 },
        { y: 3 },
        { y: 2 },
        { y: 2 },
        { y: 3 },
        { y: 2 },
        { y: 1 },
        { y: 1 },
        { y: 2 },
      ],
      label: '',
    },
  ];
  public lineChartLabels: Label[] = ['', '', '', '', '', '', '', '', ''];
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
    // showAllTooltips: false,
    // includeZero: true,
    tooltips: {
      // Disable the on-canvas tooltip
      enabled: false,

      custom: function (tooltipModel) {
        // Tooltip Element
        let index = tooltipModel.dataPoints[0].index;
        let label = tooltipModel.dataPoints[0].yLabel;
        let id = 'chart2' + index;
        let htmlDom = document.getElementById(id);
        if (htmlDom == null) {
          const toolTips = [
            '',
            `<div style='height:80px;width: 150px;background-color: #C8F8FE;color: #000;padding: 10px;margin: 0% 0% 0% -60%; box-shadow: 0 0 3px 3px #C8F8FE; border-radius: 5px;'>If needed, client <br/>enrolls in Bill Pay and <br/> accepts terms and </br> conditions</div><br/>
          <div style=' height:50px;width: 150px;background-color: #C8F8FE;color: #000;padding: 10px;margin: -5% 0% 0% -60%;box-shadow: 0 0 3px 3px #C8F8FE; border-radius: 5px;'><span style="background: green;border-radius: 30px;color: #fff;content: attr(badge);font-size: 11px;min-width: 20px;padding: 2px;position: absolute;text-align: center;margin: 4% 0% 0% -15%;">1</span>Client selects Bill <br/>Pay Page</div>`,

            `<div style=' margin:0% 0 0 -30%;height:80px;width: 150px;background-color: #fce7ce;color: #000;padding: 10px; box-shadow: 0 0 3px 3px #fce7ce; border-radius: 5px;'><span style="background: #4f86f7;border-radius: 30px;color: #fff;content: attr(badge);font-size: 11px;min-width: 20px;padding: 2px;position: absolute;text-align: center;margin: 4% 0% 0% -15%;">1</span>Recurring Payment - <br/>Client enters <br/> <span style="background: green;border-radius: 30px;color: #fff;content: attr(badge);font-size: 11px;min-width: 20px;padding: 2px;position: absolute;text-align: center;margin: 4% 0% 0% -15%;">2</span>payment information <br/>and submits</div>
          <br/>`,

            `<div style='margin:-80% 0 0 0;color:#FFFFFF'> tt</div><br/><div style=' height:60px;width: 150px;background-color: #fce7ce;color: #000;padding: 10px;box-shadow: 0 0 3px 3px #fce7ce; border-radius: 5px;'>Client searches and <br>	selects biller name</div> <br/>
          
          <div style='height:80px;width: 150px;background-color: #fce7ce;color: #000;padding: 10px;box-shadow: 0 0 3px 3px #fce7ce; border-radius: 5px;'><span style="background: green;border-radius: 30px;color: #fff;content: attr(badge);font-size: 11px;min-width: 20px;padding: 2px;position: absolute;text-align: center;margin: 4% 0% 0% -15%;">1</span>Client requests eBill for next bill and selects <br><span style="background: green;border-radius: 30px;color: #fff;content: attr(badge);font-size: 11px;min-width: 20px;padding: 2px;position: absolute;text-align: center;margin: 4% 0% 0% -15%;">3</span>	auto pay option for <br>future payments</div><br>
          
          <div style=' height:75px;width: 150px;background-color: #fce7ce;color: #000;padding: 10px;box-shadow: 0 0 3px 3px #fce7ce; border-radius: 5px;'><span style="background: green;border-radius: 30px;color: #fff;content: attr(badge);font-size: 11px;min-width: 20px;padding: 2px;position: absolute;text-align: center;margin: 4% 0% 0% -15%;">1</span>Client enters valid <br> 	account number for <span style="background: #4f86f7;border-radius: 30px;color: #fff;content: attr(badge);font-size: 11px;min-width: 20px;padding: 2px;position: absolute;text-align: center;margin: 7% 0% 0% -77%;">2</span><br/> selected biller</div>`,

            `<div style=' height:80px;width: 165px;background-color: #ddc4f0;color: #000;padding: 10px;margin:5% 0% 0% 150%;box-shadow: 0 0 3px 3px #ddc4f0; border-radius: 5px;'><span style="background: green;border-radius: 30px;color: #fff;content: attr(badge);font-size: 11px;min-width: 20px;padding: 2px;position: absolute;text-align: center;margin: 4% 0% 0% -14%;">3</span>Client calls contact <br/>center after notification <br><span style="background: #4f86f7;border-radius: 30px;color: #fff;content: attr(badge);font-size: 11px;min-width: 20px;padding: 2px;position: absolute;text-align: center;margin: 4% 0% 0% -14%;">4</span>that payment was <br>unsuccessful</div>
            <div style=' height:50px;width: 165px;background-color: #ddc4f0;color: #000;padding: 10px;margin:75% 0% 0% 200%;box-shadow: 0 0 3px 3px #ddc4f0; border-radius: 5px;'><span style="background: green;border-radius: 30px;color: #fff;content: attr(badge);font-size: 11px;min-width: 20px;padding: 2px;position: absolute;text-align: center;margin: 4% 0% 0% -14%;">3</span>Client calls contact <br><span style="background: #4f86f7;border-radius: 30px;color: #fff;content: attr(badge);font-size: 11px;min-width: 20px;padding: 2px;position: absolute;text-align: center;margin: 4% 0% 3% -14%;">4</span>	center to stop payment</div><br/>
          `,

            `<div style='margin: 40% 0% 0% 330%;  height:80px;width: 145px;background-color: #f7f1fb;color: #000;padding: 10px;box-shadow: 0 0 3px 3px #f7f1fb; border-radius: 3px;'><span style="background: green;border-radius: 30px;color: #fff;content: attr(badge);font-size: 11px;min-width: 20px;padding: 2px;position: absolute;text-align: center;margin: 1% 0% 0% -15%;">1</span>Client views account <br>		activity to confirm <br><span style="background: green;border-radius: 30px;color: #fff;content: attr(badge);font-size: 11px;min-width: 20px;padding: 2px;position: absolute;text-align: center;margin: 2% 0% 0% -15%;">4</span>payment was made</div>`,
          ];
          var tooltipEl = document.getElementById('chartjs-label');

          const content = toolTips[index];
          console.log(toolTips[1]);
          // Create element on first render
          if (!tooltipEl) {
            tooltipEl = document.createElement('div');
            tooltipEl.id = 'chartjs-tooltip';
            tooltipEl.innerHTML = '<table id =' + id + '></table>';
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
            console.log(toolTips[index]);
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
