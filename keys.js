console.log('this is loaded\n\n\n' + ' ((((((((((((o)))))))))))) ' + ' ((((((((((((o)))))))))))) ' + ' ((((((((((((o))))))))))))\n\n\n');
require('dotenv').config();

exports.twitterKeys = {
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_KEY,
  access_token_secret: process.env.ACCESS_SECRET,
}

