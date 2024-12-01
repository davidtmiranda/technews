"use client";

export const CTAButton = ({ className = "" }: { className?: string }) => {
  const handleClick = () => {
    if (typeof (window as any).fbq === "function") {
      (window as any).fbq("track", "Lead");
    }
    const params = new URLSearchParams(window.location.search);
    const url = new URL("https://elvian.ai");
    params.forEach((value, key) => {
      url.searchParams.set(key, value);
    });
    window.location.href = url.toString();
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full group relative bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white text-xl font-bold px-12 py-6 rounded-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl ${className}`}
    >
      <div className="absolute inset-0 bg-white/10 rounded-lg animate-pulse"></div>
      <span className="relative">
        CLAIM YOUR EARLY ACCESS SPOT NOW
        <span className="block text-sm font-normal mt-1">
          Limited Time 50% Discount
        </span>
      </span>
    </button>
  );
};
