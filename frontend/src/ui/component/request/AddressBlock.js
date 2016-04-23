import React from 'react'

const AddressBlock = React.createClass({
    shouldComponentUpdate(nextProps){
        return this.props.method !== nextProps.method || this.props.endpoint !== nextProps.endpoint;
    },
    render() {
        const {
            method,
            endpoint,
            methods
        } = this.props;
        return (
            <div className="address-block form-group">
                <div className="input-group">
                    <div className="input-group-btn">
                        <select className="form-control" {...method}>
                            {methods.map(m => <option value={m} key={m}>{m}</option>)}
                        </select>
                    </div>
                    <input type="text" className="form-control" {...endpoint}/>
                </div>
            </div>
        )
    }
});

export default AddressBlock;