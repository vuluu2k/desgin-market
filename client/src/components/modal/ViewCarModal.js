import React ,{useContext} from 'react'
import {Modal,Card,Row,Col,Nav,Tab,Table,Button} from 'react-bootstrap'
import {ProductContext} from '../../contexts/ProductContext';
import parse from 'html-react-parser';

export default function ViewCarModal() {
    const {productState:{product},showViewCar,setShowViewCar,setShowUpdateCar,setShowDelCar}=useContext(ProductContext);
    const handleClose = () =>setShowViewCar(false);
    const formatToCurrency=amount=>{
        return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    const handleDeleteProduct=()=>{
        setShowDelCar({show:true,productId:product._id})
        handleClose()
    }
    const handleUpdateProduct=()=>{
        setShowUpdateCar(true)
        handleClose()
    }
    const categoryView=()=>{
        
        if(product.category==="graphics"){
            return "Ấn phẩm truyền thống"
        }
        if(product.category==="logo"){
            return "Nhận diện thương hiệu"
        }
        if(product.category==="print"){
            return "In ấn"
        }
        if(product.category==="font"){
            return "Font Chữ"
        }
       
    }
    return (
        <>
    
          <Modal
            show={showViewCar}
            onHide={handleClose}
            aria-labelledby="example-custom-modal-styling-title"
            size="xl"
          >
            <Modal.Header>
              <Modal.Title className="w-100 d-flex justify-content-between align-items-center " id="example-custom-modal-styling-title">
                <div>
                    <i className="fas fa-info-circle" style={{color: '#0091FF'}}></i>
                    Thông tin sản phẩm <span style={{textTransform: 'lowercase'}}>{product.nameCar}</span>
                </div>
                <div >
                    <Button style={{marginRight: '5px'}} variant="outline-success" onClick={handleUpdateProduct} >Chỉnh sửa ngay</Button>
                    <Button style={{marginRight: '5px'}} variant="outline-danger" onClick={handleDeleteProduct}>Xoá</Button>
                    <Button variant="outline-dark" onClick={handleClose} >Quay lại</Button>
                </div>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <Card border="light" style={{ width: '100%' }}>
                        <Row>
                            <Col xs="12" md="7">
                                <Card.Img variant="top" src={product.imgCarUrl} />
                            </Col>
                            <Col xs="12" md="5">
                                <Card.Body>
                                    <Card.Title style={{ textTransform:'uppercase'}}>{product.nameCar}</Card.Title>
                                    <Card.Text >
                                        {parse(product.specicalCar)}
                                    </Card.Text>
                                    <div style={{color:'red',fontSize:'20px',fontweight:'bold'}} className="d-flex justify-content-between">
                                        {formatToCurrency(product.costCar)}₫
                                    </div>
                                    <div style={{fontSize:'20px'}} className="justify-content-between">
                                    Danh Mục: <strong>{categoryView()}</strong>
                                    </div>
                                </Card.Body>
                            </Col>
                        </Row>
                    </Card>
                </div>
                <div>
                    <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                            <Nav variant="tabs" style={{backgroundColor:'#F2F2F2'}} >
                                <Nav.Item style={{padding:'0 4px'}}>
                                    <Nav.Link eventKey="first">Mô tả</Nav.Link>
                                </Nav.Item>
                                <Nav.Item style={{padding:'0 4px'}}>
                                    <Nav.Link eventKey="second">Chi tiết</Nav.Link>
                                </Nav.Item>
                            </Nav>
                            <Tab.Content>
                                <Tab.Pane eventKey="first">
                                    {parse(product.descriptionCar)}
                                </Tab.Pane>
                                <Tab.Pane eventKey="second">
                                    <Table striped bordered hover size="sm">
                                        <thead>
                                            <tr>
                                                <th width="50%">Thuộc tính</th>
                                                <th>Chỉ số</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th>Tên Sản Phẩm</th>
                                                <td>{product.nameCar}</td>
                                            </tr>
                                            <tr>
                                                <th>Người tạo</th>
                                                <td>{product.engineCar}</td>
                                            </tr>
                                            <tr>
                                                <th>File Size</th>
                                                <td>{product.sizeCar}</td>
                                            </tr>
                                            <tr>
                                                <th>Loại tương thích</th>
                                                <td>{product.TypeCar}</td>
                                            </tr>
                                            <tr>
                                                <th>Link xem thêm</th>
                                                <td>{product.madeInCar}</td>
                                            </tr>
                                          
                                        </tbody>
                                    </Table>
                                </Tab.Pane>
                            </Tab.Content>
                    </Tab.Container>
                </div>
            </Modal.Body>
          </Modal>
        </>
      );
}
