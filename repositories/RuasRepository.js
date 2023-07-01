import { Ruas, RuasCoordinates } from "../models/Ruas.js";

export const findAll = async (condition, sortColumn, sort, limit, offset) => {
    try {
        const ruas = await Ruas.findAll({
            include: {
                model: RuasCoordinates,
                as: 'coordinates',
                required: false,
            },
            order: [[sortColumn, sort]],
            limit,
            offset,
            where: condition,
        });
        return ruas;
    } catch (error) {
        throw error;
    }
}

export const count = async (condition) => {
    try {
        const ruas = await Ruas.count({
            where: condition,
        });
        return ruas;
    } catch (error) {
        throw new Error("Failed to count Ruas");
    }
}

export const findById = async (where) => {
    try {
        const ruas = await Ruas.findByPk(where, {
            include: {
                model: RuasCoordinates,
                as: 'coordinates',
                required: false,
            },
        });
        return ruas;
    } catch (error) {
        throw new Error("Failed to find Ruas");
    }
}

export const create = async (payload) => {
    try {
        const ruas = await Ruas.create(payload);
        return ruas;
    } catch (error) {
        throw new Error("Failed to create Ruas");
    }
}

export const createDetail = async (payload) => {
    try {
        const ruas = await RuasCoordinates.bulkCreate(payload);
        return ruas;
    } catch (error) {
        throw new Error("Failed to create Ruas Detail");
    }
}

export const update = async (where, payload) => {
    try {
        const ruas = await Ruas.update(payload, {
            where: where,
        });
        return ruas;
    } catch (error) {
        throw error;
    }
}

export const updateDetail = async (where, payload) => {
    try {
        const ruas = await RuasCoordinates.update(payload, {
            where: where,
        });
        return ruas;
    } catch (error) {
        throw error;
    }
}

export const destroy = async (where) => {
    try {
        const ruas = await Ruas.destroy({
            where: where,
        });
        return ruas;
    } catch (error) {
        throw new Error("Failed to delete Ruas");
    }
} 

export const destroyDetailNotIn = async (where, notIn) => {
    try {
        const ruas = await RuasCoordinates.destroy({
            where: where,
            notIn: notIn,
        });
        return ruas;
    } catch (error) {
        throw new Error("Failed to delete Ruas Detail");
    }
}

export const destroyDetail = async (where) => {
    try {
        const ruas = await RuasCoordinates.destroy({
            where: where,
        });
        return ruas;
    } catch (error) {
        throw new Error("Failed to delete Ruas Detail");
    }
}