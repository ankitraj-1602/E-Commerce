const paypal = require("paypal-rest-sdk");
require('dotenv').config()
console.log(process.env.CLIENT_ID)

paypal.configure({
  mode: "sandbox",
  client_id: "ASS4rCNbkwS4UgpP5p3sAdwEYeXL2EMzOhLrUhFUSJQw7LW7lwmN7CYIl866ajGAAntW8pFFAs8Tf_B4",
  client_secret: "ECHrP3IC_ooCRSxltYmQQIWeii_CKCjGZosG4MXEmlIF7KWEOfFt_07WUePE15SE16iUSmAjhFuxv215",
});

module.exports = paypal;