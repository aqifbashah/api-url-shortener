import express from "express";
import getRoot from "../controllers/root/getRoot";
import postRoot from "../controllers/root/postRoot";
import getUrlRedirect from "../controllers/url/getUrlRedirect";

const root = express.Router();

root.get("/", getRoot);
root.post("/", postRoot);
root.get("/:shortCode", getUrlRedirect);

export default root;
