import yup from 'yup'
import validator from 'validation/validator'

export const settingsSchema = yup.object({
    flows: yup.object().shape({
        current: yup.object().shape({
            code: yup.string().required(),
            desc: yup.string().required()
        }).nullable(),
        items: yup.array().required()
    }).required(),
    credentials: yup.object().shape({
        username: yup.string().nullable(),
        password: yup.string().nullable()
    }).required()
});

export default validator(settingsSchema)
