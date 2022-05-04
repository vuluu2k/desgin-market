const quoteRouter=require('./quote');
const productRouter=require('./product');
const commentRouter=require('./comment');
const accountRouter=require('./account');
const newRouter= require('./new');
const silderRouter=require('./silder');
const orderRouter=require('./order');
function route(app){
    app.use('/api/products',productRouter);
    app.use('/api/quotes',quoteRouter);
    app.use('/api/comments',commentRouter);
    app.use('/api/accounts',accountRouter);
    app.use('/api/news', newRouter);
    app.use('/api/silders',silderRouter);
    app.use('/api/orders',orderRouter);
}

module.exports = route;