import { ChevronDown, Filter, Grid, List } from "lucide-react"
import { useState } from "react"
import ProductItem from "../ProductItem/ProductItem";
import styles from "./ProductsGrid.module.css";


// Sample products data
type Product = {
  id: number;
  brand: string;
  name: string;
  image: string;
  currentPrice: number;
  originalPrice: number | null;
  rating: number;
  reviewCount: number;
  badge: string | null;
  inStock: boolean;
};

const sampleProducts: Product[] = [
    {
      id: 1,
      brand: "Nike",
      name: "Air Jordan 1 Retro High OG",
      image: "https://images.unsplash.com/photo-1584735175315-9d5df23860e6?w=400&h=400&fit=crop&crop=center",
      currentPrice: 170,
      originalPrice: 200,
      rating: 4.5,
      reviewCount: 128,
      badge: "Sale",
      inStock: true
    },
    {
      id: 2,
      brand: "Adidas",
      name: "Ultra Boost 22 Running Shoes",
      image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=400&h=400&fit=crop&crop=center",
      currentPrice: 180,
      originalPrice: null,
      rating: 4.8,
      reviewCount: 89,
      badge: "New",
      inStock: true
    },
    {
      id: 3,
      brand: "Converse",
      name: "Chuck Taylor All Star Classic",
      image: "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=400&h=400&fit=crop&crop=center",
      currentPrice: 55,
      originalPrice: null,
      rating: 4.2,
      reviewCount: 256,
      badge: null,
      inStock: true
    },
    {
      id: 4,
      brand: "Vans",
      name: "Old Skool Classic Sneakers",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop&crop=center",
      currentPrice: 65,
      originalPrice: 75,
      rating: 4.3,
      reviewCount: 194,
      badge: "Sale",
      inStock: true
    },
    {
      id: 5,
      brand: "Puma",
      name: "RS-X Reinvention Sneakers",
      image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=400&fit=crop&crop=center",
      currentPrice: 110,
      originalPrice: null,
      rating: 4.1,
      reviewCount: 67,
      badge: null,
      inStock: true
    },
    {
      id: 6,
      brand: "New Balance",
      name: "990v5 Made in USA",
      image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=400&fit=crop&crop=center",
      currentPrice: 185,
      originalPrice: null,
      rating: 4.7,
      reviewCount: 312,
      badge: null,
      inStock: true
    }
  ];


const ProductsGrid = () => {
    const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>(sampleProducts.slice(0, 6));
  const [loading, setLoading] = useState(false);

  const handleLoadMore = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // In real app, you would fetch more products
    setLoading(false);
  };

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
                 Showing {displayedProducts.length} of {sampleProducts.length} products 
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

          {displayedProducts.length > 0 ? (
            <>
              <div className={`${styles.gridContent} ${viewMode === 'list' ? styles.listView : ''}`}>
                {displayedProducts.map((product : Product) => (
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

              {displayedProducts.length < sampleProducts.length && (
                <div className={styles.loadMore}>
                  <button 
                    className={styles.loadMoreBtn}
                    onClick={handleLoadMore}
                    disabled={loading}
                  >
                    {loading ? 'Loading...' : 'Load More Products'}
                  </button>
                </div>
              )}
            </>
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