import React, {Component} from 'react';
import {Button, Label, Image} from 'semantic-ui-react';
import axios from 'axios';
import StarRating from 'react-star-ratings';
import Information from './Information/information.jsx';
import Synopsis from './Synopsis/synopsis.jsx';
import Navibar from '../Home/MainMenu/Navibar/navibar.jsx';
import {pageContainer,textStyle, imageStyle} from '../Home/AllBangumi/allBangumi.module.scss';
import loadingGif from '../searchloading.gif';
import {ratingLabelStyle} from './detailPage.module.scss';

class DetailPage extends Component {
    constructor() {
        super();
        this.state = {
            bangumi: 'undefined',
            ratingDisplay: 'none',
            loginDisplay: 'none',
            totalBrightness: 'brightness(100%)',
            rating: 0,
            currentUser: 'undefined',
        }
        this.changeRating = this.changeRating.bind(this);
        this.scoreBangumi = this.scoreBangumi.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
        this.cancelHandler = this.cancelHandler.bind(this);
        this.okHandler = this.okHandler.bind(this);
    }
    
    componentDidMount() {
        axios.get('https://api.jikan.moe/v3/anime/' + this.props.match.params.anime_id)
        .then(response => {
            this.setState({
                bangumi: response.data,
            })
        }).catch(err => {
            alert(err);
        })
        axios.get('api/auth/currentUser')
        .then(response => {
            if (response.data.message === 'success') {
                this.setState({
                    currentUser: response.data.data,
                })
            }
        }).catch(err => {
            alert(err);
        })
    }

    changeRating(value, prevalue, name) {
        this.setState({
            rating: value,
        });
    }

    scoreBangumi() {
        if (this.state.currentUser !== 'undefined') {
            this.setState({
                ratingDisplay: 'flex',
                loginDisplay: 'none',
                totalBrightness: 'brightness(30%)',
            })
        } else {
            this.setState({
                ratingDisplay: 'none',
                loginDisplay: 'flex',
                totalBrightness: 'brightness(30%)',
            })
        }
    }

    submitHandler() {
        axios('api/bangumiScore/' + this.props.match.params.anime_id, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            data: {
                user_id: this.state.currentUser._id,
                score: this.state.rating,
            }
        }).then(() => {
            window.location.reload();
        }).catch(err => {
            alert(err);
        })
        this.setState({
            rating: 0,
            ratingDisplay: 'none',
            loginDisplay: 'none',
            totalBrightness: 'brightness(100%)',
        })
    }

    okHandler() {
        this.setState({
            rating: 0,
            ratingDisplay: 'none',
            loginDisplay: 'none',
            totalBrightness: 'brightness(100%)',
        })
    }

    cancelHandler() {
        this.setState({
            rating: 0,
            ratingDisplay: 'none',
            totalBrightness: 'brightness(100%)',
        })
    }

    render() {
        if (this.state.bangumi === 'undefined') {
            return (
                <div>
                    <Navibar history = {this.props.history}/>
                    <div className = {pageContainer}>
                        <div>
                            <Image className = {imageStyle} src={loadingGif} alt = 'loading'/>
                        </div>
                        <p className = {textStyle}>
                            Loading ... 
                        </p>
                    </div>
                </div>
            )
        }
        let ratingStyle = {
            display: this.state.ratingDisplay,
            padding: '15% 10% 15% 10%',
            background: 'white',
        }
        let loginStyle = {
            display: this.state.loginDisplay,
            padding: '15% 10% 15% 10%',
            background: 'white',
        }
        let pageStyle = {
            filter: this.state.totalBrightness,
        }
        return(
            <div>
                <div style = {pageStyle}>
                    <Navibar history = {this.props.history}/>
                    <Information bangumi = {this.state.bangumi} scoreBangumi = {this.scoreBangumi}/>
                    <Synopsis bangumi = {this.state.bangumi}/>
                </div>
                <div className = {ratingLabelStyle}>
                    <Label style = {ratingStyle}>
                        <StarRating 
                            name = 'rating'
                            numberOfStars={5}
                            rating = {this.state.rating}
                            starEmptyColor = "grey"
                            starRatedColor = "#ffb440"
                            starHoverColor = "#ffb400"
                            changeRating={this.changeRating}
                            editing = {true}
                            isAggregateRating = {true}
                            starDimension="30px"
                            starSpacing="5px"
                        />
                        <div>
                            <Button onClick = {this.submitHandler} disabled = {this.state.rating === 0}>Submit</Button>
                            <Button onClick = {this.cancelHandler}>Cancel</Button>
                        </div>
                    </Label>
                    <Label style = {loginStyle}>
                       Log in first to score
                        <div>
                            <Button onClick = {this.okHandler}>OK</Button>
                        </div>
                    </Label>
                </div>
            </div>
        )
    }
}

export default DetailPage;