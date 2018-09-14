import React, { Component } from 'react';

import Layout from './hocs/Layout/Layout';
import Heatmap from './components/Heatmap/Heatmap'

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
            <Heatmap/>
        </Layout>
      </div>
    );
  }
}

export default App;
