import Footer from "../../../shared/components/Footer";
import Header from "../../../shared/components/Header";

interface LegalPageProps {
  children: React.ReactNode;
}

function LegalPage({ children }: LegalPageProps) {
  return (
    <>
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </>
  );
}

export default LegalPage;
