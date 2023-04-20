import { getAccessToken } from "../middlewares/authorization";
import { encryptPassword, isPasswordMatch } from "../middlewares/passwords";
import userModel, { IUser } from "../models/user.model";


export const registerService = async (user: IUser) => {
    try {
        const encryptedPassword = await encryptPassword(user.password)
        const saved = await userModel.create({ ...user, password: encryptedPassword })
        return { error: false, data: saved };
    } catch (error) {
        return { error: true, data: error }
    }
}

export const loginService = async (email: string, password: string) => {
    try {
        const user = await userModel.findOne({ email: email });
        if (!user) {
            return { error: true, message: "User not found" };
        }
        const _isPasswordMatch = await isPasswordMatch(password, user.password);
        if (!_isPasswordMatch) {
            return { error: true, message: 'Incorrect Password' };
        }

        return {
            error: false,
            message: 'Login successful',
            data: {
                user,
                access_token: getAccessToken(user)
            }
        };
    } catch (error) {
        return { error: true, data: error }
    }
}