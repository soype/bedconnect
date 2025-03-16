'use client'

import { useState, useEffect, use } from 'react';

export default function DashboardPosts(){

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        const res = await fetch('/api/bookings');
        if (!res.ok) {
            setPosts([])
            throw new Error(`HTTP error! Status: ${res.status}`);
        }
        const data = await res.json();
        setPosts(data);
    }

    return(
        <div>
            <h2>Posts</h2>
            {posts.map(post => {
                return(
                    <div key={post.id}>
                        <h3>{post.title}</h3>
                        <img src={post.photo} alt={post.title} />
                    </div>
                )
            })}
        </div>
    )
}