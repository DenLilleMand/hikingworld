import React from 'react';
import { POST } from '../../constants/typeconstants';
import _ from 'lodash';

export default class PostInput extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            description: '',
            markers: [],
            googleMapMarkers: [],
            hikingRoute: null
        };
        this.submitPost = this.submitPost.bind(this);
    }

    submitPost(event) {
        event.preventDefault();
        this.props.createPost({
            description: this.state.description,
            markers: this.state.markers.slice()
        }, POST);
        this.state.googleMapMarkers.slice().forEach((marker) => {
            marker.setMap(null);
        });
        var hikingRouteClone = _.cloneDeep(this.state.hikingRoute);
        hikingRouteClone.setMap(null);
        this.setState({
            description: '',
            markers: [],
            googleMapMarkers: [],
            hikingRoute: hikingRouteClone
        });
    }

    componentDidMount() {
        if(typeof google != "undefined" && google && google.maps && google.maps.Marker) {
            var myLatLng = { lat:55.6760968 , lng: 12.5683371  };
            var map = new google.maps.Map(document.getElementById("api_create"), {
                center: myLatLng,
                zoom: 8
            });

            map.addListener('click', (event) => {
                var latLng = event.latLng;
                var newMarker = new google.maps.Marker({
                    position: {
                        lat: latLng.lat(), lng: latLng.lng()
                    },
                    map: map,
                    zoom: 10
                });



                var markers = this.state.markers.slice();
                var googleMapMarkers = this.state.googleMapMarkers;
                googleMapMarkers.push(newMarker);
                markers.push({lat: latLng.lat(), lng: latLng.lng()});

                var hikingRoute = new google.maps.Polyline({
                    path: markers,
                    geodesic: true,
                    strokeColor: '#FF0000',
                    strokeOpacity: 1.0,
                    strokeWeight: 2
                });

                hikingRoute.setMap(map);


                this.setState({
                    markers: markers,
                    googleMapMarkers:  googleMapMarkers,
                    hikingRoute: hikingRoute
                });
            });

            this.setState({
                map: map
            });
        }
    }

    render() {
        let user = this.props.user;
        return(
            <div className="facebook-wall-post-input panel-default">
                <div className="panel-heading"><h2>“Getting to the top is optional. Getting down is mandatory.”</h2></div>
                <div className="panel-body">
                    <label>description:</label>
                    <input onChange={(event) => { this.setState({description:event.target.value})}} placeholder="description" value={this.state.description} />
                    <div id={"api_create"}></div>
                    <button onClick={this.submitPost}>Submit</button>
                </div>
            </div>
        );
    }
}
PostInput.propTypes = {
    createPost: React.PropTypes.func,
    user: React.PropTypes.object
};
