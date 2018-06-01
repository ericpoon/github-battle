import React, { Component } from 'react';
import { battle } from '../../utils/api';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PlayerPreview from '../PlayerPreview/PlayerPreview';
import Loading from '../Loading/Loading';

//pass in profile
const Profile = (props) => {
    let info = props.info;

    return (
        <PlayerPreview avatar={info.avatar_url} username={info.login}>
            <ul className='space-list-items'>
                {info.name && <li>{info.name}</li>}
                {info.location && <li>{info.location}</li>}
                {info.company && <li>{info.company}</li>}
                <li>Followers: {info.followers}</li>
                <li>Following: {info.following}</li>
                <li>Public Repos: {info.public_repos}</li>
                {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
            </ul>
        </PlayerPreview>
    );
};

const Player = (props) => {
    return (
        <div>
            <h1 className='header'>{props.label}</h1>            
            <h3 style={{textAlign: 'center'}}>Score: {props.score}</h3>
            <Profile info={props.profile}/>
        </div>
    );
};

Player.propTypes = {
    label: PropTypes.string.isRequired,
    profile: PropTypes.object.isRequired,
    score: PropTypes.number.isRequired
};

export default class Results extends Component {
    constructor(props) {
        super(props);

        this.state = {
            winner: null,
            loser: null,
            error: null,
            loading: true
        }
    }

    componentDidMount() {
        let players = queryString.parse(this.props.location.search);

        battle([
            players.playerOneName,
            players.playerTwoName            
        ]).then((players) => {  
            if(players === null) {
                this.setState({
                    error: 'There was an error. Check that both users exist.',
                    loading: false
                });
            }
            else{
                this.setState({error: null, winner: players[0], loser: players[1], loading: false})
            }
        })
    }

    render() {
        let error = this.state.error;
        let winner = this.state.winner;
        let loser = this.state.loser;
        let loading = this.state.loading;

        if(loading === true){
            return (
                <Loading/>
            );
        }

        if(error) {
            return (
                <div>
                    <p>Error:{error}</p>
                    <Link className='button' to='/battle'>Reset!</Link>
                </div>
            )
        }

        return (
            <div className='row'>
                <Player 
                    label='Winner'
                    score={winner.score}
                    profile={winner.profile}
                />
                <Player 
                    label='Loser'
                    score={loser.score}
                    profile={loser.profile}
                />  
            </div>
        );
    }
}