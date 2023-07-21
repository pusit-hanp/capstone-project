// CustomImageField.js
import React, { useState } from 'react';

const CustomImageField = ({ field, form: { touched, errors }, ...props }) => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
        field.onChange(e); // This ensures Formik can access the selected file
    };

    return (
        <div>
            <input
                type="file"
                accept="image/*"
                id={field.name}
                {...props}
                onChange={handleFileChange}
                style={{ padding: '10px' }}
            />
            {touched[field.name] && errors[field.name] && (
                <div className="error">{errors[field.name]}</div>
            )}
        </div>
    );
};

export default CustomImageField;
