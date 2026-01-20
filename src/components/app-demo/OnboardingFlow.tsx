import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Baby, Target, Sparkles, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface OnboardingFlowProps {
  onComplete: (data: { name: string; birthDate: string; goals: string[] }) => void;
}

const goals = [
  { id: "iq", emoji: "🧠", label: "Trí tuệ (IQ)", desc: "Nhận thức, ngôn ngữ, logic" },
  { id: "eq", emoji: "💝", label: "Cảm xúc (EQ)", desc: "Gắn kết, tự tin, xã hội" },
  { id: "physical", emoji: "🏃", label: "Thể chất", desc: "Vận động thô, vận động tinh" },
  { id: "sensory", emoji: "👀", label: "Giác quan", desc: "5 giác quan, khám phá" },
  { id: "independence", emoji: "🌱", label: "Tự lập", desc: "Kỷ luật, tự phục vụ" },
];

const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const [step, setStep] = useState(0);
  const [babyName, setBabyName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);

  const toggleGoal = (goalId: string) => {
    setSelectedGoals((prev) =>
      prev.includes(goalId)
        ? prev.filter((g) => g !== goalId)
        : [...prev, goalId]
    );
  };

  const handleComplete = () => {
    onComplete({ name: babyName, birthDate, goals: selectedGoals });
  };

  const canProceed = () => {
    if (step === 0) return true;
    if (step === 1) return babyName.trim().length > 0;
    if (step === 2) return birthDate.length > 0;
    if (step === 3) return selectedGoals.length > 0;
    return true;
  };

  const steps = [
    // Step 0: Welcome
    <motion.div
      key="welcome"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center max-w-md mx-auto"
    >
      <div className="text-7xl mb-6">👶</div>
      <h1 className="text-3xl font-bold mb-4">
        Chào mừng đến với BabyFirst!
      </h1>
      <p className="text-muted-foreground mb-8">
        Hãy cùng tạo lộ trình phát triển cá nhân hoá cho bé của bạn trong vòng 2 phút.
      </p>
      <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
        <span className="flex items-center gap-2">
          <Check className="w-4 h-4 text-sage-dark" />
          Miễn phí
        </span>
        <span className="flex items-center gap-2">
          <Check className="w-4 h-4 text-sage-dark" />
          2 phút
        </span>
        <span className="flex items-center gap-2">
          <Check className="w-4 h-4 text-sage-dark" />
          Cá nhân hoá
        </span>
      </div>
    </motion.div>,

    // Step 1: Baby Name
    <motion.div
      key="name"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center max-w-md mx-auto"
    >
      <div className="w-20 h-20 bg-peach/30 rounded-full flex items-center justify-center mx-auto mb-6">
        <Baby className="w-10 h-10 text-terracotta" />
      </div>
      <h2 className="text-2xl font-bold mb-2">Bé tên gì?</h2>
      <p className="text-muted-foreground mb-8">
        Chúng tôi sẽ gọi tên bé trong các hoạt động
      </p>
      <Input
        value={babyName}
        onChange={(e) => setBabyName(e.target.value)}
        placeholder="Nhập tên bé..."
        className="text-center text-lg py-6 rounded-xl"
      />
    </motion.div>,

    // Step 2: Birth Date
    <motion.div
      key="birthdate"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center max-w-md mx-auto"
    >
      <div className="text-6xl mb-6">📅</div>
      <h2 className="text-2xl font-bold mb-2">
        {babyName} sinh ngày nào?
      </h2>
      <p className="text-muted-foreground mb-8">
        Để tính tuổi và gợi ý hoạt động phù hợp
      </p>
      <Input
        type="date"
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
        className="text-center text-lg py-6 rounded-xl"
      />
    </motion.div>,

    // Step 3: Goals
    <motion.div
      key="goals"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="max-w-lg mx-auto"
    >
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-sage/30 rounded-full flex items-center justify-center mx-auto mb-6">
          <Target className="w-10 h-10 text-sage-dark" />
        </div>
        <h2 className="text-2xl font-bold mb-2">
          Bạn muốn tập trung phát triển gì cho {babyName}?
        </h2>
        <p className="text-muted-foreground">
          Chọn 1 hoặc nhiều mục tiêu (có thể thay đổi sau)
        </p>
      </div>

      <div className="space-y-3">
        {goals.map((goal) => (
          <motion.button
            key={goal.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => toggleGoal(goal.id)}
            className={`w-full p-4 rounded-xl border-2 transition-all flex items-center gap-4 text-left ${
              selectedGoals.includes(goal.id)
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50"
            }`}
          >
            <span className="text-3xl">{goal.emoji}</span>
            <div className="flex-1">
              <p className="font-semibold">{goal.label}</p>
              <p className="text-sm text-muted-foreground">{goal.desc}</p>
            </div>
            {selectedGoals.includes(goal.id) && (
              <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                <Check className="w-4 h-4 text-primary-foreground" />
              </div>
            )}
          </motion.button>
        ))}
      </div>
    </motion.div>,

    // Step 4: Complete
    <motion.div
      key="complete"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="text-center max-w-md mx-auto"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 0.2 }}
        className="w-24 h-24 bg-gradient-to-br from-sage to-sage-dark rounded-full flex items-center justify-center mx-auto mb-6"
      >
        <Sparkles className="w-12 h-12 text-primary-foreground" />
      </motion.div>
      <h2 className="text-3xl font-bold mb-4">
        Tuyệt vời! 🎉
      </h2>
      <p className="text-lg text-muted-foreground mb-8">
        Lộ trình cá nhân hoá cho <strong className="text-foreground">{babyName}</strong> đã sẵn sàng. 
        Hãy bắt đầu hành trình đồng hành cùng con!
      </p>
      <Button size="lg" className="text-lg px-8" onClick={handleComplete}>
        Khám phá ngay
        <ArrowRight className="w-5 h-5 ml-2" />
      </Button>
    </motion.div>,
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="p-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-heading font-bold text-sm">B</span>
          </div>
          <span className="font-heading font-bold text-lg">
            Baby<span className="text-primary">First</span>
          </span>
        </a>
        
        {/* Progress indicator */}
        {step > 0 && step < 4 && (
          <div className="flex gap-1">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`w-8 h-1 rounded-full transition-colors ${
                  s <= step ? "bg-primary" : "bg-muted"
                }`}
              />
            ))}
          </div>
        )}
      </header>

      {/* Content */}
      <main className="flex-1 flex items-center justify-center p-6">
        <AnimatePresence mode="wait">
          {steps[step]}
        </AnimatePresence>
      </main>

      {/* Footer navigation */}
      <footer className="p-6">
        <div className="max-w-md mx-auto flex gap-4">
          {step > 0 && step < 4 && (
            <Button
              variant="outline"
              size="lg"
              onClick={() => setStep(step - 1)}
              className="flex-1"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại
            </Button>
          )}
          {step < 4 && (
            <Button
              size="lg"
              onClick={() => setStep(step + 1)}
              disabled={!canProceed()}
              className="flex-1"
            >
              {step === 0 ? "Bắt đầu" : "Tiếp tục"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </footer>
    </div>
  );
};

export default OnboardingFlow;
