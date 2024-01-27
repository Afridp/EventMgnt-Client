import * as yup from 'yup'



export const signinValidation = yup.object().shape({
    signinDetails: yup.string().required("Required"),
    password: yup.string().min(5).required("Required"),
})