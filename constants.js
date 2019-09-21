module.exports = {
  dbConn: "mongodb://localhost:27017/mocker",
  email: "", //Enter your Gmail id
  passwd: "", //Enter your App Password
  emailhost: "smtp.gmail.com",
  emailport: 587,
  otpExpiry: 90000,
  tokenExpiry: 90000,
  user_roles: {
    admin: 1,
    team: 2
  }
};
