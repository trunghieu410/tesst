import { Button } from "@/components/ui/button";

interface HeroProps {
  onGetStartClick: () => void;
}

export function Hero({ onGetStartClick }: HeroProps) {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-start overflow-hidden bg-linear-to-br from-blue-50 via-white to-cyan-50">
      {/* Reserved div for unicorn.studio integration */}
      <div className="absolute inset-0 -z-10">
        {/* reserved for unicorn.studio interactive background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.08),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(6,182,212,0.06),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[4rem_4rem]" />
        {/* Animated gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container relative z-10 px-4 py-24">
        <div className="max-w-4xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-100/80 px-4 py-2 backdrop-blur-sm border border-blue-200">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            <span className="text-sm font-medium text-blue-700">
              Next-Gen Admin Platform
            </span>
          </div>

          <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight md:text-6xl lg:text-7xl">
            <span className="block bg-linear-to-r from-blue-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent">
              Intelligence Platform,
            </span>
            <span className="block text-gray-900 mt-2">Your Smart Choice!</span>
          </h1>

          <p className="mb-8 text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed">
            Streamline your advertising operations with blockchain-powered
            transparency, real-time analytics, and intelligent campaign
            management.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              onClick={onGetStartClick}
              className="bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-xl shadow-blue-500/30 h-12 px-8 text-base font-semibold transition-all hover:scale-105"
            >
              Get Started
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900 h-12 px-8 text-base font-semibold backdrop-blur-sm bg-white/50"
            >
              Learn More
            </Button>
          </div>

          {/* Feature highlights */}
          <div className="mt-12 grid grid-cols-3 gap-6 max-w-2xl">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">99.9%</div>
              <div className="text-sm text-gray-600">Uptime</div>
            </div>
            <div className="text-center border-x border-gray-200">
              <div className="text-2xl font-bold text-gray-900 mb-1">
                Real-time
              </div>
              <div className="text-sm text-gray-600">Analytics</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">
                Secure
              </div>
              <div className="text-sm text-gray-600">Blockchain</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
