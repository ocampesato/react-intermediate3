import React, { createClass, PropTypes } from 'react';
import tween from 'tweening';

const LineChart = createClass({
  propTypes: {
    className: PropTypes.string,
    description: PropTypes.string,
    duration: PropTypes.number,
    easing: PropTypes.oneOfType([ PropTypes.func, PropTypes.string ]),
    formatValue: PropTypes.func,
    height: PropTypes.number,
    labelHeight: PropTypes.number,
    labelOffset: PropTypes.number,
    lines: PropTypes.array.isRequired,
    pointSize: PropTypes.number,
    preserveAspectRatio: PropTypes.string,
    showLabels: PropTypes.bool,
    title: PropTypes.string,
    valueBorderRadius: PropTypes.number,
    valueHeight: PropTypes.number,
    valueOffset: PropTypes.number,
    valueWidth: PropTypes.number,
    width: PropTypes.number,
  },

  getDefaultProps () {
    return {
      className: '',
      description: '',
      duration: 400,
      easing: 'easeInOutQuad',
      formatValue: v => v,
      height: 500,
      labelHeight: 50,
      labelOffset: 10,
      pointSize: 20,
      preserveAspectRatio: 'xMidYMid meet',
      showLabels: true,
      title: 'Line chart',
      valueBorderRadius: 2,
      valueHeight: 30,
      valueOffset: 35,
      valueWidth: 60,
      width: 800,
    };
  },

  getInitialState () {
    const { height, labelHeight, labelOffset, lines, showLabels, valueHeight, valueOffset } = this.props;
    return this.calculateState({ height, labelHeight, labelOffset, lines, showLabels, valueHeight, valueOffset });
  },

  componentWillReceiveProps ({ height, labelHeight, labelOffset, lines, showLabels, valueHeight, valueOffset }) {
    const { lines: nextLines, ...state } = this.calculateState({ height, labelHeight, labelOffset, lines, showLabels, valueHeight, valueOffset })

    this.setState( state );

    if ( JSON.stringify( nextLines ) !== JSON.stringify( this.state.lines )) {
      this.animateLines( this.state.lines, nextLines );
    }
  },

  render () {
    const pointSpacing = this.props.width / ( this.state.lines.reduce(( p, c ) => Math.max( p, c.points.length ), 0 ) + 1 );

    return (
      <svg
        aria-describedby="line-chart-description"
        aria-labelledby="line-chart-title"
        className={ `line-chart ${ this.props.className }` }
        height={ this.props.height }
        preserveAspectRatio={ this.props.preserveAspectRatio }
        width={ this.props.width }
        viewBox={ `0 -${ this.state.offsetTop } ${ this.props.width } ${ this.props.height }` }
      >
        <title id="line-chart-title">
          { this.props.title }
        </title>

        <desc id="line-chart-description">
          { this.props.description }
        </desc>

        <g className="line-chart__grid-x">
          <line
            stroke="rgb( 0, 0, 0 )"
            x1="0"
            x2={ this.props.width }
            y1={ this.state.chartHeight }
            y2={ this.state.chartHeight }
          />
        </g>

        <g className="line-chart__grid-y">
          <line
            stroke="rgb( 0, 0, 0 )"
            x1="0"
            x2="0"
            y1="0"
            y2={ this.state.chartHeight }
          />
        </g>

        { this.state.lines.map(({ points }, i ) => (
          <g
            className="line-chart__group"
            key={ i }
          >
            <polyline
              className="line-chart__line"
              fill="none"
              points={ points.map(( p, j ) => (
                `${ pointSpacing * ( j + 1 )},${ p.value }`
              )).join( ',' )}
              stroke="rgb( 0, 0, 0 )"
              strokeLinejoin="round"
              strokeWidth="5"
            />

            { points.map(( p, j ) => {
              const x = pointSpacing * ( j + 1 );
              const value = this.props.lines[ i ].points[ j ].value;
              const formattedValue = this.props.formatValue( value );

              return (
                <g
                  className={ `line-chart__group${ p.label ? `line-chart__group--${ p.label }` : '' }` }
                  key={ j }
                >
                  <circle
                    aria-describedby={ `line-chart-value-${ p.label }` }
                    aria-labelledby={ `line-chart-label-${ p.label }` }
                    className="line-chart__point"
                    cx={ x }
                    cy={ p.value }
                    r={ this.props.pointSize / 2 }
                  />

                  { this.props.showLabels ?
                    <text
                      className="line-chart__label"
                      dominantBaseline="center"
                      id={ `line-chart-label-${ p.label }` }
                      textAnchor="middle"
                      x={ x }
                      y={ this.props.height - this.state.offsetTop - this.props.labelOffset }
                    >
                      { p.label }
                    </text> :
                    <title id={ `line-chart-label-${ p.label }` }>
                      { p.label }
                    </title>
                  }

                  <g>
                    <rect
                      className="line-chart__value-bg"
                      fill="rgb( 255, 255, 255 )"
                      height={ this.props.valueHeight }
                      rx={ this.props.valueBorderRadius }
                      ry={ this.props.valueBorderRadius }
                      stroke="rgb( 0, 0, 0 )"
                      strokeWidth="1"
                      width={ this.props.valueWidth }
                      x={ x - this.props.valueWidth / 2 }
                      y={ p.value - this.props.valueOffset - this.props.valueHeight / 2 }
                    />
                    <text
                      className="line-chart__value"
                      dominantBaseline="central"
                      id={ `line-chart-value-${ p.label }` }
                      x={ x }
                      y={ p.value - this.props.valueOffset }
                      textAnchor="middle"
                    >
                      { formattedValue }
                    </text>
                  </g>
                </g>
              );
            })}
          </g>
        ))}
      </svg>
    );
  },

  calculateState ({ height, labelHeight, labelOffset, lines, showLabels, valueHeight, valueOffset }) {
    const offsetTop = valueOffset + valueHeight / 2;
    const offsetBottom = showLabels ? labelOffset + labelHeight / 2 : 0;
    const chartHeight = height - offsetTop - offsetBottom;

    const scale = ( chartHeight / 100 ) / ( Math.max(
      ...lines.map( l => Math.max( ...l.points.map( p => p.value )))
    ) / 100 );

    const relativeLines = lines.map( l => ({
      ...l,
      points: l.points.map( p => ({ ...p, value: chartHeight - ( p.value * scale )})),
    }));

    return { chartHeight, lines: relativeLines, offsetBottom, offsetTop, scale };
  },

  animateLines ( from, to ) {
    tween({
      duration: this.props.duration,
      easing: this.props.easing,
      from,
      to,
      next: lines => this.setState({ lines }),
    });
  }
});

export default LineChart;
