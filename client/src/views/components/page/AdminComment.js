import React, { useEffect } from 'react'
import {useContext, useState} from 'react'
import {Row,Col, Container,Card,Table,Spinner,Button} from 'react-bootstrap'
import {ConfirmContext} from '../../../contexts/ConfirmContext';
import {CommentContext} from '../../../contexts/CommentContext'
import { ProductContext } from '../../../contexts/ProductContext'
import ConfirmModal from '../../../components/modal/ConfirmModal'
import moment from 'moment';
import PaginationCus from '../../../components/pagination/PaginationCus';
export default function AdminComment() {
    const {getComment,commentState:{comments},
            
            deleteComment
            }=useContext(CommentContext)
     const {showConfirmDeleteComment:{show,commentId},setShowConfirmDeleteComment} = useContext(ConfirmContext)
    const {getProduct,productState:{products,productsLoading}}=useContext(ProductContext)
    

    const [stateProductId,setStateProductId]=useState({
        productId:productsLoading===false&&(products[0]._id),
        
    }) 
    
    const {productId}=stateProductId
    useEffect(()=>{
        getComment(productId)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[productId])
    useEffect(()=>{
        getProduct()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const handleDelComment = ()=>{
        deleteComment(commentId);
        handleClose();
    }
    const handleClose =() =>setShowConfirmDeleteComment({show:false,commentId:''});
    const [currentPage, setCurrentPage] = useState(1);
    const [commentsPerPage] = useState(10);
    // Get Current Comments
    const indexOfLastComment = currentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    const currentComments = comments.slice(indexOfFirstComment,indexOfLastComment);
    // ChangePage
    const paginate = pageNumber => {
        setCurrentPage(pageNumber);
    }
    return (
        <Container>
            <Row>
                <Col xs="3">    
                <Card style={{ width: '100%' }} border="light">
                {products.map(product=>(
                        <Row className='d-flex align-items-center' style={{borderBottom:'1px solid #0091ff'}} onClick={()=>setStateProductId({productId:product._id}) }>
                        <Col xs="5"> 
                             <Card.Img variant="top" src={product.imgCarUrl} />
                        </Col>
                        <Col xs="7" style={{padding:'0px'}}>
                        <Card.Body>
                          <Card.Title as="h6">{product.nameCar}</Card.Title>
                         </Card.Body>
                        </Col>
                      </Row>
                  ))} 
                </Card>
                </Col>
                <Col xs="9">
                <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>STT</th>
                    <th>Tên khách hàng</th>
                    <th>Email</th>
                    <th>Nội dung</th>
                    <th>Đánh giá</th>
                    <th>Ngày tạo</th>
                    <th></th>
                    </tr>
                </thead>
                <tbody>
                    {currentComments.map((comment,index)=>(
                        <tr>
                    <td>{index+1}</td>
                    <td>{comment.nameComment}</td>
                    <td>{comment.emailComment}</td>
                    <td>{comment.contentComment}</td>
                    <td>{comment.rate}</td>
                    <td>{moment(comment.createdAt).format('DD/MM/YYYY HH:mm')}</td>
                    <td>
                    <center>
                                    <div className="d-flex justify-content-around align-items-center">
                                        <a href={`mailTo:${comment.nameComment}`}>
                                            <Button variant="outline-primary" size="sm" ><i className="fas fa-envelope"></i></Button>
                                        </a>
                                        <Button onClick={()=>setShowConfirmDeleteComment({show:true,commentId:comment._id})} style={{marginLeft:'10px'}} variant="outline-primary" size="sm" ><i className="fas fa-trash"></i></Button>
                                    </div>
                                </center>
                    </td>
                    </tr>
                    ))}
                    
                </tbody>
                </Table>
                <div className="d-flex justify-content-center pt-5" >
                 <PaginationCus
                    productsPerPage={commentsPerPage}
                    totalProducts={comments.length}
                    paginate={paginate}
                    currentPage={currentPage}
          />
      </div>
                </Col>
            </Row>
            <ConfirmModal title="Xác nhận" content="Bạn chắc chắn muốn xoá" show={show} onClick={()=>handleDelComment()} onClose={handleClose} />
        </Container>
        
    )
}
