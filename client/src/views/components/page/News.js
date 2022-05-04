import React from "react";
import { Container } from "react-bootstrap";

import PleaseBuyACar from '../content/home/PleaseBuyACar';
import { useContext, useState } from "react";
import PaginationCus from '../../../components/pagination/PaginationCus';
import { ProductContext } from "../../../contexts/ProductContext";

export default function News() {
  const {
    productState: { products },
  } = useContext(ProductContext);
  const productcategory = products.filter(item=>item.category==='logo')


  const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(8);
    // Get Current Products
    const indexOfLastProduct = currentPage * productsPerPage ;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = productcategory.slice(indexOfFirstProduct,indexOfLastProduct);
    // ChangePage
    const paginate = pageNumber => {
        setCurrentPage(pageNumber);
    }
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
     
        <div className="d-flex justify-content-center pt-5" >
            <PaginationCus
                productsPerPage={productsPerPage}
                totalProducts={productcategory.length}
                paginate={paginate}
                currentPage={currentPage}
            />
        </div>
 
    </Container>
    
  );
}
