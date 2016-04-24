import React from 'react'

function buildUri(endpoint, params) {
    let uri = endpoint;
    let filteredParams = params.filter(p => p.key.value);
    if (filteredParams.length) {
        uri += '?';
        filteredParams.forEach(p => {
            uri += `${encodeURIComponent(p.key.value)}=${encodeURIComponent(p.value.value)}&`;
        });
        uri = uri.slice(0, -1);
    }
    return uri;
}

const AddressBlock = React.createClass({
    shouldComponentUpdate(nextProps){
        const {
            method,
            endpoint,
            params,
            lastParamsUpdate
        } = this.props;
        return method !== nextProps.method
            || endpoint !== nextProps.endpoint
            || JSON.stringify(params) !== JSON.stringify(nextProps.params)
            || lastParamsUpdate !== nextProps.lastParamsUpdate;
    },
    render() {
        const {
            method,
            endpoint,
            params,
            methods
        } = this.props;
        const uri = buildUri(endpoint.value || endpoint.initialValue, params);
        return (
            <div className="address-block">
                <div className="input-group">
                    <div className="input-group-btn">
                        <select className="form-control" {...method}>
                            {methods.map(m => <option value={m} key={m}>{m}</option>)}
                        </select>
                    </div>
                    <input type="text" className="form-control" value={uri} title={uri}/>
                </div>
            </div>
        )
    }
});

export default AddressBlock;