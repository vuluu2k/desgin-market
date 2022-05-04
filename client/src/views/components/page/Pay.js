import React,{
    useContext,
    useState
} from 'react'
import {
    Row,Col,Container,
    Form,Table,Button
} from 'react-bootstrap';
import {CartContext} from '../../../contexts/CartContext';
import {PayContext} from '../../../contexts/PayContext';
import formatToCurrency from '../../../middleware/NumberToVND'
import {useHistory} from 'react-router-dom'
import validator from 'validator';
import './css/Pay.css'
export default function Pay() {
    
    const history = useHistory()
    const{getCart,clearCart} = useContext(CartContext);
    const{createOrder} = useContext(PayContext);
    const carts=getCart();
    const [newOrder,setNewOrder]=useState({
        firstName:'',
        lastName:'',
        company:'',
        nation:'',
        address:'',
        codeZip:'',
        city:'',
        numberPhone:'',
        email:'',
        note:'',
        pay:'',
        check:false,
        cart:carts
    })
    const {
        firstName,lastName,
        company,nation,address,
        codeZip,city,numberPhone,
        email,note,pay
    }=newOrder
    const onChangeCreateOrderForm=event=>setNewOrder({
        ...newOrder,
        [event.target.name]:event.target.value
    })
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
        if(validator.isEmpty(pay)){
            alert('Bạn chưa chọn hình thức thanh toán')
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
        
        await createOrder(newOrder)
        clearCart()
        setNewOrder({
            firstName:'',
            lastName:'',
            company:'',
            nation:'',
            address:'',
            codeZip:'',
            city:'',
            numberPhone:'',
            email:'',
            note:'',
            pay:''
        })
        history.push('/confirm')
    }
    const sumMoney=()=>{
        let sum =0 ;
        carts!==null&&carts.forEach(cart=>{
            sum+=cart.product.costCar*cart.quantity;
        })
        return sum;
    }
    
    return (
        <Container style={{padding:'36px 0'}}>
            <Form>
                <Row>
                    <Col xs={12} lg={7}>
                        <div className="title_pay ">THÔNG TIN THANH TOÁN</div>
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
                    </Col>
                    <Col xs={12} lg={5}>
                        <div className="d-flex" style={{border:'1px solid red'}}>
                            <Table borderless style={{width:'95%',margin:'auto'}}>
                                <thead>
                                    <tr>
                                        <th>ĐƠN HÀNG CỦA BẠN</th>
                                    </tr>
                                    <tr>
                                        <th>Sản phẩm</th>
                                        <th>Tổng số lượng</th>
                                    </tr>
                                </thead>
                                <tbody className=" font-weight-bolder">
                                    {
                                        (carts&&carts.length!==0)?carts.map(cart=>(
                                            <tr key={cart.product._id}>
                                                <td>{cart.product.nameCar} x {cart.quantity}</td>
                                                <td className=" text-red">{formatToCurrency(cart.quantity*cart.product.costCar)}<sup>₫</sup></td>
                                            </tr>
                                        )): 
                                        <tr>
                                            <td>Bạn chưa có xe nào trong giỏ hàng</td>
                                        </tr>
                                    }
                                    <tr style={{borderBottom:'2px solid #E3E3E3'}}>
                                        <td>Tổng phụ</td>
                                        <td className="text-red">{formatToCurrency(sumMoney())}<sup>₫</sup></td>
                                    </tr>
                                    <tr style={{borderBottom:'2px solid #E3E3E3'}}>
                                        <td>Tổng</td>
                                        <td className="text-red">{formatToCurrency(sumMoney())}<sup>₫</sup></td>
                                    </tr>
                                    <tr >
                                        <th colSpan="2" style={{padding:"12px 0"}}>
                                            <Button onClick={onSubmitOrderForm} variant="dark" style={{width:'100%',fontWeight:'600'}}>THANH TOÁN</Button>
                                        </th>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>
                        <div className="mt-2" style={{border:'1px solid red'}}>
                            <div className="m-2">
                                <h6>LƯU CHỌN LOẠI HÌNH THỨC THANH TOÁN</h6>
                                <Form.Check label="CHUYỂN QUA TÀI KHOẢN NGÂN HÀNG"  value="payOnline" onChange={onChangeCreateOrderForm} type="radio" name="pay" />
                                <Form.Check label="ĐẶT HÀNG THANH TOÁN TẠI CỬA HÀNG"  value="payOffline" onChange={onChangeCreateOrderForm}  type="radio" name="pay" />
                            </div>

                        </div>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}
