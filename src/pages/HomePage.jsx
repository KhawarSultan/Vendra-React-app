// import ApiController from '../../components/ApiController/ApiController';
// import WebScrapper from "../../components/WebScrapper/WebScrapper"
/* eslint-disable no-unused-vars */
import BannerSection from '../containers/HomeContainer/BannerSection';
import CategoriesSection from '../containers/HomeContainer/CategoriesSection';
import CompaniesSection from '../containers/HomeContainer/CompaniesSection';
import DiscountProducts from '../containers/HomeContainer/DiscountProducts';
import NewProducts from '../containers/HomeContainer/NewProducts';
import ServicesSection from '../containers/HomeContainer/ServicesSection';
import TrendingProducts from '../containers/HomeContainer/TrendingProducts';
import HeroSection from '../containers/HomeContainer/HeroSection';
import { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setProducts } from '../toolkit/Slices/ProductsSlice';
import { setCategories } from '../toolkit/Slices/CategoriesSlice';
import { Context } from '../context/AppContext';
import { setUser } from '../toolkit/Slices/UserSlice';


export const HomePage = () => {
    const { Thankyou } = useContext(Context)
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async () => {
            const productsResponse = await fetch('http://localhost:5000/api/products');
            const categoriesResponse = await fetch('http://localhost:5000/api/categories');
            const UserinfoResponse = await fetch('http://localhost:5000/getAllUser');
            const productsData = await productsResponse.json();
            const categoriesData = await categoriesResponse.json();
            const UserinfoData = await UserinfoResponse.json();

            // Dispatch actions to update the store
            dispatch(setProducts(productsData));
            dispatch(setCategories(categoriesData));
            dispatch(setUser(UserinfoData.data));
        };

        fetchData();
    }, [dispatch, Thankyou]);

    return (
        <>


            {/* <ApiController /> */}

            {/* <WebScrapper /> */}
            <HeroSection />
            <CompaniesSection />
            <CategoriesSection />

            <section className='w-11/12 mx-auto mt-14 mb-10  '>
                <div className='grid md:grid-cols-4 grid-cols-1 md:gap-6'>
                    <ServicesSection />
                    <div className="col-span-3">
                        <NewProducts viewmore={true} title='New Products' grid={'lg:grid-cols-4 md:grid-cols-3 grid-cols-2'} NewProductBanner={true} />
                    </div>
                </div>
            </section>
            {/* lg:grid-cols-4 md:grid-cols-3 grid-cols-2 */}
            <TrendingProducts />
            <BannerSection />
            <DiscountProducts />

        </>
    )
}
