import { Sequelize, DataTypes } from "sequelize";
import db from "../initializers/Database.js";

const User = db.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fullname : {
        type: DataTypes.STRING,
    },
    username : {
        type: DataTypes.STRING,
    },
    password : {
        type: DataTypes.STRING,
    },
    last_logon : {
        type: DataTypes.DATE,
    },
    refresh_token : {
        type: DataTypes.TEXT,
    },
    created_by : {
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
    tableName: 'user',
    timestamps: false,
});

export default User;