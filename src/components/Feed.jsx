import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import MasonryLayout from './MasonryLayout';
import Spinner from './Spinner';

import { useFeedQueryMutation } from '../features/pin/pinApiSlice';

const Feed = () => {
    const [pins, setPins] = useState();
    const [loading, setLoading] = useState(false);
    const { categoryId } = useParams();
    const [feedQuery] = useFeedQueryMutation();

    useEffect(() => {
        if (categoryId) {
            setLoading(true);
            // const query = searchQuery(categoryId);
            // client.fetch(query).then((data) => {
                // setPins(data);
                // setLoading(false);
            // });
        } else {
            setLoading(true);
            feedQuery().then((data) => {
                console.log(data.data)
                setPins(data.data);
                setLoading(false);
            })
            // client.fetch(feedQuery).then((data) => {
                // setPins(data);
                setLoading(false);
            // });
        }
    }, [categoryId]);
    const ideaName = categoryId || 'new';
    if (loading) {
        return (
            <Spinner message={`We are adding ${ideaName} ideas to your feed!`} />
        );
    }
    return (
        <div>
            {pins && (
                <MasonryLayout pins={pins} />
            )}
        </div>
    );
};

export default Feed;