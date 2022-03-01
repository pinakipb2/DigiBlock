import React from 'react';

import { Route, Redirect } from 'react-router-dom';

const UserProtectedRoute = ({ isAuth, component: Component, goTo, ...rest }) => (
  <Route
    {...rest}
        // eslint-disable-next-line consistent-return
    render={(props) => {
      if (isAuth) return <Component {...props} />;
      if (!isAuth) return <Redirect to={{ pathname: goTo, state: { referrer: props.location } }} />;
    }}
  />
);

export default UserProtectedRoute;
