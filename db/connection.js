const mongoose = require('mongoose');

const mongoURI =
  //   process.env.NODE_ENV === 'production'
  //     ? process.env.MONGODB_URL
  //     :
  'mongodb://localhost:27017/zevhub';

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  .then((instance) => {
    console.log(`Connected to the db: ${instance.connections[0].name}`);
  })

  .catch((err) => console.log(`Connection failed`, err));

module.exports = mongoose;
