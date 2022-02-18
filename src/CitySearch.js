import React, { Component } from 'react';
import { InfoAlert } from './Alert';

class CitySearch extends Component {
    state = { 
        query : '',
        suggestions: [],
        showSuggestions: undefined,
        infoText: ''
    } 

    handleInputChange = e => {
        const { value } = e.target;
        this.setState({showSuggestions: true});

        setTimeout(() => {
        }, 2000);

        const suggestions = this.props.locations.filter((location) => {
            return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        });
        
        if(suggestions.length === 0){
            console.log(value);
            this.setState({
                query: value,
                infoText: 'We cann\'t find the city you are looking for. Please try another city',
            })
        }else{
            this.setState({
                query: value,
                suggestions,
                infoText: '',
            });
        }
    }

    handleItemClicked = suggestion => {
        this.setState({
            query: suggestion,
            suggestions: [],
            showSuggestions: false,
            infoText: ''
        });
        this.props.updateEvents(suggestion);
    }
    
    render() { 
        return (
            <div className="city-search">
                <InfoAlert text={this.state.infoText} />
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