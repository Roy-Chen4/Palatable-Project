import * as yup from "yup";

const validationRegister = {
    email: yup
        .string()
        .email("Enter a valid email")
        .required("Email is required"),
    password1: yup
        .string()
        .min(8, "Password must contain at least 8 characters")
        .required("Enter your password"),
    password2: yup
        .string()
        .min(8, "Password must contain at least 8 characters")
        .required("Confirm password"),
};

export default validationRegister;
