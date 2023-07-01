import { Sequelize, DataTypes } from "sequelize";
import db from "../initializers/Database.js";

const RuasModel = db.define('ruas', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ruas: {
        type: DataTypes.STRING,
    },
    km_awal: {
        type: DataTypes.STRING,
    },
    km_akhir: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    },
    created_by: {
        type: DataTypes.STRING,
    },
    updated_by : {
        type: DataTypes.STRING,
    },
    created_at : {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updated_at : {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
}, {
    tableName: 'ruas',
    timestamps: false,
});

const RuasCoordinatesModel = db.define('ruas_coordinates', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    ruas_id: {
        type: DataTypes.INTEGER,
    },
    coordinates: {
        type: DataTypes.STRING,
    },
    created_by: {
        type: DataTypes.STRING,
    },
    updated_by : {
        type: DataTypes.STRING,
    },
    created_at : {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updated_at : {
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
}, {
    tableName: 'ruas_coordinates',
    timestamps: false,
});

RuasModel.hasMany(RuasCoordinatesModel, {foreignKey: 'ruas_id', sourceKey: 'id', as: 'coordinates'});

export const Ruas = RuasModel;
export const RuasCoordinates = RuasCoordinatesModel;
