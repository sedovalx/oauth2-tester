import yup from 'yup'
import validator from 'validation/validator'

export const serverSchema = yup.object({
    name:           yup.string().required().label("Name"),
    authEndpoint:   yup.string().required().url().label("Authorization endpoint"),
    tokenEndpoint:  yup.string().transform((value) => value === "" ? null : value).url().nullable().label("Token endpoint"),
    clientID:       yup.string().required().label("Client ID"),
    clientSecret:   yup.string().required().label("Client secret")
});

export default validator(serverSchema)