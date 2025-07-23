import { ChevronDown, Filter, Grid, List, Search } from "lucide-react"
import { useCallback, useEffect, useState } from "react"
import ProductItem from "../ProductItem/ProductItem";
import styles from "./ProductsGrid.module.css";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "../../store/store";
import type { RootState } from "../../store/store";
import { fetchProducts } from "../../features/Products/ProductThunks";
import type { ProductItem as ProductItemType } from "../../features/Products/ProductTypes";



const ProductsGrid = () => {
  const {products, status, error} = useSelector((state: RootState) => state.products)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [displayedProducts, setDisplayedProducts] = useState<ProductItemType[]>([]);
  const [range, setRange] = useState(5);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const sliceOptions = [5, 10, 15, 20];
  const sortOptions = [
      { value: 'featured', label: 'Featured' },
      { value: 'newest', label: 'Newest' },
      { value: 'price-low', label: 'Price: Low to High' },
      { value: 'price-high', label: 'Price: High to Low' },
      { value: 'rating', label: 'Customer Rating' }
  ];

  const slicedProducts = useCallback((range: number) => {
      return products.slice(0, range)
  }, [products])

  useEffect(() => {
      dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
      setDisplayedProducts(slicedProducts(range));
  }, [products, slicedProducts, range]);

  const handleAddToCart = (productId: number) => {
      console.log('Added to cart:', productId);
  };

  const handleQuickView = (productId: number) => {
      console.log('Quick view:', productId);
  };

  const handleWishlist = (productId: number, isWishlisted: boolean) => {
      console.log('Wishlist:', productId, isWishlisted);
  };

  const handleSortChange = (sortValue: string) => {
      setSortBy(sortValue);
      setIsSortDropdownOpen(false);
  };
  
  return (
      <div className={styles.productGrid}>
          <div className={styles.container}>
              {/* Hero Header */}
              <div className={styles.heroSection}>
                  <div className={styles.heroContent}>
                      <h1 className={styles.heroTitle}>Premium Sneaker Collection</h1>
                      <p className={styles.heroSubtitle}>
                          Discover the latest trends and timeless classics in our curated selection
                      </p>
                      <div className={styles.heroStats}>
                          <span className={styles.statItem}>
                              <strong>{products.length}</strong> Products
                          </span>
                          <span className={styles.statItem}>
                              <strong>50+</strong> Brands
                          </span>
                          <span className={styles.statItem}>
                              <strong>Free</strong> Shipping
                          </span>
                      </div>
                  </div>
              </div>

              {/* Enhanced Controls Bar */}
              <div className={styles.controlsBar}>
                  <div className={styles.controlsLeft}>
                      {/* Search */}
                      <div className={styles.searchContainer}>
                          <Search size={18} className={styles.searchIcon} />
                          <input
                              type="text"
                              placeholder="Search sneakers..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className={styles.searchInput}
                          />
                      </div>

                      {/* Filters Button */}
                      <button className={styles.filtersButton}>
                          <Filter size={16} />
                          <span>Filters</span>
                      </button>

                      {/* Results Count */}
                      <div className={styles.resultsInfo}>
                          <span className={styles.resultsCount}>
                              {displayedProducts.length} of {products.length} products
                          </span>
                      </div>
                  </div>

                  <div className={styles.controlsRight}>
                      {/* Items per page */}
                      <div className={styles.itemsPerPage}>
                          <span className={styles.label}>Show:</span>
                          <div className={`${styles.dropdown} ${isDropdownOpen ? styles.open : ''}`}>
                              <button 
                                  className={styles.dropdownTrigger}
                                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                              >
                                  {range}
                                  <ChevronDown size={14} className={styles.chevron} />
                              </button>
                              {isDropdownOpen && (
                                  <div className={styles.dropdownMenu}>
                                      {sliceOptions.map((option) => (
                                          <button
                                              key={option}
                                              onClick={() => {
                                                  setRange(option);
                                                  setIsDropdownOpen(false);
                                              }}
                                              className={`${styles.dropdownItem} ${range === option ? styles.active : ''}`}
                                          >
                                              {option}
                                          </button>
                                      ))}
                                  </div>
                              )}
                          </div>
                      </div>

                      {/* Sort */}
                      <div className={styles.sortContainer}>
                          <span className={styles.label}>Sort by:</span>
                          <div className={`${styles.dropdown} ${isSortDropdownOpen ? styles.open : ''}`}>
                              <button 
                                  className={styles.dropdownTrigger}
                                  onClick={() => setIsSortDropdownOpen(!isSortDropdownOpen)}
                              >
                                  {sortOptions.find(opt => opt.value === sortBy)?.label}
                                  <ChevronDown size={14} className={styles.chevron} />
                              </button>
                              {isSortDropdownOpen && (
                                  <div className={styles.dropdownMenu}>
                                      {sortOptions.map((option) => (
                                          <button
                                              key={option.value}
                                              onClick={() => handleSortChange(option.value)}
                                              className={`${styles.dropdownItem} ${sortBy === option.value ? styles.active : ''}`}
                                          >
                                              {option.label}
                                          </button>
                                      ))}
                                  </div>
                              )}
                          </div>
                      </div>

                      {/* View Toggle */}
                      <div className={styles.viewToggle}>
                          <button 
                              className={`${styles.viewButton} ${viewMode === 'grid' ? styles.active : ''}`}
                              onClick={() => setViewMode('grid')}
                              title="Grid view"
                          >
                              <Grid size={16} />
                          </button>
                          <button 
                              className={`${styles.viewButton} ${viewMode === 'list' ? styles.active : ''}`}
                              onClick={() => setViewMode('list')}
                              title="List view"
                          >
                              <List size={16} />
                          </button>
                      </div>
                  </div>
              </div>

              {/* Products Grid */}
              {products.length > 0 ? (
                  <>
                      <div className={`${styles.productsContainer} ${viewMode === 'list' ? styles.listView : styles.gridView}`}>
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

                      {/* Load More */}
                      {displayedProducts.length < products.length && (
                          <div className={styles.loadMoreSection}>
                              <button 
                                  className={styles.loadMoreButton}
                                  disabled={status === 'loading'}
                              >
                                  {status === 'loading' ? (
                                      <>
                                          <div className={styles.spinner}></div>
                                          Loading...
                                      </>
                                  ) : (
                                      'Load More Products'
                                  )}
                              </button>
                          </div>
                      )}
                  </>
              ) : status === 'loading' ? (
                  <div className={styles.loadingState}>
                      <div className={styles.loadingSpinner}></div>
                      <p>Loading amazing sneakers...</p>
                  </div>
              ) : (
                  <div className={styles.emptyState}>
                      <div className={styles.emptyIcon}>👟</div>
                      <h3 className={styles.emptyTitle}>No sneakers found</h3>
                      <p className={styles.emptyText}>
                          Try adjusting your search or filter criteria to find what you're looking for
                      </p>
                      <button className={styles.resetButton}>Reset Filters</button>
                  </div>
              )}
          </div>
      </div>
  )
}

export default ProductsGrid;