import { Router } from "express";
import { 
    createTask,
    deleteTask,
    getAllTasks,
    getCompletedTasks,
    getPendingTasks,
    toggleTaskStatus,
 } from "../controllers/ task.controller.js";
 import { protect } from "../middleware/auth.middleware.js";

 const router = Router();

 router.use(protect);

router.post("/", createTask);
router.get("/", getAllTasks);
router.get("/pending", getPendingTasks);
router.get("/completed", getCompletedTasks);
router.patch("/:id", toggleTaskStatus);
router.delete("/:id", deleteTask);

export default router;