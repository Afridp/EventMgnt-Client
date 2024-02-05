import * as yup from 'yup'


const matchPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

export const changePasswordValidation = yup.object().shape({
    currentPassword: yup.string().min(5).matches(matchPass, { message: 'Please create strong password' }).required("Required"),
    newPassword: yup.string().min(5).matches(matchPass, { message: 'Please create strong password' }).required("Required"),
    confirmPassword: yup.string().oneOf([yup.ref("newPassword"), null], "Password must match").required("Required")
})