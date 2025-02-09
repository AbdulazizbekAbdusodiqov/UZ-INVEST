import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IAdminCreationAttr {
    first_name: string;
    last_name: string;
    user_name: string;
    phone_number: string;
    email: string;
    hashed_password: string;
    activation_link: string;
    hashed_refresh_token: string;
}

@Table({ tableName: 'admin' })
export class Admin extends Model<Admin, IAdminCreationAttr> {
    @ApiProperty({
    })
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    first_name: string;


    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    last_name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    user_name: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    phone_number: string;

    @Column({
        type: DataType.STRING
    })
    email: string;


    @Column({
        type: DataType.STRING
    })
    hashed_password: string;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    is_active: boolean;

    @Column({
        type: DataType.STRING
    })
    activation_link: string;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    is_creator: boolean;

    @Column({
        type: DataType.STRING,
        defaultValue: null
    })
    hashed_refresh_token: string;

}
