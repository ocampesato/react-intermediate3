import React, { createClass, PropTypes } from 'react';
import tween from 'tweening';

const BarChart = createClass({
  propTypes: {
    bars: PropTypes.array.isRequired,
    barSpacing: PropTypes.number,
    className: PropTypes.string,
    description: PropTypes.string,
    duration: PropTypes.number,
    easing: PropTypes.oneOfType([ PropTypes.func, PropTypes.string ]),
    formatValue: PropTypes.func,
    height: PropTypes.number,
    labelSpacing: PropTypes.number,
    labelWidth: PropTypes.number,
    preserveAspectRatio: PropTypes.string,
    showLabels: PropTypes.bool,
    title: PropTypes.string,
    valueSpacing: PropTypes.number,
    width: PropTypes.number,
  },

  getDefaultProps () {
    return {
      barSpacing: 10,
      className: '',
      description: '',
      duration: 400,
      easing: 'easeInOutQuad',
      formatValue: v => v,
      height: 500,
      labelSpacing: 10,
      labelWidth: 100,
      preserveAspectRatio: 'xMidYMid meet',
      showLabels: true,
      title: 'Bar chart',
      valueSpacing: 10,
      width: 800,
    };
  },

  getInitialState () {
    const { bars, labelWidth, showLabels, width } = this.props;
    return this.calculateState({ bars, labelWidth, showLabels, width });
  },

  componentWillReceiveProps ({ bars, labelWidth, showLabels, width }) {
    const { bars: nextBars, ...state } = this.calculateState({ bars, labelWidth, showLabels, width });

    this.setState( state );

    if ( JSON.stringify( nextBars ) !== JSON.stringify( this.state.bars )) {
      this.animateBars( this.state.bars, nextBars );
    }
  },

  render () {
    const barHeight = ( this.props.height - this.props.barSpacing * ( this.props.bars.length + 1 )) / this.props.bars.length;
    const x = this.props.showLabels ? -this.props.labelWidth : 0;

    return (
      <svg
        aria-describedby="bar-chart-description"
        aria-labelledby="bar-chart-title"
        className={ `bar-chart ${ this.props.className }` }
        height={ this.props.height }
        preserveAspectRatio={ this.props.preserveAspectRatio }
        role="img"
        width={ this.props.width }
        version="1.1"
        viewBox={ `${ x } 0 ${ this.props.width } ${ this.props.height }` }
      >
        <title id="bar-chart-title">
          { this.props.title }
        </title>

        <desc id="bar-chart-description">
          { this.props.description }
        </desc>

        { this.state.bars.map(( bar, i ) => {
          const barY = ( barHeight + this.props.barSpacing ) * i + this.props.barSpacing;
          const textY = barY + barHeight / 2;
          const value = this.props.bars[ i ].value;
          const formattedValue = this.props.formatValue( value );
          const valueInBar = bar.value > this.state.x / 2;

          return (
            <g
              className={ `bar-chart__group${ bar.label ? `bar-chart__group--${ bar.label }` : '' }` }
              key={ i }
            >
              <rect
                aria-describedby={ `bar-chart-value-${ bar.label }` }
                aria-labelledby={ `bar-chart-label-${ bar.label }` }
                className="bar-chart__bar"
                height={ barHeight }
                width={ bar.value }
                x={ 0 }
                y={ barY }
              />
              { this.props.showLabels ?
                <text
                  className="bar-chart__label"
                  dominantBaseline="middle"
                  id={ `bar-chart-label-${ bar.label }` }
                  textAnchor="end"
                  x={ -this.props.labelSpacing }
                  y={ textY }
                >
                  { bar.label }
                </text> :
                <title id={ `bar-chart-label-${ bar.label }` }>
                  { bar.label }
                </title>
              }
              <text
                className="bar-chart__value"
                dominantBaseline="middle"
                fill={ valueInBar ? 'rgb( 255, 255, 255 )' : 'rgb( 0, 0, 0 )' }
                id={ `bar-chart-value-${ bar.label }` }
                textAnchor={ valueInBar ? 'end' : 'start' }
                x={ bar.value + ( valueInBar ? -this.props.valueSpacing : this.props.valueSpacing )}
                y={ textY }
              >
                { formattedValue }
              </text>
            </g>
          );
        })}

        <g className="bar-chart__grid-x">
          <line
            stroke="rgb( 0, 0, 0 )"
            x1="0"
            x2={ this.state.x }
            y1={ this.props.height }
            y2={ this.props.height }
          />
        </g>

        <g className="bar-chart__grid-y">
          <line
            stroke="rgb( 0, 0, 0 )"
            x1="0"
            x2="0"
            y1="0"
            y2={ this.props.height }
          />
        </g>
      </svg>
    );
  },

  calculateState ({ bars, labelWidth, showLabels, width }) {
    const x = showLabels ? width - labelWidth : width;
    const scale = ( x / 100 ) / ( Math.max( ...bars.map( b => b.value )) / 100 );
    const relativeBars = bars.map( b => ({ ...b, value: b.value * scale }));
    return { bars: relativeBars, scale, x };
  },

  animateBars ( from, to ) {
    tween({
      duration: this.props.duration,
      easing: this.props.easing,
      from,
      to,
      next: bars => this.setState({ bars }),
    });
  },
});

export default BarChart;
