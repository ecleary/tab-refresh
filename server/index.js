const express = require('express');
const path = require('path');
const user = require('./models/user.js');
const image = require('./controllers/image.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/', express.static(path.join(__dirname, '../client/public')));

app.get('/api/images', image.getImages);
// app.get('/api/users/:userId/images', );

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));