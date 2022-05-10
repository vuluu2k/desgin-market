import React from 'react';
import {Container, Row, Col} from 'react-bootstrap';
import ControlledCarousel from '../../../components/carousel/ControlledCarousel';
import PleaseBuyACar from '../content/home/PleaseBuyACar';
import LineCarView from '../content/home/LineCarView';
import ContentCard from '../../../components/card/ContentCard';
import CardHot from '../../../components/News/cardhot';
import {NewContext} from '../../../contexts/NewContext'
import {ProductContext} from '../../../contexts/ProductContext'
import {useContext, useState} from 'react';
import PaginationCus from '../../../components/pagination/PaginationCus';

export default function Home({products,image}) {
    const { newState:{news}} = useContext(NewContext)

    const productcategory = products.filter(item=>item.category==='logo')
 


    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(3);
    // Get Current Products
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    // const currentProducts = productcategory.slice(indexOfFirstProduct,indexOfLastProduct);
    // ChangePage
    const paginate = pageNumber => {
        setCurrentPage(pageNumber);
    }

    return (
        <>
            <ControlledCarousel image={image} />
            <Container style={{padding:'36px 0'}}>
                <div  className="TitleCar d-flex">
                    <div style={{textAlign:'center',textTransform:'uppercase',fontSize:'19px',margin:'auto',fontWeight:'bold'}}>
                        <div className="SubTitleCar">Mời mua sản phẩm</div>
                        <hr style={{borderBottom:'4px solid',width:'75%',color:'rgb(255, 11, 11)'}}/>
                    </div>
                </div>
                <PleaseBuyACar products={products} />
            </Container>
            <div style={{backgroundColor:'#F4F4F4'}}>
                <Container style={{padding:'36px 0'}}>
                    <div  className="TitleCar d-flex">
                        <div style={{textAlign:'center',textTransform:'uppercase',fontSize:'19px',margin:'auto',fontWeight:'bold'}}>
                            <div className="SubTitleCar">KHÁM PHÁ CÁC DESIGN</div>
                            <hr style={{borderBottom:'4px solid',width:'75%',color:'rgb(255, 11, 11)'}}/>
                        </div>
                    </div>
                    <LineCarView products={products}  />
                </Container>
            </div>
            <div style={{backgroundColor:'#F4F4F4'}}>
            <Container style={{padding:'36px 0'}}>
                <div  className="TitleCar d-flex">
                    <div style={{textAlign:'center',textTransform:'uppercase',fontSize:'19px',margin:'auto',fontWeight:'bold'}}>
                        <div className="SubTitleCar">Mời mua sản phẩm</div>
                        <hr style={{borderBottom:'4px solid',width:'75%',color:'rgb(255, 11, 11)'}}/>
                    </div>
                </div>
                <PleaseBuyACar products={productcategory} />
            </Container>
            </div>
        </>
    )
}
