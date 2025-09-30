'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import AirbnbCard from '../../components/airbnb/AirbnbCard';

const AirbnbDetailPage = () => {
    const params = useParams();
    const router = useRouter();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { token } = useAuth();
    const listingId = params.id;
    const API_URL = `https://backendairbnb-befph8eegzabfudb.eastus2-01.azurewebsites.net/api/listings/${listingId}`;


    useEffect(() => {
        if (token) {
            fetchListing();
        }

    }, [listingId]);

    const fetchListing = async () => {
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
            setListing(data);
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
                <AirbnbCard listing={listing} />

            </div>
        );
    }
}

export default AirbnbDetailPage;