import yup from 'yup'
import validator from 'validation/validator'

export const settingsSchema = yup.object({
    currentFlow: yup.string().required().label("Selected flow type"),
    username: yup.string()
        .when('currentFlow', {
            is: 'RESOURCE_FLOW',
            then: yup.string().required().min(1).max(500).label("User login"),
            otherwise: yup.string().nullable()
        }),
    password: yup.string()
        .when('currentFlow', {
            is: 'RESOURCE_FLOW',
            then: yup.string().required().min(1).max(500).label("User password"),
            otherwise: yup.string().nullable()
        })
});

export default validator(settingsSchema)
