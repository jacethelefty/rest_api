const User = require(__dirname + '/../models/user');
const jwt = require('jsonwebtoken');

module.exports = exports = function(req, res, next) {
  var decoded;
  try {
    decoded = jwt.verify(req.headers.token, process.env.APP_SECRET || 'CHANGETHIS');
  } catch(e) {
    return res.status(401).json({msg: 'authenicat says it cannot decode'});
  }
  User.findOne({_id: decoded.id}, (err, user) => {
    if (err) {
      console.log(err);
      return res.status(401).json({msg: 'authenicat says it cannot findone'});
    }

    if (!user) return res.status(401).json({msg: 'authenicat says !user'});

    req.user = user;
    next();
  });
};
