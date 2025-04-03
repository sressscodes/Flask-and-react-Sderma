import React, { useState } from 'react';
import './CSS/Articles.css'; // Import the external CSS file
import image1 from '../assets/image1.png'

const articleData = [
  {
    title: "How to Identify Your Skin Type",
    url: image1,
    img: "/static/images/image5.png",
    description: "Find out the best ways to determine your skin type and choose products accordingly."
  },
  {
    title: "Skin care in acne management",
    url: image1,
    img: "/static/images/image6.png",
    description: "Discover the truth behind skincare and acne and other conditions management."
  },
  {
    title: "Why Sunscreen is a Must All Year Round",
    url: image1,
    img: "/static/images/image7.png",
    description: "Understand the importance of using sunscreen every day, no matter the season."
  },
  {
    title: "Top Foods for Healthy, Glowing Skin",
    url: image1,
    img: "/static/images/image8.png",
    description: "Learn how your diet impacts your skin and which foods promote healthy skin."
  },
  {
    title: "How to Identify Your Skin Type",
    url: image1,
    img: "/static/images/image5.png",
    description: "Find out the best ways to determine your skin type and choose products accordingly."
  },
  {
    title: "Skin care in acne management",
    url: image1,
    img: "/static/images/image6.png",
    description: "Discover the truth behind skincare and acne and other conditions management."
  },
  {
    title: "Why Sunscreen is a Must All Year Round",
    url: image1,
    img: "/static/images/image7.png",
    description: "Understand the importance of using sunscreen every day, no matter the season."
  },
  {
    title: "Top Foods for Healthy, Glowing Skin",
    url: image1,
    img: "/static/images/image8.png",
    description: "Learn how your diet impacts your skin and which foods promote healthy skin."
  }
];

const Articles = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredArticles = articleData.filter(article =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className='main-container'>
      <header className="welcome-section">
        <h1>Skincare Education Hub</h1>
        <p>Explore expert advice, trusted dermatologists, and curated skincare products for your unique skin needs.</p>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for articles, tips, or topics..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-button">Search</button>
        </div>
      </header>

      <section id="topics" className="topics-section">
          {filteredArticles.map((article, index) => (
            <div key={index} className="article-card" data-title={article.title}>
              <img src={article.url} alt={article.title} />
              <h3>{article.title}</h3>
              <p>{article.description}</p>
            </div>
          ))}
      </section>
    </div>
  );
};

export default Articles;