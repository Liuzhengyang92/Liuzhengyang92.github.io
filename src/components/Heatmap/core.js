// /* global google */
// import React, { Component } from 'react';
// import {withScriptjs,withGoogleMap,GoogleMap,Marker} from "react-google-maps";
// import HeatmapLayer from 'react-google-maps/lib/components/visualization/HeatmapLayer';

// class Core extends Component {
//     state= {
//         center: null,
//         data: null,
//         mapData: null
//     }

//     componentWillMount() {
//         this.setState({
//           center: this.props.center,
//           data: this.props.heatmapRawData,
//           mapData: [],
//         })

//         console.log('[componentWillMount]')
//         console.log(this.props)
//         console.log(this.state)
//     }

//     componentWillReceiveProps(nextProps) {
//         var filteredData = [];
//         if (nextProps.heatmapRawData !== this.state.data) {
//           this.setState({
//             data: nextProps.heatmapRawData
//           });
//           for (var i = 0; i < nextProps.heatmapRawData.length; i++) {
//             const point = nextProps.heatmapRawData[i];
//             const htmapPoint = {
//               location: new google.maps.LatLng(
//                 point.lat,
//                 point.lng
//               ), 
//               weight: point.weight
//             };
//             filteredData.push(htmapPoint);
//           }
//           // after loop is done, update heatmap data
//           this.setState({mapData: filteredData});
//         }

//         console.log('[componentWillReceiveProps]')
//         console.log(this.props)
//         console.log(this.state)
//     }


//     componentWillReceiveProps = withGoogleMap((nextProps) => {
//         var filteredData = [];
//         if (nextProps.heatmapRawData !== this.state.data) {
//           this.setState({
//             data: nextProps.heatmapRawData
//           });
//           for (var i = 0; i < nextProps.heatmapRawData.length; i++) {
//             const point = nextProps.heatmapRawData[i];
//             const htmapPoint = {
//               location: new google.maps.LatLng(
//                 point.lat,
//                 point.lng
//               ), 
//               weight: point.weight
//             };
//             filteredData.push(htmapPoint);
//           }
//           // after loop is done, update heatmap data
//           this.setState({mapData: filteredData});
//         }
//     })

   
// }

// export default Core