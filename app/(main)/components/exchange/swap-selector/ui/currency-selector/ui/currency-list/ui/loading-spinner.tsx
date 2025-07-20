// components/LoadingSpinner.tsx
const LoadingSpinner: React.FC = () => (
  <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 flex items-center justify-center p-4 z-10">
    <div className="flex items-center space-x-2">
      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
      <span className="text-sm text-gray-600">Loading more currencies...</span>
    </div>
  </div>
);

export default LoadingSpinner;
