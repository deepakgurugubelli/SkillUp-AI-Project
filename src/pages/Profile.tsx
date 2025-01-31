import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Navigation } from "@/components/Navigation";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Book, Star, Trophy, Calendar, LogOut, Upload } from "lucide-react";
import { toast } from "sonner";
import type { Database } from "@/integrations/supabase/types";
import { CourseRecommendations } from "@/components/CourseRecommendations";

type Profile = Database['public']['Tables']['profiles']['Row'];

const ProfilePage = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/signup');
        return;
      }

      const { data, error } = await supabase
        .from('profiles')
        .select()
        .eq('id', user.id)
        .maybeSingle();

      if (error) throw error;
      
      if (!data) {
        const { error: insertError } = await supabase
          .from('profiles')
          .insert({ id: user.id })
          .select()
          .single();

        if (insertError) throw insertError;
        
        const { data: newProfile, error: fetchError } = await supabase
          .from('profiles')
          .select()
          .eq('id', user.id)
          .single();

        if (fetchError) throw fetchError;
        setProfile(newProfile);
      } else {
        setProfile(data);
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate('/signup');
      toast.success('Logged out successfully');
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);
      
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${profile?.id}-${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: filePath })
        .eq('id', profile?.id);

      if (updateError) throw updateError;

      toast.success('Profile picture updated successfully!');
      fetchProfile();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfcfb] to-[#e2d1c3]">
      <Navigation />
      
      <Button 
        onClick={() => navigate(-1)} 
        variant="ghost" 
        className="fixed top-24 left-4 z-50"
      >
        <ArrowLeft className="mr-2" />
        Back
      </Button>

      <main className="container mx-auto px-4 pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-3 glass">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Profile Overview</CardTitle>
              <Button variant="destructive" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden">
                      {profile?.avatar_url ? (
                        <img
                          src={`${supabase.storage.from('avatars').getPublicUrl(profile.avatar_url).data.publicUrl}`}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-4xl text-primary">
                          {profile?.first_name?.[0]}
                        </div>
                      )}
                    </div>
                    <label className="absolute bottom-0 right-0 p-1 bg-primary rounded-full cursor-pointer">
                      <Upload className="w-4 h-4 text-white" />
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleAvatarUpload}
                        disabled={uploading}
                      />
                    </label>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{profile?.first_name} {profile?.last_name}</h3>
                    <p className="text-muted-foreground">Student</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Overall Progress</p>
                    <Progress value={75} className="mt-2" />
                  </div>
                  <div className="flex gap-4">
                    <div className="flex items-center gap-2">
                      <Trophy className="text-primary" />
                      <span>Rank: #42</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="text-yellow-400" />
                      <span>Points: 1250</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle>Skills Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Strengths</h4>
                  <ul className="list-disc list-inside">
                    {profile?.strengths?.map((strength, index) => (
                      <li key={index}>{strength}</li>
                    )) || <li>No strengths recorded yet</li>}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Areas for Improvement</h4>
                  <ul className="list-disc list-inside">
                    {profile?.weaknesses?.map((weakness, index) => (
                      <li key={index}>{weakness}</li>
                    )) || <li>No areas recorded yet</li>}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle>Daily Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">Complete React Tutorial</h4>
                    <Calendar className="text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">Due today</p>
                  <Button className="w-full">Start Task</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle>Recommended for You</CardTitle>
            </CardHeader>
            <CardContent>
              <CourseRecommendations 
                strengths={profile?.strengths || []}
                weaknesses={profile?.weaknesses || []}
              />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );

};

export default ProfilePage;

