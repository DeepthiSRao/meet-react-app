import React, { Component } from 'react';

class Alert extends Component {
    constructor(props){
        super(props);
        this.color = null;
        this.fontSize = null;
    }

    getStyle = () => {
        return {
            color: this.color
        };
    }

    render() { 
        return (
            <div className={this.props.text === "" ? 'alert' : 'alert show'} >
                <p style={this.getStyle()}>{this.props.text}</p>
            </div>
        );
    }
}

class InfoAlert extends Alert {
    constructor(props){
        super(props);
        this.color = 'blue';
    }

    getStyle = () => {
        return {
            color: this.color,
            fontSize: '1.2rem',
        }
    }
}

class ErrorAlert extends Alert {
    constructor(props){
        super(props);
        this.color = 'red';
    }

    getStyle = () => {
        return {
            color: this.color,
            fontWeight: 'bold',
        }
    }
}

class WarningAlert extends Alert {
    constructor(props){
        super(props);
        this.color = 'orange';
    }

    getStyle = () => {
        return {
            color: this.color,
            fontStyle: 'italic',
        }
    }
}

export { InfoAlert, ErrorAlert, WarningAlert };