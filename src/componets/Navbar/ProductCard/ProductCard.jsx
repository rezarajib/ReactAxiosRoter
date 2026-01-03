import React from 'react';

const ProductCard = ({ data }) => {
    const { title, type, items, link, footerText } = data;

    return (
        <div className="card bg-base-100 rounded-none shadow-sm hover:shadow-md transition-all duration-300 p-5 flex flex-col justify-between border border-gray-100 h-full">
            <div>
                <h2 className="text-[20px] font-bold mb-3 text-gray-800 leading-tight">
                    {title}
                </h2>

                {/* ডায়নামিক লেআউট লজিক */}
                {type === 'grid' ? (
                    <div className="grid grid-cols-2 gap-3">
                        {items.map((item, index) => (
                            <div key={index} className="group cursor-pointer">
                                <div className="bg-gray-50 aspect-square overflow-hidden mb-1">
                                    <img 
                                        src={item.img} 
                                        alt={item.label} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                                    />
                                </div>
                                <p className="text-[12px] text-gray-600 font-medium group-hover:text-primary">
                                    {item.label}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="cursor-pointer group">
                        <div className="bg-gray-50 aspect-[4/5] flex items-center justify-center overflow-hidden">
                            <img 
                                src={items[0].img} 
                                alt={title} 
                                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" 
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* কার্ডের নিচের একশন লিংক */}
            <div className="mt-5">
                <a 
                    href={link} 
                    className="text-sm text-[#007185] hover:text-[#C7511F] font-medium hover:underline transition-colors"
                >
                    {footerText}
                </a>
            </div>
        </div>
    );
};

export default ProductCard;