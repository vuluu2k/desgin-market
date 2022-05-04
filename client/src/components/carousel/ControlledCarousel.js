import React from 'react';
import {useState} from 'react';
import {Carousel} from 'react-bootstrap';


export default function ControlledCarousel({image}) {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };
    const imageHeader=image.filter(i=>{return i.kind==="header"})
    return (
      <Carousel activeIndex={index} onSelect={handleSelect}>
        {
          imageHeader.map((img,index)=>(
            <Carousel.Item key={img._id}>
                <img
                  className="d-block w-100"
                  src={img.imgUrl}
                  alt={index+1}
                />
            </Carousel.Item>
          ))
        }
      </Carousel>
    );
}
