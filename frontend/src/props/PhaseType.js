import React from 'react';

export default React.PropTypes.shape({
   name: React.PropTypes.string.isRequired,
   desc: React.PropTypes.string,
   content: React.PropTypes.object
});
