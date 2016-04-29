import React, { createClass } from 'react';
import { LineChart } from '../../src';

const categories = [
  {
    title: 'Accommodation',
    points: [
      { label: 'Fri 17', value: 7.65 },
      { label: 'Sat 18', value: 25.50 },
      { label: 'Sun 19', value: 21.55 },
      { label: 'Mon 20', value: 21.55 },
      { label: 'Tue 21', value: 21.55 },
      { label: 'Wed 22', value: 21.55 },
      { label: 'Thu 23', value: 39.82 },
      { label: 'Fri 24', value: 39.82 },
      { label: 'Sat 25', value: 39.82 },
    ],
  },
  {
    title: 'Food',
    points: [
      { label: 'Fri 17', value: 5.46 },
      { label: 'Sat 18', value: 5.71 },
      { label: 'Sun 19', value: 9.79 },
      { label: 'Mon 20', value: 9.03 },
      { label: 'Tue 21', value: 13.52 },
      { label: 'Wed 22', value: 12.50 },
      { label: 'Thu 23', value: 15.56 },
      { label: 'Fri 24', value: 9.18 },
      { label: 'Sat 25', value: 9.44 },
    ],
  },
  {
    title: 'Drink',
    points: [
      { label: 'Fri 17', value: 2.35 },
      { label: 'Sat 18', value: 2.55 },
      { label: 'Sun 19', value: 10.20 },
      { label: 'Mon 20', value: 10.97 },
      { label: 'Tue 21', value: 3.83 },
      { label: 'Wed 22', value: 2.04 },
      { label: 'Thu 23', value: 4.52 },
      { label: 'Fri 24', value: 1.28 },
      { label: 'Sat 25', value: 10.91 },
    ],
  },
];

const App = createClass({
  onChange ( e ) {
    this.setState({
      category: categories[ e.target.value ],
    });
  },

  getInitialState () {
    return {
      category: categories[ 0 ],
    };
  },

  render () {
    return (
      <section className="content">
        <select onChange={ this.onChange }>
          { categories.map(( cat, i ) => (
            <option key={ i } value={ i }>{ cat.title }</option>
          ))}
        </select>
        <LineChart
          description={ `Amount of money spent on ${ this.state.category.title }` }
          formatValue={ v => `£${ v.toFixed( 2 )}` }
          lines={[{ points: this.state.category.points }]}
          pointSize={ 18 }
          labelSpacing={ 15 }
          preserveAspectRatio="xMinYMid meet"
          title="Travel budget"
          valueHeight={ 34 }
          valueOffset={ 37 }
          valueWidth={ 65 }
        />
      </section>
    );
  }
});

export default App;
