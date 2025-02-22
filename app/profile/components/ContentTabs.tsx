import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { VideoGrid, SampleGrid, PhotoGrid } from "./ContentGrids";

interface ContentTabsProps {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
}

export function ContentTabs({ isEditing, setIsEditing }: ContentTabsProps) {
  return (
    <div className="flex-1">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">WELCOME</h2>
          <Button variant="ghost" onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? "Save" : "Edit Profile"}
          </Button>
        </div>

        <Tabs defaultValue="videos">
          <div className="flex items-center gap-4 mb-6">
            <TabsList className="bg-transparent border-none p-0">
              <TabsTrigger 
                value="videos" 
                className="data-[state=active]:bg-transparent data-[state=active]:text-white text-gray-400 px-0 mr-4"
              >
                Videos
              </TabsTrigger>
              <TabsTrigger 
                value="samples" 
                className="data-[state=active]:bg-transparent data-[state=active]:text-white text-gray-400 px-0 mr-4"
              >
                Sample Mixes
              </TabsTrigger>
              <TabsTrigger 
                value="photos" 
                className="data-[state=active]:bg-transparent data-[state=active]:text-white text-gray-400 px-0"
              >
                Photos
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="videos">
            <VideoGrid isEditing={isEditing} />
          </TabsContent>

          <TabsContent value="samples">
            <SampleGrid isEditing={isEditing} />
          </TabsContent>

          <TabsContent value="photos">
            <PhotoGrid isEditing={isEditing} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 