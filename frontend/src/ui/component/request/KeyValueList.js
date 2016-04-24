import React from 'react'
import Icon from 'react-fa'

function addElement(elements, clickedIdx) {
    if (clickedIdx === elements.length - 1) {
        elements.addField()
    }
}

const KeyValueList = React.createClass({
    render(){
        const {
            keyPlaceholder,
            items,
            isVisible
        } = this.props;
        return isVisible && (
            <div className="key-value-list">
                {items.map((pair, idx) => (
                    <div key={idx} className="form-inline key-value-line">
                        <input type="text" className="form-control key" {...pair.key}
                               placeholder={keyPlaceholder}
                               onClick={() => addElement(items, idx)}
                               onFocus={event => {
                                         pair.key.onFocus(event);
                                         addElement(items, idx);
                                       }}/>
                        <input type="text" className="form-control value" {...pair.value}
                               placeholder="Value"
                               onClick={() => addElement(items, idx)}
                               onFocus={event => {
                                         pair.value.onFocus(event);
                                         addElement(items, idx);
                                       }}
                        />
                        {idx !== items.length - 1 && (
                            <button className="btn btn-default no-borders" type="button" title="Remove" onClick={() => items.removeField(idx)}>
                                <Icon name="trash-o" />
                            </button>
                        )}
                    </div>
                ))}
            </div>
        );
    }
});
KeyValueList.propTypes = {
    keyPlaceholder: React.PropTypes.string,
    isVisible: React.PropTypes.bool,
    items: React.PropTypes.array.isRequired
};

export default KeyValueList;