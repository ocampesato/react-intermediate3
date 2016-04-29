# React SVG chart

Animated SVG charts for React.

**3.9kb gzipped.**

## Polyfill generators

However, you're currently also going to have to bring
[babel polyfill](https://cdnjs.com/libraries/babel-polyfill)
to the party at an additional 30.8kb gzipped. This is to
support Javascript generators which a dependency of this
library makes use of.

## Examples

![Line chart example](https://www.dropbox.com/s/vnm0u1k8orkc5n8/line-chart.gif?raw=1)

[View line chart example code](./examples/lineChart)

![Bar chart example](https://www.dropbox.com/s/xlmgpmml5og0q1j/bar-chart.gif?raw=1)

[View bar chart example code](./examples/barChart)

## Installation

```
npm install react-svg-chart
```

## Usage

### Bar chart

```js
import React from 'react';
import { BarChart } from 'react-svg-chart';

const App = () => (
  <BarChart
    bars={[
      { label: 'travel', value: 11 },
      { label: 'accomodation', value: 27 },
      { label: 'food', value: 4 },
      { label: 'drink', value: 19 },
      { label: 'tourism', value: 10 },
    ]}
    height={ 400 }
    width={ 600 }
  />
);
```

### Line chart

```js
import React from 'react';
import { LineChart } from 'react-svg-chart';

const App = () => (
  <LineChart
    lines={[
      { points: [
        { label: 'travel', value: 11 },
        { label: 'accommodation', value: 27 },
        { label: 'food', value: 4 },
        { label: 'drink', value: 19 },
        { label: 'tourism', value: 10 },
      ]},
    ]}
    height={ 400 }
    width={ 600 }
  />
);
```

## CommonJS

This is how you get to the good stuff if you're using
`require`.

```js
const ReactSVGChart = require( 'react-svg-chart' );
const BarChart = ReactSVGChart.BarChart;
const LineChart = ReactSVGChart.LineChart;
```

## UMD

And if you just want to smash in a Javascript file you're
also covered. Drop this in place ...

[https://npmcdn.com/react-svg-chart@4.0.0/dist/react-svg-chart.min.js](https://npmcdn.com/react-svg-chart@4.0.0/dist/react-svg-chart.min.js)

Then access it on the `ReactSVGChart` global variable.

```js
const BarChart = ReactSVGChart.BarChart;
const LineChart = ReactSVGChart.LineChart;
```

## Props

### BarChart

- `bars` – **required** – an array of bar objects (each object should contain a `label` and a `value`)
- `barSpacing` – the length between each bar
- `className` – the SVG class
- `description` – the SVG description
- `duration` – the duration in milliseconds of the animation on data change
- `easing` – the name of the easing function to use for the animation on data change
- `formatValue` – the function to format the bar values for display
- `height` – the SVG height
- `labelSpacing` – the length between a label and the y-axis
- `labelWidth` –  the width to the left of the y-axis
- `preserveAspectRatio` – the SVG preserveAspectRatio value
- `showLabels` – show / hide labels
- `title` – the SVG title
- `valueSpacing` – the length between the value and the end of a bar
- `width` – the SVG width

### LineChart

- `className` – the SVG class
- `description` – the SVG description
- `duration` – the duration in milliseconds of the animation on data change
- `easing` – the name of the easing function to use for the animation on data change
- `formatValue` – the function to format the bar values for display
- `height` – the SVG height
- `labelHeight` – the label height
- `labelOffset` – the length between the center of a label and the x-axis
- `lines` – **required** – an array of line objects (each object should contain a `points` array)
- `pointSize` – the points diameter
- `preserveAspectRatio` – the SVG preserveAspectRatio value
- `showLabels` – show / hide labels
- `title` – the SVG title
- `valueBorderRadius` – the border-radius of the value background
- `valueHeight` – the value height
- `valueOffset` – the length between the center of a point and the center of it's value
- `valueWidth` – the value width
- `width` – the SVG width

## Help make this better

[Issues](https://github.com/colinmeinke/react-svg-chart/issues/new)
and pull requests gratefully received!

I'm also on twitter [@colinmeinke](https://twitter.com/colinmeinke).

Thanks :star2:

## License

[ISC](./LICENSE.md).
