import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Instagram, AlignJustify as Spotify, Mail, MapPin, MoreVertical, Upload, PlusCircle, X } from "lucide-react";
import { 
  InstagramIcon, 
  SpotifyIcon, 
  MailIcon, 
  CheckIcon 
} from "@/assets/icons";

interface ProfileSidebarProps {
  isEditing: boolean;
}

export function ProfileSidebar({ isEditing }: ProfileSidebarProps) {
  return (
    <div className="w-full md:w-[300px] flex-shrink-0">
      <div className="bg-[#1A1825] rounded-3xl p-4 md:p-6 space-y-4 md:space-y-6">
        {/* Avatar */}
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

        {/* Name */}
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

        {/* Tags */}
        <div className="flex flex-wrap gap-2 justify-center">
          {['Pop', 'Electronic', 'Hip-hop'].map((tag) => (
            <div key={tag} className="relative group">
              <Badge variant="secondary" className="bg-[#13111C] hover:bg-[#13111C] text-sm">
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

        {/* Description */}
        {isEditing ? (
          <Textarea
            defaultValue="Elevate your party experience with DJ Beats Pro - the ultimate DJ app for mixing tracks and creating the perfect atmosphere for any event."
            className="min-h-[100px] bg-[#13111C]"
          />
        ) : (
          <p className="text-sm text-gray-400 text-center px-2">
            Elevate your party experience with DJ Beats Pro - the ultimate DJ app for mixing tracks and creating the perfec
            <button className="text-white ml-1">Read more...</button>
          </p>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="rounded-full flex-none">
            <MoreVertical className="w-5 h-5" />
          </Button>
          <Button variant="secondary" className="flex-1 bg-[#13111C] hover:bg-[#13111C]/90 text-sm">
            Message
          </Button>
          <Button className="flex-1 text-sm">
            Book
          </Button>
        </div>
      </div>

      <div className="bg-[#1A1825] rounded-3xl p-4 md:p-6 mt-4 md:mt-6">
        {/* Social Links */}
        <div className="space-y-3 md:space-y-4">
          <div className="bg-[#13111C] rounded-xl p-2 md:p-3 flex items-center gap-3">
            <div className="w-6 h-6 flex items-center justify-center">
              <InstagramIcon />
            </div>
            <span className="text-gray-400 text-sm">@mixer</span>
          </div>

          <div className="bg-[#13111C] rounded-xl p-2 md:p-3 flex items-center gap-3">
            <div className="w-6 h-6 flex items-center justify-center">
              <SpotifyIcon />
            </div>
            <span className="text-gray-400 text-sm">Mixes Vibe Master Mixes</span>
          </div>

          <div className="bg-[#13111C] rounded-xl p-2 md:p-3 flex items-center gap-3">
            <div className="w-6 h-6 flex items-center justify-center">
              <SpotifyIcon />
            </div>
            <span className="text-gray-400 text-sm">DJ Vibe Master</span>
          </div>

          <div className="bg-[#13111C] rounded-xl p-2 md:p-3 flex items-center gap-3">
            <div className="w-6 h-6 flex items-center justify-center">
              <MailIcon />
            </div>
            <span className="text-gray-400 text-sm">djvibemaster@gmail.com</span>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-4 md:mt-6 space-y-3 md:space-y-4">
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm">Collaboration with Event Planners</span>
            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
              <CheckIcon />
            </div>
          </div>
          <div className="text-gray-400 text-sm">
            Preferred Communication
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfileTags({ isEditing }: { isEditing: boolean }) {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <Badge variant="secondary">Pop</Badge>
      <Badge variant="secondary">Electronic</Badge>
      <Badge variant="secondary">Hip-hop</Badge>
      {isEditing && (
        <Button size="sm" variant="outline" className="rounded-full">
          <PlusCircle className="w-4 h-4" />
        </Button>
      )}
    </div>
  );
}

function ProfileBio({ isEditing }: { isEditing: boolean }) {
  return isEditing ? (
    <Textarea
      defaultValue="Elevate your party experience with DJ Beats Pro - the ultimate DJ app for mixing tracks and creating the perfect atmosphere for any event."
      className="min-h-[100px]"
    />
  ) : (
    <p className="text-sm text-gray-400 text-center">
      Elevate your party experience with DJ Beats Pro - the ultimate DJ app for mixing tracks and creating the perfect...
      <button className="text-primary ml-1">Read more</button>
    </p>
  );
}

function ProfileActions() {
  return (
    <div className="flex gap-3 justify-center">
      <Button variant="secondary" className="flex-1">
        Message
      </Button>
      <Button className="flex-1">Book</Button>
    </div>
  );
}

function ProfileSocialLinks() {
  return (
    <div className="bg-[#1A1825] rounded-3xl p-6 mt-6">
      {/* Social Links */}
      <div className="space-y-4">
        <div className="bg-[#13111C] rounded-xl p-3 flex items-center gap-3">
          <div className="w-6 h-6 flex items-center justify-center">
            <InstagramIcon />
          </div>
          <span className="text-gray-400">@mixer</span>
        </div>

        <div className="bg-[#13111C] rounded-xl p-3 flex items-center gap-3">
          <div className="w-6 h-6 flex items-center justify-center">
            <SpotifyIcon />
          </div>
          <span className="text-gray-400">Mixes Vibe Master Mixes</span>
        </div>

        <div className="bg-[#13111C] rounded-xl p-3 flex items-center gap-3">
          <div className="w-6 h-6 flex items-center justify-center">
            <SpotifyIcon />
          </div>
          <span className="text-gray-400">DJ Vibe Master</span>
        </div>

        <div className="bg-[#13111C] rounded-xl p-3 flex items-center gap-3">
          <div className="w-6 h-6 flex items-center justify-center">
            <MailIcon />
          </div>
          <span className="text-gray-400">djvibemaster@gmail.com</span>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-6 space-y-4">
        <div className="flex items-center gap-2">
          <span className="text-gray-400">Collaboration with Event Planners</span>
          <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
            <CheckIcon />
          </div>
        </div>
        <div className="text-gray-400">
          Preferred Communication
        </div>
      </div>
    </div>
  );
} 