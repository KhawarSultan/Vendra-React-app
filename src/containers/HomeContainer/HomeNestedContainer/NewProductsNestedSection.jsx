/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

/* eslint-disable react/prop-types */
import '../../../assets/styles/AdminCategoryProducts.scss';
import { VscHeart } from 'react-icons/vsc';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { BsCart2 } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectProducts } from '../../../toolkit/Slices/ProductsSlice'
import BackgroundRemoval from '../../../pages/BackgroundRemoval';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../toolkit/Slices/CartSlice';
import { addToWishlist } from '../../../toolkit/Slices/WishlistSlice';
import { useState, useEffect } from 'react';
import { HiOutlineCheck } from "react-icons/hi";
import toast from 'react-hot-toast';

const NewProductsNestedSection = ({ sliceProducts, grid }) => {
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const products = useSelector(selectProducts);
    const [wishlistTragetid, setwishlistTragetid] = useState();
    const [cartTragetid, setcartTragetid] = useState();
    const [wishlistloading, setwishlistloading] = useState(false);
    const [cartloading, setcartloading] = useState(false);

    const handleAddToWishList = (id, name, desc, price, imageurl, quantity) => {
        toast.success(<span style={{ fontWeight: 'bold' }}>Added to wishlist</span>);

        dispatch(addToWishlist({ id: id, name: name, desc: desc, price: price, imageurl: imageurl, quantity: quantity }));
        setwishlistloading(true);
    };
    const handleAddToCart = (id, name, desc, price, imageurl, quantity) => {
        toast.success(<span style={{ fontWeight: 'bold' }}>Added to cart</span>);
        dispatch(addToCart({ id: id, name: name, desc: desc, price: price, imageurl: imageurl, quantity: quantity }));
        setcartloading(true);
    };


    useEffect(() => {

        if (wishlistloading == true) {
            const timeoutId = setTimeout(() => {
                setwishlistloading(false);
            }, 1000);
            return () => clearTimeout(timeoutId);
        }
        if (cartloading == true) {
            const timeoutId = setTimeout(() => {
                setcartloading(false);
            }, 1000);
            return () => clearTimeout(timeoutId);
        }
    }, [wishlistloading, cartloading]);


    const displayedProducts = Array.isArray(products)
        ? (sliceProducts ? [...products.slice(-8)] : [...products]).reverse()
        : [];

    return (
        <>
            {products &&
                <div className={`my-7 grid  gap-7 ${grid}`}>
                    {products?.slice(-8).reverse()?.map((product) => (
                        <div key={product._id} className={`cursor-pointer   select-none flex flex-col justify-between  Parent-Col-Hover relative`}>
                            <main>
                                <div>

                                    <div onClick={() => {
                                        handleAddToWishList(
                                            product._id,
                                            product.name,
                                            product.description,
                                            product.price,
                                            product.image[0],
                                            1
                                        );
                                        setwishlistTragetid(product._id);
                                    }} className='md:top-[0.80rem] top-[0.30rem] md:right-[15px] right-[10px]   bg-gray-300 hover:bg-gray-200 rounded-full  p-[0.40rem] absolute  cursor-pointer z-10'>
                                        {wishlistloading && wishlistTragetid == product._id ? (
                                            <HiOutlineCheck size={20} />
                                        ) : (
                                            <VscHeart size={20} />
                                        )}
                                    </div>
                                </div>
                                <section className={` rounded-xl  relative    Parent-product-Image-Hover  `} onClick={() => Navigate(`/viewsingleproduct/${product?._id}/${false}/${false}/newProduct`)}>
                                    <img className='mix-blend-multiply flex rounded-xl w-full ' src={`https://ucarecdn.com/${product?.image[0]}/`} alt="" />
                                </section>


                            </main>
                            <main  >
                                <div className='upper  mt-4 ' onClick={() => Navigate(`/viewsingleproduct/${product?._id}/${false}/${false}/newProduct`)}>
                                    <span className=' md:leading-5 mb-3  text-lg leading-5 line-clamp-2 font-bold     hover:cursor-pointer hover:underline   Parent-product-text-Hover  capitalize  '>{product.name}</span>
                                    <p className=' md:leading-5  leading-5 mb-3  line-clamp-3  hover:cursor-pointer  text-gray-400  '>{product.description}</p>
                                </div>
                                <div className='flex justify-between items-center '>

                                    <p className=' text-lg text-gray-800 font-extrabold font-price'>${product.price}</p>

                                    <div onClick={() => {
                                        handleAddToCart(
                                            product?._id,
                                            product?.name,
                                            product?.description,
                                            product?.price,
                                            product?.image[0],
                                            1
                                        );
                                        setcartTragetid(product._id);
                                    }} className='p-2 rounded-lg border hover:bg-gray-100 cursor-pointer'>

                                        {cartloading && cartTragetid == product._id ? (
                                            < HiOutlineCheck size={20} />
                                        ) : (
                                            <BsCart2 size={20} />
                                        )}
                                    </div>

                                </div>
                                <span className='flex items-center gap-1  mb-2'>
                                    <AiFillStar className=' text-yellow-400 ' size={18} />
                                    <AiFillStar className=' text-yellow-400' size={18} />
                                    <AiFillStar className=' text-yellow-400' size={18} />
                                    <AiFillStar className=' text-yellow-400' size={18} />
                                    <AiOutlineStar className=' text-gray-300' size={18} />
                                </span>
                            </main>
                        </div>
                    ))}
                </div>
            }


        </>
    );
};

export default NewProductsNestedSection


{/* <div onClick={() => {
                    handleAddToWishList(
                        product?._id,
                        product?.name,
                        product?.description,
                        product?.price,
                        product?.image,
                        1
                    );
                


                }} className='md:top-[0.80rem] top-[0.30rem] md:right-[15px] right-[10px] border-4 border-gray-100  bg-gray-300 hover:bg-gray-200 rounded-full  p-[0.40rem] absolute  cursor-pointer z-10'>

                    {showCheckmark ? (
                        <HiOutlineCheck className='text-blue-500' size={20} />
                    ) :
                        loading ? (
                            <>
                                <div className="animate-spin w-[20px] h-[20px] p-2 border-[2px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500"
                                    role="status"
                                    aria-label="loading">
                                </div>

                            </>
                        ) : (
                            <VscHeart size={20} />
                        )}

                </div> */}