import { Header } from '@/components/Header';
import { UnitConverter } from '@/components/UnitConverter';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8 px-4">
        <UnitConverter />
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground border-t border-border">
        <p>Fast, accurate unit conversions — all calculations done locally</p>
      </footer>
    </div>
  );
};

export default Index;
