import express from "express";
import postLogin from "../controllers/auth/postLogin";

const login = express.Router();

login.post("/", postLogin);

export default login;
