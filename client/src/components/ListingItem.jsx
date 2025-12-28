import React from 'react'
import { Link } from 'react-router-dom'
function ListingItem({listing}) {
    console.log(listing.imageUrls[0]);
    
  return (
    <div>
    <Link to={`/listing/${listing._id}`}>
    <img src={listing.imageUrls[0]} alt="" />
    </Link>
    </div>
  )
}

export default ListingItem