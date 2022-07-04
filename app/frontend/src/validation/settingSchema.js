import * as yup from "yup";

const validationSettings = {
    toggle: yup.boolean(),
    email: yup
        .string().when('toggle', {
            is: true,
            then: yup.string()
                .email("Enter a valid email")
                .required("Email is required")
        }),
    password1: yup
        .string().when('toggle', {
            is: false,
            then: yup.string()
                .min(8, "Password must contain at least 8 characters")
                .required("Enter your password")
        }),
        
    password2: yup
        .string().when('toggle', {
            is: false,
            then: yup.string()
                .min(8, "Password must contain at least 8 characters")
                .required("Enter your password")
        }),
};

export default validationSettings;
