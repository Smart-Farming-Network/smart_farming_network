'use client';
import Image from 'next/image';
import { useState } from 'react';

export default function ContentDetailPage() {
  const [bookmarked, setBookmarked] = useState(false);

  const relatedItems = [
    {
      title: 'Precision Farming Techniques',
      image: '/assets/img/related/1.jpeg',
      link: '#'
    },
    {
      title: 'Investment Opportunities in Agritech',
      image: '/assets/img/related/2.jpeg',
      link: '#'
    },
    {
      title: 'Smart Irrigation Methods',
      image: '/assets/img/related/3.jpeg',
      link: '#'
    }
  ];

  return (
    <div className="container py-10 px-4 max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold max-w-3xl">Revolutionizing Agriculture with AI-Powered Insights</h1>
        <button
          onClick={() => setBookmarked(!bookmarked)}
          className={`text-2xl ${bookmarked ? 'text-yellow-500' : 'text-gray-400'}`}
        >
          <i className={`fas ${bookmarked ? 'fa-bookmark' : 'fa-bookmark'}`}></i>
        </button>
      </div>

      {/* Responsive Centered Media Embed */}
      <div className="relative w-full h-64 md:h-[500px] mb-10 rounded-xl overflow-hidden shadow-md mx-auto">
        <iframe
          className="absolute top-0 left-0 w-full h-full"
          src="https://www.youtube.com/embed/ipUuoMCEbDQ"
          title="Educational Video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* Content Body */}
      <div className="prose max-w-none text-lg">
        <p>
          Agriculture is undergoing a technological revolution. With AI-driven solutions, farmers now access real-time data insights to enhance productivity, minimize waste, and improve crop quality.
        </p>
        <h2>Benefits of AI in Agriculture</h2>
        <ul>
          <li>Predictive analytics for weather and yield forecasting</li>
          <li>Smart pest control and disease detection</li>
          <li>Efficient resource allocation and cost savings</li>
        </ul>
        <p>
          Our Smart Farming Network (GSFN) platform provides innovative services tailored for every aspect of the agricultural value chain.
        </p>
      </div>

      {/* Related Items */}
      <div className="mt-12">
        <h3 className="text-2xl font-semibold mb-4">Related Content</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedItems.map((item, index) => (
            <a
              href={item.link}
              key={index}
              className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
            >
              <div className="relative w-full h-48">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
              </div>
              <div className="p-4">
                <h4 className="font-medium text-lg">{item.title}</h4>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
