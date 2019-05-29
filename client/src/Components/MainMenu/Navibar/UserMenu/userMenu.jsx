import React, {Component} from 'react';
import {Label, Button} from 'semantic-ui-react';
import {textStyle, clickStyle, listStyle} from './userMenu.module.scss';

class UserMenu extends Component {
    render() {
        if (this.props.currentUser === 'undefined') {
            let labelstyle = {
                display: 'block',
                position: 'absolute',
                'box-shadow': '0px 1px 5px 2px rgba(225, 225, 225, 0.5)',
                width: '300px',
                background: 'white',
                right: '160px',
                'padding-top': '60px',
                'z-index': '1',
            }
            let buttonstyle = {
                'display': 'block',
               'margin': '10px auto',
            }
            return(
                <Label style = {labelstyle}>
                    <p className = {textStyle}> When you log in, you can:</p>
                    <ol> 
                        <li className = {listStyle}>Score bangumi and manga</li>
                        <li className = {listStyle}>Comments</li>
                        <li className = {listStyle}>Following others</li>
                        <li className = {listStyle}>Select avatar and background image</li>
                    </ol>
                    <Button style = {buttonstyle} onClick = {this.props.loginHandler} color = 'blue'>Log In</Button>
                        <p className = {textStyle}>Does not have an account?</p>
                        <p className = {clickStyle} onClick = {this.props.signupHandler}>Click to sign up</p>
                </Label>
            )
        }
        let labelStyle = {
            display: 'block',
            position: 'absolute',
            'box-shadow': '0px 1px 5px 2px rgba(225, 225, 225, 0.5)',
            width: '275px',
            background: 'white',
            right: '60px',
            'padding-top': '70px',
            'z-index': '1',
        }
        let buttonStyle = {
            'display': 'block',
            'margin': '15px auto',
        }
        return(
            <div>
                <Label style = {labelStyle}>
                    <p className = {textStyle}>{this.props.currentUser.username}</p>
                    <p className = {textStyle}>{this.props.currentUser.email}</p>
                    <Button style = {buttonStyle} onClick = {this.props.logoutHandler} color = 'blue'>Log Out</Button>
                    <Button style = {buttonStyle} onClick = {this.props.loginHandler} color = 'blue'>Switch Account</Button>
                </Label>
            </div>
        )
    }
}

export default UserMenu;