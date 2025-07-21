import { Heart, Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { useState } from "react";
import styles from "./Header.module.css";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  return (
    <>
      <header className={styles.header}>
        <div className={styles.container}>
          <nav className={styles.navbar}>
            {/* Mobile Menu Button */}
            <button 
              className={styles.mobileMenuBtn}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <div className={styles.logo}>
              <h1 className={styles.logoText}>sneakers</h1>
            </div>

            {/* Desktop Navigation */}
            <ul className={styles.navLinks}>
              <li><a href="#collections" className={styles.navLink}>Collections</a></li>
              <li><a href="#men" className={styles.navLink}>Men</a></li>
              <li><a href="#women" className={styles.navLink}>Women</a></li>
              <li><a href="#about" className={styles.navLink}>About</a></li>
              <li><a href="#contact" className={styles.navLink}>Contact</a></li>
            </ul>

            {/* Right Side Icons */}
            <div className={styles.navActions}>
              <button className={`${styles.actionBtn} ${styles.searchBtn}`} aria-label="Search">
                <Search size={20} />
              </button>
              <button className={styles.actionBtn} aria-label="Wishlist">
                <Heart size={20} />
              </button>
              <button className={`${styles.actionBtn} ${styles.cartBtn}`} aria-label="Shopping cart">
                <ShoppingCart size={20} />
                <span className={styles.cartCount}>3</span>
              </button>
              <button className={styles.actionBtn} aria-label="User profile">
                <User size={20} />
                <User size={20} />
              </button>
            </div>
          </nav>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className={styles.mobileNav}>
              <ul className={styles.mobileNavLinks}>
                <li><a href="#collections" className={styles.mobileNavLink}>Collections</a></li>
                <li><a href="#men" className={styles.mobileNavLink}>Men</a></li>
                <li><a href="#women" className={styles.mobileNavLink}>Women</a></li>
                <li><a href="#about" className={styles.mobileNavLink}>About</a></li>
                <li><a href="#contact" className={styles.mobileNavLink}>Contact</a></li>
              </ul>
            </div>
          )}
        </div>
      </header>
    </>
  );
}

export default Header