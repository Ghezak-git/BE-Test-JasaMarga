import User from "../models/User.js";

export const findOne = async (where) => {
    try {
        const user = await User.findOne({ where });
        return user;
    } catch (error) {
        throw new Error("Failed to find user");
    }
}

export const findAll = async () => {
    try {
        const user = await User.findAll();
        return user;
    } catch (error) {
        throw new Error("Failed to find user");
    }
}

export const update = async (data, where) => {
    try {
        const user = await User.update(data, { where });
        return user;
    } catch (error) {
        throw new Error("Failed to update user");
    }
}

export const create = async (data) => {
    try {
        const user = await User.create(data);
        return user;
    } catch (error) {
        throw new Error("Failed to create user");
    }
}