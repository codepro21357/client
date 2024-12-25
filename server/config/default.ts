const PORT = process.env.PORT || 1337;
const DB_URI = process.env.DB_URI || '';
const CLIENT_URL = process.env.CLIENT_URL;
const ADMIN_URL = process.env.ADMIN_URL;
const ACTIVATION_SECRET = process.env.ACTIVATION_SECRET;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const VERIFY_TOKEN_SECRET = process.env.VERIFY_TOKEN_SECRET;
const SALT_WORK_FACTOR = 10;

export default {
  port: PORT,
  dbUri: DB_URI,
  clientUrl: CLIENT_URL,
  adminUrl: ADMIN_URL,
  activationSecret: ACTIVATION_SECRET,
  accessToken: ACCESS_TOKEN_SECRET,
  refreshToken: REFRESH_TOKEN_SECRET,
  verifyToken: VERIFY_TOKEN_SECRET,
  saltWorkFactor: SALT_WORK_FACTOR,
};
