import React, { useState } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Grid, Input } from '@material-ui/core';

import Main from './Main';

const App = () => {
  const [url, setUrl] = useState('');

  const handleChange = (event) => {
    event.preventDefault();
    setUrl(event.target.value);
    // eslint-disable-next-line no-console
    console.log(event);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/room/:id">
            <Grid
              container
              spacing={0}
              direction="column"
              alignItems="center"
              justify="center"
              style={{ minHeight: '100vh' }}
            >
              <Grid item>
                <Main url={url} />
              </Grid>
              <Grid item>
                <Input placeholder="URL" value={url} inputProps={{ 'aria-label': 'URL' }} onChange={handleChange} />
              </Grid>
            </Grid>
          </Route>
          <Route path="/" exact>
            <div>Landing</div>
          </Route>
          <Route path="/">
            <div>LoL 404</div>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
