import { useState } from "react";
import OnboardingFlow from "@/components/app-demo/OnboardingFlow";
import AppDashboard from "@/components/app-demo/AppDashboard";

const AppDemo = () => {
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [babyData, setBabyData] = useState<{
    name: string;
    birthDate: string;
    goals: string[];
  } | null>(null);

  const handleOnboardingComplete = (data: { name: string; birthDate: string; goals: string[] }) => {
    setBabyData(data);
    setIsOnboarded(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {!isOnboarded ? (
        <OnboardingFlow onComplete={handleOnboardingComplete} />
      ) : (
        <AppDashboard babyData={babyData!} />
      )}
    </div>
  );
};

export default AppDemo;
