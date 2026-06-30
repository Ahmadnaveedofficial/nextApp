import UserModel from "@/models/user.model";

export const generateAccessAndRefreshToken = async (userId: string) => {
  const user = await UserModel.findById(userId);

  if (!user) {
    throw new Error("User not found");
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  user.refreshToken = refreshToken;

  await user.save({ validateBeforeSave: false });

  return {
    accessToken,
    refreshToken,
  };
};
