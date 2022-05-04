import React,{
    useContext,
    useEffect
} from 'react'
import { SilderContext } from '../../../contexts/SilderContext'
import {Row,Col,Nav,Tab,Image,Button} from 'react-bootstrap'
import AddImageModal from '../../../components/modal/AddImageModal'
import ConfirmModal from '../../../components/modal/ConfirmModal'
import UpdateImageModal from '../../../components/modal/UpdateImageModal'
export default function AdminChangeSilder() {
    const {
        silderState:{image,imgLoading},getImage,setShowAddImage,
        showDelImage:{show,imageId},setShowDelImage,
        deleteImage,getImageDetail,setShowUpdateImage
    }= useContext(SilderContext)
    useEffect(() =>{
        getImage()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const handleDelImage = ()=>{
        deleteImage(imageId);
        handleClose();
    }
    const choseImageUpdate= (id)=>{
        getImageDetail(id)
        setShowUpdateImage(true)
    }
    const handleClose =() =>setShowDelImage({show:false,imageId:''});

    const imageHeader=image.filter(i=>{return i.kind==="header"});
    const imageFooter=image.filter(i=>{return i.kind==="footer"});
    return (
        <div className="container">
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={3}>
                    <Nav variant="pills" className="flex-column">
                        <Nav.Item>
                        <Nav.Link eventKey="first">Bản trình chiếu trên(trang chủ)</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                        <Nav.Link eventKey="second">Bản trình chiếu dưới(Thông tin) </Nav.Link>
                        </Nav.Item>
                    </Nav>
                    </Col>
                    <Col sm={9}>
                    <Tab.Content>
                        <Tab.Pane eventKey="first">
                            <Row>
                                {
                                    imageHeader.map((img,index)=>(
                                        <Col xs={12} md={6} className="mb-2" key={img._id}>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span>Ảnh thứ {index+1}</span>
                                                <span>
                                                    <Button onClick={()=>choseImageUpdate(img._id)} className="mt-2 mb-2 mr-2" variant="success" size="sm"><i className="fas fa-pencil-alt"></i></Button>
                                                    <Button onClick={()=>setShowDelImage({show:true,imageId:img._id})} className="mt-2 mb-2" variant="danger" size="sm"><i className="fas fa-trash-alt"></i></Button>
                                                </span>
                                            </div>
                                            <Image src={img.imgUrl} style={{border:'2px solid #0091ff'}} fluid/>
                                        </Col>
                                    ))
                                }
                            </Row>
                        </Tab.Pane>
                        <Tab.Pane eventKey="second">
                            <Row>
                                {
                                    imageFooter.map((img,index)=>(
                                        <Col xs={12} className="mb-2" key={img._id}>
                                            <div className="d-flex justify-content-between align-items-center">
                                                <span>Ảnh thứ {index+1}</span>
                                                <span>
                                                    <Button onClick={()=>choseImageUpdate(img._id)} className="mt-2 mb-2 mr-2" variant="success" size="sm"><i className="fas fa-pencil-alt"></i></Button>
                                                    <Button onClick={()=>setShowDelImage({show:true,imageId:img._id})} className="mt-2 mb-2" variant="danger" size="sm"><i className="fas fa-trash-alt"></i></Button>
                                                </span>
                                            </div>
                                            <Image src={img.imgUrl} style={{border:'2px solid #0091ff'}}  fluid/>
                                        </Col>
                                    ))
                                }
                            </Row>
                        </Tab.Pane>
                    </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
            <div className="btn_addCar-admin">
               <Button variant="primary" onClick={()=>setShowAddImage(true)}>
                    <i className="fas fa-plus-circle"></i>
               </Button>
           </div>
           <AddImageModal/>
           {imgLoading===false&&<UpdateImageModal/>}
           <ConfirmModal title="Xác nhận" content="Bạn chắc chắn muốn xoá" show={show} onClick={()=>handleDelImage()} onClose={handleClose} />
        </div>
    )
}
