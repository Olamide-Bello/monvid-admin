import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { faNairaSign } from '@fortawesome/free-solid-svg-icons';
import './ProductForm.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function ProductForm() {
    const [image, setImage] = useState("")
    const [imageUrl, setImageUrl] = useState("")
    const [loading, setLoading] = useState(false)
    const token = localStorage.getItem("admin-token");
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const uploadImage = async () => {
        setLoading(true)
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "monvid")
        data.append("cloud_name", "olarts")
        const response = await fetch("https://api.cloudinary.com/v1_1/olarts/image/upload", {
            method: "post",
            body: data
        })
        const result = await response.json()
        console.log(result)
        setLoading(false)
        setImageUrl(result.url)
        toast.success("Image upload successful!")

    }
    const OnSubmit = async (data) => {
        console.log(token)
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Access-Control-Allow-Origin", "http://localhost:3001");
        myHeaders.append("Authorization", `Bearer ${token}`)
        const updated = {
            ...data, image: imageUrl
        }
        console.log(updated)
        const raw = JSON.stringify(updated);
        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
            mode: 'cors'
        };
        const response = await fetch('http://localhost:3000/item/items', requestOptions)

        if (response.ok) {
            const result = await response.json()
            toast.success("Product upload successful!")
            navigate(`/product/${result._id}`)
            console.log(result)
        }


    }
    return (
        <div className='product-upload'>
            <div className='preview'>
                <h3>Product preview</h3>
                {loading ? <Spinner /> :
                    <>{imageUrl ?
                        <div className='preview-container'><img id='product-preview' src={imageUrl} alt='product' /></div> :
                        <p>Uploaded product's picture will be displayed here</p>}
                    </>
                }
            </div>
            <div className='form'>
                <div className='form-group1'>
                    <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                    <button onClick={uploadImage} id='image-upload-btn'>Upload Image</button>
                </div>
                <form onSubmit={handleSubmit(OnSubmit)}>
                    <div className='form-group1'>
                        <label htmlFor="brand">Manufacturer</label><br />
                        <input
                            type='text'
                            name='brand'
                            id='brand'
                            {...register("brand",
                                {
                                    required: "Manufacturer's name is required"
                                })
                            }
                        />
                        {errors.brand && (<p className="errorMsg">{errors.brand.message}</p>)}
                    </div>
                    <div className='form-group1'>
                        <label htmlFor="name">Product Name</label><br />
                        <input
                            type='name'
                            name='name'
                            id='name'
                            {...register("name",
                                {
                                    required: "Product name is required"
                                })
                            }
                        />
                        {errors.name && (<p className="errorMsg">{errors.name.message}</p>)}
                    </div>
                    <div className='form-group1'>
                        <label htmlFor='description'>Product's Description</label><br />
                        <input
                            type='text'
                            name='description'
                            id='description'
                            {...register("description",
                                {
                                    required: "Description is required"
                                })
                            }
                        />
                        {errors.description && (<p className="errorMsg">{errors.description.message}</p>)}
                    </div>
                    <div className='form-group1'>
                        <label htmlFor='category'>Product's category</label><br />
                        <input
                            type='text'
                            name='category'
                            id='category'
                            {...register("category",
                                {
                                    required: "Product category is required"
                                })
                            }
                        />
                        {errors.category && (<p className="errorMsg">{errors.category.message}</p>)}
                    </div>
                    <div className='form-group1'>
                        <label htmlFor='price'>Unit Price (<FontAwesomeIcon icon={faNairaSign}/>)</label><br />
                        <input
                            type='number'
                            name='price'
                            id='price'
                            {...register("price",
                                {
                                    required: "price is required"
                                })
                            }
                        />
                        {errors.price && (<p className="errorMsg">{errors.price.message}</p>)}
                    </div>
                    <button type='submit' id='submit-btn'><strong>Upload Product</strong></button>

                </form>
            </div>
        </div>
    )
}

export default ProductForm