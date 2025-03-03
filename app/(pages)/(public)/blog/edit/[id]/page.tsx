"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { 
  Bold, Italic, List, ListOrdered, Link as LinkIcon, 
  Image as ImageIcon, Check, X, Trash2, AlertTriangle
} from 'lucide-react';
import { format } from 'date-fns';
import Image from 'next/image';

// Define the Blog Post interface
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  coverImage: string;
  author: string;
  createdAt: string;
  updatedAt?: string;
  published: boolean;
}

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const contentRef = useRef<HTMLDivElement>(null);
  const id = params.id as string;
  
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [tags, setTags] = useState('');
  const [coverImage, setCoverImage] = useState('/images/profile/background.png');
  const [author, setAuthor] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  
  // New modal states
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successAction, setSuccessAction] = useState<'update' | 'delete' | null>(null);

  useEffect(() => {
    if (id) {
      fetchBlogPost();
    }
  }, [id]);
  
   // Rich text editor commands
   const execCommand = (command: string, value: string | null = null) => {
    const selection = window.getSelection();
    if (!selection) return;
    
    // Save current selection
    const range = selection.getRangeAt(0);
    
    // Focus back on editor and restore selection
    contentRef.current?.focus();
    selection.removeAllRanges();
    selection.addRange(range);
    
    // Execute command
    document.execCommand(command, false, value);
  };

  const handleLink = () => {
    if (linkUrl) {
      execCommand('createLink', linkUrl);
      setShowLinkModal(false);
      setLinkUrl('');
    }
  };

  const handleImage = () => {
    if (imageUrl) {
      execCommand('insertImage', imageUrl);
      setShowImageModal(false);
      setImageUrl('');
    }
  };

  const handleListCommand = (command: 'insertUnorderedList' | 'insertOrderedList') => {
    const selection = window.getSelection();
    if (!selection) return;
    const range = selection.getRangeAt(0);
    
    const selectedContent = range.toString();
    
    if (!selectedContent) {
      const listItem = document.createElement('li');
      listItem.textContent = '\u200B';
      
      const list = document.createElement(command === 'insertUnorderedList' ? 'ul' : 'ol');
      list.appendChild(listItem);
      
      range.insertNode(list);
      
      const newRange = document.createRange();
      newRange.setStart(listItem, 0);
      newRange.collapse(true);
      
      selection.removeAllRanges();
      selection.addRange(newRange);
    } else {
      execCommand(command);
    }
  };
  
  const fetchBlogPost = async () => {
    setIsLoading(true);
    
    try {
      // Simulated API call
      setTimeout(() => {
        const mockBlogPost: BlogPost = {
          id,
          title: 'Top 10 Tips for Hiring the Perfect DJ for Your Occasion',
          excerpt: 'Find the best DJ for your event with these essential tips. Our comprehensive guide walks you through everything you need to know.',
          content: `
            <h2>1. Check Their Experience</h2>
            <p>Make sure your DJ has experience with events similar to yours. Ask about their background and how many events like yours they've done before.</p>
            
            <h2>2. Listen to Their Mixes</h2>
            <p>Ask for sample mixes or check their online profiles to get a feel for their style and music selection abilities.</p>
            
            <h2>3. Read Reviews</h2>
            <p>Check testimonials and reviews from previous clients to gauge their reputation and reliability.</p>
            
            <h2>4. Meet in Person</h2>
            <p>If possible, meet with potential DJs in person to discuss your event and see if your personalities mesh well.</p>
            
            <h2>5. Discuss Music Preferences</h2>
            <p>Make sure they understand your music preferences and are willing to accommodate your requests.</p>
          `,
          tags: ['music', 'dj', 'events', 'hiring', 'tips'],
          coverImage: '/images/profile/background.png',
          author: 'DJ Expert',
          createdAt: '2025-02-15',
          published: true
        };
        
        // Set form data
        setTitle(mockBlogPost.title);
        setExcerpt(mockBlogPost.excerpt);
        setTags(mockBlogPost.tags.join(', '));
        setCoverImage(mockBlogPost.coverImage);
        setAuthor(mockBlogPost.author);
        
        // Set editor content
        if (contentRef.current) {
          contentRef.current.innerHTML = mockBlogPost.content;
        }
        
        setIsLoading(false);
      }, 800);
      
    } catch (error) {
      console.error('Error fetching blog post:', error);
      setErrorMessage('Failed to load blog post.');
      setShowErrorModal(true);
      setIsLoading(false);
    }
  };
  
  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCoverImage(imageUrl);
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contentRef.current) return;
    
    setIsSubmitting(true);
    
    const updatedBlogPost: Partial<BlogPost> = {
      title,
      excerpt,
      content: contentRef.current.innerHTML,
      tags: tags.split(',').map(tag => tag.trim()),
      coverImage,
      author,
      updatedAt: format(new Date(), 'yyyy-MM-dd')
    };
    
    try {
      console.log('Blog post updated:', updatedBlogPost);
      
      // For demo purposes, simulate successful update
      setTimeout(() => {
        setSuccessAction('update');
        setShowSuccessModal(true);
        setIsSubmitting(false);
      }, 500);
      
    } catch (error) {
      console.error('Error updating blog post:', error);
      setErrorMessage('Failed to update blog post. Please try again.');
      setShowErrorModal(true);
      setIsSubmitting(false);
    }
  };
  


  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
        <div className="text-center">
          <div className="w-12 h-12 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading blog post...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Link Modal */}
      {showLinkModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add Link</h2>
            <input
              type="text"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
              placeholder="Enter URL"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowLinkModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={handleLink}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Add Image</h2>
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
              placeholder="Enter Image URL"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowImageModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={handleImage}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex items-center gap-3 mb-4">
              <Check className="w-6 h-6 text-green-500" />
              <h2 className="text-xl font-bold">Success</h2>
            </div>
            <p className="mb-6">
              {successAction === 'update' 
                ? 'Blog post updated successfully!' 
                : 'Blog post deleted successfully!'}
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  router.push('/blog');
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Error Modal */}
      {showErrorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex items-center gap-3 mb-4">
              <X className="w-6 h-6 text-red-500" />
              <h2 className="text-xl font-bold">Error</h2>
            </div>
            <p className="mb-6">{errorMessage}</p>
            <div className="flex justify-end">
              <button
                onClick={() => setShowErrorModal(false)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Edit Blog Post</h1>
        <div className="flex items-center gap-4">
      
          <button
            type="button"
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-900"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter blog post title"
            required
          />
        </div>
        
        {/* Author */}
        <div>
          <label htmlFor="author" className="block text-sm font-medium mb-1">
            Author
          </label>
          <input
            type="text"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter author name"
            required
          />
        </div>
        
        {/* Excerpt */}
        <div>
          <label htmlFor="excerpt" className="block text-sm font-medium mb-1">
            Excerpt
          </label>
          <textarea
            id="excerpt"
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write a brief summary for your blog post"
            rows={3}
            required
          />
        </div>
        
        {/* Cover Image */}
        <div>
          <label htmlFor="coverImage" className="block text-sm font-medium mb-1">
            Cover Image
          </label>
          <div className="flex items-center gap-4">
            <input
              type="file"
              id="coverImage"
              accept="image/*"
              onChange={handleCoverImageChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
            <div className="h-24 w-24 relative">
              <Image
                key={coverImage}
                src={coverImage ?? ""}
                alt="Cover preview"
                width={1450}
                height={900}
                className="h-full w-full object-cover rounded-md"
              />
            </div>
          </div>
        </div>
        
        {/* Tags */}
        <div>
          <label htmlFor="tags" className="block text-sm font-medium mb-1">
            Tags (comma separated)
          </label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="music, dj, tips"
          />
        </div>
        
        {/* Rich Text Editor */}
        <div className="border border-gray-300 rounded-md overflow-hidden">
          <div className="bg-gray-100 p-2 border-b border-gray-300 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => execCommand('bold')}
              className="p-2 rounded-md hover:bg-gray-200"
              title="Bold"
            >
              <Bold className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => execCommand('italic')}
              className="p-2 rounded-md hover:bg-gray-200"
              title="Italic"
            >
              <Italic className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => execCommand('insertUnorderedList')}
              className="p-2 rounded-md hover:bg-gray-200"
              title="Bullet List"
            >
              <List className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => execCommand('insertOrderedList')}
              className="p-2 rounded-md hover:bg-gray-200"
              title="Numbered List"
            >
              <ListOrdered className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => setShowLinkModal(true)}
              className="p-2 rounded-md hover:bg-gray-200"
              title="Add Link"
            >
              <LinkIcon className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => setShowImageModal(true)}
              className="p-2 rounded-md hover:bg-gray-200"
              title="Add Image"
            >
              <ImageIcon className="w-5 h-5" />
            </button>
          </div>
          
          <div
            ref={contentRef}
            contentEditable
            className="p-4 min-h-[300px] focus:outline-none"
          ></div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center gap-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : (
              <>
                <Check className="w-5 h-5" />
                Save Changes
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}