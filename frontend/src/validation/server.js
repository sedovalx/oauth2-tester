import yup from 'yup'
import { polyfill } from 'es6-promise'; polyfill();

export const serverSchema = yup.object({
    name:           yup.string().required().label("Name"),
    authEndpoint:   yup.string().transform((value) => value === "" ? null : value).url().nullable().label("Authorization endpoint"),
    tokenEndpoint:  yup.string().transform((value) => value === "" ? null : value).url().nullable().label("Token endpoint"),
    clientID:       yup.string().required().label("Client ID"),
    clientSecret:   yup.string().required().label("Client secret")
});

export default function(fields) {
    return new Promise(function(resolve, reject){
        serverSchema.validate(fields, { abortEarly: false }, function(err, value){
            if (err == null) {
                resolve(value);
            } else {
                let errors = err.inner.reduce(function(total, current){
                    total[current.path] = current.message;
                    return total;
                }, {});
                reject(errors);
            }
        })
    });
}