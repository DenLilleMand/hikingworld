import React from 'react';
import _ from 'lodash';

export default class Post extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            mapId: "",
            map: null,
            markers: []
        };
    }


    componentDidMount() {
        if(typeof google != "undefined" && google && google.maps && google.maps.Polyline) {
            var map = new google.maps.Map(document.getElementById("api_"+this.props.post.id), {
                center: {lat:55.6760968 , lng: 12.5683371  },
                zoom: 8
            });



            var markers = {};
            this.props.post.Marks.forEach((mark) => {
                markers[_.uniqueId()] = new google.maps.Marker({
                    position: {
                        lat: mark.lat,
                        lng: mark.lng
                    },
                    map: map,
                    zoom: 10
                });
            });

            var hikingRoute = new google.maps.Polyline({
                path: this.props.post.Marks,
                geodesic: true,
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 2
            });

            hikingRoute.setMap(map);

            this.setState({
                map: map,
                markers: markers
            });
        }
    }

    render() {
        let post = this.props.post;
        return(
            <div className="facebook-wall-post panel panel-default">
                <div className="panel-heading">{post.Account ? post.Account.username : "unknown user"}</div>
                <div className="panel-body">
                    <label className="label-default">{post.description}</label>
                    <div id={"api_" + post.id}></div>
                </div>
                <div className="panel-footer">
                   <i className="fa fa-thumbs-o-up" aria-hidden="true"></i>
                   <i className="fa fa-thumbs-o-down" aria-hidden="true"></i>
                </div>
            </div>
        );

    }
}
Post.propTypes = {
    post: React.PropTypes.object
};
