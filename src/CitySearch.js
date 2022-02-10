import React, { Component } from 'react';

class CitySearch extends Component {
    state = { 
        query : '',
        suggestions: [],
        showSuggestions: undefined
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
            query: suggestion,
            showSuggestions: false
        });
        this.props.updateEvents(suggestion);
    }
    
    render() { 
        return (
            <div className="CitySearch">
                <input
                    type="text"
                    className="city"
                    name="query"
                    placeholder="Search for nearest city"
                    value={this.state.query}
                    onChange={this.handleInputChange}
                    onFocus={() => { this.setState({ showSuggestions: true})} }
                />
                <ul className="suggestions" style={this.state.showSuggestions ? {} : {display: 'none'}}>
                    {
                        this.state.suggestions.map((suggestion) => (
                            <li 
                                onClick={ () => this.handleItemClicked(suggestion)}
                                key={suggestion}>
                                {suggestion}
                            </li>
                        ))
                    }
                    <li key='all' onClick={() => this.handleItemClicked("all")}>
                        <b>See All Cities</b>
                    </li>
                </ul>
            </div>
        );
    }
}
 
export default CitySearch;