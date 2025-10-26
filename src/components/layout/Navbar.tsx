import { Button } from "@/components/ui/button";

interface NavbarProps {
  onLoginClick: () => void;
}

export function Navbar({ onLoginClick }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-white/80 backdrop-blur-xl shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-linear-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">AC</span>
            </div>
            <div className="text-xl font-bold text-gray-900">AdminChain</div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors relative group"
          >
            Features
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-blue-600 to-cyan-600 transition-all group-hover:w-full"></span>
          </a>
          <a
            href="#pricing"
            className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors relative group"
          >
            Pricing
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-linear-to-r from-blue-600 to-cyan-600 transition-all group-hover:w-full"></span>
          </a>
        </div>

        <Button
          onClick={onLoginClick}
          className="bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium shadow-lg shadow-blue-500/20 transition-all hover:scale-105"
        >
          Login
        </Button>
      </div>
    </nav>
  );
}
