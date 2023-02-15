const twilio = require('twilio');
const AccessToken = twilio.jwt.AccessToken;
const { VideoGrant } = AccessToken;

const generateToken =( config, identity) => {
  return new AccessToken(
    config.twilio.accountSid,
    config.twilio.apiKey,
    config.twilio.apiSecret,
    {
      identity: identity
    }
  );
};

const videoToken = (identity, room, config) => {
  let videoGrant;
  if (typeof room !== 'undefined') {
    videoGrant = new VideoGrant({ room });
  } else {
    videoGrant = new VideoGrant();
  }
  const token = generateToken(config, identity);
  token.addGrant(videoGrant);
  return token;
};

module.exports = { videoToken };
