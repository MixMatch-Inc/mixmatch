"use client";

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { 
  Bold, Italic, List, ListOrdered, Link as LinkIcon, 
  Image as ImageIcon, Check, X
} from 'lucide-react';
import { format } from 'date-fns';

// Define the Blog Post interface
interface BlogPost {
  id?: string;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  coverImage: string;
  author: string;
  createdAt: string;
  published: boolean;
}

export default function CreateBlogPage() {
  const router = useRouter();
  const contentRef = useRef<HTMLDivElement>(null);
  
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [tags, setTags] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [author, setAuthor] = useState('Admin');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [showImageModal, setShowImageModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [linkUrl, setLinkUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  
  const execCommand = (command: string, value: string | null = null) => {
    const selection = window.getSelection();
    if (!selection) return;
    
    const range = selection.getRangeAt(0);
    
    contentRef.current?.focus();
    selection.removeAllRanges();
    selection.addRange(range);
    
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
  
  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCoverImage(imageUrl);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!contentRef.current) return;
    
    setIsSubmitting(true);
    
    const blogPost: BlogPost = {
      id: Date.now().toString(),
      title,
      excerpt,
      content: contentRef.current.innerHTML,
      tags: tags.split(',').map(tag => tag.trim()),
      coverImage: coverImage || '/placeholder-image.jpg',
      author,
      createdAt: format(new Date(), 'yyyy-MM-dd'),
      published: true
    };
    
    try {
      console.log('Blog post created:', blogPost);
      
      setTimeout(() => {
        setShowSuccessModal(true);
        setIsSubmitting(false);
      }, 500);
      
    } catch (error) {
      console.error('Error creating blog post:', error);
      setErrorMessage('Failed to create blog post. Please try again.');
      setShowErrorModal(true);
      setIsSubmitting(false);
    }
  };

  const handleSuccessModalClose = () => {
    setShowSuccessModal(false);
    router.push('/blog');
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Create New Blog Post</h1>
        <button
          type="button"
          onClick={() => router.back()}
          className="text-gray-600 hover:text-gray-900"
        >
          <X className="w-6 h-6" />
        </button>
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
            {coverImage && (
              <div className="h-24 w-24 relative">
                <img
                  src={coverImage}
                  alt="Cover preview"
                  className="h-full w-full object-cover rounded-md"
                />
              </div>
            )}
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
          {/* Toolbar */}
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
              onClick={() => handleListCommand('insertUnorderedList')}
              className="p-2 rounded-md hover:bg-gray-200"
              title="Bullet List"
            >
              <List className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={() => handleListCommand('insertOrderedList')}
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
          
          {/* Editor Content */}
          <div
            ref={contentRef}
            contentEditable
            className="p-4 min-h-[300px] focus:outline-none"
          />
        </div>

        {/* Link Modal */}
        {showLinkModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96">
              <h3 className="text-lg font-semibold mb-4">Add Link</h3>
              <input
                type="url"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="Enter URL"
                className="w-full p-2 border rounded mb-4"
                autoFocus
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowLinkModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleLink}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add Link
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Image Modal */}
        {showImageModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96">
              <h3 className="text-lg font-semibold mb-4">Add Image</h3>
              <input
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="Enter image URL"
                className="w-full p-2 border rounded mb-4"
                autoFocus
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowImageModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleImage}
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add Image
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Success Modal */}
        {showSuccessModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 max-w-md">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Success!</h3>
              <p className="text-gray-600 text-center mb-6">Your blog post has been created successfully.</p>
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={handleSuccessModalClose}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Go to Blog
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Error Modal */}
        {showErrorModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 max-w-md">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                  <X className="w-6 h-6 text-red-600" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">Error</h3>
              <p className="text-gray-600 text-center mb-6">{errorMessage}</p>
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => setShowErrorModal(false)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        )}
        
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
            {isSubmitting ? 'Publishing...' : (
              <>
                <Check className="w-5 h-5" />
                Publish
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}