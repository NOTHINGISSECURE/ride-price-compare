import { useState } from "react";
import { X, Phone, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface AppLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  appName: string;
  appLogo: string;
  onConnect: () => Promise<void>;
}

const AppLoginModal = ({
  isOpen,
  onClose,
  appName,
  appLogo,
  onConnect,
}: AppLoginModalProps) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOtp = async () => {
    if (phoneNumber.length !== 10) {
      toast({
        variant: "destructive",
        title: "Invalid phone number",
        description: "Please enter a valid 10-digit phone number.",
      });
      return;
    }

    setIsLoading(true);
    // Simulate OTP sending
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    setStep("otp");
    toast({
      title: "OTP sent",
      description: `A verification code has been sent to +91 ${phoneNumber}`,
    });
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      toast({
        variant: "destructive",
        title: "Invalid OTP",
        description: "Please enter a valid 6-digit OTP.",
      });
      return;
    }

    setIsLoading(true);
    // Simulate verification
    await new Promise((resolve) => setTimeout(resolve, 1500));
    await onConnect();
    setIsLoading(false);
    handleClose();
    toast({
      title: `${appName} connected!`,
      description: `Your ${appName} account is now connected.`,
    });
  };

  const handleClose = () => {
    setPhoneNumber("");
    setOtp("");
    setStep("phone");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative glass-card rounded-2xl border border-border/50 shadow-elevated w-full max-w-md mx-4 p-6 animate-fade-in">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-secondary/50 text-muted-foreground"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 rounded-2xl bg-secondary/50 flex items-center justify-center mx-auto mb-4 text-3xl">
            {appLogo}
          </div>
          <h2 className="text-xl font-semibold text-foreground">
            Connect to {appName}
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Login with your {appName} phone number
          </p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          {step === "phone" ? (
            <>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2 text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm font-medium">+91</span>
                </div>
                <Input
                  type="tel"
                  placeholder="Enter phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
                  className="pl-20 h-12 bg-secondary/50 border-border/50"
                />
              </div>
              <Button
                onClick={handleSendOtp}
                disabled={isLoading || phoneNumber.length !== 10}
                className="w-full h-12"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <ArrowRight className="w-4 h-4 mr-2" />
                )}
                Send OTP
              </Button>
            </>
          ) : (
            <>
              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Enter the 6-digit code sent to +91 {phoneNumber}
                </p>
                <Input
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  className="h-12 bg-secondary/50 border-border/50 text-center text-lg tracking-widest"
                />
              </div>
              <Button
                onClick={handleVerifyOtp}
                disabled={isLoading || otp.length !== 6}
                className="w-full h-12"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : null}
                Verify & Connect
              </Button>
              <button
                onClick={() => setStep("phone")}
                className="w-full text-sm text-muted-foreground hover:text-foreground"
              >
                Change phone number
              </button>
            </>
          )}
        </div>

        <p className="text-xs text-muted-foreground text-center mt-4">
          This is a simulated login. Your actual {appName} credentials are not shared.
        </p>
      </div>
    </div>
  );
};

export default AppLoginModal;
