export function StepIndicator({ currentStep, totalSteps }: { currentStep: number; totalSteps: number }) {
  return (
    <div className="flex justify-center mb-6">
      <div className="flex items-center space-x-2">
        {Array.from({ length: totalSteps }).map((_, index) => {
          const stepNumber = index + 1
          const isActive = stepNumber === currentStep
          const isCompleted = stepNumber < currentStep

          return (
            <div key={stepNumber} className="flex items-center">
              {index > 0 && (
                <div
                  className={`h-0.5 w-10 ${
                    isCompleted ? "bg-indigo-600 dark:bg-indigo-400" : "bg-gray-300 dark:bg-gray-700"
                  }`}
                />
              )}
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                  isActive
                    ? "bg-indigo-600 text-white"
                    : isCompleted
                      ? "bg-indigo-600 dark:bg-indigo-400 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                {stepNumber}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
