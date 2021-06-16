const passport = require("passport");
require("../config/passport");
const { HttpCode } = require("./constants");

const guard = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user) => {
    const headerAuth = req.get("Authorization");
    let token = null;
    if (headerAuth) {
      token = headerAuth.split(" ")[1];
    }
    if (err || !user || token !== user.token) {
      return res.status(HttpCode.UNAUTHORIZATED).json({
        status: "error",
        code: HttpCode.UNAUTHORIZATED,
        message: "Invalid credentials",
      });
    }

    req.user = user;
    return next();
  })(req, res, next);
};

module.exports = guard;
