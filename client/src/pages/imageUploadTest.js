import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, Card, CardContent, CardHeader } from '@mui/material';
import * as Yup from 'yup';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

const ReactUploadImage = () => {
    const [error, setError] = useState('');

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required'),
        description: Yup.string().required('Description is required'),
        price: Yup.number().required('Price is required').min(0),
        imageFile: Yup.mixed().required('An image file is required'),
    });

    const imageUpload = async (values, { resetForm }) => {
        setError('');

        try {
            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('description', values.description);
            formData.append('price', values.price);
            formData.append('imageFile', values.imageFile);

            await axios.post('/test_upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Successful upload new image, show success message
            alert('The file is successfully uploaded');
            // Reset the form after successful upload
            resetForm();
        } catch (error) {
            // Handle error if upload fails
            setError('Error uploading image. Please try again.');
        }
    };

    return (
        <>
            <Helmet>
                <title>Upload new image</title>
            </Helmet>
            <Link to="/" className="d-flex justify-content-center">
                <h1 className="text-center mt-5">DevCorner</h1>
            </Link>
            <div className="imageUpload-body d-flex align-items-center justify-content-center flex-column mt-2">
                <Card
                    className="imageUpload-card mt-4"
                    variant="outlined"
                    sx={{
                        width: 800,
                        padding: 1,
                    }}
                >
                    <CardHeader
                        title="Image Upload"
                        className="imageUpload-card-header mt-2"
                        sx={{
                            fontSize: 20,
                        }}
                    />
                    <CardContent className="imageUpload-card-content">
                        {error && <p className="error">{error}</p>}
                        <Formik
                            initialValues={{
                                title: '',
                                description: '',
                                tags: '',
                                price: '',
                                imageFile: '',
                            }}
                            validationSchema={validationSchema}
                            onSubmit={imageUpload}
                        >
                            {({ isSubmitting, setFieldValue }) => (
                                <Form>
                                    <div>
                                        <label>Title</label>
                                        <Field
                                            type="text"
                                            name="title"
                                            id="title"
                                            placeholder="Enter image title"
                                            className="imageUpload-field"
                                        />
                                        <ErrorMessage name="title" component="div" className="error" />
                                    </div>
                                    {/* Add other form fields for description, tags, price, and imageFile */}
                                    {/* ... */}

                                    <div>
                                        <label>Image file</label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            name="imageFile"
                                            id="imageFile"
                                            className="imageUpload-field"
                                            onChange={(event) => {
                                                setFieldValue('imageFile', event.currentTarget.files[0]);
                                            }}
                                        />
                                        <ErrorMessage name="imageFile" component="div" className="error" />
                                    </div>

                                    <div className="d-flex flex-column align-items-center">
                                        <Button
                                            type="submit"
                                            className="mt-3"
                                            color="primary"
                                            variant="contained"
                                            disabled={isSubmitting}
                                        >
                                            Upload
                                        </Button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default ReactUploadImage;
