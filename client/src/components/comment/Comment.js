import React from 'react'
import {useContext,useState,useEffect} from 'react';
//Bootstrap and jQuery libraries
import 'bootstrap/dist/css/bootstrap.min.css';
//Star Rating and other modules
import {CommentContext} from '../../contexts/CommentContext';
import {ProductContext} from '../../contexts/ProductContext';
import ReactStars from "react-rating-stars-component";
import {Form, Button,Card} from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import moment from 'moment';
export default function Comment() {
    const {getComment,commentState:{comments},showComment, setShowComment,createComment,setShowToastComment} = useContext(CommentContext);
    const {productState:{products}}=useContext(ProductContext);
    const {slug}=useParams();
    const productSlug=products.find(product=>product.slug===slug);
    const [newComment,setNewComment]=useState({
      nameComment:'',
      emailComment:'',
      product:'',
      contentComment:'',
      rate:'',
    })
    useEffect(()=>{
      getComment(productSlug._id)
      // eslint-disable-next-line react-hooks/exhaustive-deps
  },[productSlug])
    const {nameComment, emailComment,product,contentComment,rate} =newComment;
    const onChangeCreateCommentForm= event => setNewComment({
      ...newComment,
      product:productSlug._id,
      [event.target.name]:event.target.value
    })
    const onChangeCreateRateForm= event =>{
      setNewComment({
       ...newComment,
        rate:event+''
      })}
    const onSubmit = async event=>{
        event.preventDefault();
        const {success,message}=await createComment(newComment);
        setShowToastComment({show:success,message});
        if(nameComment!=''&&emailComment!=''&&contentComment!=''&&rate!='')
        {
          handleClose();
          
        }
        
      }
      
    const onSubmitBack = async event=>{
        event.preventDefault();
        setNewComment({
          nameComment:'',
          emailComment:'',
          contentComment:'',
          rate:''
        })
        handleClose2();
      }
    const handleClose = () => setShowComment(false);
    const handleClose2 = () => setShowComment(true);
   
    //const { TextArea } = Input;
    
    return (
        
        <div>
          {
              showComment&&
               <div>
                <Form.Group style={{margin:'20px'}}>
                    <Form.Text style={{fontSize:'15px'}}>Họ tên: </Form.Text>
                    <Form.Control style={{margin:'5px'}} type='text' placeholder='Họ và tên' value={nameComment} name='nameComment' onChange={onChangeCreateCommentForm} required/>
                </Form.Group>
                <Form.Group style={{margin:'20px'}} className="mb-3" controlId="formBasicEmail">
                    <Form.Text style={{fontSize:'15px'}}>Email: </Form.Text>
                    <Form.Control type='email' style={{margin:'5px'}} placeholder='Email' value={emailComment} name='emailComment' onChange={onChangeCreateCommentForm} required/>
                    <Form.Text className="text-muted">
                        Vui lòng nhập email!
                    </Form.Text>
                </Form.Group>
                <Form.Group style={{margin:'20px'}}>
                    <Form.Text style={{fontSize:'15px'}}>Nội dung: </Form.Text>
                    <Form.Control as='textarea' rows={3} style={{margin:'5px'}} value={contentComment} name='contentComment' onChange={onChangeCreateCommentForm} required/>
                </Form.Group>
                <Form.Group style={{margin:'20px'}}>
                    <Form.Text style={{fontSize:'15px'}}>Đánh giá: </Form.Text>
                    
                    <ReactStars  onChange={onChangeCreateRateForm} size={40}></ReactStars>
                </Form.Group>
                
                <Button variant="primary" type="submit" onClick={onSubmit} style={{margin:'20px'}}>
                    Gửi
                 </Button>
                 <Button variant="primary" type="submit" onClick={handleClose} style={{margin:'20px'}}>
                    Xem các đánh giá
                 </Button>
                 
               </div>     
          }
          
          {
            !showComment&&
            <div>
              <div>  
              {comments.map((comment)=>(
               <Card style={{margin:'10px'}}>
                  <Card.Title style={{margin:'10px',border:'1px'}}>{comment.nameComment}  ({comment.emailComment})
                  </Card.Title>
                  <Card.Text as="h6" style={{marginLeft:'10px',border:'1px'}}>
                    {comment.contentComment}
                  </Card.Text>
                  <div style={{marginLeft:'10px'}}>
                    <ReactStars  edit={false}  value={comment.rate} size={20}></ReactStars>
                  </div>
                  <Card.Footer  className="text-muted">Ngày tạo: {moment(comment.createdAt).format('DD/MM/YYYY HH:mm')}</Card.Footer>
                </Card>
                ))}
                </div>
                <Button htmlType="submit" onClick={onSubmitBack} style={{margin:'20px'}}>
                    Tạo đánh giá
                 </Button>
            </div>
          }
          
          
        </div>
    )
}
