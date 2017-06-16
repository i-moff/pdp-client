import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router';
import {loginUser} from '../actions';

const form = reduxForm({
    form: 'login'
});

class Login extends Component {
    handleFormSubmit(formProps) {
        this.props.loginUser(formProps);
    }

    renderAlert() {
        if (this.props.errorMessage) {
            return (
                <div className="alert-block">
                    <span>
                        <strong>Error!</strong>
                        <br/>
                        {this.props.errorMessage}
                    </span>
                </div>
            );
        }
    }

    render() {
        const {handleSubmit} = this.props;

        return (
            <div className="row">
                <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
                      className="login-form col-md-offset-3 col-md-6">
                    {this.renderAlert()}
                    <div className="form-group">
                        <label>Name</label>
                        <Field name="name" className="form-control" component="input" type="text"/>
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <Field name="password" className="form-control" component="input" type="password"/>
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        errorMessage: state.auth.error,
        message: state.auth.message
    };
}

export default connect(mapStateToProps, {loginUser})(form(Login));