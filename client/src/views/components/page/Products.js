import React from "react";
import { Container } from "react-bootstrap";

import PleaseBuyACar from '../content/home/PleaseBuyACar';
import { useContext, useState } from "react";
import { ProductContext } from "../../../contexts/ProductContext";

export default function Products() {
    const {
        productState: { products },
      } = useContext(ProductContext);
      const productcategory = products.filter(item=>item.category==='graphics')
      return (
        <Container style={{ padding: "36px 0" }}>
          
          <Container style={{padding:'36px 0'}}>
                    <div  className="TitleCar d-flex">
                        <div style={{textAlign:'center',textTransform:'uppercase',fontSize:'19px',margin:'auto',fontWeight:'bold'}}>
                            <div className="SubTitleCar">Danh sách </div>
                            <hr style={{borderBottom:'4px solid',width:'75%',color:'rgb(255, 11, 11)'}}/>
                        </div>
                    </div>
                    <PleaseBuyACar products={productcategory} />
                </Container>
     
        </Container>
        
      );
}
