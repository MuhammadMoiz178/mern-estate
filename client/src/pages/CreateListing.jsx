    import React, { useState } from 'react'
    import {uploadToAppwrite,getFile} from '../appwrite'

    function CreateListing() {
//    const navigate = useNavigate()
    // const { currentUser } = useSelector(state => state.user)
    const [files, setFiles] = useState([])
    const [imageUploadError, setImageUploadError] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        imageUrls: [],
        name: "",
        description: "",
        address: "",
        type: "rent",
        bedrooms: 1,
        bathrooms: 1,
        regularPrice: 0,
        discountPrice: 0,
        offer: false,
        parking: false,
        furnished: false
    })
    // console.log(formData);
    // console.log(files);

    const storeImage = async (file) => {
        try {
            const res = await uploadToAppwrite(file)
            // console.log(res);
            const fileId = res.$id
            const url = await getFile(fileId)
            return url
            // return res
        } catch (error) {
            throw error
        }
    }
    const handleImageUpload = async () => {
        setUploading(true)
        if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
            try {
                const promises = files.map(file => storeImage(file))
                const urls = await Promise.all(promises)
                // console.log(urls);

                setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls) })
                setUploading(false)
            } catch (error) {
                console.error("Image upload failed", error)
            }
            setImageUploadError(false)
        }
        else {
            setImageUploadError("You can only upload 6 images per listing")
            setUploading(false)
        }
    }

     const handleImageDelete = (index) => {
        setFormData({
            ...formData,
            imageUrls: formData.imageUrls.filter((_, i) => i !== index)
        })
    }
        
    return (
        <main className='p-3 max-w-4xl mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-7'>Create a Listing</h1>
            <form className='flex flex-col sm:flex-row gap-4'>

            <div className='flex flex-col gap-3 flex-1'>
                <input type="text" placeholder='Name' className='border p-3 rounded-lg' 
                id='name' maxLength='62' minLength='10' required />
                    <textarea type="text" placeholder='Description' className='border p-3 rounded-lg' 
                id='description' required />
                    <input type="text" placeholder='Address' className='border p-3 rounded-lg' 
                id='address' required />

                {/* Outer div */}
                <div className='flex gap-6 flex-wrap'>
                {/* div for Sell CheckBox  */}
                <div className='flex gap-2'>
                    <input type="checkbox" id='sell' className='w-5' />
                    <span>Sell</span>
                </div> 
                {/* div for Rent CheckBox  */}
                <div className='flex gap-2'>
                    <input type="checkbox" id='rent' className='w-5' />
                    <span>Rent</span>
                </div> 
                {/* div for Parking Spot CheckBox  */}
                <div className='flex gap-2'>
                    <input type="checkbox" id='parking' className='w-5' />
                <span>Parking spot</span>
                </div> 
                {/* div for Furnished CheckBox  */}
                <div className='flex gap-2'>
                    <input type="checkbox" id='furnished' className='w-5' />
                    <span>Furnished</span>
                </div> 
                {/* div for Offer CheckBox  */}
                <div className='flex gap-2'>
                    <input type="checkbox" id='offer' className='w-5' />
                    <span>Offer</span>
                </div> 
            </div>
            {/* Another div for bed etc */}
            <div className='flex flex-wrap gap-6'>
                    {/* Div for beds */}
            <div className='flex items-center gap-2'>
                <input type="number" id="bedrooms" min='1' max='10' required  
                className='p-3 border border-gray-300 rounded-lg'/>
                    <p>Beds</p>
            </div>
                        {/* Div for baths */}
            <div className='flex items-center gap-2'>
                <input type="number" id="bathrooms" min='1' max='10' required  
                className='p-3 border border-gray-300 rounded-lg'/>
                    <p>Baths</p>
            </div>
                        {/* Div for Regular Price */}
            <div className='flex items-center gap-2'>
                <input type="number" id="regularPrice" min='1' max='10' required  
                className='p-3 border border-gray-300 rounded-lg'/>
                <div className='flex flex-col items-center'>
                        <p>Regular Price</p>
                        <span className='text-xs'>($ / Month)</span>
                </div> 
            </div>
                        {/* Div for Discount Price */}
            <div className='flex items-center gap-2'>
                <input type="number" id="discountedPrice" min='1' max='10' required 
                className='p-3 border border-gray-300 rounded-lg'/>
                <div className='flex flex-col items-center'>
                        <p>Discounted Price</p>
                        <span className='text-xs'>($ / Month)</span>
                </div> 
            </div>
            </div>



            </div>

            <div className='flex flex-col flex-1'>
                <p className='font-semibold'>Images:
                    <span className='font-normal text-gray-600 ml-2'>The first Image will be the cover (max 6)</span>
                </p>
                <div className='flex gap-4'>
                    <input 
                    onChange={(e)=>setFiles(Array.from(e.target.files))} 
                    className='p-3 border border-gray-300 rounded w-full' 
                    type="file" 
                    id='images' 
                    accept='image/*' 
                    multiple />
                    {/* Type button islsiye kiya hai ta ke form submit na hoo upload pe click krne pe */}
                    <button
                     onClick={handleImageUpload}
                     type='button'
                     disabled={uploading} 
                     className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg 
                    disabled:opacity-80'>
                    {uploading ? "Uploading..." : "Upload"}</button>
                </div>
                <p className='text-red-700'>{imageUploadError && imageUploadError}</p>
               {formData.imageUrls.map((url, idx) => (
                        <div key={url} className='flex justify-between p-3 border
                        border-gray-300 items-center'>
                            <img src={url} alt="listing image"
                                className='w-20 h-20 object-contain rounded-lg'
                            />
                            <button
                                onClick={() => handleImageDelete(idx)}
                                type='button'
                                className='p-3 text-red-700 rounded-lg uppercase hover:opacity-70'
                            >Delete</button>
                        </div>
                    ))}
                 <button  
                disabled={loading || uploading} 
                 className='p-3 mt-2 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95'>
                 {loading ? "Creating..." : "Create Listing"}</button>
            </div>
            </form>
        </main>
    )
    }

    export default CreateListing