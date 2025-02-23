import { Avatar } from "@/app/components/ui/avatar";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import { Badge } from "@/app/components/ui/badge";
import { MapPin, MoreVertical, Upload, PlusCircle, X, MessageCircle } from "lucide-react";
import { 
  InstagramIcon, 
  SpotifyIcon, 
  MailIcon, 
  CheckIcon, 
  SoundCloudIcon,
  ArrowRightIcon
} from "@/app/assets/icons";
import { ChatIcon } from "@/app/assets/icons/ChatIcon";
import { useProfileStore } from '@/app/store/useProfileStore';

export function ProfileSidebar() {
  const { profile, isEditing, updateProfile, updateAvatar, addTag, removeTag, updateSocialLink } = useProfileStore();

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      await updateAvatar(file);
    }
  };

  const handleAddTag = () => {
    const tag = window.prompt('Enter new tag:');
    if (tag) {
      addTag(tag);
    }
  };

  return (
    <div className="w-full lg:w-[351px] flex-shrink-0 space-y-4 lg:space-y-6">
      <div className="bg-gradient-profile-card rounded-2xl lg:rounded-3xl border-8 border-white/[0.12] bg-clip-content">
        <div className="p-4 space-y-4 lg:space-y-6">
          {/* Avatar Section */}
          <div className="flex justify-center">
            <div className="relative">
              <Avatar className="w-20 h-20 md:w-24 md:h-24">
                <img src={profile.avatar} alt={profile.name} className="object-cover" />
              </Avatar>
              {isEditing && (
                <label className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                  <Upload className="w-6 h-6 text-white" />
                </label>
              )}
            </div>
          </div>

          {/* Name and Location */}
          <div className="text-center space-y-2">
            {isEditing ? (
              <Input
                value={profile.name}
                onChange={(e) => updateProfile({ name: e.target.value })}
                className="text-xl md:text-2xl font-bold text-center bg-[#13111C] text-white"
              />
            ) : (
              <h1 className="text-xl md:text-2xl font-bold text-white">{profile.name}</h1>
            )}

            <div className="flex items-center justify-center gap-1">
              <MapPin className="w-4 h-4 text-gray-400" />
              {isEditing ? (
                <Input
                  value={profile.location}
                  onChange={(e) => updateProfile({ location: e.target.value })}
                  className="w-40 text-sm bg-[#13111C] text-white/70"
                />
              ) : (
                <span className="text-white/70">{profile.location}</span>
              )}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 justify-center">
            {profile.tags.map((tag) => (
              <div key={tag} className="relative group">
                <Badge variant="secondary" className="bg-white/10 hover:bg-white/20 text-sm px-2 py-1 text-white">
                  {tag}
                </Badge>
                {isEditing && (
                  <button
                    onClick={() => removeTag(tag)}
                    className="absolute -top-1 -right-1 bg-red-500 rounded-full p-0.5 hidden group-hover:block"
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                )}
              </div>
            ))}
            {isEditing && (
              <Button size="sm" variant="outline" className="rounded-full" onClick={handleAddTag}>
                <PlusCircle className="w-4 h-4" />
              </Button>
            )}
          </div>

          {/* Description */}
          {isEditing ? (
            <Textarea
              value={profile.description}
              onChange={(e) => updateProfile({ description: e.target.value })}
              className="min-h-[100px] bg-[#13111C] text-white"
            />
          ) : (
            <p className="text-sm text-gray-400 text-left px-2">
              {profile.description}
            </p>
          )}

          <ProfileActions />
        </div>
      </div>

      <ProfileSocialLinks />
    </div>
  );
}

function ProfileActions() {
  return (
    <div className="flex items-center gap-2">
      <button className="rounded-[20px] flex flex-1 justify-center items-center bg-white/10 hover:bg-white/20 p-1 h-screen max-w-[50px] max-h-[48px]">
        <MoreVertical className="w-5 h-5 text-white" />
      </button>
      <button className="flex justify-center items-center rounded-[20px] flex-1 bg-white/10 hover:bg-white/20 p-1 text-sm h-screen max-w-[127px] max-h-[48px] gap-1 text-white">
        Message
        <ChatIcon />
      </button>
      <button className="flex justify-center items-center rounded-[20px] flex-1 bg-[#EEEBFF] hover:bg-[#EEEBFF]/90 p-1 text-sm h-screen max-w-[102px] max-h-[48px] gap-1 text-black">
        <span className="text-black">Book</span>
        <ArrowRightIcon />
      </button>
    </div>
  );
}

function ProfileSocialLinks() {
  const { profile, isEditing, updateSocialLink } = useProfileStore();

  return (
    <div className="bg-[#21202D] rounded-3xl mt-4 md:mt-6 border-8 border-white/[0.12] bg-clip-content">
      <div className="space-y-2 p-4 md:p-6">
        {profile.socialLinks.map((link) => (
          <div key={link.id} className="bg-white/5 rounded-xl p-2 md:p-3 flex items-center gap-3">
            <div className="w-6 h-6 flex items-center justify-center">
              {link.platform === 'instagram' && <InstagramIcon />}
              {link.platform === 'soundcloud' && <SoundCloudIcon />}
              {link.platform === 'spotify' && <SpotifyIcon />}
              {link.platform === 'email' && <MailIcon />}
            </div>
            {isEditing ? (
              <Input
                value={link.text}
                onChange={(e) => updateSocialLink(link.id, { text: e.target.value })}
                className="bg-transparent text-gray-400 text-sm border-white/10 focus:border-white/20"
              />
            ) : (
              <span className="text-gray-400 text-sm">{link.text}</span>
            )}
          </div>
        ))}
      </div>

      <div className="h-[1px] bg-white/[0.12] mx-4 mb-4 md:mx-6"></div>

      <div className="space-y-3 md:space-y-4 px-4 pb-4 md:px-6 md:pb-6">
        <div className="flex items-center justify-between gap-2">
          <span className="text-gray-400 text-sm">Collaboration with Event Planners</span>
          <CheckIcon />
        </div>
        <div className="text-gray-400 text-sm">Preferred Communication</div>
      </div>
    </div>
  );
} 