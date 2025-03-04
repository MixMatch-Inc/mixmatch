import BlogCard from "./BlogCard";
import BlogData from "./BlogData";



export default function BlogContainer() {
    return (
        <section className=" w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" >
          
{
  BlogData.map((blog, index) => (
    <BlogCard
    key={index}
    image={blog.image}
    title={blog.title}
    category={blog.category}
    description={blog.description}
      date={blog.date}
      timeRead={blog.timeRead}
      className=""
      id={blog.id}
      />

  ))
}
         


        </section>
    )
}