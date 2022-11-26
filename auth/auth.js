function verifyJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  // console.log(authHeader);
  if (!authHeader) {
    return res.status(401).send({ message: "UnAuthorized access" });
  }
  const token = authHeader.split(" ")[1];
  // console.log(token, "token");
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, decoded) {
    if (err) {
      // console.log(err);
      return res.status(403).send({ message: "Forbidden access" });
    }
    req.decoded = decoded;
    // console.log(req.decoded);
    next();
  });
}

module.exports.verifyJWT = verifyJWT;
