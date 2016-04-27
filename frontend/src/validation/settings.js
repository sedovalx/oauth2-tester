import yup          from 'yup'
import validator    from '/validation/validator'

export const settingsSchema = yup.object({
    currentFlow: yup.object({
        code: yup.string().required(),
        desc: yup.string().required()
    }).required().label("Selected flow type"),
    username: yup.string()
        .when('currentFlow', {
            is: flow => flow.code === 'RESOURCE_FLOW',
            then: yup.string().required().min(1).max(500).label("User login"),
            otherwise: yup.string().nullable()
        }),
    password: yup.string()
        .when('currentFlow', {
            is: flow => flow.code === 'RESOURCE_FLOW',
            then: yup.string().required().min(1).max(500).label("User password"),
            otherwise: yup.string().nullable()
        })
});

export default validator(settingsSchema)
