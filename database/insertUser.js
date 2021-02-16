const { User } = require('../server/models/user.js');

const addUser = () => {
  const newUser = new User({background: 'image'});
  newUser.save((err, res) => {
    if (err) {
      console.error(err);
      process.exit(-1);
    } else {
      console.log('1 document successfully inserted into users collection');
      console.log(res);
      process.exit(0);
    }
  });
  // User.create({background: 'image'})
    // .then((res) => {
    //   console.log('1 document successfully inserted into users collection');
    //   console.log(res);
    // })
    // .cacth(console.error)
    // .finally(() => process.exit());
};

addUser();
