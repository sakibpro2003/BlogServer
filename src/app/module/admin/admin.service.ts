import { User } from "../User/user.model";

type TBlockPayload = {
  isBlocked: boolean;
};

const blockUserIntoDB = async (id: string, payload: TBlockPayload) => {
  try {
    // Find user by the `id` field (string) instead of `_id`
    const result = await User.findOneAndUpdate({ id }, payload, { new: true });

    if (!result) {
      throw new Error("User not found");
    }

    return result;
  } catch (error) {
    console.error("Error blocking user:", error);
    throw error;
  }
};

export const AdminServices = {
  blockUserIntoDB,
};
