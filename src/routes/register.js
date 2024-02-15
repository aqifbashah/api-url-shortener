import express from "express";
import postRegister from "../controllers/auth/postRegister";

const register = express.Router();

register.post("/", postRegister);

export default register;
