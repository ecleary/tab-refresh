const mongoose = require('mongoose');

const host = process.env.MONGO_HOST || 'localhost';
const port = 27017;
const database = 'tabrefresh';
const uri = `mongodb://${host}:${port}/${database}`;
const options = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

mongoose.connect(uri, options, (err) => {
  if (err) {
    console.log(err);
    process.exit(-1);
  } else {
    const { connection } = mongoose;
    const { _connectionString } = connection;
    console.log(`Connected to database ${_connectionString}`);
    connection.on('error', console.error);
    const { pid } = process;
    process.on('SIGINT', () => {
      connection.close();
      console.log(`\nClosed connection to database ${_connectionString}`);
      console.log(`Exiting Node process ID ${pid}`);
      process.exit(0);
    });
  }
});

module.exports = mongoose;
