const express = require('express');
const path = require('path');
const { isSharedArrayBuffer } = require('util/types');

const app = express(); // stworzenie nowej aplikacji expressowej i przypisanie jej do stałej app

const isUser = (user) => {
  const userBase = 'szalonyMarian';
  if(user === userBase)
  return true;
}

app.use((req, res, next) => {
  res.show = (name) => {
    res.sendFile(path.join(__dirname, `views/${name}`));
  };
  next();
});
app.use('/user', (req, res, next) => {
  if (isUser('nikczemniuch')) next();
  else res.show('loginNeed.html');
});

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res) => {
  res.show('home.html');
});
app.get('/home', (req, res) => {
  res.show('home.html');
});
app.get('/about', (req, res) => {
  res.show('about.html');
});

app.use((req, res) => {
  res.status(404).show('notFound.html');
})


app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});