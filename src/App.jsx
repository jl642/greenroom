import React from 'react';
import { Grid } from '@material-ui/core';
import Main from './Main';

const App = () => (
  <div className="App">
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item>
        <Main />
      </Grid>
    </Grid>
  </div>
);

export default App;
