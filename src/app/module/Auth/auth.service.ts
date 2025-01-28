import { User } from "../User/user.model";
import { TLoginUser } from "./auth.interface";

const loginUser = async(payload: TLoginUser) => {
  const isUserExists = await User.findOne({id: payload?.id})
  if(!isUserExists){
throw new AppError
  }
    console.log(payload)
  return {};
};

export const AuthServices = {
  loginUser,
};
