'use client';

import { ProfileSidebar } from './components/ProfileSidebar';
import { ContentTabs } from './components/ContentTabs';
import { RightSidebar } from './components/RightSidebar';
import { useProfileStore } from '@/app/store/useProfileStore';

const Profile = () => {
  const isEditing = useProfileStore((state) => state.isEditing);

  return (
    <div className="p-4 lg:p-8 flex flex-col lg:flex-row gap-4 lg:gap-6 justify-center items-start">
      <ProfileSidebar />
      <ContentTabs isEditing={isEditing} />
      <RightSidebar />
    </div>
  );
};

export default Profile;
