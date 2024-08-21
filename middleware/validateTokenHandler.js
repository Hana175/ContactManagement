const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
      //console.log(decoded); this is the user

      req.user = decoded.user; //we verified the token and extracted information embedded in the token.
      next();
      //middleware we will intercept the request, decode the token and append the information on the requst property not body.
    });
    if (!token) {
      res.status(401);
      throw new Error("Not authorized, token failed/missing in the request");
    }
  }
});
module.exports = validateToken;
