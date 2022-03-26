const bcrypt = require('bcryptjs');

const users = [
  {
    name: 'Admin User',
    email: 'admin@example.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true,
  },
  {
    name: 'garri7',
    email: 'garri7@example.com',
    password: bcrypt.hashSync('garri7', 10),
  },
  {
    name: 'garri8',
    email: 'garri8@example.com',
    password: bcrypt.hashSync('garri8', 10),
  },
];

module.exports = users;
