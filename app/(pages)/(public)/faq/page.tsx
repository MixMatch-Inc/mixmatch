import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

const FAQ: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const faqItems: FAQItem[] = [
    {
      id: '1',
      question: 'How do I book a DJ through MixMatch?',
      answer: 'Booking a DJ is simple! Browse our selection of DJs, view their profiles, and click "Book Now" on their profile page. Fill out the booking form with your event details, and the DJ will receive your request. Once they accept, you can proceed with payment and contract signing.',
      category: 'Booking'
    },
    {
      id: '2',
      question: 'What types of events can I book a DJ for?',
      answer: 'MixMatch DJs are available for a wide range of events including weddings, corporate events, birthday parties, club nights, festivals, and private gatherings. Each DJ profile indicates the types of events they specialize in.',
      category: 'Booking'
    },
    {
      id: '3',
      question: 'How far in advance should I book a DJ?',
      answer: 'We recommend booking a DJ at least 2-3 months in advance for regular events, and 6-12 months for weddings or major events. Popular DJs tend to book up quickly, especially during peak seasons.',
      category: 'Booking'
    },
    {
      id: '4',
      question: 'What happens if the DJ cancels?',
      answer: 'In the rare event that a DJ needs to cancel, we'll work with you to find a suitable replacement with similar style and experience. If no replacement can be found, you'll receive a full refund of any payments made.',
      category: 'Cancellations'
    },
    {
      id: '5',
      question: 'Can I cancel my booking?',
      answer: 'Yes, you can cancel your booking according to our cancellation policy. Cancellations made more than 30 days before the event receive a full refund minus processing fees. Cancellations within 30 days are subject to partial refunds based on proximity to the event date.',
      category: 'Cancellations'
    },
    {
      id: '6',
      question: 'How do payments work?',
      answer: 'MixMatch uses a secure payment system. You'll pay a deposit (typically 25-50%) to confirm your booking, with the remaining balance due 1-2 weeks before your event. All payments are processed through our platform for security and record-keeping.',
      category: 'Payments'
    },
    {
      id: '7',
      question: 'Are there any additional fees beyond the DJ's rate?',
      answer: 'The DJ's rate typically includes standard equipment and performance time. Additional fees may apply for extra services like lighting, extended hours, travel beyond a certain distance, or special equipment requests. These will be clearly outlined before you confirm your booking.',
      category: 'Payments'
    },
    {
      id: '8',
      question: 'How are contracts handled?',
      answer: 'All bookings include a standard digital contract that protects both you and the DJ. The contract outlines services, payment terms, cancellation policy, and other important details. Both parties must sign the contract electronically before the booking is confirmed.',
      category: 'Contracts'
    },
    {
      id: '9',
      question: 'How do I become a DJ on MixMatch?',
      answer: 'To join MixMatch as a DJ, click on "Become a DJ" in the navigation menu and complete the application form. You'll need to provide information about your experience, equipment, music samples, and availability. Our team will review your application and get back to you within 5-7 business days.',
      category: 'For DJs'
    },
    {
      id: '10',
      question: 'What commission does MixMatch take from DJs?',
      answer: 'MixMatch takes a 15% commission on bookings made through our platform. This covers payment processing, marketing, customer service, and platform maintenance. DJs set their own rates, and the commission is calculated from the total booking amount.',
      category: 'For DJs'
    },
    {
      id: '11',
      question: 'How can I communicate with the DJ before my event?',
      answer: 'Once your booking is confirmed, you'll have access to our messaging system where you can communicate directly with your DJ. You can discuss music preferences, event details, and any special requests. We recommend finalizing all details at least two weeks before your event.',
      category: 'Communication'
    },
    {
      id: '12',
      question: 'What if I have a dispute with a DJ?',
      answer: 'If you encounter any issues with your DJ, please contact our customer support team immediately. We'll work with both parties to resolve the dispute fairly. All payments made through our platform are protected by our satisfaction guarantee.',
      category: 'Support'
    }
  ];

  const toggleItem = (id: string) => {
    setActiveId(activeId === id ? null : id);
  };

  const categories = Array.from(new Set(faqItems.map(item => item.category)));

  const filteredItems = faqItems.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         item.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory ? item.category === activeCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-gray-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900">Frequently Asked Questions</h1>
          <p className="mt-4 text-lg text-gray-600">
            Find answers to common questions about MixMatch
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search questions..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                activeCategory === null
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  activeCategory === category
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                  onClick={() => toggleItem(item.id)}
                >
                  <span className="text-lg font-medium text-gray-900">{item.question}</span>
                  {activeId === item.id ? (
                    <ChevronUp className="h-5 w-5 text-indigo-600" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  )}
                </button>
                {activeId === item.id && (
                  <div className="px-6 pb-4">
                    <div className="text-gray-700">{item.answer}</div>
                    <div className="mt-2 text-sm text-indigo-600">{item.category}</div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500">No matching questions found. Try a different search term.</p>
            </div>
          )}
        </div>

        {/* Contact Support */}
        <div className="mt-12 bg-indigo-50 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-indigo-900 mb-2">Still have questions?</h2>
          <p className="text-indigo-700 mb-4">
            Our support team is here to help with any other questions you might have.
          </p>
          <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default FAQ;