import * as yup from 'yup'


const matchPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;



export const signupValidation = yup.object().shape({
    username: yup.string().label("Enter the Name").test('whitespace', 'Name cannot be whitespace only', (value) => {
        if (value) {

            return !(/^\s+$/.test(value));
        }
        return true;
    })
        .required("Required"),
    cemail: yup.string().email("Enter the valid email").required("Requried"),
    cmobile: yup.string()
        .matches(/^[0-9]+$/, 'Must be only digits')
        .min(10, 'Must be exactly 10 digits')
        .max(10, 'Must be exactly 10 digits')
        .required('Required'),

    password: yup.string().min(5).matches(matchPass, { message: 'Please create strong password' }).required("Required"),
    cpassword: yup.string().oneOf([yup.ref("password"), null], "password must match").required("Required")
})