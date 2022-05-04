import React,{
    useContext,
    useState,useEffect
} from 'react'
import {Modal,Form,Row,Col,Button} from 'react-bootstrap'
import {PayContext} from '../../contexts/PayContext'
import validator from 'validator';
export default function UpdateOrderModal() {
    const {orderState:{order},showUpdate,setShowUpdate,updateOrder} = useContext(PayContext);
    const [upOrder,setUpOrder]=useState(order)
    useEffect(()=>setUpOrder(order),[order])
    const {
        firstName,lastName,
        company,nation,address,
        codeZip,city,numberPhone,
        email,note
    }=upOrder
    const onChangeCreateOrderForm=event=>setUpOrder({
        ...upOrder,
        [event.target.name]:event.target.value
    })
    const handleClose =()=>{
        setUpOrder(order)
        setShowUpdate(false)
    }
    const onSubmitOrderForm=async event=>{
        event.preventDefault();
        if(validator.isEmpty(firstName)){
            alert('Tên bạn đang để trống')
            return
        }
        if(validator.isEmpty(lastName)){
            alert('Họ bạn đang để trống')
            return
        }
        if(validator.isEmpty(nation)){
            alert('Quốc gia bạn đang để trống')
            return
        }
        if(validator.isEmpty(address)){
            alert('Địa chỉ bạn đang để trống')
            return
        }
        if(!validator.isEmail(email)){
            alert('Email không hợp lệ')
            return
        }
        if(validator.isEmpty(city)){
            alert('Thành phố bạn đang để trống')
            return
        }
        if(validator.isEmpty(numberPhone)){
            alert('Số điện thoại bạn đang để trống')
            return
        }
        if(!validator.isNumeric(numberPhone)){
            alert('Số điện thoại bạn đang nhập không phải là số')
            return
        }
        if(!validator.isLength(numberPhone,{min:10,max:12})){
            alert('Số điện thoại không được quá 12 số')
            return
        }
        await updateOrder(upOrder)
        handleClose()
    }
    return (
        <div>
            <Modal
                size="lg"
                show={showUpdate}
                onHide={handleClose}
                aria-labelledby="example-modal-sizes-title-sm"
            >
                <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-sm">
                    Sửa thông tin đặt hàng
                </Modal.Title>
                </Modal.Header>
                <Form>
                    <Modal.Body>
                    <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label className="font_pay">Tên*</Form.Label>
                                    <Form.Control type="text" name="firstName" value={firstName} onChange={onChangeCreateOrderForm} placeholder="Vui lòng nhập tên" required={true} />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group>
                                    <Form.Label className="font_pay">Họ*</Form.Label>
                                    <Form.Control type="text" name="lastName" value={lastName} onChange={onChangeCreateOrderForm} placeholder="Vui lòng nhập họ" required={true} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label className="font_pay">TÊN CÔNG TY(TÙY CHỌN)</Form.Label>
                                    <Form.Control type="text" name="company" value={company} onChange={onChangeCreateOrderForm} placeholder="Nhập công ty của bạn"/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label className="font_pay">QUỐC GIA*</Form.Label>
                                    <Form.Control as="select" name="nation" value={nation} onChange={onChangeCreateOrderForm} required={true}>
                                        <option value="">--Chọn quốc gia--</option>
                                        <option value="Vietnamese">Việt Nam</option>
                                        <option value="Laos">Lào</option>
                                        <option value="Campuchia">Campuchia</option>
                                        <option value="China">Trung Quốc</option>
                                    </Form.Control>
                                </Form.Group>
                             </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label className="font_pay">ĐỊA CHỈ*</Form.Label>
                                    <Form.Control type="text" name="address" value={address} onChange={onChangeCreateOrderForm} placeholder="Vui lòng nhập đia chỉ" required={true} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label className="font_pay">MÃ BƯU ĐIỆN(TÙY CHỌN)</Form.Label>
                                    <Form.Control type="text" name="codeZip" value={codeZip} onChange={onChangeCreateOrderForm} placeholder="Nhập mã bưu điện nơi ở hiện tại" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label className="font_pay">TỈNH/THÀNH PHỐ*</Form.Label>
                                    <Form.Control type="text" name="city" value={city} onChange={onChangeCreateOrderForm} placeholder="Vui lòng nhập tỉnh/thành phố" required={true} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label className="font_pay">SỐ ĐIỆN THOẠI*</Form.Label>
                                    <Form.Control type="text" name="numberPhone" value={numberPhone} onChange={onChangeCreateOrderForm} placeholder="Vui lòng nhập số điện thoại" required={true} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label className="font_pay">ĐỊA CHỈ EMAIL*</Form.Label>
                                    <Form.Control type="email" name="email" value={email} onChange={onChangeCreateOrderForm} placeholder="Vui lòng nhập địa chỉ email" required={true} />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <Form.Group>
                                    <Form.Label className="font_pay">GHI CHÚ</Form.Label>
                                    <Form.Control as="textarea" name="note" value={note} onChange={onChangeCreateOrderForm} placeholder="Nhập thêm thông tin" required={true} />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="primary" onClick={onSubmitOrderForm}>
                            Cập nhật
                        </Button>
                        <Button variant="danger" onClick={handleClose} >
                            Quay lại
                        </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    )
}
