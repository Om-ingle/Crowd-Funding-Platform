import React from 'react';

const About = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-4">About Us</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="mb-4">
          We are a platform dedicated to connecting people who want to make a difference.
        </p>
        <h2 className="text-2xl font-semibold mb-2">Our Vision</h2>
        <p>Creating a world where everyone can make positive change through crowdfunding.</p>
      </div>
    </div>
  );
};

export default About;