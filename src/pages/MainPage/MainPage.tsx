import styles from "./MainPage.module.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import ProductsGrid from "../../components/ProductsGrid/ProductsGrid";

const MainPage = () => {
  
  return (
    <div className={styles.app}>
      <Header />

      {/* Main Content Placeholder */}
      <main className={styles.mainContent}>
        <div className={styles.container}>
          <div className={styles.contentPlaceholder}>
            <h2 className={styles.placeholderTitle}></h2>
            <p className={styles.placeholderText}>
              <ProductsGrid />
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MainPage;
