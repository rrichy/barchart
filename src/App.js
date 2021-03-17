import React from 'react';
import * as d3 from 'd3';

const H = 460;
const W = 900;
const PADDING = 60;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
            .then(response => response.json())
            .then(jsonData => {
                console.log(jsonData);

                const { data } = jsonData;
                const svg = d3.select('svg');

                svg.append('text')
                    .attr('transform', 'rotate(-90)')
                    .attr('x', - (H / 2))
                    .attr('y', PADDING + 20)
                    .text('Gross Dometic Product');

                const xScale = d3.scaleTime()
                                .domain([d3.min(data, d => new Date(d[0])), d3.max(data, d => new Date(d[0]))])
                                .range([PADDING, W - PADDING]);

                const yScale = d3.scaleLinear()
                                .domain([0, d3.max(data, d => d[1])])
                                .range([H - PADDING, PADDING]);

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
            });
    }

    render() {
        return (
            <div id="svg-wrapper">
                <h1 id="title">United States GDP</h1>
                <svg style={{width: W, height: H, backgroundColor: 'pink'}}>
                </svg>
            </div>
        )
    }
}

export default App;