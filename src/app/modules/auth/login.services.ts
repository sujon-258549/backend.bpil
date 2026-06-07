import ApiError from "../../middleware/apiError.ts";
import status from "http-status";
import prisma from "../../utils/prismaClient.ts";
import { getIO } from "../../utils/socket.js";
import { JwtHelpers } from "../../utils/jwtHelpers.ts";
import config from "../../config/index.ts";
import argon2 from "argon2";
import { sendEmail, otpEmailTemplate } from "../../utils/sendEmail.ts";
import { derivePermissionRows } from "../../utils/userPermissions.ts";
import axios from "axios";

const loginUser = async (payload: any) => {
  const user = await prisma.user.findUnique({
    where: { email: payload.email },
    include: {
      role: { include: { rolePermissions: true } },
      profile: {
        include: {
          profilePhoto: true,
        },
      },
      workInfo: true,
      department: true,
      address: true,
    },
  });

  if (!user) {
    throw new ApiError(status.NOT_FOUND, "User not found");
  }

  if (user.isBlocked) {
    throw new ApiError(status.UNAUTHORIZED, "🔍❓ User is blocked");
  }

  if (user.isDeleted) {
    throw new ApiError(status.UNAUTHORIZED, "🔍❓ User is deleted");
  }

  if (!user.isActive) {
    throw new ApiError(status.UNAUTHORIZED, "🔍❓ User is not active");
  }

  // Parse request details
  const userAgentString = payload.userAgent || "";
  let ipAddress = payload.ipAddress || "unknown";
  
  if (Array.isArray(ipAddress)) {
    ipAddress = ipAddress[0];
  }
  if (ipAddress.includes(",")) {
    ipAddress = ipAddress.split(",")[0].trim();
  }
  
  // Resolve Location
  let locationData = { city: "Unknown", country: "Unknown" };
  try {
    if (ipAddress !== "unknown" && ipAddress !== "::1" && ipAddress !== "127.0.0.1") {
      const response = await axios.get(`http://ip-api.com/json/${ipAddress}`);
      if (response.data && response.data.status === "success") {
        locationData.city = response.data.city;
        locationData.country = response.data.country;
      }
    }
  } catch (error) {
    console.error("Failed to resolve IP location:", error);
  }

  let osName = "Unknown OS";
  let osVersion = "Unknown";
  let browserName = "Unknown Browser";
  let browserVersion = "Unknown";
  let deviceTypeStr = "Desktop";

  const uaLower = userAgentString.toLowerCase();
  if (uaLower.includes("windows")) osName = "Windows";
  else if (uaLower.includes("mac")) osName = "MacOS";
  else if (uaLower.includes("linux")) osName = "Linux";
  else if (uaLower.includes("android")) { osName = "Android"; deviceTypeStr = "Mobile"; }
  else if (uaLower.includes("iphone") || uaLower.includes("ipad")) { osName = "iOS"; deviceTypeStr = "Mobile"; }

  if (uaLower.includes("chrome") && !uaLower.includes("edg")) browserName = "Chrome";
  else if (uaLower.includes("safari") && !uaLower.includes("chrome")) browserName = "Safari";
  else if (uaLower.includes("firefox")) browserName = "Firefox";
  else if (uaLower.includes("edg")) browserName = "Edge";

  if (user.loginTryCount >= 5) {
    if (!user.isBlocked) {
      await prisma.user.update({
        where: { id: user.id },
        data: { isBlocked: true },
      });
    }
    throw new ApiError(
      status.UNAUTHORIZED,
      "🔍❓ Your account has been blocked due to too many failed login attempts. Please contact an admin.",
    );
  }

  if (!user.password) {
    throw new ApiError(
      status.UNAUTHORIZED,
      "🔍❓ Account has no password set — use Forgot Password",
    );
  }
  const isPasswordCorrect = await argon2.verify(
    user.password,
    payload.password,
  );

  if (!isPasswordCorrect) {
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: { loginTryCount: { increment: 1 }, loginTryTime: new Date() },
    });

    // Log Failed Attempt
    await prisma.loginHistory.create({
      data: {
        userId: user.id,
        status: "FAILED",
        failureReason: "Invalid Password",
        ipAddress,
        location: `${locationData.city}, ${locationData.country}`,
        city: locationData.city,
        country: locationData.country,
        userAgent: userAgentString,
        browser: browserName,
        browserVersion: browserVersion,
        os: osName,
        osVersion: osVersion,
        deviceType: deviceTypeStr,
        isActive: false
      }
    });

    if (updatedUser.loginTryCount >= 5) {
      await prisma.user.update({
        where: { id: user.id },
        data: { isBlocked: true },
      });
      throw new ApiError(status.UNAUTHORIZED, "🔍❓ Your account has been blocked due to too many failed login attempts.");
    }
    throw new ApiError(status.UNAUTHORIZED, "🔍❓ Password is incorrect");
  }

  // Update active sessions logic handled by previous code 
  // We'll replace the old loginCount increment with the accurate count later in the function.
  await prisma.user.update({
    where: { id: user.id },
    data: {
      lastLogin: new Date(),
      loginTryCount: 0,
      loginTryTime: null,
    },
  });

  // 1. Create LoginHistory first (without refreshToken initially)
  const loginHistory = await prisma.loginHistory.create({
    data: {
      userId: user.id,
      ipAddress,
      userAgent: userAgentString,
      os: osName,
      browser: browserName,
      deviceType: deviceTypeStr,
      isActive: true,
      refreshToken: "", // Will update shortly
      status: "SUCCESS",
      location: `${locationData.city}, ${locationData.country}`,
      city: locationData.city,
      country: locationData.country,
    }
  });

  const payloadData = {
    id: user.id,
    email: user.email,
    role: user.role?.role,
    mobile: user.mobile,
    isBlocked: user.isBlocked,
    isDeleted: user.isDeleted,
    isVerified: user.isVerified,
    isActive: user.isActive,
    passwordChanged: user.passwordChanged,
    passwordChangeTime: user.passwordChangeTime,
    loginTryCount: user.loginTryCount,
    loginTryTime: user.loginTryTime,
    lastLogin: user.lastLogin,
    loginCount: user.loginCount,
    sessionId: loginHistory.id,
  };

  const accessToken = JwtHelpers.generateToken(
    payloadData,
    config.accessSecret as string,
    config.accessExpire as string,
  );
  const refreshToken = JwtHelpers.generateToken(
    payloadData,
    config.refreshSecret as string,
    config.refreshExpire as string,
  );

  // Update history with the correct refreshToken
  await prisma.loginHistory.update({
    where: { id: loginHistory.id },
    data: { refreshToken }
  });

  // Send Email Notification
  if (user.email) {
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #0056b3;">New Login Detected</h2>
        <p>Hello ${user.profile?.name || user.email},</p>
        <p>We noticed a new login to your account. If this was you, no further action is required.</p>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <ul style="list-style-type: none; padding: 0;">
            <li><strong>Device:</strong> ${deviceTypeStr}</li>
            <li><strong>OS:</strong> ${osName}</li>
            <li><strong>Browser:</strong> ${browserName}</li>
            <li><strong>Location:</strong> ${locationData.city}, ${locationData.country}</li>
            <li><strong>IP Address:</strong> ${ipAddress}</li>
            <li><strong>Time:</strong> ${new Date().toLocaleString()}</li>
          </ul>
        </div>
        <p>If you did not authorize this login, please <strong>change your password immediately</strong> and contact your administrator.</p>
        <p>Thank you,</p>
        <p><strong>Your Security Team</strong></p>
      </div>
    `;

    sendEmail(user.email, emailHtml, "Security Alert: New Login Detected").catch(err => {
      console.error("Failed to send login alert email:", err);
    });
  }

  // Create In-App Notification for Login
  try {
    await prisma.notification.create({
      data: {
        userId: user.id,
        type: "SECURITY",
        message: `New login detected from ${osName} on ${browserName} (${ipAddress}).`,
      }
    });

    const io = getIO();
    io.to(user.id).emit("notifications-refresh");
  } catch (err) {
    console.error("Failed to create login notification:", err);
  }

  // Calculate total active sessions for the user
  const activeSessionsCount = await prisma.loginHistory.count({
    where: { userId: user.id, isActive: true }
  });

  await prisma.user.update({
    where: { id: user.id },
    data: {
      loginCount: activeSessionsCount
    }
  });

  return {
    accessToken,
    refreshToken,
    user: {
      id: user.id,
      email: user.email,
      mobile: user.mobile,
      name: user.profile?.name,
      photo: user.profile?.profilePhoto?.url,
      role: user.role?.role,
      gender: user.profile?.gender,
      bloodGroup: user.profile?.bloodGroup,
      age: user.profile?.age,
      designation: user.workInfo?.experience,
      department: user.department?.name,
      address: user.address,
      workInfo: {
        ...user.workInfo,
      },
      isActive: user.isActive,
      isVerified: user.isVerified,
      isBlocked: user.isBlocked,
      isDeleted: user.isDeleted,
      permissions: derivePermissionRows(user.role),
    },
    isLogin: true,
  };
};

const refreshToken = async (token: string) => {
  const decoded = JwtHelpers.verifyToken(token, config.refreshSecret as string);

  const { email, iat } = decoded?.data || (decoded as any);
  
  // check if user exist
  const user = await prisma.user.findUniqueOrThrow({
    where: { email: email },
    include: {
      role: { include: { rolePermissions: true } },
      profile: {
        include: {
          profilePhoto: true,
        },
      },
      workInfo: true,
      department: true,
      address: true,
    },
  });

  if (
    user.passwordChangeTime &&
    Math.floor(new Date(user.passwordChangeTime).getTime() / 1000) > iat
  ) {
    throw new ApiError(
      status.UNAUTHORIZED,
      "🔍❓ Password recently changed. Please login again.",
    );
  }

  console.log(user);

  if (!user) {
    throw new ApiError(status.NOT_FOUND, "🔍❓ User not Found");
  }

  const activeHistory = await prisma.loginHistory.findFirst({
    where: { refreshToken: token, isActive: true }
  });

  if (!activeHistory) {
    throw new ApiError(status.UNAUTHORIZED, "🔍❓ Session expired or logged out");
  }

  const payloadData = {
    id: user.id,
    email: user.email,
    role: user.role?.role,
    mobile: user.mobile,
    isBlocked: user.isBlocked,
    isDeleted: user.isDeleted,
    isVerified: user.isVerified,
    isActive: user.isActive,
    passwordChanged: user.passwordChanged,
    passwordChangeTime: user.passwordChangeTime,
    loginTryCount: user.loginTryCount,
    loginTryTime: user.loginTryTime,
    lastLogin: user.lastLogin,
    loginCount: user.loginCount,
    sessionId: activeHistory.id,
  };

  const accessToken = JwtHelpers.generateToken(
    payloadData,
    config.accessSecret as string,
    config.accessExpire as string,
  );
  const newRefreshToken = JwtHelpers.generateToken(
    payloadData,
    config.refreshSecret as string,
    config.refreshExpire as string,
  );

  await prisma.loginHistory.update({
    where: { id: activeHistory.id },
    data: { refreshToken: newRefreshToken, updatedAt: new Date() }
  });

  return {
    accessToken,
    refreshToken: newRefreshToken,
    user: {
      id: user.id,
      email: user.email,
      mobile: user.mobile,
      name: user.profile?.name,
      photo: user.profile?.profilePhoto?.url,
      role: user.role?.role,
      gender: user.profile?.gender,
      bloodGroup: user.profile?.bloodGroup,
      age: user.profile?.age,
      designation: user.workInfo?.experience,
      department: user.department?.name,
      address: user.address,
      workInfo: {
        ...user.workInfo,
      },
      isActive: user.isActive,
      isVerified: user.isVerified,
      isBlocked: user.isBlocked,
      isDeleted: user.isDeleted,
      permissions: derivePermissionRows(user.role),
    },
  };
};

const forgotPassword = async (payload: { email: string }) => {
  const user = await prisma.user.findUniqueOrThrow({
    where: { email: payload.email },
    include: { profile: true },
  });
  if (!user) {
    throw new ApiError(status.NOT_FOUND, "🔍❓ User not Found");
  }

  const generateOtp = Math.floor(100000 + Math.random() * 900000);

  if (!user.email) {
    throw new ApiError(status.BAD_REQUEST, "🔍❓ Account has no email on file");
  }
  const emailData: { name?: string; otp: number } = {
    otp: generateOtp,
  };
  if (user.profile?.name) {
    emailData.name = user.profile.name;
  }

  const otpSent = await sendEmail(
    user.email,
    otpEmailTemplate(emailData),
    "Your OTP Code",
  );

  await prisma.otp.upsert({
    where: { email: user.email },
    update: {
      otpToken: generateOtp.toString(),
      updatedAt: new Date(),
    },
    create: {
      email: user.email,
      otpToken: generateOtp.toString(),
    },
  });
  return { message: "OTP sent to your email" };
};

const resetPassword = async (email: string, password: string, otp: string) => {
  

  const user = await prisma.user.findUniqueOrThrow({
    where: { email: email },
  });
  if (!user) {
    throw new ApiError(status.NOT_FOUND, "🔍❓ User not Found");
  }

  const otpData = await prisma.otp.findUniqueOrThrow({
    where: { email: email },
  });
  if (!otp) {
    throw new ApiError(status.NOT_FOUND, "🔍❓ OTP not Found");
  }

  const expireTime = new Date(otpData.updatedAt).getTime() + 1000 * 60 * 5;

  if (Date.now() > expireTime) {
    throw new Error("OTP expired");
  }

  if (otpData.otpToken !== otp) {
    throw new ApiError(status.BAD_REQUEST, "🔍❓ OTP is incorrect");
  }

  const hashedPassword = await argon2.hash(password);
  const updatedUser = await prisma.user.update({
    where: { email: email },
    data: {
      password: hashedPassword,
      passwordChanged: true,
      passwordChangeTime: new Date(),
    },
    include: {
      role: true,
      profile: {
        include: {
          profilePhoto: true,
        },
      },
      workInfo: true,
      department: true,
      address: true,
    },
  });

  const payloadData = {
    id: updatedUser.id,
    email: updatedUser.email,
    role: updatedUser.role?.role,
    mobile: updatedUser.mobile,
    isBlocked: updatedUser.isBlocked,
    isDeleted: updatedUser.isDeleted,
    isVerified: updatedUser.isVerified,
    isActive: updatedUser.isActive,
    passwordChanged: updatedUser.passwordChanged,
    passwordChangeTime: updatedUser.passwordChangeTime,
    lastLogin: updatedUser.lastLogin,
  };

  const accessToken = JwtHelpers.generateToken(
    payloadData,
    config.accessSecret as string,
    config.accessExpire as string,
  );
  const refreshToken = JwtHelpers.generateToken(
    payloadData,
    config.refreshSecret as string,
    config.refreshExpire as string,
  );

  return {
    accessToken,
    refreshToken,
    user: {
      id: updatedUser.id,
      email: updatedUser.email,
      mobile: updatedUser.mobile,
      name: updatedUser.profile?.name,
      photo: updatedUser.profile?.profilePhoto?.url,
      role: updatedUser.role?.role,
      gender: updatedUser.profile?.gender,
      bloodGroup: updatedUser.profile?.bloodGroup,
      age: updatedUser.profile?.age,
      designation: updatedUser.workInfo?.experience,
      department: updatedUser.department?.name,
      address: updatedUser.address,
      workInfo: {
        ...updatedUser.workInfo,
      },
      isActive: updatedUser.isActive,
      isVerified: updatedUser.isVerified,
      isBlocked: updatedUser.isBlocked,
      isDeleted: updatedUser.isDeleted,
    },
    isLogin: true,
  };
};

const logoutUser = async (refreshToken: string) => {
  const history = await prisma.loginHistory.findFirst({
    where: { refreshToken, isActive: true }
  });

  if (history) {
    await prisma.loginHistory.update({
      where: { id: history.id },
      data: {
        isActive: false,
        loggedOutAt: new Date(),
        refreshToken: null
      }
    });

    const activeSessionsCount = await prisma.loginHistory.count({
      where: { userId: history.userId, isActive: true }
    });

    if (history.userId) {
      await prisma.user.update({
        where: { id: history.userId },
        data: { loginCount: activeSessionsCount }
      });
    }
  }
};

export const AuthServices = {
  loginUser,
  refreshToken,
  logoutUser,
  forgotPassword,
  resetPassword,
};
