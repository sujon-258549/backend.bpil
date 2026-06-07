import prisma from "../../utils/prismaClient.ts";
import { getIO } from "../../utils/socket.js";
import { sendEmail } from "../../utils/sendEmail.ts";

export const ContactServices = {
  submitContactForm: async (payload: { 
    name: string; 
    email: string; 
    subject: string; 
    message: string;
    phone?: string;
    services?: string[];
    company?: string;
    budget?: string;
  }) => {
    const { name, email, subject, message, phone, services, company, budget } = payload;

    // 1. Save to DB
    const newContact = await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone: phone || null,
        services: services || [],
        company: company || null,
        budget: budget || null,
        message,
        status: "UNREAD",
      }
    });

    const emailHtml = `
      <div style="font-family: Arial, sans-serif;">
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Company:</strong> ${company || 'N/A'}</p>
        <p><strong>Budget:</strong> ${budget || 'N/A'}</p>
        <p><strong>Services Needed:</strong> ${services?.join(", ") || 'N/A'}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      </div>
    `;

    // Send an email to a configured admin address
    const adminEmail = "admin@example.com"; 
    await sendEmail(adminEmail, emailHtml, `New Contact: ${subject}`).catch(err => {
      console.error("Failed to send contact email:", err);
    });

    // Notify Admins
    const admins = await prisma.user.findMany({
      where: { role: { role: { in: ["SUPER_ADMIN", "ADMIN"] } } },
      select: { id: true }
    });

    const notifications = admins.map(admin => ({
      userId: admin.id,
      type: "MESSAGE",
      message: `New contact from ${name} (${email}): ${subject}`,
    }));

    if (notifications.length > 0) {
      await prisma.notification.createMany({ data: notifications });
      try {
        const io = getIO();
        for (const admin of admins) {
          io.to(admin.id).emit("notifications-refresh");
        }
      } catch (err) {}
    }

    return { message: "Contact form submitted successfully", data: newContact };
  },

  getAllContacts: async (query: any) => {
    const { page = 1, limit = 10, sortBy = "createdAt", sortOrder = "desc", searchTerm, status, startDate, endDate } = query;
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;

    const where: any = {};
    if (searchTerm) {
      where.OR = [
        { name: { contains: searchTerm, mode: "insensitive" } },
        { email: { contains: searchTerm, mode: "insensitive" } },
        { message: { contains: searchTerm, mode: "insensitive" } },
      ];
    }
    if (status) {
      where.status = status;
    }
    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(startDate as string);
      if (endDate) where.createdAt.lte = new Date(endDate as string);
    }

    const result = await prisma.contactMessage.findMany({
      where,
      skip,
      take: limitNumber,
      orderBy: { [sortBy as string]: sortOrder as string },
    });
    
    const total = await prisma.contactMessage.count({ where });

    return {
      data: result,
      meta: { page: pageNumber, limit: limitNumber, total }
    };
  },

  updateContactStatus: async (id: string, status: string) => {
    const result = await prisma.contactMessage.update({
      where: { id },
      data: { status }
    });
    return result;
  },

  deleteContact: async (id: string) => {
    const result = await prisma.contactMessage.delete({
      where: { id }
    });
    return result;
  }
};
