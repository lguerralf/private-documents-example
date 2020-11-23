import express from 'express';
import axios from 'axios';
import path from 'path';

const port = process.env.SERVER_PORT;
const apiBase = process.env.API_BASE;

const app = express();
app.set('views', path.join(__dirname, '..', 'views'));
app.set('view engine', 'ejs')

app.get('/', async (req, res) => {
  const documents = await getDocuments();
  res.render('index', {
    documents
  })
});

app.listen(port, () => {
  console.log(' .... listeing')
});

const getDocuments = async () => {
  const { data } = await axios.get(`${apiBase}getDocuments`);

  return data;
}