import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AmazonHome = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // ১. Axios দিয়ে ডাটা কল করা
        // নোট: এখানে আপনার আসল API URL দিন। আপাতত আমি একটি ফেক ইউআরএল দেখাচ্ছি।
        axios.get('data.json') 
            .then(res => {
                // ২. ডাটা স্টেট-এ সেট করা
                // যদি ডাটা কোনো অবজেক্টের ভেতর থাকে (যেমন: res.data.record), তবে সেটি দিন
                setProducts(res.data.record || res.data);
                setLoading(false);
            })
            .catch(err => {
                console.error("Data fetching error:", err);
                setLoading(false);
            });
    }, []);

    // ৩. লোডিং অবস্থায় Spinner দেখানো (DaisyUI)
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg text-warning"></span>
            </div>
        );
    }

    return (
        <div className="bg-gray-200 py-10">
            <div className="container mx-auto px-6">
                {/* প্রোডাক্ট গ্রিড */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map(card => (
                        <div key={card.id} className="card bg-base-100 rounded-none shadow-md p-5 flex flex-col justify-between">
                            <div>
                                <h2 className="card-title text-[21px] font-bold mb-3 text-black">{card.title}</h2>
                                
                                {/* ডায়নামিক লেআউট চেক: Grid নাকি Single */}
                                {card.type === 'grid' ? (
                                    <div className="grid grid-cols-2 gap-3">
                                        {card.items.map((item, index) => (
                                            <div key={index} className="cursor-pointer">
                                                <img src={item.img} alt={item.label} className="w-full h-24 object-cover" />
                                                <p className="text-[11px] mt-1 text-gray-700 font-medium">{item.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="cursor-pointer">
                                        <img src={card.items[0].img} alt={card.title} className="w-full h-64 object-contain" />
                                    </div>
                                )}
                            </div>

                            {/* কার্ডের নিচের লিংক */}
                            <div className="mt-4">
                                <a href={card.link} className="text-blue-600 text-sm hover:underline hover:text-orange-700">
                                    {card.footerText}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AmazonHome;