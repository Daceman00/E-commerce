import { ChevronDown, Filter, Grid, List } from "lucide-react"
import { useEffect, useState } from "react"
import ProductItem from "../ProductItem/ProductItem";
import styles from "./ProductsGrid.module.css";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../store/store";
import type { RootState } from "../../store/store";
import { fetchProducts } from "../../features/Products/ProductThunks";
import type { ProductItem as ProductItemType } from "../../features/Products/ProductTypes";


const ProductsGrid = () => {
    const {products, status, error} = useSelector((state: RootState) => state.products)
    const [viewMode, setViewMode] = useState('grid');
    const [sortBy] = useState('featured');
    const [displayedProducts, setDisplayedProducts] = useState<ProductItemType[]>([]);
    cons
    const dispatch = useDispatch<AppDispatch>();
  
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    setDisplayedProducts(products.slice(0, 6));
  }, [products]);

  const handleAddToCart = (productId: number) => {
    console.log('Added to cart:', productId);
  };

  const handleQuickView = (productId: number) => {
    console.log('Quick view:', productId);
  };

  const handleWishlist = (productId: number, isWishlisted: boolean) => console.log('Wishlist:', productId, isWishlisted);
    
  
  return (
    <div className={styles.productGrid}>
        <div className={styles.container}>
          <div className={styles.gridHeader}>
            <h1 className={styles.gridTitle}>Shop Sneakers</h1>
            <p className={styles.gridSubtitle}>Discover our premium collection of sneakers</p>
          </div>

          <div className={styles.gridControls}>
            <div className={styles.controlsLeft}>
              <button className={styles.filterBtn} title="Show filters">
                <Filter size={16} />
                Filters
              </button>
              <span className={styles.resultsCount}>
                 Showing {displayedProducts.length} of {products.length} products 
              </span>
            </div>

            <div className={styles.controlsRight}>
              <div className={styles.viewToggle}>
                <button 
                  className={`${styles.viewBtn} ${viewMode === 'grid' ? styles.active : ''}`}
                  onClick={() => setViewMode('grid')}
                  title="Grid view"
                >
                  <Grid size={16} />
                </button>
                <button 
                  className={`${styles.viewBtn} ${viewMode === 'list' ? styles.active : ''}`}
                  onClick={() => setViewMode('list')}
                  title="List view"
                >
                  <List size={16} />
                </button>
              </div>

              <div className={styles.sortSelect}>
                 Sort by: {sortBy} 
                <ChevronDown size={16} />
              </div>
            </div>
          </div>

          {products.length > 0 ? (
            <>
              <div className={`${styles.gridContent} ${viewMode === 'list' ? styles.listView : ''}`}>
                {displayedProducts.map((product: ProductItemType) => (
                  <ProductItem
                    key={product.id}
                    product={product}
                    viewMode={viewMode}
                    onAddToCart={handleAddToCart}
                    onQuickView={handleQuickView}
                    onWishlist={handleWishlist}
                  />
                ))}
              </div>

              {displayedProducts.length < products.length && (
                <div className={styles.loadMore}>
                  <button 
                    className={styles.loadMoreBtn}
                    disabled={status === 'loading'}
                    title="Load more"
                  >
                    {status === 'loading' ? 'Loading...' : 'Load More Products'}
                  </button>
                </div>
              )}
            </>
          ) : status === 'loading' ? (
            <div>Loading...</div>
          ) : (
            <div className={styles.noProducts}>
              <h3 className={styles.noProductsTitle}>No products found</h3>
              <p className={styles.noProductsText}>Try adjusting your filters or search terms</p>
            </div>
          )} 
        </div>
      </div>
  )
}

export default ProductsGrid;