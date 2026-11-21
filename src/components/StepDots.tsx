interface StepDotsProps {
    totalSteps: number;
    currentStep: number; // наприклад, 1..4 або 0..3
    className?: string;
}

export const StepDots = ({
                             totalSteps,
                             currentStep,
                             className = "",
                         }: StepDotsProps) => {
    return (
        <div
            role="group"
            aria-label={`Крок ${currentStep} з ${totalSteps}`}
            className={`flex items-center justify-center gap-4.5 ${className}`}
        >
            {Array.from({ length: totalSteps }, (_, index) => {
                const stepNumber = index + 1;
                const isActive = stepNumber === currentStep;

                return (
                    <span
                        key={stepNumber}
                        aria-hidden="true"
                        className={`h-3.5 w-3.5 rounded-full transition-colors ${
                            isActive ? "bg-olive" : "bg-olive-light"
                        }`}
                    />
                );
            })}
        </div>
    );
};