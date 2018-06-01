import React, { Component } from 'react';

import api from '../../utils/api';
import SelectLanguage from '../SelectLanguage/SelectLanguage';
import RepoGrid from '../RepoGrid/RepoGrid';
import Loading from '../Loading/Loading';

class Popular extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedLanguage: 'All',
            repos: null            
        };
    }

    onClickHandler = (language) => {        
        this.setState({
            selectedLanguage: language,
            repos: null
        });

        api(language)
            .then(repos => this.setState({repos: repos}))
    };

    componentDidMount() {
        this.onClickHandler(this.state.selectedLanguage);
    }

    render() {
        return (
            <div>
                <SelectLanguage 
                    selectedLanguage={this.state.selectedLanguage}
                    onClickHandler={this.onClickHandler}
                />
                {!this.state.repos ? <Loading /> :<RepoGrid repos={this.state.repos} />}                
            </div>
        );
    }
}

export default Popular;