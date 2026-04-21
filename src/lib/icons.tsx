import {
  Users,
  BarChart3,
  Shield,
  Rocket,
  MessageCircle,
  ShoppingCart,
  Workflow,
  Code2,
  Globe,
  Smartphone,
  Database,
  Zap,
  Lock,
  Cloud,
  Cpu,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Users,
  BarChart3,
  Shield,
  Rocket,
  MessageCircle,
  ShoppingCart,
  Workflow,
  Code2,
  Globe,
  Smartphone,
  Database,
  Zap,
  Lock,
  Cloud,
  Cpu,
};

export function getIcon(name: string, className = "h-6 w-6") {
  const Icon = iconMap[name] ?? Code2;
  return <Icon className={className} />;
}
