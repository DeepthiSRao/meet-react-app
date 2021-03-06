import React, { Component } from 'react';
import { InfoAlert } from './Alert';

class CitySearch extends Component {
    state = { 
        query : 'All',
        suggestions: [],
        showSuggestions: undefined,
        infoText: ''
    } 

    handleInputChange = e => {
        const { value } = e.target;
        this.setState({showSuggestions: true});

        const suggestions = this.props.locations.filter((location) => {
            return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        });
        
        if(suggestions.length === 0){
            this.setState({
                query: value,
                infoText: 'We cann\'t find the city you are looking for. Please try another city',
                suggestions: []
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
        this.state.infoText === '' && this.props.updateEvents(suggestion);
    }
    
    render() { 
        return (
            <div className="city-search">
                <InfoAlert text={this.state.infoText} />
                <label htmlFor="cityID">
                    City:
                </label>
                <input
                    type="search"
                    className="city"
                    name="query"
                    id="cityID"
                    placeholder="Search for nearest city"
                    value={this.state.query}
                    onChange={this.handleInputChange}
                    onFocus={() => { this.setState({ showSuggestions: true})} }
                />
                <ul className={this.state.showSuggestions ? 'suggestions' : 'display-none'}>
                    {
                        this.state.suggestions.map((suggestion) => (
                            <li 
                                onClick={ () => this.handleItemClicked(suggestion)}
                                key={suggestion}>
                                {suggestion}
                            </li>
                        ))
                    }
                    <li key='all' onClick={() => this.handleItemClicked("All")}>
                        See All Cities
                    </li>
                </ul>
            </div>
        );
    }
}
 
export default CitySearch;