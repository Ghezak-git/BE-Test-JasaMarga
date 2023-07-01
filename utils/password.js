
import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        throw new Error("Failed to hash password");
    }
}

export const comparePassword = async (password, hashedPassword) => {
    try {
        const isMatch = await bcrypt.compare(password, hashedPassword);
        return isMatch;
    } catch (error) {
        throw new Error("Failed to compare password");
    }
}