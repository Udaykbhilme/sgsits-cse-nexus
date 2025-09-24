import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Person {
  id: string;
  full_name: string;
  email: string;
  avatar_url?: string;
  current_position?: string;
  current_company?: string;
}

interface PersonSearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPersonSelect: (person: Person) => void;
}

const PersonSearchDialog: React.FC<PersonSearchDialogProps> = ({
  open,
  onOpenChange,
  onPersonSelect
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (searchQuery.length > 2) {
      searchPeople();
    } else {
      setPeople([]);
    }
  }, [searchQuery]);

  const searchPeople = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, email, avatar_url, current_position, current_company')
        .or(`full_name.ilike.%${searchQuery}%,email.ilike.%${searchQuery}%`)
        .limit(10);

      if (error) throw error;
      setPeople(data || []);
    } catch (error) {
      console.error('Error searching people:', error);
      setPeople([]);
    } finally {
      setLoading(false);
    }
  };

  const getInitials = (name: string) => {
    return name?.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U';
  };

  const handlePersonSelect = (person: Person) => {
    onPersonSelect(person);
    onOpenChange(false);
    setSearchQuery("");
    setPeople([]);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-black border-yellow-500/30">
        <DialogHeader>
          <DialogTitle className="text-yellow-100">Find Person</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-yellow-500" />
            <Input
              placeholder="Search by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-black/30 border-yellow-500/30 text-yellow-100 placeholder:text-yellow-200/50"
            />
          </div>

          <div className="max-h-60 overflow-y-auto space-y-2">
            {loading && (
              <div className="text-center py-4">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-yellow-500 mx-auto"></div>
              </div>
            )}
            
            {!loading && people.length === 0 && searchQuery.length > 2 && (
              <div className="text-center py-4 text-yellow-200/70">
                No people found
              </div>
            )}

            {people.map((person) => (
              <div
                key={person.id}
                onClick={() => handlePersonSelect(person)}
                className="flex items-center gap-3 p-3 rounded-lg bg-yellow-500/10 hover:bg-yellow-500/20 cursor-pointer transition-colors"
              >
                <Avatar className="w-10 h-10">
                  <AvatarImage src={person.avatar_url || undefined} />
                  <AvatarFallback className="bg-yellow-500 text-black">
                    {getInitials(person.full_name)}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-yellow-100 truncate">
                    {person.full_name || 'Unknown'}
                  </div>
                  <div className="text-sm text-yellow-200/70 truncate">
                    {person.email}
                  </div>
                  {person.current_position && (
                    <div className="text-xs text-yellow-300/60 truncate">
                      {person.current_position} {person.current_company && `at ${person.current_company}`}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PersonSearchDialog;