
import * as yup from 'yup';


export const personalFormValidation = yup.object().shape({
  name: yup
    .string()
    .required("Please enter your name.")
    .min(3, "Name must be at least 3 characters long."),
  email: yup
    .string()
    .email("Please enter a valid email address.")
    .required("Please enter your email address."),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]+$/, "Please enter a valid phone number.")
    .required("Please enter your phone number."),
  alternativePhoneNumber: yup
    .string()
    .matches(/^[0-9]+$/, "Please enter a valid alternative phone number.")
    .required("Please enter your alternative phone number."),
});



