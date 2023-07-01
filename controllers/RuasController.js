import { getPagination } from "../utils/pagination.js";
import * as RuasRepository from "../repositories/RuasRepository.js";
import { validateRequest } from "../utils/validations.js";
import { Op, Sequelize } from "sequelize";

export const getRuas = async (req, res) => {
    try {
        let { page, perPage, search, sort, sortColumn } = req.body;
        let condition = {};

        page = page || 1;
        perPage = perPage || 10;

        const { limit, offset } = getPagination(page, perPage);

        if (search) {
            condition = Object.assign(condition, { ruas: { [Op.iLike]: Sequelize.literal(`'%${search}%' COLLATE "C"`) } });
        }
        
        sort = sort || 'DESC';
        sortColumn = sortColumn || 'updated_at';

        const ruas = await RuasRepository.findAll(condition, sortColumn, sort, limit, offset);
        const total = await RuasRepository.count(condition);

        res.status(200).json({ data: ruas, total: total });
    } catch (error) {
        res.status(500).json({ message: 'Server error please try again later' });
    }
}

export const getRuasOne = async (req, res) => {
    try {
        const validationConfig = [
            { field: "id", validation: (value, req) => { return true }, min: 1 },
        ]

        try {
            await validateRequest(req, validationConfig);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }

        const { id } = req.body;

        const ruas = await RuasRepository.findById(id);
        if (!ruas) {
            return res.status(404).json({ message: 'Ruas not found' });
        }

        res.status(200).json({ data: ruas });
    } catch (error) {
        res.status(500).json({ message: 'Server error please try again later' });
    }
}

export const createRuas = async (req, res) => {
    try {
        const validationConfig = [
            { field: "ruas", validation: (value, req) => { return true }, min: 4 },
            { field: "km_awal", validation: (value, req) => { return true }, min: 1 },
            { field: "km_akhir", validation: (value, req) => { return true }, min: 1 },
            { field: "status", validation: (value, req) => { return true }, min: 1 },
        ];

        try {
            await validateRequest(req, validationConfig);
        }catch (error) {
            return res.status(400).json({ message: error.message });
        }

        const { ruas, km_awal, km_akhir, status, detail } = req.body;

        const payload = {
            ruas: ruas,
            km_awal: km_awal,
            km_akhir: km_akhir,
            status: status,
            created_by: req.user.username,
            updated_by: req.user.username,
        };


        const ruasData = await RuasRepository.create(payload);
        
        if (detail) {
            const payloadDetail = detail.map(item => ({
                ruas_id: ruasData.id,
                coordinates: item,
                created_by: req.user.username,
                updated_by: req.user.username,
            }));

            await RuasRepository.createDetail(payloadDetail);
        }

        res.status(201).json({ message: 'Ruas created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error please try again later' });
    }
}

export const updateRuas = async (req, res) => {
    try {
        const validationConfig = [
            { field: "id", validation: (value, req) => { return true }, min: 1 },
            { field: "ruas", validation: (value, req) => { return true }, min: 4 },
            { field: "km_awal", validation: (value, req) => { return true }, min: 1 },
            { field: "km_akhir", validation: (value, req) => { return true }, min: 1 },
            { field: "status", validation: (value, req) => { return true }, min: 1 },
        ];
    
        try {
            await validateRequest(req, validationConfig);
        }catch (error) {
            return res.status(400).json({ message: error.message });
        }

        const { id, ruas, km_awal, km_akhir, status, detail } = req.body;

        const ruasData = await RuasRepository.findById(id);
        if (!ruasData) {
            return res.status(404).json({ message: 'Ruas not found' });
        }

        const payload = {
            ruas: ruas,
            km_awal: km_awal,
            km_akhir: km_akhir,
            status: status,
            updated_by: req.user.username,
            updated_at: new Date(),
        };

        await RuasRepository.update({ id: id }, payload);

        if (detail) {
            const ids = detail.map(item => item.id).filter(Boolean);
            await RuasRepository.destroyDetail({ ruas_id: id, id: { [Op.notIn]: ids } });

            const payloadDetail = await Promise.all(detail.map(async item => {
                if (item.id) {
                    await RuasRepository.updateDetail({ id: item.id }, {
                        coordinates: item.coordinates,
                        updated_by: req.user.username,
                        updated_at: new Date(),
                    });
                    return null; // Return null for items with an id to exclude them from the final array
                } else {
                    return {
                        ruas_id: id,
                        coordinates: item.coordinates,
                        created_by: req.user.username,
                        updated_by: req.user.username,
                    };
                }
            }));
            
            const filteredPayload = payloadDetail.filter(item => item !== null);

            await RuasRepository.createDetail(filteredPayload);
        }

        res.status(200).json({ message: 'Ruas updated successfully' });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Server error please try again later' });
    }
}

export const deleteRuas = async (req, res) => {
    try {
        const validationConfig = [
            { field: "id", validation: (value, req) => { return true }, min: 1 },
        ]

        try {
            await validateRequest(req, validationConfig);
        } catch (error) {
            return res.status(400).json({ message: error.message });
        }

        const { id } = req.body;

        await RuasRepository.destroy({ id: id });
        await RuasRepository.destroyDetail({ ruas_id: id });

        res.status(200).json({ message: 'Ruas deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error please try again later' });
    }
}
