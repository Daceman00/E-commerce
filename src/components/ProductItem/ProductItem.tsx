import { Eye, Heart, ShoppingCart, Star } from "lucide-react";
import { useState } from "react";
import styles from "./ProductItem.module.css";
import type { ProductItem as ProductItemType } from "../../features/Products/ProductTypes";

type ProductItemProps = {
  product: ProductItemType;
  viewMode: string;
  onAddToCart?: (id: number) => void;
  onQuickView?: (id: number) => void;
  onWishlist?: (id: number, wishlisted: boolean) => void;
};

const ProductItem: React.FC<ProductItemProps> = ({ product, viewMode, onAddToCart, onQuickView, onWishlist }) => {
    const [isWishlisted, setIsWishlisted] = useState(false);
  
    const handleWishlist = () => {
      setIsWishlisted(!isWishlisted);
      onWishlist?.(product.id, !isWishlisted);
    };
  
    const renderStars = (rating : number) => {
      const stars = [];
      const fullStars = Math.floor(rating);
      
      for (let i = 0; i < fullStars; i++) {
        stars.push(<Star key={i} className="star" fill="currentColor" />);
      }
      
      const remainingStars = 5 - fullStars;
      for (let i = 0; i < remainingStars; i++) {
        stars.push(<Star key={`empty-${i}`} className="star" style={{ color: 'var(--grayish-blue)' }} />);
      }
  
      return stars;
    };
  
    return (
      <div className={styles.productItem + (viewMode === 'list' ? ' ' + styles.listView : '')}>
        <div className={styles.imageContainer}>
          <img src={product.image} alt={product.category} className={styles.productImage} />
          
          <div className={styles.imageOverlay}>
            <button className={styles.overlayBtn} title="Quick view" onClick={() => onQuickView?.(product.id)}>
              <Eye size={20} />
            </button>
            <button className={styles.overlayBtn} title="Add to cart" onClick={() => onAddToCart?.(product.id)}>
              <ShoppingCart size={20} />
            </button>
          </div>
  
          <button 
            className={styles.wishlistBtn + (isWishlisted ? ' ' + styles.active : '')}
            title="Wishlist"
            onClick={handleWishlist}
          >
            <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
          </button>
        </div>
  
        <div className={styles.productContent}>
          <div className={styles.productBrand}>{product.category}</div>
          
          <div className={styles.ratingContainer}>
            <div className={styles.stars}>{renderStars(product.rating.rate)}</div>
            <span className={styles.ratingText}>({product.rating.count})</span>
          </div>
  
          <div className={styles.priceContainer}>
            <span className={styles.currentPrice}>${product.price}</span>
            {product.price && (
              <span className={styles.originalPrice}>${product.price}</span>
            )}
          </div>
  
          <button 
            className={styles.addToCartBtn}
            onClick={() => onAddToCart?.(product.id)}
          >
            <ShoppingCart size={16} />
            Add to Cart
          </button>
        </div>
      </div>
    );
}

export default ProductItem;