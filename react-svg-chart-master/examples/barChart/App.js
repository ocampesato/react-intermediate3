import React, { createClass } from 'react';
import { BarChart } from '../../src';

const days = [
  {
    title: 'Thursday, 9th March',
    bars: [
      { label: 'travel', value: 0.00 },
      { label: 'accommodation', value: 20.25 },
      { label: 'food', value: 20.28 },
      { label: 'drink', value: 7.43 },
      { label: 'tourism', value: 13.50 },
    ],
  },
  {
    title: 'Wednesday, 8th March',
    bars: [
      { label: 'travel', value: 13.50 },
      { label: 'accommodation', value: 17.77 },
      { label: 'food', value: 14.63 },
      { label: 'drink', value: 9.47 },
      { label: 'tourism', value: 0.00 },
    ],
  },
  {
    title: 'Tuesday, 7th March',
    bars: [
      { label: 'travel', value: 138.88 },
      { label: 'accommodation', value: 21.50 },
      { label: 'food', value: 17.42 },
      { label: 'drink', value: 3.98 },
      { label: 'tourism', value: 0.00 },
    ],
  },
];

const App = createClass({
  onChange ( e ) {
    this.setState({
      day: days[ e.target.value ],
    });
  },

  getInitialState () {
    return {
      day: days[ 0 ],
    };
  },

  render () {
    return (
      <section className="content">
        <select onChange={ this.onChange }>
          { days.map(( day, i ) => (
            <option key={ i } value={ i }>{ day.title }</option>
          ))}
        </select>
        <BarChart
          bars={ this.state.day.bars }
          description={ `Amount of money spent on ${ this.state.day.title } broken down by category` }
          labelWidth={ 135 }
          preserveAspectRatio="xMinYMid meet"
          title="Travel budget"
          formatValue={ v => `£${ v.toFixed( 2 )}` }
        />
      </section>
    );
  }
});

export default App;
