const React = require('react');

class Alert extends React.Component{
    componentDidMount(){
        $(this.refs.alert).alert();

        setTimeout( ()=>{
            $(this.refs.alert).fadeTo(500, 0).slideUp(500, ()=>{
                $(this).remove();
                this.props.onReset();
            });
        }, 5000);
    }

    render()
    {
        return <div className="alert alert-danger alert-dismissible" role="alert" ref="alert">
            <strong>{this.props.children}</strong>
        </div>
    }
}

module.exports = Alert;
