import React, { useEffect, useState } from 'react';
import axios from 'axios';
// Recharts ইম্পোর্ট করা হচ্ছে
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AmazonHome = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // চার্টের জন্য ডামি ডাটা (আপনার বাবার ব্যবসার মাসিক বিক্রয় বা দামের ট্রেন্ড)
    const chartData = [
        { month: 'জানুয়ারি', sales: 400, price: 240 },
        { month: 'ফেব্রুয়ারি', sales: 300, price: 139 },
        { month: 'মার্চ', sales: 200, price: 980 },
        { month: 'এপ্রিল', sales: 278, price: 390 },
        { month: 'মে', sales: 189, price: 480 },
        { month: 'জুন', sales: 239, price: 380 },
    ];

    useEffect(() => {
        const fetchAgricultureData = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/data.json');
                setProducts(response.data);
            } catch (err) {
                setError("পণ্যগুলো লোড করা যাচ্ছে না।");
            } finally {
                setLoading(false);
            }
        };
        fetchAgricultureData();
    }, []);

    if (loading) return <div className="text-center mt-20">লোড হচ্ছে...</div>;

    return (
        <main className="bg-[#EAEDED] py-10 min-h-screen">
            <div className="container mx-auto px-4 md:px-10 max-w-[1500px]">
                
                {/* --- Recharts সেকশন শুরু --- */}
                <div className="bg-white p-6 mb-10 shadow-sm border border-gray-100">
                    <h2 className="text-xl font-bold mb-5 text-gray-800">বাজার দর ও চাহিদা বিশ্লেষণ (মাসিক)</h2>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#febd69" stopOpacity={0.8}/>
                                        <stop offset="95%" stopColor="#febd69" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                                <XAxis dataKey="month" stroke="#888" fontSize={12} />
                                <YAxis stroke="#888" fontSize={12} />
                                <Tooltip 
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                />
                                <Area 
                                    type="monotone" 
                                    dataKey="sales" 
                                    stroke="#232f3e" 
                                    fillOpacity={1} 
                                    fill="url(#colorSales)" 
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                {/* --- Recharts সেকশন শেষ --- */}

                {/* প্রোডাক্ট গ্রিড */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.map((card) => (
                        <div key={card.id} className="card bg-white rounded-none shadow-sm p-5 border border-gray-100 flex flex-col justify-between">
                            <div>
                                <h2 className="text-[21px] font-bold mb-3 text-gray-800">{card.title}</h2>
                                {card.type === 'grid' ? (
                                    <div className="grid grid-cols-2 gap-3">
                                        {card.items.map((item, index) => (
                                            <div key={index}>
                                                <div className="bg-gray-50 aspect-square overflow-hidden mb-1">
                                                    <img src={item.img} alt={item.label} className="w-full h-full object-cover" />
                                                </div>
                                                <p className="text-[12px] font-medium">{item.label}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="h-64 bg-gray-50 flex items-center justify-center">
                                        <img src={card.items[0].img} alt={card.title} className="w-full h-full object-contain" />
                                    </div>
                                )}
                            </div>
                            <div className="mt-5">
                                <a href={card.link} className="text-sm text-[#007185] font-medium hover:underline">
                                    {card.footerText}
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </main>
    );
};

export default AmazonHome;