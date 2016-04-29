import React, { PropTypes } from 'react';

const propTypes = {
  app: PropTypes.string.isRequired,
};

const Page = ({ app }) => (
  <html lang="en">
    <head>
      <style>{ `
        html {
          line-height: 1.5;
          font-family: Arial, Helvetica, sans-serif;
          height: 100%;
        }

        body {
          background-color: rgb( 245, 245, 245 );
          margin: 0;
        }

        html,
        body,
        .app,
        .content {
          height: 100%;
        }

        select {
          position: absolute;
          top: 20px;
          right: 20px;
        }

        .bar-chart {
          background-color: rgb( 245, 245, 245 );
          background-image: radial-gradient(
            2px 2px at center,
            rgb( 210, 230, 240 ) 0%,
            rgb( 210, 230, 240 ) 50%,
            rgb( 245, 245, 245 ) 50%,
            rgb( 245, 245, 245 ) 100%
          );
          background-size: 30px 30px;
          box-sizing: border-box;
          height: 100%;
          padding: 58px 20px 20px;
          width: 100%;
        }

        .bar-chart__grid-x line,
        .bar-chart__grid-y line {
          stroke: rgb( 200, 80, 55 );
        }

        .bar-chart__label {
          fill: rgb( 55, 55, 55 );
          font-size: 18px;
        }

        .bar-chart__bar {
          fill: rgb( 90, 175, 65 );
        }

        .bar-chart__value {
          fill: rgb( 55, 55, 55 );
          font-size: 30px;
          font-weight: bold;
        }

        .bar-chart__value[text-anchor=end] {
          fill: rgb( 255, 255, 255 );
          text-shadow: 0 -2px 0 rgb( 30, 60, 22 );
        }
      ` }</style>
    </head>
    <body>
      <section className="app" dangerouslySetInnerHTML={{ __html: app }} />
      <script src="/client.dist.js" />
    </body>
  </html>
);

Page.propTypes = propTypes;

export default Page;
