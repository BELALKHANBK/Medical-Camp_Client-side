import React from 'react';

// BeautifulCard Component
const BeautifulCard = ({ image, title, subtitle, description }) => {
  return (
    <div className="max-w-6xl  bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-2 hover:scale-105">
      <img src={image} alt={title} className="w-full h-56 object-cover" />
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-1">{title}</h2>
        {subtitle && <h3 className="text-md font-medium text-indigo-600 mb-2">{subtitle}</h3>}
        <p className="text-gray-600 mb-4">{description}</p>
       
      </div>
    </div>
  );
};

// CardGallery Component
const CardGallery = () => {
  const cards = [
    {
      image: 'https://i.ibb.co.com/8Lk7b6f0/b1.jpg',
      title: 'Dental Filling',
      subtitle: 'Free Checkup',
      description: 'Pellentesque vel placerat risus. Nunc tristique est in hendrerit fringilla. Pellentesque habitant morbi tristique senectus et netus et malesuada...',
      buttonText: 'Learn More'
    },
    {
      image: 'https://i.ibb.co.com/1fGPQDKM/b2.jpg',
      title: 'Dentistry',
      subtitle: 'Health Awareness',
      description: 'Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae...',
      buttonText: 'Learn More'
    },
    {
      image: 'https://i.ibb.co.com/HTxNnpdm/b3.jpg',
      title: 'Dental Bridges',
      subtitle: 'Medicine Distribution',
      description: 'Maecenas nec odio et ante tincidunt tempus. Donec vitae. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem...',
      buttonText: 'Learn More'
    },
    {
      image: 'https://i.ibb.co.com/4Z7fZ55n/b4.jpg',
      title: 'Veneers',
      subtitle: 'Medicine Distribution',
      description: 'Sed consequat, leo eget bibendum sodales, augue duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna...',
      buttonText: 'Learn More'
    },
    {
     image: 'https://i.ibb.co.com/cXVzjq5n/b5.jpg',
      title: 'Invisalign',
      subtitle: 'Medicine Distribution',
      description: 'Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue...',
      buttonText: 'Learn More'
    }, 
    {
     image: 'https://i.ibb.co.com/DDcXW8fp/b6.jpg',
      title: 'Crowns',
      subtitle: 'Medicine Distribution',
      description: 'Donec sodales sagittis magna. Sed consequat fringilla mauris tiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed...',
      buttonText: 'Learn More'
    } 
  ];

  return (
    <div className="p-6 w-full grid grid-cols-1   md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <BeautifulCard
          key={index}
          image={card.image}
          title={card.title}
          subtitle={card.subtitle}
          description={card.description}
          
        />
      ))}
    </div>
  );
};

export default CardGallery;
