import { connect } from 'react-redux'
import AddressBlock from 'component/request/AddressBlock'

const mapStateToProps = state => ({
    methods: state.refs.httpMethods.items
});

export default connect(
    mapStateToProps 
)(AddressBlock);