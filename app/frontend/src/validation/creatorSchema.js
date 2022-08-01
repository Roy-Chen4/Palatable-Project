import * as yup from "yup";

const validationCreator = {
    recipetitle: yup
        .string()
        .required("Title is required"),
    ingredients: yup
        .string()
        .required("Ingredients are required"),
    instructions: yup
        .string()
        .required("Instructions are required"),
};

export default validationCreator;
