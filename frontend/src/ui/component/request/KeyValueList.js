import React    from 'react'
import Icon     from 'react-fa'

function addElement(elements, clickedIdx) {
    if (clickedIdx === elements.length - 1) {
        elements.addField()
    }
}

function stripItems(items) {
    return items.filter(i => i.key && i.value).map(i => ({ key: i.key.value, value: i.value.value }));
}

const KeyValueList = React.createClass({
    render(){
        const {
            keyPlaceholder,
            items,
            isVisible,
            onItemsChange
        } = this.props;
        return isVisible && (
            <div className="key-value-list">
                {items.map((pair, idx) => (
                    <div key={idx} className="form-inline key-value-line">
                        <input type="text" className="form-control key" {...pair.key}
                               placeholder={keyPlaceholder}
                               onClick={() => addElement(items, idx)}
                               onFocus={event => {
                                  pair.key && pair.key.onFocus(event);
                                  addElement(items, idx);
                               }}
                               onBlur={event => {
                                  pair.key.onBlur(event);
                                  const stripped = stripItems(items);
                                  stripped[idx].key = event.target.value;
                                  onItemsChange(stripped);
                               }} />
                        <input type="text" className="form-control value" {...pair.value}
                               placeholder="Value"
                               onClick={() => addElement(items, idx)}
                               onFocus={event => {
                                  pair.value && pair.value.onFocus(event);
                                  addElement(items, idx);
                               }}
                               onBlur={event => {
                                  pair.value.onBlur(event);
                                  const stripped = stripItems(items);
                                  stripped[idx].value = event.target.value;
                                  onItemsChange(stripped);
                               }}
                        />
                        {idx !== items.length - 1 && (
                            <button className="btn btn-default no-borders" type="button" title="Remove"
                                    onClick={() => {
                                        items.removeField(idx);
                                        const stripped = stripItems(items);
                                        stripped.splice(idx, 1);
                                        onItemsChange(stripped);
                                    }}>
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
    items: React.PropTypes.array.isRequired,
    onItemsChange: React.PropTypes.func.isRequired
};

export default KeyValueList;