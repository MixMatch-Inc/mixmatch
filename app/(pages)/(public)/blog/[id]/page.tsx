"use client";
import Image from "next/image";
import BlogData from "../blog-components/BlogData";
import DeletePopup from "../blog-components/DeletePopup";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface BlogPostProps {
  params: { id: string };
}

export default function BlogPost({ params }: BlogPostProps) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const router = useRouter();
  const { id } = params;
  const blog = BlogData.find((post) => post.id.toString() === id);

  if (!blog) {
    return <p className="text-center text-red-500 mt-8">Blog post not found</p>;
  }

  const closeModal = () => {
    setOpenDeleteModal(false);
  };

  const handleDelete = () => {
    router.push("/blog");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {openDeleteModal && (
        <DeletePopup onCancel={closeModal} onConfirm={handleDelete} />
      )}
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{blog.title}</h1>
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>{blog.date}</span>
        <span>{blog.timeRead} min read</span>
      </div>
      <div className="w-full rounded-lg overflow-hidden shadow-lg mb-6">
        <Image
          src={blog.image}
          alt={blog.title}
          width={800}
          height={450}
          className="w-full h-auto object-cover"
        />
      </div>
      <p className="text-lg text-gray-700 leading-relaxed mb-6">
        {blog.description}
      </p>
      <button
        onClick={() => setOpenDeleteModal(true)}
        className="bg-red-500 text-white p-2 rounded-sm"
      >
        Delete Blog
      </button>
    </div>
  );
}
