"use client";

import { NotificationIcon, SettingsIcon } from "@/assets/icons";
import { Avatar } from "@/components/ui/avatar";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#13111C]">
      {/* Top Navigation */}
      <nav className="flex items-center justify-center p-4 bg-[#0B0A14] h-24">
        <div className="flex items-center gap-8">
          <NotificationIcon />
          <SettingsIcon />

          <div className="bg-[#0B0A14] p-0.5 rounded-full">
            <Avatar className="w-12 h-12">
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