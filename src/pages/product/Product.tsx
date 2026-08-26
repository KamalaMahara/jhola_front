import React, { useEffect, useState } from 'react';
import { ArrowRight, SlidersHorizontal } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';

import ProductCard from './component/ProductCard';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchproducts } from '../../store/productSlice';

const ProductPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const limit = 8;
  const { products, status, totalProductsCount } = useAppSelector((state) => state.products);
  const [searchParams] = useSearchParams();

  const selectedCategoryId = searchParams.get('category');
  const selectedCategoryName = searchParams.get('name');

  useEffect(() => {
    dispatch(fetchproducts(page, limit));
  }, [dispatch, page]);

  const filteredProducts = selectedCategoryId
    ? products.filter((product) => product.categoryId === selectedCategoryId)
    : products;

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const hasMoreProducts = totalProductsCount !== undefined && products.length < totalProductsCount;

  return (
    <>
      <div className="min-h-screen bg-[#111827] text-[#F9FAFB] font-sans">
        <header className="pt-24 pb-12 px-6 lg:px-12 border-b border-white/5">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-6">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight uppercase">
                {selectedCategoryName ? `${selectedCategoryName} Collection` : 'Latest Releases'}
              </h1>
              <p className="text-sm text-gray-400 font-medium">
                {selectedCategoryName 
                  ? `Explore our premium collection of ${selectedCategoryName.toLowerCase()}.` 
                  : 'Browse our premium collection.'}
              </p>
            </div>
            <div className="flex gap-4">
              {selectedCategoryId && (
                <button
                  onClick={() => navigate('/products')}
                  className="flex items-center gap-2 px-5 py-2.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 rounded-xl text-sm font-semibold hover:bg-amber-500/20 transition-all cursor-pointer"
                >
                  Clear Filter (×)
                </button>
              )}
              <button className="flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm font-semibold hover:bg-white/10 transition-all">
                <SlidersHorizontal size={16} /> Filters
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto py-16 px-6 lg:px-12">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              No products found in this category.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>

        <footer className="py-20 border-t border-white/5 text-center">
          {status === 'loading' && page > 1 ? (
             <div className="flex items-center justify-center gap-3 text-gray-400">
               <div className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
               Loading...
             </div>
          ) : hasMoreProducts ? (
            <button 
              onClick={handleLoadMore}
              className="text-sm font-bold text-gray-400 hover:text-[#F59E0B] uppercase tracking-widest group cursor-pointer"
            >
              Load More <ArrowRight size={16} className="inline ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          ) : products.length > 0 ? (
            <span className="text-sm font-bold text-gray-500 uppercase tracking-widest">
              No more products
            </span>
          ) : null}
        </footer>
      </div>
    </>
  );
};

export default ProductPage;