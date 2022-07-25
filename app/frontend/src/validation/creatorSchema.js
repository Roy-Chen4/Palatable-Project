import * as yup from "yup";

const validationCreator = {
    recipetitle: yup
        .string()
        .required("Title is required"),
};

export default validationCreator;
