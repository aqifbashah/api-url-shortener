import express from "express";
import isAuth from "../middleware/isAuth";
import getAllUsers from "../controllers/admin/getAllUsers";
import deleteUser from "../controllers/admin/deleteUser";
import postUrlStatus from "../controllers/admin/postUrlStatus";
import getAllUrls from "../controllers/admin/getAllUrls";

const admin = express.Router();

admin.get("/users", isAuth, getAllUsers);
admin.get("/urls", isAuth, getAllUrls);
admin.delete("/delete-user/:id", isAuth, deleteUser);
admin.post("/url-status", isAuth, postUrlStatus);

export default admin;
