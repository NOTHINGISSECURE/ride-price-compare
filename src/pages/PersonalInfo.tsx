import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Plus, Trash2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";

interface Address {
  id: string;
  label: string;
  address: string;
}

const PersonalInfo = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    if (!user) return;
    setIsLoading(true);

    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (!error && data) {
      setDisplayName(data.display_name || "");
      setAge(data.age?.toString() || "");
      setGender(data.gender || "");
      const savedAddresses = (data.addresses as unknown as Address[]) || [];
      setAddresses(savedAddresses || []);
    }
    setIsLoading(false);
  };

  const handleSave = async () => {
    if (!user) return;
    setIsSaving(true);

    const { error } = await supabase
      .from("profiles")
      .update({
        display_name: displayName || null,
        age: age ? parseInt(age) : null,
        gender: gender || null,
        addresses: JSON.parse(JSON.stringify(addresses)),
      })
      .eq("user_id", user.id);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save profile. Please try again.",
      });
    } else {
      toast({
        title: "Profile saved",
        description: "Your personal information has been updated.",
      });
    }
    setIsSaving(false);
  };

  const addAddress = () => {
    setAddresses([
      ...addresses,
      { id: crypto.randomUUID(), label: "", address: "" },
    ]);
  };

  const updateAddress = (id: string, field: "label" | "address", value: string) => {
    setAddresses(
      addresses.map((addr) =>
        addr.id === id ? { ...addr, [field]: value } : addr
      )
    );
  };

  const removeAddress = (id: string) => {
    setAddresses(addresses.filter((addr) => addr.id !== id));
  };

  if (authLoading || isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Background glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto max-w-2xl px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-xl"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Personal Information</h1>
            <p className="text-sm text-muted-foreground">Manage your profile details</p>
          </div>
        </div>

        {/* Form */}
        <div className="glass-card rounded-2xl p-6 space-y-6">
          {/* Display Name */}
          <div className="space-y-2">
            <Label htmlFor="displayName">Display Name</Label>
            <Input
              id="displayName"
              placeholder="Enter your name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="h-12 bg-secondary/50 border-border/50"
            />
          </div>

          {/* Age */}
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              placeholder="Enter your age"
              value={age}
              onChange={(e) => setAge(e.target.value.replace(/\D/g, ""))}
              className="h-12 bg-secondary/50 border-border/50"
              min="1"
              max="120"
            />
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger className="h-12 bg-secondary/50 border-border/50">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
                <SelectItem value="prefer_not_to_say">Prefer not to say</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Addresses */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Saved Addresses</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={addAddress}
                className="text-primary hover:text-primary/80"
              >
                <Plus className="w-4 h-4 mr-1" />
                Add Address
              </Button>
            </div>

            {addresses.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No saved addresses. Click "Add Address" to add one.
              </p>
            ) : (
              <div className="space-y-4">
                {addresses.map((addr) => (
                  <div
                    key={addr.id}
                    className="p-4 rounded-xl bg-secondary/30 border border-border/30 space-y-3"
                  >
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="Label (e.g., Home, Office)"
                        value={addr.label}
                        onChange={(e) => updateAddress(addr.id, "label", e.target.value)}
                        className="h-10 bg-secondary/50 border-border/50 flex-1"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeAddress(addr.id)}
                        className="text-destructive hover:text-destructive/80"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                    <Input
                      placeholder="Full address"
                      value={addr.address}
                      onChange={(e) => updateAddress(addr.id, "address", e.target.value)}
                      className="h-10 bg-secondary/50 border-border/50"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Save Button */}
          <Button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full h-12"
          >
            {isSaving ? (
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
