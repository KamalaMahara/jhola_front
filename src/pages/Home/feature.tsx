import React from 'react';
import { Truck, ShieldCheck, Globe, RotateCcw } from 'lucide-react';

const Feature: React.FC = () => {
  const features = [
    {
      icon: <Truck size={20} />,
      title: "Fast Shipping",
      detail: "DELIVERED IN 24 HOURS"
    },
    {
      icon: <ShieldCheck size={20} />,
      title: "Secure Pay",
      detail: "100% PROTECTED PAYMENTS"
    },
    {
      icon: <Globe size={20} />,
      title: "Worldwide",
      detail: "SHIPPING TO YOUR DOOR"
    },
    {
      icon: <RotateCcw size={20} />,
      title: "Easy Returns",
      detail: "30-DAY HASSLE-FREE"
    },
  ];

  return (
    <div className="w-full bg-[#111827] border-y border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap lg:flex-nowrap items-center justify-between gap-y-10 gap-x-4">
          {features.map((item, index) => (
            <div key={index} className="flex items-center gap-5 group min-w-[200px]">
              {/* Icon Container with Subtle Glow */}
              <div className="relative">
                <div className="absolute inset-0 bg-[#F59E0B]/20 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative text-[#F59E0B] group-hover:scale-110 transition-transform duration-500 ease-out">
                  {item.icon}
                </div>
              </div>

              {/* Meaningful Labels */}
              <div className="flex flex-col">
                <span className="text-[10px] font-black tracking-[0.2em] text-[#F59E0B] uppercase mb-1">
                  {item.title}
                </span>
                <span className="text-xs md:text-sm font-bold text-[#F9FAFB] tracking-tight uppercase italic opacity-90">
                  {item.detail}
                </span>
              </div>

              {/* Vertical Minimalist Divider */}
              {index !== features.length - 1 && (
                <div className="hidden lg:block h-10 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent ml-auto" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feature;