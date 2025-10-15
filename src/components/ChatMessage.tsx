import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";

interface ChatMessageProps {
  role: "user" | "assistant";
  content: string;
}

export const ChatMessage = ({ role, content }: ChatMessageProps) => {
  return (
    <div
      className={cn(
        "flex gap-3 p-4 rounded-lg",
        role === "user" ? "bg-primary/10" : "bg-secondary/20"
      )}
    >
      <div className={cn(
        "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
        role === "user" ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground"
      )}>
        {role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
      </div>
      <div className="flex-1 space-y-2">
        <p className="text-sm font-medium">
          {role === "user" ? "Você" : "Assistente Analítico"}
        </p>
        <p className="text-sm text-muted-foreground whitespace-pre-wrap">
          {content}
        </p>
      </div>
    </div>
  );
};
