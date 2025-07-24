import { Upload, X, Plus, Eye, Save, ArrowLeft, Image as ImageIcon } from "lucide-react"
import { useState } from "react"
import styles from "./CreateProduct.module.css";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store";
import { closeModal } from "../../features/Modals/ModalSlice";

const CreateProduct = () => {
    const {products, status, error} = useSelector((state: RootState) => state.products)
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [dragOver, setDragOver] = useState(false);
    const [activeTab, setActiveTab] = useState('basic');
    const dispatch = useDispatch<AppDispatch>()

    const categories = Array.from(new Set(products.map(product => product.category)));


    const brands = [
        { value: 'nike', label: 'Nike' },
        { value: 'adidas', label: 'Adidas' },
        { value: 'jordan', label: 'Jordan' },
        { value: 'puma', label: 'Puma' },
        { value: 'newbalance', label: 'New Balance' }
    ];

    const sizes = ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '11.5', '12', '13', '14'];
    const colors = ['Black', 'White', 'Red', 'Blue', 'Green', 'Yellow', 'Orange', 'Purple', 'Gray', 'Brown'];

    const tabs = [
        { id: 'basic', label: 'Basic Info', icon: '📝' },
        { id: 'media', label: 'Media', icon: '📸' },
        { id: 'pricing', label: 'Pricing & Stock', icon: '💰' },
        { id: 'details', label: 'Details', icon: '📋' }
    ];


    return (
        <div className={styles.modalOverlay} >
            <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
                {/* Modal Header */}
                <div className={styles.modalHeader}>
                    <div className={styles.headerContent}>
                        <div className={styles.headerInfo}>
                            <h1 className={styles.title}>Create New Product</h1>
                            <p className={styles.subtitle}>Add a new sneaker to your collection</p>
                        </div>
                        <div className={styles.headerActions}>
                            <button className={styles.previewButton}>
                                <Eye size={16} />
                                Preview
                            </button>
                            <button className={styles.closeButton} onClick={() => dispatch(closeModal())}>
                                <X size={20} />
                            </button>
                        </div>
                    </div>

                    {/* Tabs Navigation */}
                    <div className={styles.tabsContainer}>
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
                                onClick={() => setActiveTab(tab.id)}
                            >
                                <span className={styles.tabIcon}>{tab.icon}</span>
                                <span className={styles.tabLabel}>{tab.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Modal Body */}
                <div className={styles.modalBody}>
                    {/* Basic Info Tab */}
                    {activeTab === 'basic' && (
                        <div className={styles.tabContent}>
                            <div className={styles.formGrid}>
                                <div className={styles.formSection}>
                                    <h3 className={styles.sectionTitle}>Product Information</h3>
                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Product Name *</label>
                                        <input
                                            type="text"
                                            className={styles.input}
                                            placeholder="Enter product name"
                                        />
                                    </div>
                                    <div className={styles.formRow}>
                                        <div className={styles.formGroup}>
                                            <label className={styles.label}>Brand *</label>
                                            <select className={styles.select}>
                                                <option value="">Select brand</option>
                                                {brands.map((brand) => (
                                                    <option key={brand.value} value={brand.value}>
                                                        {brand.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label className={styles.label}>Category *</label>
                                            <select className={styles.select}>
                                                <option value="">Select category</option>
                                                {categories.map((category) => (
                                                    <option key={category} value={category}>
                                                        {category}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Description *</label>
                                        <textarea
                                            className={styles.textarea}
                                            rows={4}
                                            placeholder="Describe the product features, materials, and benefits..."
                                        />
                                    </div>
                                </div>

                                <div className={styles.formSection}>
                                    <h3 className={styles.sectionTitle}>Product Features</h3>
                                    <div className={styles.formRow}>
                                        <div className={styles.formGroup}>
                                            <label className={styles.label}>Gender</label>
                                            <select className={styles.select}>
                                                <option value="">Select gender</option>
                                                <option value="men">Men</option>
                                                <option value="women">Women</option>
                                                <option value="unisex">Unisex</option>
                                                <option value="kids">Kids</option>
                                            </select>
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label className={styles.label}>Model Year</label>
                                            <input
                                                type="number"
                                                className={styles.input}
                                                placeholder="2024"
                                                min="2020"
                                                max="2030"
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Available Colors</label>
                                        <div className={styles.checkboxGrid}>
                                            {colors.map((color) => (
                                                <label key={color} className={styles.checkboxLabel}>
                                                    <input type="checkbox" className={styles.checkbox} />
                                                    <span className={styles.checkboxText}>{color}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Media Tab */}
                    {activeTab === 'media' && (
                        <div className={styles.tabContent}>
                            <div className={styles.formSection}>
                                <h3 className={styles.sectionTitle}>Product Images</h3>
                                <p className={styles.sectionDescription}>
                                    Upload high-quality images of your product. The first image will be used as the main product image.
                                </p>
                                
                                <div 
                                    className={`${styles.uploadArea} ${dragOver ? styles.dragOver : ''}`}
                                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                                    onDragLeave={() => setDragOver(false)}
                                    onDrop={(e) => { e.preventDefault(); setDragOver(false); }}
                                >
                                    <div className={styles.uploadContent}>
                                        <ImageIcon size={48} className={styles.uploadIcon} />
                                        <h4 className={styles.uploadTitle}>Drag & drop images here</h4>
                                        <p className={styles.uploadText}>or click to browse files</p>
                                        <button className={styles.uploadButton}>
                                            <Upload size={16} />
                                            Choose Files
                                        </button>
                                    </div>
                                </div>

                                {selectedImages.length > 0 && (
                                    <div className={styles.imagePreview}>
                                        <h4 className={styles.previewTitle}>Selected Images ({selectedImages.length})</h4>
                                        <div className={styles.imageGrid}>
                                            {selectedImages.map((image, index) => (
                                                <div key={index} className={styles.imageItem}>
                                                    <img src={image} alt={`Preview ${index + 1}`} className={styles.previewImage} />
                                                    <button className={styles.removeImage}>
                                                        <X size={16} />
                                                    </button>
                                                    {index === 0 && (
                                                        <div className={styles.primaryBadge}>Primary</div>
                                                    )}
                                                </div>
                                            ))}
                                            <button className={styles.addMoreImages}>
                                                <Plus size={24} />
                                                <span>Add More</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Pricing & Stock Tab */}
                    {activeTab === 'pricing' && (
                        <div className={styles.tabContent}>
                            <div className={styles.formGrid}>
                                <div className={styles.formSection}>
                                    <h3 className={styles.sectionTitle}>Pricing</h3>
                                    <div className={styles.formRow}>
                                        <div className={styles.formGroup}>
                                            <label className={styles.label}>Regular Price *</label>
                                            <div className={styles.inputGroup}>
                                                <span className={styles.inputAddon}>$</span>
                                                <input
                                                    type="number"
                                                    className={styles.input}
                                                    placeholder="0.00"
                                                    step="0.01"
                                                />
                                            </div>
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label className={styles.label}>Sale Price</label>
                                            <div className={styles.inputGroup}>
                                                <span className={styles.inputAddon}>$</span>
                                                <input
                                                    type="number"
                                                    className={styles.input}
                                                    placeholder="0.00"
                                                    step="0.01"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label className={styles.checkboxLabel}>
                                            <input type="checkbox" className={styles.checkbox} />
                                            <span className={styles.checkboxText}>This product is on sale</span>
                                        </label>
                                    </div>
                                </div>

                                <div className={styles.formSection}>
                                    <h3 className={styles.sectionTitle}>Inventory</h3>
                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>SKU</label>
                                        <input
                                            type="text"
                                            className={styles.input}
                                            placeholder="Enter SKU"
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Available Sizes & Stock</label>
                                        <div className={styles.sizeStockGrid}>
                                            {sizes.map((size) => (
                                                <div key={size} className={styles.sizeStockItem}>
                                                    <label className={styles.sizeLabel}>US {size}</label>
                                                    <input
                                                        type="number"
                                                        className={styles.stockInput}
                                                        placeholder="0"
                                                        min="0"
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Details Tab */}
                    {activeTab === 'details' && (
                        <div className={styles.tabContent}>
                            <div className={styles.formGrid}>
                                <div className={styles.formSection}>
                                    <h3 className={styles.sectionTitle}>Product Specifications</h3>
                                    <div className={styles.formRow}>
                                        <div className={styles.formGroup}>
                                            <label className={styles.label}>Upper Material</label>
                                            <input
                                                type="text"
                                                className={styles.input}
                                                placeholder="e.g., Leather, Mesh, Canvas"
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label className={styles.label}>Sole Material</label>
                                            <input
                                                type="text"
                                                className={styles.input}
                                                placeholder="e.g., Rubber, EVA, TPU"
                                            />
                                        </div>
                                    </div>
                                    <div className={styles.formRow}>
                                        <div className={styles.formGroup}>
                                            <label className={styles.label}>Closure Type</label>
                                            <select className={styles.select}>
                                                <option value="">Select closure type</option>
                                                <option value="lace-up">Lace-up</option>
                                                <option value="slip-on">Slip-on</option>
                                                <option value="velcro">Velcro</option>
                                                <option value="buckle">Buckle</option>
                                            </select>
                                        </div>
                                        <div className={styles.formGroup}>
                                            <label className={styles.label}>Heel Height (cm)</label>
                                            <input
                                                type="number"
                                                className={styles.input}
                                                placeholder="0"
                                                step="0.1"
                                                min="0"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.formSection}>
                                    <h3 className={styles.sectionTitle}>Additional Information</h3>
                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Care Instructions</label>
                                        <textarea
                                            className={styles.textarea}
                                            rows={3}
                                            placeholder="Provide care and maintenance instructions..."
                                        />
                                    </div>
                                    <div className={styles.formGroup}>
                                        <label className={styles.label}>Features & Technologies</label>
                                        <textarea
                                            className={styles.textarea}
                                            rows={3}
                                            placeholder="List special features, technologies, or certifications..."
                                        />
                                    </div>
                                    <div className={styles.checkboxGroup}>
                                        <label className={styles.checkboxLabel}>
                                            <input type="checkbox" className={styles.checkbox} />
                                            <span className={styles.checkboxText}>Featured Product</span>
                                        </label>
                                        <label className={styles.checkboxLabel}>
                                            <input type="checkbox" className={styles.checkbox} />
                                            <span className={styles.checkboxText}>Enable Product Reviews</span>
                                        </label>
                                        <label className={styles.checkboxLabel}>
                                            <input type="checkbox" className={styles.checkbox} />
                                            <span className={styles.checkboxText}>Publish Immediately</span>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Modal Footer */}
                <div className={styles.modalFooter}>
                    <button className={styles.cancelButton} onClick={() => dispatch(closeModal())}>
                        Cancel
                    </button>
                    <div className={styles.footerActions}>
                        <button className={styles.draftButton}>
                            Save as Draft
                        </button>
                        <button className={styles.publishButton}>
                            <Save size={16} />
                            Create Product
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CreateProduct