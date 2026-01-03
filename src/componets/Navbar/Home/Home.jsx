import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AmazonHome = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAgricultureData = async () => {
            try {
                setLoading(true);
                // আপনার public ফোল্ডারে থাকা data.json কল করা হচ্ছে
                const response = await axios.get('/data.json');
                setProducts(response.data);
            } catch (err) {
                console.error("Fetch Error:", err);
                setError("পণ্যগুলো লোড করা যাচ্ছে না। দয়া করে ইন্টারনেট সংযোগ চেক করুন।");
            } finally {
                setLoading(false);
            }
        };

        fetchAgricultureData();
    }, []);

    // ১. লোডিং অবস্থা
    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center h-[70vh]">
                <span className="loading loading-spinner loading-lg text-warning"></span>
                <p className="mt-4 text-gray-500 font-medium">আপনার বাবার দোকানের তাজা পণ্যগুলো লোড হচ্ছে...</p>
            </div>
        );
    }

    // ২. এরর অবস্থা
    if (error) {
        return (
            <div className="flex justify-center mt-20 px-6">
                <div className="alert alert-error shadow-lg max-w-2xl rounded-none">
                    <span>{error}</span>
                    <button onClick={() => window.location.reload()} className="btn btn-sm btn-ghost border-white text-white">Retry</button>
                </div>
            </div>
        );
    }

    return (
        <main className="bg-[#EAEDED] py-10 min-h-screen">
            <div className="container mx-auto px-4 md:px-10 max-w-[1500px]">
                
                {/* প্রোডাক্ট গ্রিড শুরু */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((card) => (
                        <div key={card.id} className="card bg-white rounded-none shadow-sm hover:shadow-md transition-all duration-300 p-5 flex flex-col justify-between border border-gray-100">
                            
                            <div>
                                <h2 className="text-[21px] font-bold mb-3 text-gray-800 leading-tight">
                                    {card.title}
                                </h2>
                                
                                {/* ডায়নামিক লেআউট লজিক */}
                                {card.type === 'grid' ? (
                                    <div className="grid grid-cols-2 gap-3">
                                        {card.items.map((item, index) => (
                                            <div key={index} className="group cursor-pointer">
                                                <div className="bg-gray-50 aspect-square overflow-hidden mb-1">
                                                    <img 
                                                        src={item.img} 
                                                        alt={item.label} 
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                                                    />
                                                </div>
                                                <p className="text-[12px] text-gray-700 font-medium leading-tight">
                                                    {item.label}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="cursor-pointer group overflow-hidden bg-gray-50 flex items-center justify-center h-64">
                                        <img 
                                            src={card.items[0].img} 
                                            alt={card.title} 
                                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" 
                                        />
                                    </div>
                                )}
                            </div>

                            {/* কার্ডের নিচের একশন লিংক */}
                            <div className="mt-5">
                                <a href={card.link} className="text-sm text-[#007185] hover:text-[#C7511F] hover:underline font-medium transition-colors">
                                    {card.footerText}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
                {/* প্রোডাক্ট গ্রিড শেষ */}

            </div>
        </main>
    );
};

export default AmazonHome;