import React, { useState, useEffect } from 'react';
import './adminProduct.css';
import Header from '../header/header';
import { useSelector } from "react-redux";
import axios from "axios";

const AdminProduct = () => {



    useEffect(() => {
        if (!formData.categorySlug && categories.length) {
            setFormData(prev => ({
                ...prev,
                categorySlug: categories[0].slug,
                categoryName: categories[0].name,
            }));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    // Predefined categories
    const categories = [
        {
            slug: 'signage',
            name: 'Signage',
            description: [
                'Digital displays for advertisements and announcements.',
                'Ideal for schools, offices, malls, and public spaces.',
                'Supports static, video, or dynamic content playback.'
            ]
        },
        {
            slug: 'led',
            name: 'LED',
            description: [
                'High-brightness panels for indoor or outdoor environments.',
                'Available in various pixel pitches and sizes.',
                'Perfect for stages, auditoriums, and commercial walls.'
            ]
        },
        {
            slug: 'ifps',
            name: 'IFPS',
            description: [
                'Interactive Flat Panel Displays for classrooms and meeting rooms.',
                'Touch-enabled collaboration with built-in Android or Windows OS.',
                'Supports writing, annotation, and wireless screen sharing.'
            ]
        },
        {
            slug: 'ar-vr',
            name: 'AR/VR',
            description: [
                'Augmented and Virtual Reality devices for immersive learning.',
                'Simulates real-world training scenarios digitally.',
                'Used for STEM labs, engineering, and design visualization.'
            ]
        },
        {
            slug: 'projector',
            name: 'Projector',
            description: [
                'High-resolution projection systems for classrooms and halls.',
                'Compatible with HDMI, VGA, and wireless connectivity.',
                'Available in short-throw and long-throw variants.'
            ]
        },
        {
            slug: 'digital-podium',
            name: 'Digital Podium',
            description: [
                'Smart podiums with built-in mic, amplifier, and touchscreen.',
                'Simplifies content presentation for teachers and speakers.',
                'Integrated with document camera and multimedia control.'
            ]
        },
        {
            slug: 'camera',
            name: 'Camera',
            description: [
                'Document and PTZ cameras for live teaching and video conferencing.',
                'Auto-focus and zoom capabilities for clear visuals.',
                'Seamless integration with conferencing software.'
            ]
        },
        {
            slug: 'kiosk',
            name: 'Kiosk',
            description: [
                'Interactive kiosks for self-service and digital information.',
                'Used in receptions, libraries, and exhibitions.',
                'Supports touch navigation and media content playback.'
            ]
        },
        {
            slug: 'av-devices-solutions',
            name: 'AV Devices Solutions',
            description: [
                'Complete Audio-Visual integration systems for institutions.',
                'Includes amplifiers, speakers, mixers, and control units.',
                'Ensures synchronized sound and video experiences.'
            ]
        },
        {
            slug: 'security-solutions',
            name: 'Security Solutions',
            description: [
                'CCTV, access control, and surveillance systems.',
                'Smart monitoring with cloud or on-premise recording.',
                'Ideal for school campuses and corporate environments.'
            ]
        }
    ];


    // Form state for all models
    const [formData, setFormData] = useState({
        // Category fields
        categorySlug: '',
        categoryName: '',
        categoryDescription: '',

        // Brand fields
        brandName: '',
        brandWebsite: '',

        // Product Model fields
        productName: '',
        productShortCode: '',
        productDescription: '',
        lifecycleStatus: 'active',
        productSpecJson: {},

        // Product Variant fields
        variantName: '',
        sku: '',
        mpn: '',
        upc: '',
        variantStatus: 'active',
        price: '',
        currency: 'INR',
        variantSpecJson: {},
        stockStatus: 'in_stock',

        // Image fields
        categoryImage: null,
        productImages: [], // Changed to array for multiple images
        imageAltTexts: [], // Array for multiple alt texts
        isMainImages: [] // Array for multiple main image flags
    });

    const [errors, setErrors] = useState({});
    const [currentStep, setCurrentStep] = useState(1);
    const [brands, setBrands] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [submitSuccess, setSubmitSuccess] = useState('');

    const APIURL = useSelector((state) => state.APIURL?.url);

    // Lifecycle choices
    const lifecycleChoices = [
        { value: 'active', label: 'Active' },
        { value: 'discontinued', label: 'Discontinued' },
        { value: 'end_of_life', label: 'End of Life' }
    ];

    // Stock status choices
    const stockStatusChoices = [
        { value: 'in_stock', label: 'In Stock' },
        { value: 'out_of_stock', label: 'Out of Stock' }
    ];

    const handleInputChange = (e) => {
        const { name, value, type, files, checked } = e.target;

        if (type === 'file') {
            if (name === 'productImages') {
                // Handle multiple file uploads
                const fileArray = Array.from(files);
                setFormData(prev => ({ 
                    ...prev, 
                    [name]: fileArray,
                    // Initialize corresponding arrays if needed
                    imageAltTexts: prev.imageAltTexts.length === 0 ? new Array(fileArray.length).fill('') : prev.imageAltTexts,
                    isMainImages: prev.isMainImages.length === 0 ? new Array(fileArray.length).fill(false) : prev.isMainImages
                }));
            } else {
                setFormData(prev => ({ ...prev, [name]: files[0] || null }));
            }
        } else if (type === 'checkbox') {
            setFormData(prev => ({ ...prev, [name]: !!checked }));
        } else if (name === 'productSpecJson' || name === 'variantSpecJson') {
            // Let users type freely; parse if valid, else store raw string
            try {
                const parsed = value ? JSON.parse(value) : {};
                setFormData(prev => ({ ...prev, [name]: parsed }));
            } catch {
                setFormData(prev => ({ ...prev, [name]: value }));
            }
        } else if (name === 'price') {
            // Optional: keep as string if you're sending FormData to backend
            setFormData(prev => ({ ...prev, [name]: value }));
            // OR coerce to number:
            // setFormData(prev => ({ ...prev, [name]: value === '' ? '' : Number(value) }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }

        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const validateForm = () => {
        const newErrors = {};

        // existing required checks...
        if (!formData.categorySlug.trim()) newErrors.categorySlug = 'Category slug is required';
        if (!formData.categoryName.trim()) newErrors.categoryName = 'Category name is required';
        if (!formData.brandName.trim()) newErrors.brandName = 'Brand name is required';
        if (!formData.productName.trim()) newErrors.productName = 'Product name is required';
        if (!formData.variantName.trim()) newErrors.variantName = 'Variant name is required';

        // JSON validity (optional)
        const tryParse = (val) => {
            if (typeof val === 'string' && val.trim() !== '') {
                try { JSON.parse(val); return true; } catch { return false; }
            }
            return true; // already object or empty
        };
        if (!tryParse(formData.productSpecJson)) newErrors.productSpecJson = 'Invalid JSON';
        if (!tryParse(formData.variantSpecJson)) newErrors.variantSpecJson = 'Invalid JSON';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const handleSubmit = async (e) => {

        console.log("entered")
        e.preventDefault();
        setIsLoading(true);
        setSubmitError('');
        setSubmitSuccess('');

        if (!validateForm()) {
            setIsLoading(false);
          
            const firstError = Object.values(errors).find(msg => msg);
            alert(firstError || 'Please fix the errors before submitting.');
            return;
          }

        try {
            // Prepare form data for API submission
            const productData = new FormData();

            // Category data
            productData.append('category_slug', formData.categorySlug);
            productData.append('category_name', formData.categoryName);
            productData.append('category_description', formData.categoryDescription);
            if (formData.categoryImage) {
                productData.append('category_image', formData.categoryImage);
            }

            // Brand data
            productData.append('brand_name', formData.brandName);
            productData.append('brand_website', formData.brandWebsite);

            // Product model data
            productData.append('product_name', formData.productName);
            productData.append('product_short_code', formData.productShortCode);
            productData.append('product_description', formData.productDescription);
            productData.append('lifecycle_status', formData.lifecycleStatus);
            productData.append('product_spec_json', JSON.stringify(formData.productSpecJson));

            // Product variant data
            productData.append('variant_name', formData.variantName);
            productData.append('sku', formData.sku);
            productData.append('mpn', formData.mpn);
            productData.append('upc', formData.upc);
            productData.append('variant_status', formData.variantStatus);
            productData.append('price', formData.price);
            productData.append('currency', formData.currency);
            productData.append('variant_spec_json', JSON.stringify(formData.variantSpecJson));
            productData.append('stock_status', formData.stockStatus);

            // Image data - handle multiple images
            if (formData.productImages && formData.productImages.length > 0) {
                formData.productImages.forEach((image, index) => {
                    productData.append('product_images', image);
                    productData.append(`image_alt_text_${index}`, formData.imageAltTexts[index] || '');
                    productData.append(`is_main_image_${index}`, formData.isMainImages[index] || false);
                });
            }

            console.log('Submitting product data to API...');
            const response = await axios.post(`${APIURL}/api/products/`, productData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            console.log('Product added successfully:', response);
            setSubmitSuccess('Product added successfully!');

            // Reset form
            setFormData({
                categorySlug: '',
                categoryName: '',
                categoryDescription: '',
                brandName: '',
                brandWebsite: '',
                productName: '',
                productShortCode: '',
                productDescription: '',
                lifecycleStatus: 'active',
                productSpecJson: {},
                variantName: '',
                sku: '',
                mpn: '',
                upc: '',
                variantStatus: 'active',
                price: '',
                currency: 'INR',
                variantSpecJson: {},
                stockStatus: 'in_stock',
                categoryImage: null,
                productImages: [],
                imageAltTexts: [],
                isMainImages: []
            });
            setCurrentStep(1);

        } catch (error) {
            console.error('Error adding product:', error);

            if (error.response?.data) {
                const errorData = error.response.data;
                if (errorData.category_slug) {
                    setSubmitError(`Category Slug: ${errorData.category_slug[0]}`);
                } else if (errorData.category_name) {
                    setSubmitError(`Category Name: ${errorData.category_name[0]}`);
                } else if (errorData.brand_name) {
                    setSubmitError(`Brand Name: ${errorData.brand_name[0]}`);
                } else if (errorData.product_name) {
                    setSubmitError(`Product Name: ${errorData.product_name[0]}`);
                } else if (errorData.variant_name) {
                    setSubmitError(`Variant Name: ${errorData.variant_name[0]}`);
                } else if (errorData.non_field_errors) {
                    setSubmitError(errorData.non_field_errors[0]);
                } else {
                    setSubmitError('Failed to add product. Please check your data and try again.');
                }
            } else if (error.request) {
                setSubmitError('Network error. Please check your connection and try again.');
            } else {
                setSubmitError('An unexpected error occurred. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const nextStep = () => {
        if (currentStep < 4) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };


    const handleCategoryNameChange = (e) => {
        const name = e.target.value;
        const selected = categories.find(c => c.name === name);
        console.log('Category name selected:', name, 'Found category:', selected);
        setFormData(prev => ({
            ...prev,
            categoryName: name,
            categorySlug: selected ? selected.slug : ''
        }));
        if (errors.categoryName) setErrors(prev => ({ ...prev, categoryName: '' }));
        if (errors.categorySlug) setErrors(prev => ({ ...prev, categorySlug: '' }));
    };



    const handleCategorySlugChange = (e) => {
        const slug = e.target.value;
        const selected = categories.find((cat) => cat.slug === slug);
        setFormData({
          ...formData,
          categorySlug: slug,
          categoryName: selected ? selected.name : "",
          categoryDescription: selected ? selected.description.join("\n• ") : ""
        });
      };

    // Helper functions for multiple images
    const handleImageAltTextChange = (index, value) => {
        const newAltTexts = [...formData.imageAltTexts];
        newAltTexts[index] = value;
        setFormData(prev => ({ ...prev, imageAltTexts: newAltTexts }));
    };

    const handleMainImageChange = (index, checked) => {
        const newMainImages = [...formData.isMainImages];
        // If setting one as main, unset all others
        if (checked) {
            newMainImages.fill(false);
        }
        newMainImages[index] = checked;
        setFormData(prev => ({ ...prev, isMainImages: newMainImages }));
    };

    const removeImage = (index) => {
        const newImages = formData.productImages.filter((_, i) => i !== index);
        const newAltTexts = formData.imageAltTexts.filter((_, i) => i !== index);
        const newMainImages = formData.isMainImages.filter((_, i) => i !== index);
        setFormData(prev => ({ 
            ...prev, 
            productImages: newImages,
            imageAltTexts: newAltTexts,
            isMainImages: newMainImages
        }));
    };


    const selectedCategory = categories.find(
        (cat) =>
            cat.slug === formData.categorySlug ||
            cat.name === formData.categoryName
    );


    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="step-content">
                        <h3>Category Information</h3>
                        <div className="form-group">
                            <label htmlFor="categorySlug" className="form-label">Category Slug *</label>
                            <select style={{
                                color: "black"
                            }}
                                id="categorySlug"
                                name="categorySlug"
                                value={formData.categorySlug}
                                onChange={handleCategorySlugChange}
                                className="form-select"
                                required
                            >
                                <option style={{
                                    color: "red"
                                }} value="">Select category slug</option>
                                {categories.map(cat => (
                                    <option style={{
                                        color: "black"
                                    }} key={cat.slug} value={cat.slug}>
                                        {cat.slug}
                                    </option>
                                ))}
                            </select>
                            {errors.categorySlug && <span className="error-message">{errors.categorySlug}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="categoryName" className="form-label">Category Name *</label>
                            <select

                                style={{
                                    color: "black"
                                }}
                                id="categoryName"
                                name="categoryName"
                                value={formData.categoryName}
                                onChange={handleCategoryNameChange}
                                className="form-select"
                                required
                            >
                                <option style={{
                                    color: "red"
                                }} value="">Select category name</option>
                                {categories.map(cat => (
                                    <option style={{
                                        color: "black"
                                    }} key={cat.slug} value={cat.name}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                            {errors.categoryName && <span className="error-message">{errors.categoryName}</span>}
                        </div>

                        {selectedCategory && (
                            <div
                                className="selected-category-description"
                                style={{
                                    marginTop: "12px",
                                    background: "#f9fafb",
                                    border: "1px solid #e5e7eb",
                                    borderRadius: "8px",
                                    padding: "12px 16px",
                                    color: "#333",
                                    fontFamily: "'Space Grotesk', sans-serif"
                                }}
                            >
                                <h4 style={{ margin: "0 0 8px", fontWeight: "600", fontSize: "15px" }}>
                                    {selectedCategory.name} – Description
                                </h4>
                                <ul style={{ margin: 0, paddingLeft: "20px" }}>
                                    {selectedCategory.description.map((point, index) => (
                                        <li key={index} style={{ marginBottom: "6px", fontSize: "14px" }}>
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}


                        <div className="form-group">
                            <label htmlFor="categoryImage" className="form-label">Category Image</label>
                            <input
                                type="file"
                                id="categoryImage"
                                name="categoryImage"
                                onChange={handleInputChange}
                                accept="image/*"
                                className="form-file-input"
                            />
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="step-content">
                        <h3>Brand Information</h3>
                        <div className="form-group">
                            <label htmlFor="brandName" className="form-label">Brand Name *</label>
                            <input
                                type="text"
                                id="brandName"
                                name="brandName"
                                value={formData.brandName}
                                onChange={handleInputChange}
                                placeholder="e.g., Apple, Samsung, Dell"
                                className="form-input"
                                required
                            />
                            {errors.brandName && <span className="error-message">{errors.brandName}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="brandWebsite" className="form-label">Brand Website</label>
                            <input
                                type="url"
                                id="brandWebsite"
                                name="brandWebsite"
                                value={formData.brandWebsite}
                                onChange={handleInputChange}
                                placeholder="https://www.brand-website.com"
                                className="form-input"
                            />
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className="step-content">
                        <h3>Product Model Information</h3>
                        <div className="form-group">
                            <label htmlFor="productName" className="form-label">Product Name *</label>
                            <input
                                type="text"
                                id="productName"
                                name="productName"
                                value={formData.productName}
                                onChange={handleInputChange}
                                placeholder="e.g., iPhone 15 Pro"
                                className="form-input"
                                required
                            />
                            {errors.productName && <span className="error-message">{errors.productName}</span>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="productShortCode" className="form-label">Product Short Code</label>
                            <input
                                type="text"
                                id="productShortCode"
                                name="productShortCode"
                                value={formData.productShortCode}
                                onChange={handleInputChange}
                                placeholder="e.g., IP15P"
                                className="form-input"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="productDescription" className="form-label">Product Description</label>
                            <textarea style={{
                                color:"black"
                            }}
                                id="productDescription"
                                name="productDescription"
                                value={formData.productDescription}
                                onChange={handleInputChange}
                                placeholder="Enter product description"
                                className="form-textarea"
                                rows="4"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="lifecycleStatus" className="form-label">Lifecycle Status</label>
                            <select style={{
                                color:"black"
                            }}
                                id="lifecycleStatus"
                                name="lifecycleStatus"
                                value={formData.lifecycleStatus}
                                onChange={handleInputChange}
                                className="form-select"
                            >
                                {lifecycleChoices.map(choice => (
                                    <option key={choice.value} value={choice.value}>
                                        {choice.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="productSpecJson" className="form-label">Product Specifications (JSON)</label>
                            <textarea style={{
                                color:"black"
                            }}
                                id="productSpecJson"
                                name="productSpecJson"
                                value={
                                    typeof formData.productSpecJson === 'string'
                                        ? formData.productSpecJson
                                        : JSON.stringify(formData.productSpecJson, null, 2)
                                }
                                onChange={handleInputChange}
                                placeholder='{"screen_size": "6.1 inches", "storage": "128GB"}'
                                className="form-textarea"
                                rows="4"
                            />
                        </div>
                    </div>
                );

            case 4:
                return (
                    <div className="step-content">
                        <h3>Product Variant & Images</h3>
                        <div className="form-group">
                            <label htmlFor="variantName" className="form-label">Variant Name *</label>
                            <input
                                type="text"
                                id="variantName"
                                name="variantName"
                                value={formData.variantName}
                                onChange={handleInputChange}
                                placeholder="e.g., 128GB Natural Titanium"
                                className="form-input"
                                required
                            />
                            {errors.variantName && <span className="error-message">{errors.variantName}</span>}
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="sku" className="form-label">SKU</label>
                                <input
                                    type="text"
                                    id="sku"
                                    name="sku"
                                    value={formData.sku}
                                    onChange={handleInputChange}
                                    placeholder="e.g., IP15P-128-NT"
                                    className="form-input"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="mpn" className="form-label">MPN</label>
                                <input
                                    type="text"
                                    id="mpn"
                                    name="mpn"
                                    value={formData.mpn}
                                    onChange={handleInputChange}
                                    placeholder="Manufacturer Part Number"
                                    className="form-input"
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="upc" className="form-label">UPC</label>
                                <input
                                    type="text"
                                    id="upc"
                                    name="upc"
                                    value={formData.upc}
                                    onChange={handleInputChange}
                                    placeholder="Universal Product Code"
                                    className="form-input"
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="price" className="form-label">Price</label>
                                <input
                                    type="number"
                                    id="price"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    placeholder="999.99"
                                    step="0.01"
                                    className="form-input"
                                />
                            </div>
                        </div>

                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="currency" className="form-label">Currency</label>
                                <select style={{
                                    color:"black"
                                }}
                                    id="currency"
                                    name="currency"
                                    value={formData.currency}
                                    onChange={handleInputChange}
                                    className="form-select"
                                >
                                    <option value="INR">INR</option>
                                    <option value="USD">USD</option>
                                    <option value="EUR">EUR</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="stockStatus" className="form-label">Stock Status</label>
                                <select style={{
                                    color:"black"
                                }}
                                    id="stockStatus"
                                    name="stockStatus"
                                    value={formData.stockStatus}
                                    onChange={handleInputChange}
                                    className="form-select"
                                >
                                    {stockStatusChoices.map(choice => (
                                        <option key={choice.value} value={choice.value}>
                                            {choice.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="variantSpecJson" className="form-label">Variant Specifications (JSON)</label>
                            <textarea style={{
                                color:"black"
                            }}
                                id="variantSpecJson"
                                name="variantSpecJson"
                                value={
                                    typeof formData.variantSpecJson === 'string'
                                        ? formData.variantSpecJson
                                        : JSON.stringify(formData.variantSpecJson, null, 2)
                                }
                                onChange={handleInputChange}
                                placeholder='{"color": "Natural Titanium", "storage": "128GB"}'
                                className="form-textarea"
                                rows="3"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="productImages" className="form-label">Product Images (Multiple)</label>
                            <input
                                type="file"
                                id="productImages"
                                name="productImages"
                                onChange={handleInputChange}
                                accept="image/*"
                                multiple
                                className="form-file-input"
                            />
                            <small className="form-help-text">You can select multiple images at once</small>
                        </div>

                        {/* Display uploaded images */}
                        {formData.productImages && formData.productImages.length > 0 && (
                            <div className="uploaded-images-container">
                                <h4>Uploaded Images ({formData.productImages.length})</h4>
                                <div className="images-grid">
                                    {formData.productImages.map((image, index) => (
                                        <div key={index} className="image-item">
                                            <div className="image-preview">
                                                <img 
                                                    src={URL.createObjectURL(image)} 
                                                    alt={`Preview ${index + 1}`}
                                                    className="preview-image"
                                                />
                                                <button 
                                                    type="button"
                                                    onClick={() => removeImage(index)}
                                                    className="remove-image-btn"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                            
                                            <div className="image-details">
                                                <div className="form-group">
                                                    <label className="form-label">Alt Text</label>
                                                    <input
                                                        type="text"
                                                        value={formData.imageAltTexts[index] || ''}
                                                        onChange={(e) => handleImageAltTextChange(index, e.target.value)}
                                                        placeholder="Alternative text for accessibility"
                                                        className="form-input"
                                                    />
                                                </div>
                                                
                                                <div className="form-group">
                                                    <label className="checkbox-label">
                                                        <input
                                                            type="checkbox"
                                                            checked={formData.isMainImages[index] || false}
                                                            onChange={(e) => handleMainImageChange(index, e.target.checked)}
                                                            className="form-checkbox"
                                                        />
                                                        Set as main image
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="admin-product-container">
            <Header />

            <div className="admin-product-card">
                <h1 className="admin-product-title">Add New Product</h1>

                {/* Error and Success Messages */}
                {submitError && (
                    <div className="error-message-container">
                        <p className="error-message-text">{submitError}</p>
                    </div>
                )}
                {submitSuccess && (
                    <div className="success-message-container">
                        <p className="success-message-text">{submitSuccess}</p>
                    </div>
                )}

                {/* Progress Steps */}
                <div className="progress-steps">
                    {[1, 2, 3, 4].map(step => (
                        <div key={step} className={`step ${currentStep >= step ? 'active' : ''}`}>
                            <div className="step-number">{step}</div>
                            <div className="step-label">
                                {step === 1 && 'Category'}
                                {step === 2 && 'Brand'}
                                {step === 3 && 'Product'}
                                {step === 4 && 'Variant & Images'}
                            </div>
                        </div>
                    ))}
                </div>

                <form className="admin-product-form" onSubmit={handleSubmit}>
                    {renderStepContent()}

                    <div className="form-actions">
                        {currentStep > 1 && (
                            <button type="button" onClick={prevStep} className="btn-secondary">
                                Previous
                            </button>
                        )}

                        {currentStep < 4 ? (
                            <button type="button" onClick={nextStep} className="btn-primary">
                                Next
                            </button>
                        ) : (
                            <button type="submit" className="btn-submit" disabled={isLoading}>
                                {isLoading ? 'Adding Product...' : 'Add Product'}
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminProduct;
