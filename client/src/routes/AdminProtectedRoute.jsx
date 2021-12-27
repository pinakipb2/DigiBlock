import React from 'react';

import { Route, Redirect } from 'react-router-dom';

const AdminProtectedRoute = ({ auth, component: Component, goTo, ...rest }) => (
  <Route
    {...rest}
    // eslint-disable-next-line consistent-return
    render={(props) => {
      if (auth) return <Component {...props} />;
      if (!auth) return <Redirect to={{ pathname: goTo, state: { referrer: props.location } }} />;
    }}
  />
);

export default AdminProtectedRoute;
