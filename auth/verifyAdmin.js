const jwt = require("jsonwebtoken");
require("dotenv").config();
//verify admin
exports.verifyAdmin = async (req, res, next) => {
  const requester = req.decoded.email;
  // console.log(requester);
  const requesterAccount = await userCollection.findOne({ email: requester });
  if (requesterAccount.role === "admin") {
    next();
  } else {
    res.status(403).send({ message: "forbidden" });
  }
};
