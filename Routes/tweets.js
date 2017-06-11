var express = require('express');
var router = express.Router();
var Twitter = require('twit');
var config = {
    
    twitter: {
        consumer_key: 'U2cThUgsorPqark3Vq5UESSKg',
        consumer_secret: 'l8C5NvPa4VTgXHvKbluIo5ADd3JkP8JPxWwtR9aNiBkA4y9ed5',
        access_token: '3000096733-ram7zVk6u817xfYOqSU2rgzjNe5B7VpCieXHFIh',
        access_token_secret: 'bdXvMpiRim3oDf7phu6ZK150JNk9fOkMeItGqV6ujuU1p'
    }

};

// instantiate Twit module
var client = new Twitter(config.twitter);

var TWEET_COUNT = 15;
var MAX_WIDTH = 305;
var OEMBED_URL = 'statuses/oembed';
var USER_TIMELINE_URL = 'statuses/user_timeline';

router.get('/tweets/user_timeline/:user', function(req, res) {

  var oEmbedTweets = [], tweets = [],

  params = {
    screen_name: req.params.user, // the user id passed in as part of the route
    count: TWEET_COUNT // how many tweets to return
  };

  // the max_id is passed in via a query string param
  if(req.query.max_id) {
    params.max_id = req.query.max_id;
  }

  // request data 
  client.get(USER_TIMELINE_URL, params, function (err, data, resp) {
        
        if (err) {
            console.log(err);
        }
    tweets = data;

    var i = 0, len = tweets.length;

    for(i; i < len; i++) {
      getOEmbed(tweets[i]);
    }
  });

  /**
   * requests the oEmbed html
   */
  function getOEmbed (tweet) {

    // oEmbed request params
    var params = {
      "id": tweet.id_str,
      "maxwidth": MAX_WIDTH,
      "hide_thread": true,
      "omit_script": true
    };

    // request data 
     client.get(OEMBED_URL, params, function (err, data, resp) {
      tweet.oEmbed = data;
      oEmbedTweets.push(tweet);

      // do we have oEmbed HTML for all Tweets?
      if (oEmbedTweets.length == tweets.length) {
        res.setHeader('Content-Type', 'application/json');
        res.send(oEmbedTweets);
      }
    });
  }
});

module.exports = router;
