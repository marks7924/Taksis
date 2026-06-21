import type { Metadata } from "next";
import "./globals.css";
import { AppProvider } from "@/services/store";
import Header from "@/components/header";
import Footer from "@/components/footer";
import WhatsAppCTA from "@/components/whatsapp-cta";

export const metadata: Metadata = {
  title: "معارض طاكسيس | لملابس الكهنوت ومستلزمات الكنائس والأديرة الأرثوذكسية",
  description: "الموقع الرسمي لمعارض طاكسيس (طاكسيس للشماس والقسيس) - تفصيل ملابس الكهنوت، طونيات الشمامسة، صياغة الدفوف والصنوج النحاسية يدوياً، أواني المذبح، الأيقونات القبطية، والأعمال الخشبية المحفورة.",
  keywords: "طونيات شماس، ملابس كهنوت، دفوف كنسية، صنوج، تريانتو، شورية نحاسية، أواني كنسية، كتب طقسية قبطية، أيقونات قبطية يدوية، طاكسيس، للشماس والقسيس",
  openGraph: {
    title: "معارض طاكسيس | للشماس والقسيس",
    description: "مستلزمات الكنائس القبطية الأرثوذكسية وتفصيل ملابس الكهنوت الفاخرة يدوياً.",
    type: "website",
    locale: "ar_EG",
    siteName: "طاكسيس",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className="h-full">
      <body className="min-h-full flex flex-col bg-ivory-100 text-navy-900 font-sans selection:bg-burgundy-700 selection:text-white antialiased">
        <AppProvider>
          {/* Header Sticky Component */}
          <Header />
          
          {/* Main Layout Container */}
          <main className="flex-grow">
            {children}
          </main>
          
          {/* Footer Component */}
          <Footer />
          
          {/* Floating WhatsApp Button */}
          <WhatsAppCTA />
        </AppProvider>
      </body>
    </html>
  );
}
