import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { fuseAnimations } from '@fuse/animations';

import { AnalyticsDashboardService } from 'app/main/apps/dashboards/analytics/analytics.service';
import * as moment from 'moment'


@Component({
    selector     : 'analytics-dashboard',
    templateUrl  : './analytics.component.html',
    styleUrls    : ['./analytics.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class AnalyticsDashboardComponent implements OnInit
{
    widgets: any;
    name: string;
    stats: any;
    revenu: Array<number>;
    revenuChart: any;
    revenuMax: number;
    year: any;

    /**
     * Constructor
     *
     * @param {AnalyticsDashboardService} _analyticsDashboardService
     */
    constructor(
        private _analyticsDashboardService: AnalyticsDashboardService
    )
    {
        // Register the custom chart.js plugin
        this._registerCustomChartJSPlugin();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.name = localStorage.getItem('name');
        this.revenu = []
        this.revenuMax = 0;
        this.year = moment(new Date()).format('YYYY');

        // Get the widgets from the service
        this.widgets = this._analyticsDashboardService.widgets;

        this._analyticsDashboardService.getStats().subscribe(
            result => {
                this.stats = result;
            }
        );
        this._analyticsDashboardService.getTotalRevenu(this.year)
        .subscribe(result => {
                this.revenu = result as Array<number>;

                for (var _i = 0; _i < 13; _i++) {
                    if (this.revenu[_i] === null){
                        this.revenu[_i] = 0;
                    }
                    if (this.revenu[_i] > this.revenuMax){
                        this.revenuMax = this.revenu[_i];
                    }
                }
                
                this.revenuChart = {
                    widget1: {
                        chartType: 'line',
                        datasets : {
                            '2019': [
                                {
                                    label: 'Revenu',
                                    data : [this.revenu[1] / 1000,
                                                this.revenu[2] / 1000,
                                                this.revenu[3] / 1000,
                                                this.revenu[4] / 1000,
                                                this.revenu[5] / 1000,
                                                this.revenu[6] / 1000,
                                                this.revenu[7] / 1000,
                                                this.revenu[8] / 1000,
                                                this.revenu[9] / 1000,
                                                this.revenu[10] / 1000,
                                                this.revenu[11] / 1000,
                                                this.revenu[12] / 1000,
                                            ],
                                    fill : 'start'
            
                                }
                            ]
            
                        },
                        labels   : ['JAN', 'FÉV', 'MAR', 'AVR', 'MAI', 'JUN', 'JUL', 'AUT', 'SEP', 'OCT', 'NOV', 'DEC'],
                        colors   : [
                            {
                                borderColor              : '#42a5f5',
                                backgroundColor          : '#42a5f5',
                                pointBackgroundColor     : '#1e88e5',
                                pointHoverBackgroundColor: '#1e88e5',
                                pointBorderColor         : '#ffffff',
                                pointHoverBorderColor    : '#ffffff'
                            }
                        ],
                        options  : {
                            spanGaps           : false,
                            legend             : {
                                display: false
                            },
                            maintainAspectRatio: false,
                            layout             : {
                                padding: {
                                    top  : 32,
                                    left : 32,
                                    right: 32
                                }
                            },
                            elements           : {
                                point: {
                                    radius          : 4,
                                    borderWidth     : 2,
                                    hoverRadius     : 4,
                                    hoverBorderWidth: 2
                                },
                                line : {
                                    tension: 0
                                }
                            },
                            scales             : {
                                xAxes: [
                                    {
                                        gridLines: {
                                            display       : false,
                                            drawBorder    : false,
                                            tickMarkLength: 18
                                        },
                                        ticks    : {
                                            fontColor: '#ffffff'
                                        }
                                    }
                                ],
                                yAxes: [
                                    {
                                        display: false,
                                        ticks  : {
                                            min     : 0,
                                            max     : this.revenuMax / 900,
                                            stepSize: 0.5
                                        }
                                    }
                                ]
                            },
                            plugins            : {
                                filler      : {
                                    propagate: false
                                },
                                xLabelsOnTop: {
                                    active: true
                                }
                            }
                        }
                    }
                }
            }
        );
        
        
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Register a custom plugin
     */
    private _registerCustomChartJSPlugin(): void
    {
        (<any>window).Chart.plugins.register({
            afterDatasetsDraw: function (chart, easing): any {
                // Only activate the plugin if it's made available
                // in the options
                if (
                    !chart.options.plugins.xLabelsOnTop ||
                    (chart.options.plugins.xLabelsOnTop && chart.options.plugins.xLabelsOnTop.active === false)
                )
                {
                    return;
                }

                // To only draw at the end of animation, check for easing === 1
                const ctx = chart.ctx;

                chart.data.datasets.forEach(function (dataset, i): any {
                    const meta = chart.getDatasetMeta(i);
                    if ( !meta.hidden )
                    {
                        meta.data.forEach(function (element, index): any {

                            // Draw the text in black, with the specified font
                            ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
                            const fontSize = 13;
                            const fontStyle = 'normal';
                            const fontFamily = 'Roboto, Helvetica Neue, Arial';
                            ctx.font = (<any>window).Chart.helpers.fontString(fontSize, fontStyle, fontFamily);

                            // Just naively convert to string for now
                            const dataString = dataset.data[index].toString() + 'k';

                            // Make sure alignment settings are correct
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'middle';
                            const padding = 15;
                            const startY = 24;
                            const position = element.tooltipPosition();
                            ctx.fillText(dataString, position.x, startY);

                            ctx.save();

                            ctx.beginPath();
                            ctx.setLineDash([5, 3]);
                            ctx.moveTo(position.x, startY + padding);
                            ctx.lineTo(position.x, position.y - padding);
                            ctx.strokeStyle = 'rgba(255,255,255,0.12)';
                            ctx.stroke();

                            ctx.restore();
                        });
                    }
                });
            }
        });
    }
}

