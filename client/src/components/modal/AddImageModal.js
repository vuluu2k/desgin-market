import React,{
    useContext,
    useState
} from 'react'
import {SilderContext} from'../../contexts/SilderContext'
import {Modal,Form,Button} from 'react-bootstrap'
import validator from 'validator';
export default function AddImageModal() {
    const {showAddImage,setShowAddImage,createImage}= useContext(SilderContext)
    // const {showAddCar,setShowAddCar,createProduct} = useContext(ProductContext);
    const [previewSource,setPreviewSource]= useState();
    const [newImage,setNewImage]=useState({
        image:'',
        kind:''
    });
    const {kind}=newImage;
    const onChangeNewImage=(event)=>setNewImage({
        ...newImage,
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
            setNewImage({
                ...newImage,
                image: reader.result
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
        await createImage(newImage);
        handleClose();
    }
    const handleClose=()=>{
        setShowAddImage(false)
        setNewImage({
            kind:''
        })
        setPreviewSource();
    }
    return (
        <Modal show={showAddImage} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Thêm ảnh mới</Modal.Title>
            </Modal.Header>
            <Form>
                <Modal.Body>
                    <Form.Group >
                        {
                            previewSource && <img src={previewSource} alt="imgCar" className="img-fluid" style={{height:'300px'}} />
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
