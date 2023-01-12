const express = require("express");
const AuthConstroller = require("../controllers/auth.js");

const api = express.Router();

api.post("/auth/register", AuthConstroller.register);

api.post("/auth/login", AuthConstroller.login);

api.post("/auth/refresh_access_token", AuthConstroller.refreshAccessToken);

module.exports = api;
