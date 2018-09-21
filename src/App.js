import React, { Component } from 'react';

import Layout from './hocs/Layout/Layout';
// import Heatmap from './components/Heatmap/Heatmap'
import Map from './containers/Map/Map'

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
            {/* <Heatmap/> */}
            <Map />
        </Layout>
      </div>
    );
  }
}

export default App;
