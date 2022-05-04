import React from 'react'
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div style={{color:'red',fontSize:'16px' ,fontWeight:'bold'}}>{text}</div>;

export default function Map(props) {
    const defaultProps = {
        center: {
          lat: 21.0541825,
          lng: 105.731848
        },
        zoom: 15
      };
    
    return (
        // Important! Always set the container height explicitly
        <div style={{ height: props.height, width: '100%' }}>
        <GoogleMapReact
            bootstrapURLKeys={'AIzaSyCTbw0X-zZfL4vQ9mcskL0ryEBgHfa8GLY'}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
        >
            <AnyReactComponent
                lat={21.0541825}
                lng={105.731848}
                text="MarketDesign HaUi"
            />
        </GoogleMapReact>
        </div>
    );
}
