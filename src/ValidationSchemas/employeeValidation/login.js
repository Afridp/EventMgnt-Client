import * as yup from 'yup';

export const loginValidation = yup.object().shape({
    employeeId: yup.string()
        .matches(/^EM\d{5}$/, 'Employee ID must be in the format "EM" followed by 5 digits')
        .required('Employee ID is required'),
    password: yup.string()
        .min(6, 'Password must be at least 6 characters long')
        .required('Password is required'),
});
