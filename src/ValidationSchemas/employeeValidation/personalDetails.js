import * as yup from 'yup';

export const personalDetailsValidation = yup.object().shape({
    name: yup.string().required('Name is required'),
    phoneNumber: yup.string().required('Phone number is required').matches(/^\d{10}$/, 'Phone number must be 10 digits'),
    alternativePhoneNumber: yup.string().matches(/^\d{10}$/, 'Alternative phone number must be 10 digits'),
    age: yup.number().required('Age is required').positive('Age must be a positive number').integer('Age must be an integer'),
    gender: yup.string().required('Gender is required'),
    address: yup.string().required('Address is required'),
});
