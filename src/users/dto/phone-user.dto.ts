import {  IsPhoneNumber } from 'class-validator';

export class PhoneUserDto {
    @IsPhoneNumber('UZ')
    phone_number: string;
}
