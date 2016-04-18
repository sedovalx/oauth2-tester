import { connect } from 'react-redux'
import ServerItem from 'component/ServerItem'


const mapStateToProps = (state) => {
    return {
        
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onEdit: () => {

        },
        onDelete: () => {

        }
    };
};

const ServerItemContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(ServerItem);

export default ServerItemContainer
