"use client";

import { useState } from "react";
import { ProfileSidebar } from "./components/ProfileSidebar";
import { ContentTabs } from "./components/ContentTabs";
import { RightSidebar } from "./components/RightSidebar";

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="max-w-[1552px] mx-auto p-4 md:px-6 md:py-8 flex flex-col md:flex-row gap-4 md:gap-8">
      <ProfileSidebar isEditing={isEditing} />
      <ContentTabs isEditing={isEditing} setIsEditing={setIsEditing} />
      <RightSidebar />
    </div>
  );
}