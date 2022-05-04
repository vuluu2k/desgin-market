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
            {/* <Container style={{padding:'36px 0'}}>
                <div  className="TitleCar d-flex">
                    <div style={{textAlign:'center',textTransform:'uppercase',fontSize:'19px',margin:'auto',fontWeight:'bold'}}>
                        <div className="SubTitleCar">VÌ SAO NÊN MUA SẢN PHẨM TẠI ĐÂY</div>
                        <hr style={{borderBottom:'4px solid',width:'75%',color:'rgb(255, 11, 11)'}}/>
                    </div>
                </div>
                <Row className="row-cols-1 row-cols-sm-3 mx-auto">
                    <Col>
                        <ContentCard src="http://hyundaimotorvn.com/wp-content/uploads/2019/04/3.png"
                            title="GIÁ & KHUYẾN MÃI"
                            content="Hầu hết Khách hàng của chúng tôi sau khi nhận xe đều cảm thấy RẤT HÀI LÒNG về Giá & Khuyến mãi. Hãy liên hệ trực tiếp với chúng tôi và bạn cũng sẽ cảm thấy như vậy."
                        />
                    </Col>
                    <Col>
                        <ContentCard src="http://hyundaimotorvn.com/wp-content/uploads/2019/04/4-1.png"
                            title="HỖ TRỢ TÀI CHÍNH"
                            content="Chúng tôi có bộ phận tư vấn và hỗ trợ tài chính chuyên nghiệp, bạn sẽ cảm thấy bất ngờ vì thủ tục & hồ sơ mua xe trả góp với chúng tôi trở lên quá đơn giản, thuận tiện & nhanh chóng."
                        />
                    </Col>
                    <Col>
                        <ContentCard src="http://hyundaimotorvn.com/wp-content/uploads/2019/04/5.png"
                            title="BẢO DƯỠNG & SỬA CHỮA"
                            content="Là 1 trong những đại lý được đầu tư cơ sở vật chất, trang bị hiện đại nhất hệ thống. Cùng với đội ngũ nhân viên được đào tạo chuyên nghiệp theo tiêu chuẩn  Hyundai Phạm Văn Đồng toàn cầu, bạn có thể yên tâm tuyệt đối khi giao chiếc xe của mình cho chúng tôi."
                        />
                    </Col>
                </Row>
            </Container> */}
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
