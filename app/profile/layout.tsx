"use client";

import { NotificationIcon, SettingsIcon } from "@/assets/icons";
import { Avatar } from "@/components/ui/avatar";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#13111C] overflow-x-hidden max-w-[1512px] mx-auto">
      {/* Top Navigation */}
      <nav className="flex items-center justify-center p-4 bg-[#0B0A14] h-16 lg:h-24">
        <div className="flex items-center gap-4 lg:gap-8">
          <NotificationIcon className="w-5 h-5 lg:w-6 lg:h-6" />
          <SettingsIcon className="w-5 h-5 lg:w-6 lg:h-6" />
          <div className="bg-[#0B0A14] p-0.5 rounded-full">
            <Avatar className="w-8 h-8 lg:w-12 lg:h-12">
              <img
                src="images/profile/mini.png"
                alt="User"
                className="rounded-full object-cover"
              />
            </Avatar>
          </div>
        </div>
      </nav>

      {children}
    </div>
  );
} 