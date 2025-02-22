'use client';

import React, { useState } from 'react';
import { ProfileSidebar } from './components/ProfileSidebar';
import { ContentTabs } from './components/ContentTabs';
import { RightSidebar } from './components/RightSidebar';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="p-4 lg:p-8 flex flex-col lg:flex-row gap-4 lg:gap-6 justify-center items-start">
      <ProfileSidebar isEditing={isEditing} />
      <ContentTabs isEditing={isEditing} setIsEditing={setIsEditing} />
      <RightSidebar />
    </div>
  );
};

export default Profile;
