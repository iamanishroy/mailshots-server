const express = require('express');
const handleGet = require('./helper/handleGet');
const cors = require('cors');
const getToken = require('./helper/getToken');
const bodyParser = require('body-parser');
const handlePost = require('./helper/handlePost');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get('/', handleGet);
app.post('/token', getToken);
app.post('/', handlePost);

app.listen(3001, () => console.log('started'))
// export 'app'
module.exports = app