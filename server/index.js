const express = require('express');
const path = require('path');
const image = require('./controllers/image.js');
const user = require('./controllers/user.js');

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/', express.static(path.join(__dirname, '../client/public')));
app.use(express.urlencoded({ extended: false }));

app.get('/api/images', image.getImages);
app.get('/api/users/:userId/backgroundImage', user.getBackgroundImageData);
app.patch('/api/users/:userId/backgroundImage', user.setBackgroundImage);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));