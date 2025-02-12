import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    res.json({ success: false, message: 'Not authorized login again' });
  }
  try {
    //decoding the token
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (decode.id) {
      req.body.id = decode.id;
    } else {
      return res.json({
        success: false,
        message: 'Not authorized login again',
      });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
  next();
};

export default userAuth;
