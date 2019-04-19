var express = require('express'),
    path = require('path'),
    app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static('build'));
app.get('/fishHead/', function (req, res) {
  res.sendFile(path.join(__dirname + '/build/assets/fishHead/fishHead.html'))
});
app.get('/voidmeatmoth/', function (req, res) {
  res.send('voidmeat moth')
});
app.get('/thefox/', function (req, res) {
  res.send('the fox')
});
app.listen(app.get('port'), function(err) {
  if (err) {
    console.log(err);
  } else {
    console.log('Running on port: ' + app.get('port')); }
});

