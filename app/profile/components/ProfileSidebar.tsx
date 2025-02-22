import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MapPin, MoreVertical, Upload, PlusCircle, X, MessageCircle } from "lucide-react";
import { 
  InstagramIcon, 
  SpotifyIcon, 
  MailIcon, 
  CheckIcon, 
  SoundCloudIcon,
  ArrowRightIcon
} from "@/assets/icons";
import { ChatIcon } from "@/assets/icons/ChatIcon";

interface ProfileSidebarProps {
  isEditing: boolean;
}

export function ProfileSidebar({ isEditing }: ProfileSidebarProps) {
  return (
    <div className="w-full md:w-[351px] flex-shrink-0">
      <ProfileMainCard isEditing={isEditing} />
      <ProfileSocialLinks />
    </div>
  );
}

function ProfileMainCard({ isEditing }: { isEditing: boolean }) {
  return (
    <div className="bg-gradient-profile-card rounded-3xl border-8 border-white/[0.12] bg-clip-content">
      <div className="p-4 md:p-4 space-y-4 md:space-y-6">
        <ProfileAvatar isEditing={isEditing} />
        <ProfileInfo isEditing={isEditing} />
        <ProfileTags isEditing={isEditing} />
        <ProfileDescription isEditing={isEditing} />
        <ProfileActions />
      </div>
    </div>
  );
}

function ProfileAvatar({ isEditing }: { isEditing: boolean }) {
  return (
    <div className="flex justify-center">
      <div className="relative">
        <Avatar className="w-20 h-20 md:w-24 md:h-24">
          <img 
            src="/images/profile/main.png" 
            alt="DJ Profile" 
            className="object-cover"
          />
        </Avatar>
        {isEditing && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full opacity-0 hover:opacity-100 transition-opacity cursor-pointer">
            <Upload className="w-6 h-6 text-white" />
          </div>
        )}
      </div>
    </div>
  );
}

function ProfileInfo({ isEditing }: { isEditing: boolean }) {
  return (
    <div className="text-center">
      {isEditing ? (
        <Input 
          defaultValue="MIXER" 
          className="text-xl md:text-2xl font-bold text-center bg-[#13111C]"
        />
      ) : (
        <h1 className="text-xl md:text-2xl font-bold mb-2">MIXER</h1>
      )}
      <div className="flex items-center justify-center gap-1 text-gray-400">
        <MapPin className="w-4 h-4" />
        {isEditing ? (
          <Input 
            defaultValue="Los Angeles, CA" 
            className="w-40 text-sm bg-[#13111C]"
          />
        ) : (
          <span>Los Angeles, CA</span>
        )}
      </div>
    </div>
  );
}

function ProfileTags({ isEditing }: { isEditing: boolean }) {
  return (
    <div className="flex flex-wrap gap-1 justify-center">
      {['Pop', 'Electronic', 'Hip-hop'].map((tag) => (
        <div key={tag} className="relative group">
          <Badge variant="secondary" className="bg-white/10 hover:bg-white/20 text-sm px-2 py-1">
            {tag}
          </Badge>
          {isEditing && (
            <button className="absolute -top-1 -right-1 bg-red-500 rounded-full p-0.5 hidden group-hover:block">
              <X className="w-3 h-3 text-white" />
            </button>
          )}
        </div>
      ))}
      {isEditing && (
        <Button size="sm" variant="outline" className="rounded-full">
          <PlusCircle className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}

function ProfileDescription({ isEditing }: { isEditing: boolean }) {
  return isEditing ? (
    <Textarea
      defaultValue="Elevate your party experience with DJ Beats Pro - the ultimate DJ app for mixing tracks and creating the perfect atmosphere for any event."
      className="min-h-[100px] bg-[#13111C] text-left"
    />
  ) : (
    <p className="text-sm text-gray-400 text-left px-2">
      Elevate your party experience with DJ Beats Pro - the ultimate DJ app for mixing tracks and creating the perfec Read more...
    </p>
  );
}

function ProfileActions() {
  return (
    <div className="flex items-center gap-2">
      <button className="rounded-[20px] flex flex-1 justify-center items-center bg-white/10 hover:bg-white/20 p-1 h-screen max-w-[50px] max-h-[48px]">
        <MoreVertical className="w-5 h-5" />
      </button>
      <button className="flex justify-center items-center rounded-[20px] flex-1 bg-white/10 hover:bg-white/20 p-1 text-sm h-screen max-w-[127px] max-h-[48px] gap-1">
        Message
        <ChatIcon />
      </button>
      <button className="flex justify-center items-center rounded-[20px] flex-1 bg-[#EEEBFF] hover:bg-[#EEEBFF]/90 p-1 text-sm h-screen max-w-[102px] max-h-[48px] gap-1">
        <span className="text-black">Book</span>
        <ArrowRightIcon />
      </button>
    </div>
  );
}

function ProfileSocialLinks() {
  const socialLinks = [
    { icon: InstagramIcon, text: "@mixer" },
    { icon: SoundCloudIcon, text: "Mixes Vibe Master Mixes" },
    { icon: SpotifyIcon, text: "DJ Vibe Master" },
    { icon: MailIcon, text: "djvibemaster@gmail.com" },
  ];

  return (
    <div className="bg-[#21202D] rounded-3xl mt-4 md:mt-6 border-8 border-white/[0.12] bg-clip-content">
      <div className="space-y-2 p-4 md:p-6">
        {socialLinks.map((link, index) => (
          <div key={index} className="bg-white/5 rounded-xl p-2 md:p-3 flex items-center gap-3">
            <div className="w-6 h-6 flex items-center justify-center">
              <link.icon />
            </div>
            <span className="text-gray-400 text-sm">{link.text}</span>
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