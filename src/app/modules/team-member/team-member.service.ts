import type { TeamMember } from "../../../generated/prisma/index.js";
import prisma from "../../utils/prismaClient.ts";
const createTeamMember = async (payload: Partial<TeamMember>) => {
  const lastMember = await prisma.teamMember.findFirst({
    orderBy: {
      serial: "desc",
    },
    select: {
      serial: true,
    },
  });

  const nextSerial = lastMember ? lastMember.serial + 1 : 1;

  const result = await prisma.teamMember.create({
    data: {
      ...payload,
      serial: nextSerial,
    } as any,
  });
  return result;
};

const getAllTeamMembers = async () => {
  const result = await prisma.teamMember.findMany({
    where: {
      isActive: true,
    },
    include: {
      image: true,
    },
    orderBy: [
      {
        serial: "asc",
      },
      {
        createdAt: "desc",
      },
    ],
  });
  return result;
};

const getSingleTeamMember = async (id: string) => {
  const result = await prisma.teamMember.findUnique({
    where: { id },
    include: {
      image: true,
    },
  });
  return result;
};

const updateTeamMember = async (id: string, payload: Partial<TeamMember>) => {
  const result = await prisma.teamMember.update({
    where: { id },
    data: payload as any,
  });
  return result;
};

const deleteTeamMember = async (id: string) => {
  const result = await prisma.teamMember.delete({
    where: { id },
  });
  return result;
};

export const TeamMemberService = {
  createTeamMember,
  getAllTeamMembers,
  getSingleTeamMember,
  updateTeamMember,
  deleteTeamMember,
};
