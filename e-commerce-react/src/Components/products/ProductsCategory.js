import React , {useState} from 'react';
import { Link } from 'react-router-dom';
import { createfavorite, Deletefavorite } from './../../Redux/Actions/FavoriteAction';
import { useDispatch } from 'react-redux';

const ProductsCategory = ({ product }) => {
  const [isFavorited, setIsFavorited] = useState(false); 

  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user && user._id ? user._id : null;

  if (!product) {
    return null; // Ensure product is defined
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // تغيير حالة isFavorited إلى القيمة المنطقية (true/false)

  const addfavorite = async (productID) => {
    if (!userId) return
    await dispatch(createfavorite({ userId, productId: productID }));
    setIsFavorited(true); // تحديث الحالة إلى المفضلة
  };


  const deletefromfavorites =async(productID)=>{
    if (!userId) return
    await dispatch(Deletefavorite({ userId:userId, productId: productID }))
    setIsFavorited(false);
  }
  return (
    <div className='card h-100'>
      <Link to={`/products/${product._id}`}>
        <img
          onClick={scrollToTop}
          src={`http://localhost:8000/users/${product.imageCover}`}
          className='card-img-top'
          alt={product.title || 'Product Image'}
        />
      </Link>
      <div className='d-flex justify-content-start ms-3 mt-2'>
        <img
          style={{ width: '29px', height: '28px', cursor: 'pointer' }}
          src={isFavorited
            ? 'https://raw.githubusercontent.com/bakrgit/16-Ecommerse-Review-CRUD---Wishlist-Products-/refs/heads/master/src/images/fav-on.png' // رابط الصورة الحمراء
            : 'https://raw.githubusercontent.com/bakrgit/08-ecommerce-design-only/refs/heads/master/src/images/fav-off.png'} // رابط الصورة العادية
          alt='favorite'
          onClick={() => {
            if (isFavorited) {
              deletefromfavorites(product._id); // حذف 
              console.log("product._id in delete",product._id)
            } else {
              addfavorite(product._id); // إضافة إلى المفضلة إذا لم يكن مفضلًا
            }
            setIsFavorited(!isFavorited); // عكس الحالة
          }}
        />
      </div>
      <div className='card-body'>
        <p className='card-text'>{product.title}</p>
        <div className='d-flex justify-content-between'>
          <p>
            <strong>{product.price}</strong> EG
          </p>
          <div>
            <span style={{ color: 'gold', marginLeft: '5px' }}>
              {product.ratingsQuantity}
            </span>
            <img
              src='https://raw.githubusercontent.com/bakrgit/08-ecommerce-design-only/refs/heads/master/src/images/rate.png'
              style={{ width: '23px', height: '20px' }}
              alt='rating'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsCategory;

