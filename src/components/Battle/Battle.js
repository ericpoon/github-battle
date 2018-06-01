import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import PlayerPreview from '../PlayerPreview/PlayerPreview';

class PlayerInput extends Component{
    constructor(props){
        super(props);

        this.state = {
            username: ''
        };
    }

    handleValueChange = (event) => {
        const newUsername = event.target.value;    
        this.setState({username: newUsername});
    };

    handleSubmit = (event) => {
        event.preventDefault();
        
        this.props.onSubmit(this.props.id, this.state.username);
    }

    render() {
        return (
            <form className='column' onSubmit={this.handleSubmit}>
                <label className='header' htmlFor='username'>
                    {this.props.label}
                </label>
                <input 
                    type='text' 
                    autoComplete='off' 
                    placeholder='github username' 
                    id='username' 
                    value={this.state.username} 
                    onChange={this.handleValueChange}/>
                <button
                    className='button'
                    type='submit'
                    disabled={!this.state.username}>
                        Submit!
                </button>
            </form>
        );
    }
}

PlayerInput.propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
}

PlayerInput.defaultProps = {
    label: 'Username'
}

class Battle extends Component {
    constructor(props) {
        super(props);

        this.state = {
            playerOneName: '',
            playerTwoName: '',
            playerOneImage: null,
            playerTwoImage: null
        };
    }

    onSubmitHandler = (id, username) => {
        if(id === 'playerOne'){
            this.setState({playerOneName: username, playerOneImage: 'https://github.com/' + username + '.png?size=200'});
        }
        else{
            this.setState({playerTwoName: username, playerTwoImage: 'https://github.com/' + username + '.png?size=200'});
        }
    }

    handleReset = (id) => {
        if(id === 'playerOne'){
            this.setState({playerOneName: '', playerOneImage: null});
        }
        else{
            this.setState({playerTwoName: '', playerTwoImage: null});
        }
    }

    render() {
        let playerOneName = this.state.playerOneName;
        let playerTwoName = this.state.playerTwoName;
        let playerOneImage = this.state.playerOneImage;
        let playerTwoImage = this.state.playerTwoImage;

        return (
            <div>
                <div className='row'>
                    {!playerOneName && <PlayerInput label='Player One' id='playerOne' onSubmit={this.onSubmitHandler}/>}
                    {playerOneImage !== null && <PlayerPreview 
                        avatar={playerOneImage} 
                        username={playerOneName}>
                        <button 
                            className='reset'
                            onClick={this.handleReset.bind(null, 'playerOne')}>
                                Reset
                        </button>
                    </PlayerPreview>
                    }
                    
                    {!playerTwoName && <PlayerInput label='Player Two' id='playerTwo' onSubmit={this.onSubmitHandler}/>}                
                    {playerTwoImage !== null && <PlayerPreview 
                        avatar={playerTwoImage} 
                        username={playerTwoName}>
                        <button 
                            className='reset'
                            onClick={this.handleReset.bind(null, 'playerTwo')}>
                                Reset
                        </button>
                    </PlayerPreview>
                    }                            
                </div>
                {playerOneImage !== null && playerTwoImage !== null && 
                <Link className='button' 
                    to={{
                      pathname: this.props.match.url + '/results',
                      search: '?playerOneName=' + playerOneName + '&playerTwoName=' + playerTwoName
                    }}>
                    Battle!
                </Link>}           
            </div>
        );
    }
}

export default Battle;