import React from 'react'

const AddressBlock = React.createClass({
    render() {
        const {
            fields: {
                fullUri,
                method
            },
            methods,
            onChangeMethod,
            onChangeUri
        } = this.props;
        return (
            <div className="address-block">
                <div className="input-group">
                    <div className="input-group-btn">
                        <select className="form-control" {...method}
                                onChange={event => {
                                    method.onChange(event);
                                    onChangeMethod(event.target.value);
                                }}>
                            {methods.map(m => <option value={m} key={m}>{m}</option>)}
                        </select>
                    </div>
                    <input type="text" className="form-control" {...fullUri}
                           title={fullUri.value}
                           onChange={event => {
                               fullUri.onChange(event);
                               onChangeUri(event.target.value);
                           }} />
                </div>
            </div>
        )
    }
});

export default AddressBlock;