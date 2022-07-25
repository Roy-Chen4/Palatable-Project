import * as yup from "yup";

const validationCreator = {
    title: yup
        .string()
        .required("Title is required"),
};

export default validationCreator;
