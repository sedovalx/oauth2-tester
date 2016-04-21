export default function(schema) {
    return function(fields) {
        return new Promise(function(resolve, reject){
            schema.validate(fields, { abortEarly: false }, function(err, value){
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
} 
