import express from 'express';
import React from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';

import App from './App';
import Page from './Page';

const app = express();

app.get( '/client.dist.js', ( req, res ) => {
  res.sendFile( `${ __dirname }/client.dist.js` );
});

app.get( '/', ( req, res ) => {
  res.send( '<!DOCTYPE html>' +
    renderToStaticMarkup(
      <Page app={ renderToString( <App /> )} />
    )
  );
});

app.listen( 3000, () => {
  console.log( 'Listening for requests on http://localhost:3000' );
});
