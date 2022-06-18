
const express = require('express');
const path = require('path');

const app = express();
const port = 8080;

app.use( express.static( __dirname + '/public' ) );

app.get( '/', (req, res) => {
  res.sendFile( path.join( __dirname, '/index.html' ) );
});

app.get( '/*', (req, res) => {

  const ext = path.extname( req.originalUrl );
  var tag = ext ? 'file' : 'folder';
  res.sendFile( path.join( __dirname, '/public/'+ tag +'.html' ) );
});

app.listen( port, () => {
  console.log(`Example app listening on port ${port}`);
});