import express from "express";
import { TeamMemberController } from "./team-member.controller.ts";
import auth from "../../utils/auth.ts";
import requirePermission from "../../middleware/requirePermission.ts";

const router = express.Router();

router.post("/", auth(), requirePermission("team_members", "create"), TeamMemberController.createTeamMember);
router.get("/", TeamMemberController.getAllTeamMembers);
router.get("/:id", TeamMemberController.getSingleTeamMember);
router.patch("/:id", auth(), requirePermission("team_members", "update"), TeamMemberController.updateTeamMember);
router.delete("/:id", auth(), requirePermission("team_members", "delete"), TeamMemberController.deleteTeamMember);

export const TeamMemberRoutes = router;
