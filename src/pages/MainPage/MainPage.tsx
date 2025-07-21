import styles from "./MainPage.module.css";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const MainPage = () => {
  return (
    <div className={styles.app}>
      <Header />

      {/* Main Content Placeholder */}
      <main className={styles.mainContent}>
        <div className={styles.container}>
          <div className={styles.contentPlaceholder}>
            <h2 className={styles.placeholderTitle}>Main Content Area</h2>
            <p className={styles.placeholderText}>
              This is where your main e-commerce content will go (product
              listings, hero section, etc.)
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MainPage;
