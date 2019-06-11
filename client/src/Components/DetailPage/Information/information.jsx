import React, {Component} from 'react';
import {Image} from 'semantic-ui-react';
import Score from './Score/score.jsx';
import {introStyle, genreStyle, genreListStyle, titleStyle,
    textSectionStyle, producerStyle, episodeStyle, studioStyle} from './information.module.scss';

class Information extends Component {
    constructor() {
        super();
        this.state = {
            title_japanese: 'unknown',
        }
    }

    componentDidMount() {
        if (this.props.bangumi.title_japanese) {
            this.setState({
                title_japanese: this.props.bangumi.title_japanese,
            })
        }
    }

    render() {
        let imageStyle = {
            width: '240px',
            height: '320px',
            border: '4px solid white',
        }
        let producers = this.props.bangumi.producers.map(producer => {
            return (
                <p>{producer.name}</p>
            )
        })
        if (producers.length === 0) {
            producers = <p>unknown</p>
        }
        let genres = this.props.bangumi.genres.map(genre => {
            return (
                <span className = {genreStyle}>{genre.name}</span>
            )
        })
        let studios = this.props.bangumi.studios.map(studio => {
            return (
                <p>{studio.name}</p>
            )
        })
        if (studios.length === 0) {
            studios = <p>unknown</p>;
        }
        let episodes = this.props.bangumi.episodes;
        let airing_status = this.props.bangumi.status;
        let date = this.props.bangumi.aired.prop.from;
        if (!episodes) {
            episodes = <span>unknown</span>
        }
        if (!date.year) {
            date = {
                year: 'unknown',
                month: '',
                day: '',
            }
        }
        let backgroundStyle = {
            background: 'url(' + this.props.bangumi.image_url + ')',
            'background-repeat': 'no-repeat',
            'background-position': 'center',
            'background-size': 'cover',
        }

        return (
            <div>
                <div className = {introStyle} style = {backgroundStyle}> 
                    <Image rounded style = {imageStyle} src = {this.props.bangumi.image_url}/>
                    <div className = {textSectionStyle}>
                        <p className = {titleStyle}> {this.props.bangumi.title}</p>
                        <p className = {titleStyle}> {this.props.bangumi.title_japanese}</p>
                        <p className = {genreListStyle}>{genres}</p>
                        <div className = {episodeStyle}>
                            <p>Airing Start: {date.year}.{date.month}</p>
                            <p>Episodes: {episodes}</p>
                            <p>{airing_status}</p>
                        </div>
                        <div className = {producerStyle}>
                            <p>Producers:</p> {producers}
                        </div>
                        <div className = {studioStyle}>
                            <p>Studios: </p> {studios}
                        </div>
                    </div>
                    <Score bangumiId = {this.props.bangumi.mal_id}
                    scoreBangumi = {this.props.scoreBangumi}/>
                </div>
            </div>
        )
    }
}

export default Information;
