import React from 'react';
import Hero from './blog-components/Hero';
import BlogContainer from './blog-components/BlogsContainer';

const Blog = () => {
  return <div className='w-full py-2 px-10 flex flex-col items-center justify-center gap-3 ' >
    <Hero/>
    <BlogContainer/>
  </div>
};

export default Blog;
