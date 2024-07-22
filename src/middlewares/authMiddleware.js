const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const { authorization } = req.headers;
  console.log("🚀 ~ verifyToken ~ authorization:", authorization);

  try {
    const token = authorization.slice(7, authorization.length);
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, email: decoded.email };
    console.log("🚀 ~ verifyToken ~ decoded:", decoded);

    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      message: "Authorzation failed, Invalid Token",
      err,
    });
  }
};

module.exports = verifyToken;
