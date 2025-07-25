import { Upload, X, Eye, Save, Image as ImageIcon } from "lucide-react"
import { useState } from "react"
import styles from "./CreateProduct.module.css";
import { useDispatch } from "react-redux";
import type { AppDispatch} from "../../store/store";
import { closeModal } from "../../features/Modals/ModalSlice";
import type { ProductItem } from "../../features/Products/ProductTypes";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { resolver, type FormValues } from "./CreateProductForm";
import { useRef } from "react"


type CreateProductProps = {
  products: ProductItem[];
};


const CreateProduct = ({products}: CreateProductProps) => {
    const [selectedImage, setSelectedImage] = useState<string>('');
    const [dragOver, setDragOver] = useState(false);
    const dispatch = useDispatch<AppDispatch>()
    const {register, handleSubmit, formState: {errors}, setValue} = useForm<FormValues>({resolver});
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const categories = Array.from(new Set(products.map(product => product.category)));

    const onSubmit = handleSubmit((data) => console.log(data))

    return createPortal(
        <div className={styles.modalOverlay} >
            <form id="product-form" onSubmit={onSubmit}>
            <div className={styles.modalContainer} onClick={(e) => e.stopPropagation()}>
                {/* Modal Header */}
                
                <div className={styles.modalHeader}>
                    <div className={styles.headerContent}>
                        <div className={styles.headerInfo}>
                            <h1 className={styles.title}>Create New Product</h1>
                            <p className={styles.subtitle}>Add a new product to your collection</p>
                        </div>
                        <div className={styles.headerActions}>
                            <button type="button" className={styles.previewButton}>
                                <Eye size={16} />
                                Preview
                            </button>
                            <button type="button" className={styles.closeButton} onClick={() => dispatch(closeModal())} title="Close">
                                <X size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Modal Body */}
                <div className={styles.modalBody}>
                    <div className={styles.tabContent} >
                        <div className={styles.formGrid}>
                            {/* Basic Product Information */}
                            <div className={styles.formSection}>
                                <h3 className={styles.sectionTitle}>Product Information</h3>
                                
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Product Title *</label>
                                    <input
                                        type="text"
                                        className={styles.input}
                                        placeholder="Enter product title"
                                        {...register("title")}
                                    />
                                    {errors.title && (
                                        <span className={styles.errorMessage}>{errors.title.message as string}</span>
                                    )}
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label} htmlFor="category-select">Category *</label>
                                    <select 
                                        className={styles.select} 
                                        id="category-select" 
                                        title="Category"
                                        {...register("category")}
                                    >
                                        <option value="">Select category</option>
                                        {categories.map((category) => (
                                            <option key={category} value={category}>
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.category && (
                                        <span className={styles.errorMessage}>{errors.category.message as string}</span>
                                    )}
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Price *</label>
                                    <div className={styles.inputGroup}>
                                        <span className={styles.inputAddon}>$</span>
                                        <input
                                            type="number"
                                            className={styles.input}
                                            placeholder="0.00"
                                            step="0.01"
                                            min="0"
                                           {...register("price")}
                                        />
                                    </div>
                                    {errors.price && (
                                        <span className={styles.errorMessage}>{errors.price.message as string}</span>
                                    )}
                                </div>

                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Description *</label>
                                    <textarea
                                        className={styles.textarea}
                                        rows={4}
                                        placeholder="Describe the product features, materials, and benefits..."
                                        {...register("description")}
                                    />
                                    {errors.description && (
                                        <span className={styles.errorMessage}>{errors.description.message as string}</span>
                                    )}
                                </div>
                            </div>

                            {/* Product Image */}
                            <div className={styles.formSection}>
                                <h3 className={styles.sectionTitle}>Product Image</h3>
                                <p className={styles.sectionDescription}>
                                    Upload or provide a URL for the product image.
                                </p>
                                
                                <div className={styles.formGroup}>
                                    <label className={styles.label}>Image URL</label>
                                    <input
                                        type="url"
                                        className={styles.input}
                                        placeholder="https://example.com/image.jpg"
                                        
                                    />
                                    {/* If you want to show image URL errors, add here */}
                                </div>

                                <div className={styles.divider}>
                                    <span>OR</span>
                                </div>
                                
                                <div 
                                    className={`${styles.uploadArea} ${dragOver ? styles.dragOver : ''}`}
                                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                                    onDragLeave={() => setDragOver(false)}
                                    onDrop={(e) => {
                                        e.preventDefault();
                                        setDragOver(false);
                                        const file = e.dataTransfer.files && e.dataTransfer.files[0];
                                        if (file && file.type.startsWith('image/')) {
                                            const reader = new FileReader();
                                            reader.onload = (ev) => {
                                                const imageUrl = ev.target?.result as string;
                                                setSelectedImage(imageUrl);
                                                setValue('image', imageUrl, { shouldValidate: true });
                                            };
                                            reader.readAsDataURL(file);
                                        }
                                    }}
                                >
                                    <div className={styles.uploadContent}>
                                        <ImageIcon size={48} className={styles.uploadIcon} />
                                        <h4 className={styles.uploadTitle}>Drag & drop image here</h4>
                                        <p className={styles.uploadText}>or click to browse files</p>
                                        <button
                                            className={styles.uploadButton}
                                            type="button"
                                            onClick={() => fileInputRef.current?.click()}
                                        >
                                            <Upload size={16} />
                                            Choose File
                                        </button>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            style={{ display: 'none' }}
                                            ref={fileInputRef}
                                            aria-label="Upload product image"
                                            onChange={(e) => {
                                                const file = e.target.files && e.target.files[0];
                                                if (file && file.type.startsWith('image/')) {
                                                    const reader = new FileReader();
                                                    reader.onload = (ev) => {
                                                        const imageUrl = ev.target?.result as string;
                                                        setSelectedImage(imageUrl);
                                                        setValue('image', imageUrl, { shouldValidate: true });
                                                    };
                                                    reader.readAsDataURL(file);
                                                }
                                            }}
                                        />
                                    </div>
                                </div>

                                {selectedImage && (
                                    <div className={styles.imagePreview}>
                                        <h4 className={styles.previewTitle}>Image Preview</h4>
                                        <div className={styles.imageItem}>
                                            <img 
                                                src={selectedImage } 
                                                alt="Product preview" 
                                                className={styles.previewImage} 
                                            />
                                            <button type="button" 
                                                className={styles.removeImage} 
                                                aria-label="Remove image" 
                                                title="Remove image"
                                                onClick={() => {
                                                    setSelectedImage("");
                                                    setValue('image', '', { shouldValidate: true });
                                                }}
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    </div>
                                )}
                                {/* If you want to show image upload errors, add here */}
                                {errors.image && (
                                    <span className={styles.errorMessage}>{errors.image.message as string}</span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Modal Footer */}
                <div className={styles.modalFooter}>
                    <button type="button" className={styles.cancelButton} onClick={() => dispatch(closeModal())}>
                        Cancel
                    </button>
                    <div className={styles.footerActions}>
                        <button type="submit" className={styles.publishButton}>
                            <Save size={16} />
                            Create Product
                        </button>
                    </div>
                </div>
              
            </div>
            </form>
        </div>,
        document.getElementById("modal-root") as HTMLElement
    )
}

export default CreateProduct