'use client'
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './airbnblist.css'
import AirbnbCard from './AirbnbCard';


const AirbnbList = () => {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const { token } = useAuth();
    const API_URL = `https://backendairbnb-befph8eegzabfudb.eastus2-01.azurewebsites.net/api/listings?pageSize=30&page=${currentPage}`;
    
    useEffect(() => {
        if (token) {
            fetchListings();
        }

    }, [currentPage]);

    const handlePageChange = (newPage) => {
        if(newPage < 1) return;
        setCurrentPage(newPage);
    }

    const fetchListings = async () => {
        try {

            const response = await fetch(API_URL,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                }
            );
            const data = await response.json();
            setListings(data);
            setLoading(false);
        }
        catch (error) {
            setError('Failed to fetch listings');
            setLoading(false);
        }
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!loading) {
        return (
            <div className="airbnb-page">
                <button className="back-button" onClick={() => handlePageChange(currentPage - 1)}>Anterior Pagina</button>
                <button className="back-button" onClick={() => handlePageChange(currentPage + 1)}>Siguiente Pagina</button>
                <div className="airbnb-container">
                    <div className="airbnb-header">
                        <h1 className="airbnb-title">Airbnb Listings</h1>
                    </div>
                    <div className="airbnb-content">
                        {error && <p className="error-message">{error}</p>}
                        <div className="airbnb-list-container">
                            <>
                                {listings.map((listing) => (
                                    <AirbnbCard key={listing._id} listing={listing} />
                                ))}
                            </>
                        </div>
                    </div>
                </div>
            </div>


        );
    }

}
export default AirbnbList;