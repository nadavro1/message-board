import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/spinner';

const PrivateRouting = ({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      loading ? (
        <Spinner />
      ) : isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);


const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRouting);