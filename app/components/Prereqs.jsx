var React = require('react')

/*  all child components   */

var BlockInput = require('./prereqs/BlockInput.jsx');

class Prereqs extends React.Component{
    render(){
        return (
            <div>
                <h1>Prereqs</h1>
                <BlockInput/>
            </div>
        )
    }
}

module.exports = Prereqs;
