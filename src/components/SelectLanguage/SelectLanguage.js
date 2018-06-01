import React from 'react';
import PropTypes from 'prop-types';

const SelectLanguage = (props) => {
    const languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];

    return (
        <ul className='languages'>
            {languages.map((language) => {                                    
                return <li
                        style={props.selectedLanguage === language ? { color: 'red' } : null}                                
                        key={language} 
                        onClick={props.onClickHandler.bind(null, language)}>                        
                            {language}                            
                        </li>;
            })}
        </ul>
    );
}

SelectLanguage.propTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    onClickHandler: PropTypes.func.isRequired
}

export default SelectLanguage;