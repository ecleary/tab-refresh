const express = require('express');
const path = require('path');
const user = require('./models/user.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/', express.static(path.join(__dirname, '../client/public')));

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));