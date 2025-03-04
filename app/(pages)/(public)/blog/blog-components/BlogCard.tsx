import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  className: string;
}

export default function BlogCard({
  image,
  date,
  title,
  description,
  timeRead,
  category,
  className,
  id,
}) {
  return (
    <Link href={`/blog/${id}`} passHref>
      <div
        className={` max-w-[387.33px] min-h-[460px] p-2 rounded-lg flex flex-col  items-stretch justify-between gap-8 my-2 cursor-pointer border-1 ${className}`}
      >
        <div className="uppercase w-full h-[46.5%] flex items-center justify-center border-4 border-[#EEEBFF] rounded-2xl ">
          <Image
            src={image}
            alt="blog image"
            height={100}
            width={100}
            className="w-full h-full "
          />
        </div>

        <div className="font-lato w-full  h-full flex flex-col items-start gap-2 p-1 ">
          <p className="font-normal text-sm text-[#535266] ">{category} </p>

          <h1 className="text-xl font-phudu  font-bold text-[#0B0A14] ">
            {title}{" "}
          </h1>

          <p className="font-normal text-sm text-[#535266] text-justify ">
            {description}{" "}
          </p>

          <div className="w-full flex items-center justify-start gap-2 mt-4  ">
            <p className="text-xs text-[#535266] font-normal  ">{date} </p>
            <span className=" bg-[#878698] h-1 w-1  rounded-full "> </span>
            <p className="text-xs text-[#535266] font-normal ">{timeRead} </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
