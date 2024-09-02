import React, { useEffect } from 'react';
import BuyerWrapper from '@components/shared/common/layout/width-wrapper';
import BuyerLayout from '@components/shared/common/layout';
import ProductList from '@components/product/list';
import { CustomButton } from '@components/shared/custom/custom-button';
import { Plus } from 'lucide-react';
import { AddProduct } from '@components/home/add-product';
import { useSafeState } from 'ahooks';
import { collection, getDocs } from '@firebase/firestore';
import { db } from '../../firebaseConfig';

const products = [
    {
        id: 1,
        title: 'Chic Floral Midi Dress - Perfect for Spring!',
        price: 350.0,
        oldPrice: 400.0,
        imageUrl: '/images/fake/dress.png',
        postedDate: '3 days ago',
        storeName: 'Sapphire Clothing',
        location: 'Miami, Florida',
    },
    {
        id: 2,
        title: 'Nike Running Shoes - Like New!',
        price: 350.0,
        oldPrice: 400.0,
        imageUrl: '/images/fake/shoes.png',
        postedDate: '3 days ago',
        storeName: 'Sapphire Clothing',
        location: 'Miami, Florida',
    },
    {
        id: 3,
        title: 'Chic Floral Midi Dress - Perfect for Spring!',
        price: 350.0,
        oldPrice: 400.0,
        imageUrl: '/images/fake/dress.png',
        postedDate: '3 days ago',
        storeName: 'Sapphire Clothing',
        location: 'Miami, Florida',
    },
    {
        id: 4,
        title: 'Nike Running Shoes - Like New!',
        price: 350.0,
        oldPrice: 400.0,
        imageUrl: '/images/fake/shoes.png',
        postedDate: '3 days ago',
        storeName: 'Sapphire Clothing',
        location: 'Miami, Florida',
    },
    {
        id: 5,
        title: 'Nike Running Shoes - Like New!',
        price: 350.0,
        oldPrice: 400.0,
        imageUrl: '/images/fake/shoes.png',
        postedDate: '3 days ago',
        storeName: 'Sapphire Clothing',
        location: 'Miami, Florida',
    },
];

const HomePageComponent = () => {
    const [open, setOpen] = useSafeState<boolean>(false);

    const [products, setProducts] = useSafeState<any[]>([]);
    const [loading, setLoading] = useSafeState(true);
    const [error, setError] = useSafeState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsCollection = collection(db, 'products');
                const productsSnapshot = await getDocs(productsCollection);
                const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setProducts(productsList);
            } catch (error) {
                setError('Error fetching products: ' + (error as Error).message);
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) return <div>Loading...</div>;
    console.log(products);

    return (
        <BuyerLayout title="Home">
            <BuyerWrapper>
                <div className="mt-32 mb-10">
                    <div className="flex justify-between items-center mt-10 mb-5">
                        <div className="text-heading-4 font-bold text-neutral-10">Product List</div>
                        <CustomButton className="flex items-center space-x-1" onClick={() => setOpen(true)}>
                            <div className="text-paragraph-l font-medium ">Add Product</div>
                            <Plus className="" />
                        </CustomButton>
                    </div>
                    <ProductList products={products} />
                </div>
            </BuyerWrapper>
            <AddProduct open={open} setOpen={setOpen} />
        </BuyerLayout>
    );
};

export default HomePageComponent;
