import React from "react";

class Card extends React.Component {
    render(){
        return (
            <div className="card mb-3">
                <div className="card-header">{this.props.title}</div>
                <div className="card-body">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Card

