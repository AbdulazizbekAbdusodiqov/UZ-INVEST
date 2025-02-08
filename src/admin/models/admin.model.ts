import { Column, DataType, Model, Table } from "sequelize-typescript";

interface IAdminCreationAttr{
    first_name:string;
    last_name:string;
    user_name:string;
    phone_number:string;
    email:string;
    hashed_password:string;
    is_active:boolean;
    activation_link:string;
    is_creator:boolean;
    hashed_refresh_token:string;
} 

@Table({tableName:'admin'})
export class Admin extends Model<Admin, IAdminCreationAttr> {
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true
    })
    id: number;
    
    @Column({
        type:DataType.STRING
    })
    first_name:string;
    
    @Column({
        type:DataType.STRING
    })
    last_name:string;
    
    @Column({
        type:DataType.STRING
    })
    user_name:string;
    
    @Column({
        type:DataType.STRING
    })
    phone_number:string;
    
    @Column({
        type:DataType.STRING
    })
    email:string;
    
    @Column({
        type:DataType.STRING
    })
    hashed_password:string;
    
    @Column({
        type:DataType.BOOLEAN
    })
    is_active:boolean;
    
    @Column({
        type:DataType.STRING
    })
    activation_link:string;
    
    @Column({
        type:DataType.BOOLEAN
    })
    is_creator:boolean;
    
    @Column({
        type:DataType.STRING
    })
    hashed_refresh_token:string;
    
}
