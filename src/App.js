import React from 'react';
import * as d3 from 'd3';

const H = 460;
const W = 900;
const PADDING = 60;
const quarter = {
    '01': 'Q1',
    '04': 'Q2',
    '07': 'Q3',
    '10': 'Q4'
}

class App extends React.Component {
    componentDidMount() {
        fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
            .then(response => response.json())
            .then(jsonData => {
                console.log(jsonData);

                const { data } = jsonData;
                const svg = d3.select('svg');

                d3.select('h1')
                    .style('text-align', 'center');

                // scales
                const xScale = d3.scaleTime()
                                .domain([d3.min(data, d => new Date(d[0])), d3.max(data, d => new Date(d[0]))])
                                .range([PADDING, W - PADDING]);

                const yScale = d3.scaleLinear()
                                .domain([0, d3.max(data, d => d[1])])
                                .range([H - PADDING, PADDING]);

                // axis
                const xAxis = d3.axisBottom(xScale);
                const yAxis = d3.axisLeft(yScale);

                svg.append('g')
                    .attr('transform', 'translate(0,' + (H - PADDING) + ')')
                    .call(xAxis)
                    .attr('id', 'x-axis');

                svg.append('g')
                    .attr('transform', 'translate(' + PADDING + ',0)')
                    .call(yAxis)
                    .attr('id', 'y-axis');

                // axis label
                svg.append('text')
                    .attr('transform', 'rotate(-90)')
                    .attr('x', - (H / 2))
                    .attr('y', PADDING + 20)
                    .text('Gross Dometic Product');

                svg.append('text')
                    .style('text-align', 'right')
                    .style('font-size', '13px')
                    .attr('x', W - 400)
                    .attr('y', H - 15)
                    .text('More Information: http://www.bea.gov/national/pdf/nipaguid.pdf');

                // tooltip
                const toolTipData1 = svg.append('text')
                                    .attr('x', 280)
                                    .attr('y', PADDING + 100)
                                    .attr('text-anchor', 'middle')
                                    .attr('id', 'tooltip')
                                    .style('font-size', '23px')
                                    .attr('opacity', 0);

                const toolTipData2 = svg.append('text')                 
                                    .attr('x', 280)
                                    .attr('y', PADDING + 130)
                                    .attr('text-anchor', 'middle')
                                    .style('font-size', '23px')
                                    .attr('opacity', 0);

                // data-rect
                svg.selectAll('rect')
                    .data(data)
                    .enter()
                    .append('rect')
                    .attr('width', (W - 2 * PADDING) / data.length)
                    .attr('height', d => H - PADDING - yScale(d[1]))
                    .attr('x', d => xScale(new Date(d[0])))
                    .attr('y', d => yScale(d[1]))
                    .attr('class', 'bar')
                    .attr('data-date', d => d[0])
                    .attr('data-gdp', d => d[1])
                    .attr('fill', '#84CCEB')
                    .on('mouseover', (_, d) => {
                        toolTipData1.text(d[0].slice(0,4) + ' ' + quarter[d[0].slice(5,7)])
                            .attr('data-date', d[0])
                            .attr('opacity', 1);
                        toolTipData2.text(new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(d[1]) + ' Billion')
                            .attr('opacity', 1);
                    })
                    .on('mouseout', () => {
                        toolTipData1.attr('opacity', 0);
                        toolTipData2.attr('opacity', 0);
                    })

                
            });
    }

    render() {
        return (
            <div id="svg-wrapper">
                <h1 id="title">United States GDP</h1>
                <svg style={{width: W, height: H, marginBottom: 40}}>
                </svg>
            </div>
        )
    }
}

export default App;