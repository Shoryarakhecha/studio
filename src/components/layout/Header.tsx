import { Brain } from 'lucide-react';
import type { FC } from 'react';

const Header: FC = () => {
  return (
    <header className="py-6">
      <div className="container mx-auto flex items-center gap-2">
        <Brain className="h-8 w-8 text-primary" />
        <h1 className="text-3xl font-bold text-foreground">RecommenderPro</h1>
      </div>
    </header>
  );
};

export default Header;
