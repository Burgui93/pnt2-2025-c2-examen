import React, { useEffect, useState } from 'react';
import { FaHome } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons'
import './airbnblist.css'
import Link from 'next/link';

export default function AirbnbCard({ listing }) {
    const [imageError, setImageError] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
        localStorage.setItem(`favorite-${listing._id}`, JSON.stringify(!isFavorite));
    };

    useEffect(() => {
        const savedFavorite = localStorage.getItem(`favorite-${listing._id}`);
        if (savedFavorite) {
            setIsFavorite(JSON.parse(savedFavorite));
        }
    }, [listing._id]);


    const handleImageError = () => {
        setImageError(true);
    };

    return (
        <div className="airbnb-card">



            {listing.images.picture_url && !imageError ? (
                <img
                    src={listing.images.picture_url}
                    alt={listing.title}
                    className="airbnb-image-container"
                    onError={handleImageError}
                />

            ) : (
                <div className="">
                    <FaHome className="airbnb-url-icon" />
                </div>
            )}

            <div>
                <h3 className="airbnb-name">{listing.name}</h3>
                <FontAwesomeIcon
                    icon={isFavorite ? solidHeart : regularHeart}
                    className="favorite-icon"
                    onClick={toggleFavorite}
                />
            </div>
            <p className="airbnb-url">{listing.listing_url}</p>
            <p className="airbnb-summary">{listing.summary}</p>
            <Link href={`/airbnb/${listing._id}`} className="airbnb-subtitle">Ver Detalles</Link>

        </div>
    );
}


