const express = require('express');
const dotenv = require('dotenv');
const category = require('./router/route_cate');
const route_subCate = require('./router/route_subCate')
const brandRoutes = require('./router/brandRoute')
const prouduct_route = require('./router/prouduct_route')
const userRoute = require('./router/userRoute')
const userSecurity = require('./router/securityRoute')
const Review = require('./router/ReviewRout')
const Copons = require('./router/couponRoute')
const cart = require('./router/cartRoute')
const order = require('./router/orderRoute')
const favorite = require('./router/favoritesRoute')
const mongoose = require('mongoose');
const morgan = require('morgan');
dotenv.config({ path: 'confiqq.env' })
const app = express();
const path = require('path');
const bodyParser = require('body-parser');


const uri = mongoose.connect(process.env.url).then(()=>console.log('connected to database'));
// const uri = `mongodb://${process.env.USERNAMEDOCKER}:${process.env.PASSDOCKER}@${process.env.hostDOCKER}:${process.env.mongoportDOCKER}/`
    
// mongoose.connect(uri).then(() => { console.log('Connected to mongodb');
//   }).catch((err) => {
//     console.log(err);
//   });
const cors = require('cors');
app.use(cors({
  origin: 'http://localhost:3000'
}));
  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'environment') {
    app.use(morgan('dev'));
    console.log(`the env: ${process.env.NODE_ENV}`)
}
app.use(express.static(path.join(__dirname,'uploads')))

app.use('/api/v1/category',category);
app.use('/api/v1/categories',route_subCate);
app.use('/api/v1/brand',brandRoutes);
app.use('/api/v1/prouduct',prouduct_route);
app.use('/api/v1/user',userRoute);
app.use('/api/v1/userSecurity',userSecurity);
app.use('/api/v1/Review',Review);
app.use('/api/v1/Coupons',Copons);
app.use('/api/v1/Carts',cart);
app.use('/api/v1/order',order);
app.use('/api/v1/favorite',favorite);
app.listen(process.env.PORT,()=>console.log(`listening on port ${process.env.PORT}`));