import React, { useState, useEffect } from 'react';
import Multiselect from 'multiselect-react-dropdown';
import MultiImageInput from 'react-multiple-image-input';
import { getAllCategory } from './../../Redux/Actions/categoryAction';
import { useDispatch, useSelector } from 'react-redux';
import { GetsubcatAction } from './../../Redux/Actions/SubcatAction';
import { CompactPicker } from 'react-color';
import createproduct from './../../Redux/Actions/ProductAction';
import { getallBrand } from '../../Redux/Actions/BrandAction';
import { ToastContainer, toast } from 'react-toastify';

const avatar = "https://raw.githubusercontent.com/bakrgit/08-ecommerce-design-only/refs/heads/master/src/images/avatar.png";
const add = "https://raw.githubusercontent.com/bakrgit/08-ecommerce-design-only/refs/heads/master/src/images/add.png";
const notify = (message, status) => {
    if (status === 'success') {
        toast.success(message); 
    } else {
        toast.error(message);  
    }
};

const AdminAddProducts = () => {
    const dispatch = useDispatch();
    const [images, setImages] = useState({});
    const [prodname, setprodname] = useState('');
    const [ProdDescription, setProdDescription] = useState('');
    const [priceBD, setpriceBD] = useState('');
    const [priceAD, setpriceAD] = useState('');
    const [Category, setCategory] = useState('');
    const [subCategory, setsubCategory] = useState([]);
    const [selectedsubCategory, setselectedsubCategory] = useState([]);
    const [brand, setsetbrand] = useState('');
    const [Quantity, setsQuantity] = useState('');
    const [color, setcolor] = useState(false);
    const [colors, setcolors] = useState([]);

    useEffect(() => {
        dispatch(getAllCategory(100)); // استدعاء الدالة لجلب الفئات من الـ API
    }, [dispatch]);

    const data = useSelector(state => state.allCategory.category);

    useEffect(() => {
        dispatch(getallBrand()); // استدعاء الدالة لجلب الفئات من الـ API
    }, [dispatch]);

    const data1 = useSelector(state => state.allBrand.brand);
    let brandsArray;
    if (data1 && data1.data && data1.data.data) {
        brandsArray = data1.data.data; // هنا يتم استخراج المصفوفة
    }

    const handlecat = (e) => {
        setCategory(e.target.value);
    }

    const handelbrand = (e) => {
        setsetbrand(e.target.value);
    }

    const handlecolor = (c) => {
        setcolor(!color);
        setcolors([...colors, c.hex]);
    }

    const hadlecolors = (c) => {
        const x = colors.filter((i) => i !== c);
        setcolors(x);
    }

    function base64ToFile(base64String, fileName = 'image.jpg') {
        try {
            const bytes = atob(base64String.split(',')[1]);  
            const byteNumbers = new Array(bytes.length);
            for (let i = 0; i < bytes.length; i++) {
                byteNumbers[i] = bytes.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            return new File([byteArray], fileName, { type: 'image/jpeg' });  
        } catch (error) {
            console.error("Failed to decode base64: ", error);
            return null;
        }
    }
    
    const handleButton = async (e) => {
        e.preventDefault();
    
        if (!prodname || !ProdDescription || !priceBD || !priceAD || !Quantity || !Category || !brand || !colors) {
            notify("Please fill in all required fields.", "error");
            return;
        }
    
        const formdata = new FormData();
        formdata.append("title", prodname);
        formdata.append("description", ProdDescription);
        formdata.append("quantity", Quantity);
        formdata.append("price", priceBD);
        formdata.append("priceAfterDiscount", priceAD);
        formdata.append("colors", colors);
    
        const imagesArray = Object.values(images);
    
        if (imagesArray.length > 0) {
            const imageCoverFile = base64ToFile(imagesArray[0], "cover-image.jpg");
            if (imageCoverFile) {
                formdata.append("imageCover", imageCoverFile);
            }
    
            imagesArray.slice(1).forEach((imageBase64, index) => {
                const imageFile = base64ToFile(imageBase64, `image-${index + 1}.jpg`);
                if (imageFile) {
                    formdata.append("images", imageFile);
                }
            });
        } else {
            notify("No images found.", "error");
            return;
        }
    
        formdata.append("category", Category);
        formdata.append("subcategories", selectedsubCategory);
        formdata.append("brand", brand);
        formdata.append("slug", "slug");
    
        try {
            await dispatch(createproduct(formdata));
            notify("Product created successfully!", "success");
    
             setprodname('');
            setProdDescription('');
            setpriceBD('');
            setpriceAD('');
            setsQuantity('');
            setCategory('');
            setselectedsubCategory([]);
            setsetbrand('');
            setcolors([]);
            setImages({});
        } catch (error) {
            notify("Error creating product.", "error");
        }
    };
    
    
    

    return (
        <div style={{ minHeight: '800px' }} className='container my-4'>
            <ToastContainer/>
            <div className="row justify-content-start">
                <div className="admin-content-text pb-4">Add New Product</div>
                <div className="col-9">
                    <div className="text-form pb-2">Product Images</div>
                    <div style={{ textAlign: 'left' }}>
                        <MultiImageInput
                            theme={{
                                background: '#ffffff',
                                outlineColor: '#111111',
                                textColor: 'rgba(255,255,255,0.6)',
                                buttonColor: '#ff0e1f',
                                modalColor: '#ffffff'
                            }}
                            max={5}
                            allowCrop={false}
                            images={images}
                            setImages={setImages}
                        />
                    </div>
                    <input
                        value={prodname}
                        onChange={v => setprodname(v.target.value)}
                        type="text"
                        className="form-control d-block mt-3 px-3"
                        placeholder="Product Name"
                    />
                    <textarea
                        className="form-control p-2 mt-3"
                        rows="4"
                        cols="50"
                        placeholder="Product Description"
                        value={ProdDescription}
                        onChange={v => setProdDescription(v.target.value)}
                    />
                    <input
                        value={priceBD}
                        onChange={v => setpriceBD(v.target.value)}
                        type="number"
                        className="form-control d-block mt-3 px-3"
                        placeholder="Price Before Discount"
                    />
                    <input
                        value={priceAD}
                        onChange={v => setpriceAD(v.target.value)}
                        type="number"
                        className="form-control d-block mt-3 px-3"
                        placeholder="Product Price"
                    />
                    <input
                        value={Quantity}
                        onChange={v => setsQuantity(v.target.value)}
                        type="number"
                        className="form-control d-block mt-3 px-3"
                        placeholder="Quantity Available"
                    />
                    <select
                        onChange={handlecat}
                        name="category"
                        id="category"
                        className="form-select mt-3 px-2">
                        <option value="val">Main Category</option>
                        {data?.Data ? (data.Data.map(i => (
                            <option key={i._id} value={i._id}>{i.name}</option>
                        ))) : null}
                    </select>

                    <Multiselect
                        className="mt-2"
                        placeholder="Subcategory"
                        options={subCategory}  
                        onSelect={(selectedList) => setselectedsubCategory(selectedList)}
                        onRemove={(selectedList) => setselectedsubCategory(selectedList)}
                        displayValue="name"
                    />
                    <select
                        onChange={handelbrand}
                        name="brand"
                        id="brand"
                        className="form-select mt-3 px-2">
                        <option value="val">Brand</option>
                        {data1?.data?.data ? (brandsArray.map(i => (
                            <option key={i._id} value={i._id}>{i.name}</option>
                        ))) : null}
                    </select>
                    <div className="text-form mt-3">Available Colors</div>
                    <div className='d-flex justify-content-between'>
                        <div className="mt-1 d-flex mb-5">
                            {colors ? (colors.map(i => (
                                <div
                                    key={i}
                                    onClick={() => hadlecolors(i)}
                                    className="color ms-2 border mt-1"
                                    style={{ backgroundColor: i, width: '30px', height: '30px' }}></div>
                            ))) : null}

                            <img onClick={() => setcolor(!color)} style={{ cursor: "pointer" }} src={add} alt="Add Color" width="30px" height="35px" className="" />
                            {color === true ? <CompactPicker onChangeComplete={handlecolor} /> : null}
                        </div>
                        <div className="row my-5">
                            <div className="col-9 d-flex justify-content-end">
                                <button onClick={handleButton} className="btn btn-primary d-inline mt-2">Save Changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminAddProducts;
