import { Router } from "express";

import {
    createUser,
    getUsers
} from "../controllers/user.controller.js";

const router = Router();

router.post("/create-user", createUser);

router.get("/users", getUsers);

export default router;