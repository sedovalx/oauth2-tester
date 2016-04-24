import React from 'react'
import Icon from 'react-fa'
import ServerListContainer from 'container/ServerListContainer'

const ServerListPanel = React.createClass({
   render(){
       return (
           <div className="servers panel panel-default">
               <div className="panel-heading">
                   <h3 className="panel-title">Select a server <Icon name="hand-o-down"/> Then push the blue button <Icon name="hand-o-right"/></h3>
               </div>
               <div className="content">
                   <ServerListContainer />
               </div>
           </div>
       )
   }
});

export default ServerListPanel;
