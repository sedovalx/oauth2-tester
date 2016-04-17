import yup from 'yup'
import { polyfill } from 'es6-promise'; polyfill();

export const serverSchema = yup.object().shape({
    name: yup.string().required(),
    authEndpoint: yup.string().url().required(),
    tokenEndpoint: yup.string().url(),
    clientID: yup.string().required(),
    clientSecret: yup.string().required()
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