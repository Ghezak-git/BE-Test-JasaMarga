import * as UserRepository from "../repositories/UserRepository.js";
import excel from "exceljs";


export const ImportUser = async (req, res) => {
    try {
        let data = [];
        const user = await UserRepository.findAll();
        
        user.forEach((item) => {
            data.push({
                id: item.id,
                fullname: item.fullname,
                username: item.username,
                password: item.password,
            })
        });

        let workbook = new excel.Workbook();
        let worksheet = workbook.addWorksheet("User");

        // Define header style
        const headerStyle = {
            fill: {
                type: "pattern",
                pattern: "solid",
                fgColor: { argb: "FFA500" }, // Orange color
            },
            font: {
                bold: true,
            },
            border: {
                top: { style: "thin" },
                left: { style: "thin" },
                bottom: { style: "thin" },
                right: { style: "thin" },
            },
        };
    
        // Define data cell style
        const dataCellStyle = {
            border: {
                top: { style: "thin" },
                left: { style: "thin" },
                bottom: { style: "thin" },
                right: { style: "thin" },
            },
        };
    
        // Apply header style
        worksheet.columns = [
            { header: "ID", key: "id", width: 5 },
            { header: "Fullname", key: "fullname", width: 30 },
            { header: "Username", key: "username", width: 30 },
            { header: "Password", key: "password", width: 80 },
        ];
    
        // Apply header style to each cell in the first row
        worksheet.getRow(1).eachCell((cell) => {
            cell.fill = headerStyle.fill;
            cell.font = headerStyle.font;
            cell.border = headerStyle.border;
        });
    
        // Add data rows
        user.forEach((user) => {
            const row = worksheet.addRow([
                user.id,
                user.fullname,
                user.username,
                user.password,
            ]);
            row.eachCell((cell) => {
                cell.border = dataCellStyle.border;
            });
        });

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=" + "User.xlsx"
        );

        return workbook.xlsx.write(res).then(function () {
            res.status(200).end();
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: 'Server error please try again later' });
    }
}