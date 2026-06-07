import { Router } from "express";
import { LogController } from "./log.controller.ts";
import auth from "../../utils/auth.ts";

const router = Router();

router.get("/actions", auth(), LogController.getActionLogs);
router.get("/errors", auth(), LogController.getErrorLogs);

export const LogRouter = router;
