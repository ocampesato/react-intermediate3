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

        .line-chart {
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

        .line-chart__grid-x line,
        .line-chart__grid-y line {
          stroke: rgb( 200, 80, 55 );
        }

        .line-chart__line {
          stroke: rgb( 90, 175, 65 );
          stroke-width: 6px;
        }

        .line-chart__point {
          fill: rgb( 120, 210, 85 );
          stroke: rgb( 90, 175, 65 );
          stroke-width: 3px;
        }

        .line-chart__label,
        .line-chart__value {
          fill: rgb( 55, 55, 55 );
          font-size: 18px;
        }

        .line-chart__value {
          font-weight: bold;
        }

        .line-chart__value-bg {
          fill: rgb( 255, 255, 255 );
          stroke: rgb( 220, 220, 220 );
          stroke-width: 1px;
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
