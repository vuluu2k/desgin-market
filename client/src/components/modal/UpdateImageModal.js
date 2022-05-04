import React,{
    useContext,
    useState, 
    useEffect 
} from 'react'
import {SilderContext} from'../../contexts/SilderContext'
import {Modal,Form,Button} from 'react-bootstrap'
import validator from 'validator';
export default function UpdateImageModal() {
    const {silderState:{img},showUpdateImage,setShowUpdateImage,updateImage}= useContext(SilderContext)
    // const {showAddCar,setShowAddCar,createProduct} = useContext(ProductContext);
    const [previewSource,setPreviewSource]= useState();
    const [updateImg,setUpdateImg]=useState(img);
    useEffect(()=>setUpdateImg(img),[img])
    const {imgUrl,kind}=updateImg;
    const onChangeNewImage=(event)=>setUpdateImg({
        ...updateImg,
        [event.target.name]:event.target.value
    })
    const handleFileInputChange=(e)=>{
        const file = e.target.files[0]
        previewFile(file);
    }
    const previewFile = (file)=>{
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend=()=>{
            setPreviewSource(reader.result)
            setUpdateImg({
                ...updateImg,
                imgUrl: reader.result?reader.result:imgUrl
            })
        }
    }
    const handleSubmitForm=async (e)=>{
        e.preventDefault();
        if(!previewSource) {
            alert('Vui lòng chọn ảnh cho sản phẩm')
            return
        }
        if(validator.isEmpty(kind)){
            alert('Vui lòng chọn vị trí')
            return
        }
        await updateImage(updateImg);
        handleClose();
    }
    const handleClose=()=>{
        setShowUpdateImage(false)
        setUpdateImg(img)
        setPreviewSource();
    }
    return (
        <Modal show={showUpdateImage} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Sửa thông tin ảnh</Modal.Title>
            </Modal.Header>
            <Form>
                <Modal.Body>
                    <Form.Group >
                        {
                            (previewSource||imgUrl) && <img src={previewSource||imgUrl} className="img-fluid" alt="imgCar"/>
                        }
                        <Form.File onChange={handleFileInputChange}  style={{height:'100%'}} name="imgCarUrl" className=" btn btn-primary form-control form-control-sm" id ="imgFile" accept="image/gif, image/jpeg, image/png" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Vị trí</Form.Label>
                        <Form.Control as='select' value={kind} name='kind' onChange={onChangeNewImage} required>
                            <option value="">--Vui lòng chọn vị trí--</option>
                            <option value="header">Bản trình chiếu trên</option>
                            <option value="footer">Bản trình chiếu dưới</option>
                        </Form.Control>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" onClick={handleSubmitForm}>
                    Thêm
                </Button>
                <Button variant="danger" onClick={handleClose}>
                    Quay lại
                </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}
