import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import { parsePhoneNumberFromString, CountryCode } from 'libphonenumber-js';

@ValidatorConstraint({ name: 'isPhoneNumber', async: false })
export class IsMultiCountryPhoneNumber implements ValidatorConstraintInterface {
    validate(phoneNumber: string) {
        const allowedCountries: CountryCode[] = ['UZ', 'US', 'RU', 'KZ', 'TR'];
        for (const country of allowedCountries) {
            const phone = parsePhoneNumberFromString(phoneNumber, { defaultCountry: country });
            if (phone && phone.isValid()) {
                return true;
            }
        }
        return false;
    }

    defaultMessage() {
        return 'Invalid phone number!';
    }
}
