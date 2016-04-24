import React from 'react'

const AddressBlock = React.createClass({
    componentDidMount(){
        this.props.updateUri(this.props.endpoint, this.props.params);
    },
    componentWillReceiveProps(newParams){
        this.props.updateUri(newParams.endpoint, newParams.params);
    },
    shouldComponentUpdate(nextProps){
        const { 
            fields: {
                uriWithParams 
            }, 
            method, 
            params, 
            lastParamsUpdate 
        } = this.props;
        return method !== nextProps.method
            || uriWithParams !== nextProps.uriWithParams
            || JSON.stringify(params) !== JSON.stringify(nextProps.params)
            || lastParamsUpdate !== nextProps.lastParamsUpdate;
    },
    render() {
        const {
            fields: {
                uriWithParams
            },
            method,
            methods
        } = this.props;
        return (
            <div className="address-block">
                <div className="input-group">
                    <div className="input-group-btn">
                        <select className="form-control" {...method}>
                            {methods.map(m => <option value={m} key={m}>{m}</option>)}
                        </select>
                    </div>
                    <input type="text" className="form-control" title={uriWithParams.value} {...uriWithParams}/>
                </div>
            </div>
        )
    }
});

export default AddressBlock;