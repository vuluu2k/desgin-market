import React from 'react'
import Home from '../components/page/Home';
import Introduce from '../components/page/Introduce';
import Products from '../components/page/Products';
import Print from '../components/page/Print';
import Font from '../components/page/Font';
import News from '../components/page/News';
import NewDetail from '../components/page/NewDetail';
import Installment from '../components/page/Installment';
import PriceList from '../components/page/PriceList';
import Contact from '../components/page/Contact';
import Cart from '../components/page/Cart';
import Pay from '../components/page/Pay';
import Confirm from '../components/page/Confirm';
import ProductDetail from '../components/page/ProductDetail';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import QuoteModal from '../../components/modal/QuoteModal';
import CartModal from '../../components/modal/CartModal';
import ToastQuote from '../../components/toast/ToastQuote';
import ButtonModal from './ButtonModal';
import {ProductContext} from '../../contexts/ProductContext';
import {SilderContext} from '../../contexts/SilderContext';
import {NewContext} from '../../contexts/NewContext';
import {CartContext} from '../../contexts/CartContext';
import {ConfirmContext} from '../../contexts/ConfirmContext';
import {useContext,useEffect} from 'react';
import {Spinner} from 'react-bootstrap';
import ConfirmModal from '../../components/modal/ConfirmModal';

export default function Loading({PageRoute}) {
    const {productState:{products,productsLoading},getProduct } = useContext(ProductContext);
    const {productState:{graphics},getProductWithCategory } = useContext(ProductContext);
    const {newState:{news},getNew} = useContext(NewContext);
 
    const {showConfirmDeleteProudctInCart:{show,productId},setShowConfirmDeleteProudctInCart}=useContext(ConfirmContext)
    const {deleteCart}= useContext(CartContext);
    const {silderState:{image},getImage}=useContext(SilderContext);
    // console.log(useContext(ProductContext))
    useEffect(() => {
        getImage()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [image])
    useEffect(()=>{
        getProduct()
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    useEffect(()=>{
        
        getProductWithCategory()
        
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    useEffect(()=>{
        getNew()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    
    const handleClickDelete = ()=>{
        deleteCart(productId)
        handleClose()
    }
    const handleClose= ()=>setShowConfirmDeleteProudctInCart({
        show:false,productId:''
    })
    let body;
    if(productsLoading){
        body=(
            <div className="d-flex justify-content-center mt-2">
                <Spinner animation="border" variant='info' />
            </div>
        )
    }
    body=(
        <>
            {PageRoute==='home' &&<Home products={products} graphics={graphics} image={image} />}
            {PageRoute==='introduce' &&<Introduce />}
            {PageRoute==='products' &&<Products />}
            {PageRoute==='news' &&<News />}
            {PageRoute==='print' &&<Print />}
            {PageRoute==='font' &&<Font />}
          
            {PageRoute==='newDetail' &&<NewDetail news={news}/>}
            {PageRoute==='installment' &&<Installment />}
            {PageRoute==='pricelist' &&<PriceList />}
            {PageRoute==='contact' &&<Contact />}
            {PageRoute==='cart' &&<Cart />}
            {PageRoute==='pay' &&<Pay />}
            {PageRoute==='confirm' &&<Confirm />}
            {PageRoute==='productDetail' &&<ProductDetail products={products} productsLoading={productsLoading} />}
        </>
    )
    return (
        <>
            <Header products={products} />
                <div style={{paddingTop:90}}>
                    {body}
                </div>
            <Footer products={products} image={image} />
            <ToastQuote />
            <QuoteModal />
            <CartModal />
            <ButtonModal/>
            <ConfirmModal title="Xác nhận" content="Bạn muốn bỏ sản phẩm này ra khỏi giỏ hàng" show={show} onClick={handleClickDelete} onClose={handleClose} />
        </>
    )
}
