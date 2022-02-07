import React, { Component } from 'react';

class CitySearch extends Component {
    state = { 
        query : '',
        suggestions: []
    } 

    handleInputChange = e => {
        const { value } = e.target;

        const suggestions = this.props.locations.filter((location) => {
                return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
            });

        this.setState({
            query: value,
            suggestions,
        })
    }

    handleItemClicked = suggestion => {
        this.setState({
            query: suggestion
        });
    }
    
    render() { 
        return (
            <div className="CitySearch">
                <input
                    type="text"
                    className="city"
                    name="query"
                    value={this.state.query}
                    onChange={this.handleInputChange}
                />
                <ul className="suggestions">
                    {
                        this.state.suggestions.map((suggestion) => (
                            <li 
                                onClick={ () => this.handleItemClicked(suggestion)}
                                key={suggestion}>
                                {suggestion}
                            </li>
                        ))
                    }
                    <li key='all'>
                        <b>See All Cities</b>
                    </li>
                </ul>
            </div>
        );
    }
}
 
export default CitySearch;