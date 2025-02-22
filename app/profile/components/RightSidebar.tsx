import { GridIcon, DateIcon, HandIcon, LocationIcon, FlagIcon, StartIcon } from "@/assets/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const icons = [
  {
    icon: GridIcon,
    route: "/profile",
  },
  {
    icon: DateIcon,
    route: "/",
  },
  {
    icon: FlagIcon,
    route: "/",
  },
  {
    icon: LocationIcon,
    route: "/",
  },
  {
    icon: StartIcon,
    route: "/",
  },
  {
    icon: HandIcon,
    route: "/",
  },
];

export function RightSidebar() {
  const pathname = usePathname();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="flex-shrink-0">
      <div className="bg-[#21202D] rounded-full flex flex-col items-center gap-2 sticky top-8 border-8 border-white/[0.12] backdrop-blur-sm bg-clip-content">
        {icons.map((Icon: any, index: number) => {
          const isActive = pathname === Icon.route;
          const isHovered = hoveredIndex === index;
          const showHoverColors = (isActive && !isHovered) || (!isActive && isHovered);

          return (
            <Link 
              key={index} 
              href={Icon.route}
              className="p-3 flex items-center justify-center rounded-full transition-colors"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Icon.icon 
                color={showHoverColors ? "#6E3FF3" : "#878698"}
                colorBackground={showHoverColors ? "#EEEBFF" : "white"}
                fillOpacity={showHoverColors ? 1 : 0.1}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
} 