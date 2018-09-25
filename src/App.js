import React, { Component } from 'react';

import Layout from './hocs/Layout/Layout';
import Map from './containers/Map/Map'

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
            <Map />
        </Layout>
      </div>
    );
  }
}

export default App;
