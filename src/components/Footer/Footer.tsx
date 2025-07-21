import styles from './Footer.module.css'


const Footer = () => {
    return (
        <>
          <footer className={styles.footer}>
            <div className={styles.container}>
              <div className={styles.footerContent}>
                {/* Company Info */}
                <div className={styles.footerSection}>
                  <h3 className={styles.footerLogo}>sneakers</h3>
                  <p className={styles.footerDescription}>
                    Premium sneakers for the modern lifestyle. Quality, comfort, and style in every step.
                  </p>
                  <div className={styles.socialLinks}>
                    <a href="#" className={styles.socialLink} aria-label="Facebook">FB</a>
                    <a href="#" className={styles.socialLink} aria-label="Twitter">TW</a>
                    <a href="#" className={styles.socialLink} aria-label="Instagram">IG</a>
                    <a href="#" className={styles.socialLink} aria-label="YouTube">YT</a>
                  </div>
                </div>
    
                {/* Quick Links */}
                <div className={styles.footerSection}>
                  <h4 className={styles.sectionTitle}>Shop</h4>
                  <ul className={styles.footerList}>
                    <li className={styles.footerListItem}><a href="#collections" className={styles.footerListLink}>Collections</a></li>
                    <li className={styles.footerListItem}><a href="#men" className={styles.footerListLink}>Men's Sneakers</a></li>
                    <li className={styles.footerListItem}><a href="#women" className={styles.footerListLink}>Women's Sneakers</a></li>
                    <li className={styles.footerListItem}><a href="#new" className={styles.footerListLink}>New Arrivals</a></li>
                    <li className={styles.footerListItem}><a href="#sale" className={styles.footerListLink}>Sale</a></li>
                  </ul>
                </div>
    
                {/* Customer Service */}
                <div className={styles.footerSection}>
                  <h4 className={styles.sectionTitle}>Customer Service</h4>
                  <ul className={styles.footerList}>
                    <li className={styles.footerListItem}><a href="#contact" className={styles.footerListLink}>Contact Us</a></li>
                    <li className={styles.footerListItem}><a href="#shipping" className={styles.footerListLink}>Shipping Info</a></li>
                    <li className={styles.footerListItem}><a href="#returns" className={styles.footerListLink}>Returns</a></li>
                    <li className={styles.footerListItem}><a href="#size-guide" className={styles.footerListLink}>Size Guide</a></li>
                    <li className={styles.footerListItem}><a href="#faq" className={styles.footerListLink}>FAQ</a></li>
                  </ul>
                </div>
    
                {/* Company */}
                <div className={styles.footerSection}>
                  <h4 className={styles.sectionTitle}>Company</h4>
                  <ul className={styles.footerList}>
                    <li className={styles.footerListItem}><a href="#about" className={styles.footerListLink}>About Us</a></li>
                    <li className={styles.footerListItem}><a href="#careers" className={styles.footerListLink}>Careers</a></li>
                    <li className={styles.footerListItem}><a href="#press" className={styles.footerListLink}>Press</a></li>
                    <li className={styles.footerListItem}><a href="#privacy" className={styles.footerListLink}>Privacy Policy</a></li>
                    <li className={styles.footerListItem}><a href="#terms" className={styles.footerListLink}>Terms of Service</a></li>
                  </ul>
                </div>
              </div>
    
              {/* Copyright */}
              <div className={styles.footerBottom}>
                <p className={styles.copyright}>&copy; 2024 Sneakers. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </>
      );
}

export default Footer