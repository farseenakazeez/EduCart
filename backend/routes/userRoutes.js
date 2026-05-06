import express from "express"
import { registerUser,
    authUser,
    logoutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser} from "../controllers/userControllers.js";
 import {admin,protect} from "../middleware/authMiddlewares.js"


const router = express.Router();
router.route("/").post(registerUser).get(protect,admin,getUsers);
router.post("/auth",authUser);
router.post("/logout",logoutUser);
router.route("/profile").get(protect,getUserProfile).put(protect,updateUserProfile);
router.route("/:id").delete(protect,admin,deleteUser).get(protect,admin,getUserById).put(protect,admin,updateUser);





export default router;