import Image from "next/image";
import BlogData from "./BlogData";
import BlogCard from "./BlogCard";
import Link from "next/link";

export default function Hero() {
  interface BlogCardProps {
    className: string;
  }

  const randomIndex = Math.floor(Math.random() * BlogData.length);
  const randomBlog = BlogData[randomIndex];

  return (
    <section className="w-full block h-fit  ">
      <Link href={`/blog/${randomBlog.id}`}>
        <div className="w-full flex flex-col md:flex-row justify-center items-center gap-3  ">
          <div className="w-full max-w-[724px] md:h-[412px] ">
            <Image
              src={randomBlog.image}
              alt="hello"
              height={100}
              width={100}
              className="w-full h-full "
            />
          </div>

          <div className="font-lato w-full max-w-[454px]  h-full flex flex-col items-start justify-center gap-1 p-1 ">
            <p className="font-normal text-base text-[#535266] ">
              {randomBlog.category}{" "}
            </p>

            <h1 className=" text-xl md:text-[43px] md:leading-[45px] font-phudu  font-bold text-[#0B0A14] ">
              {randomBlog.title}{" "}
            </h1>

            <p className="font-normal text-base text-[#535266] text-justify ">
              {randomBlog.description}{" "}
            </p>

            <div className="w-full flex items-center justify-start gap-2 mt-4  ">
              <p className="text-xs text-[#535266] font-normal  ">
                {randomBlog.date}{" "}
              </p>
              <span className=" bg-[#878698] h-1 w-1  rounded-full "> </span>
              <p className="text-xs text-[#535266] font-normal ">
                {randomBlog.timeRead}{" "}
              </p>
            </div>
          </div>
        </div>
      </Link>

      <div className="w-full flex flex-col md:flex-row items-center justify-center gap-1">
        {BlogData.slice(0, 2).map((blog, index) => (
          <BlogCard
            key={index}
            image={blog.image}
            title={blog.title}
            category={blog.category}
            description={blog.description}
            date={blog.date}
            timeRead={blog.timeRead}
            className="max-w-[597px] "
            id={blog.id}
          />
        ))}
      </div>
    </section>
  );
}
