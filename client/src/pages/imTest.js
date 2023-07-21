import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Button, Card, CardContent, CardHeader } from '@mui/material';

const CustomImageField = ({ field, form: { touched, errors }, ...props }) => {
    return (
        <div>
            <input type="file" accept="image/*" id={field.name} {...field} {...props} style={{ padding: '10px' }} />
            {touched[field.name] && errors[field.name] && <div className="error">{errors[field.name]}</div>}
        </div>
    );
};

const ImageUpload = () => {
    const initialValues = {
        title: '',
        description: '',
        imageFile: null,
        price: '',
        tags: '',
    };

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
        imageFile: Yup.mixed().required('An image file is required'),
        price: Yup.number().required('Price is required').positive('Price must be a positive number'),
        tags: Yup.string().required('Tags are required'),
    });

    const [uploadCount, setUploadCount] = useState(0);

    const handleSubmit = async (values, { setFieldValue }) => {
        const imageFile = document.getElementById('imageFile').files[0];
        const formData = new FormData();
        formData.append('title', values.title);
        formData.append('description', values.description);
        formData.append('price', values.price);
        formData.append('tags', values.tags);
        formData.append('imageFile', imageFile);

        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };

        try {
            await axios.post('/test_upload', formData, config);
            alert('The file is successfully uploaded');
            setUploadCount((prevCount) => prevCount + 1); // Increment the upload count
            setFieldValue('imageFile', null); // Reset the image field
        } catch (error) {
            console.error('Error uploading image:', error.message);
        }
    };

    return (
        <div className="imageUpload-body d-flex align-items-center justify-content-center flex-column mt-2" style={{ marginBottom: '20px' }}>
            <Card className="imageUpload-card mt-4" variant="outlined" sx={{ width: 800, padding: 1 }}>
                <CardHeader title="Image Upload" className="imageUpload-card-header mt-2" sx={{ fontSize: 20 }} />
                <CardContent className="imageUpload-card-content">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                        key={uploadCount} // Use upload count as the key to force re-mount on each upload
                    >
                        <Form>
                            <div>
                                <label>Title</label>
                                <Field type="text" name="title" placeholder="Enter image title" className="imageUpload-field" />
                                <ErrorMessage name="title" component="div" className="error" />
                            </div>

                            <div style={{ margin: '10px 0' }} />
                            <div>
                                <label>Description</label>
                                <Field
                                    component="textarea"
                                    name="description"
                                    placeholder="Enter description"
                                    rows="6"
                                    className="textArea-field"
                                />
                                <ErrorMessage name="description" component="div" className="error" />
                            </div>

                            <div style={{ margin: '10px 0' }} />
                            <div>
                                <label>Tags</label>
                                <Field type="text" name="tags" placeholder="Enter tags" className="imageUpload-field" />
                                <ErrorMessage name="tags" component="div" className="error" />
                            </div>

                            <div style={{ margin: '10px 0' }} />
                            <div>
                                <label>Price</label>
                                <Field type="number" name="price" placeholder="Enter price" className="imageUpload-field" />
                                <ErrorMessage name="price" component="div" className="error" />
                            </div>

                            <div style={{ margin: '10px 0' }} />
                            <div>
                                <label>Image file</label>
                                <Field component={CustomImageField} name="imageFile" />
                            </div>

                            <div style={{ margin: '10px 0' }} />
                            <div className="d-flex flex-column align-items-center">
                                <Button type="submit" className="mt-3" color="primary" variant="contained">
                                    Upload
                                </Button>
                            </div>
                        </Form>
                    </Formik>
                </CardContent>
            </Card>
        </div>
    );
};

export default ImageUpload;
