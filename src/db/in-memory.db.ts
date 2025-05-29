import { Blog, Post } from './types';

export const db: { blogs: Blog[]; posts: Post[] } = {
  blogs: [
    {
      id: '1',
      name: 'Tech Insights',
      description: 'Latest updates and insights in technology.',
      websiteUrl: 'https://techinsights.example.com',
    },
    {
      id: '2',
      name: 'Foodie Fun',
      description: 'Delicious recipes and food adventures.',
      websiteUrl: 'https://foodiefun.example.com',
    },
    {
      id: '3',
      name: 'Travel Diaries',
      description: 'Stories and tips from around the world.',
      websiteUrl: 'https://traveldiaries.example.com',
    },
  ],
  posts: [
    {
      id: '101',
      title: 'AI Trends in 2024',
      shortDescription: 'A look at the most important AI trends this year.',
      content:
        'Artificial Intelligence continues to evolve rapidly. In 2024, we see trends such as generative AI, ethical AI, and more.',
      blogId: '1',
    },
    {
      id: '102',
      title: 'Understanding Quantum Computing',
      shortDescription: 'Basics of quantum computing explained.',
      content:
        'Quantum computing is set to revolutionize technology. Here’s what you need to know about qubits and superposition.',
      blogId: '1',
    },
    {
      id: '201',
      title: '5 Easy Pasta Recipes',
      shortDescription: 'Quick and delicious pasta dishes.',
      content:
        'Try these five easy pasta recipes for a tasty meal in under 30 minutes.',
      blogId: '2',
    },
    {
      id: '202',
      title: 'The Art of Sourdough',
      shortDescription: 'How to bake perfect sourdough bread.',
      content:
        'Sourdough bread baking is both an art and a science. Here’s how to get started.',
      blogId: '2',
    },
    {
      id: '203',
      title: 'Vegan Desserts You’ll Love',
      shortDescription: 'Delicious vegan treats for everyone.',
      content:
        'Discover a variety of vegan desserts that are easy to make and taste amazing.',
      blogId: '2',
    },
    {
      id: '301',
      title: 'Backpacking Through Europe',
      shortDescription: 'Tips for an unforgettable backpacking trip.',
      content:
        'Europe is perfect for backpackers. Here are some tips to make your journey smooth and memorable.',
      blogId: '3',
    },
    {
      id: '302',
      title: 'Top 10 Beaches in Asia',
      shortDescription: 'Explore the best beaches across Asia.',
      content:
        'From Thailand to the Philippines, discover the top 10 beaches you must visit in Asia.',
      blogId: '3',
    },
  ],
};
