import React from 'react'

const AddressBlock = React.createClass({
    render() {
        const {
            method,
            uri
        } = this.props;
        const httpMethods = this.props.httpMethods || [];
        return (
            <div className="address-block container-fluid">
                <div className="row">
                    <div className="input-group">
                        <div className="input-group-btn">
                            <select className="form-control" {...method}>  
                                {httpMethods.map(m => <option value={m} key={m}>{m}</option>)}
                            </select>
                        </div>
                        <input type="text" className="form-control" {...uri}/>
                    </div>
                </div>
            </div>
        )
    }
});

export default AddressBlock;