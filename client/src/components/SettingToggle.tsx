interface SettingToggleProps {
  title: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  testId: string;
  variant?: "primary" | "secondary" | "destructive";
}

export default function SettingToggle({
  title,
  description,
  checked,
  onChange,
  testId,
  variant = "primary"
}: SettingToggleProps) {
  const getVariantClasses = () => {
    switch (variant) {
      case "secondary":
        return checked ? "bg-secondary" : "bg-gray-200";
      case "destructive":
        return checked ? "bg-red-500" : "bg-gray-200";
      default:
        return checked ? "bg-primary" : "bg-gray-200";
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-medium text-gray-900">{title}</p>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
      <div className="relative">
        <input
          type="checkbox"
          className="sr-only"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          data-testid={testId}
        />
        <div
          className={`w-11 h-6 ${getVariantClasses()} rounded-full flex items-center cursor-pointer transition-colors`}
          onClick={() => onChange(!checked)}
        >
          <div
            className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform ${
              checked ? "translate-x-6" : "translate-x-1"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
