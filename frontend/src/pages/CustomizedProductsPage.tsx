import { MessageCircle, Mail } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const FACEBOOK_URL = "https://www.facebook.com/";
const WHATSAPP_NUMBER = "9233341740951";

const CustomizedProductsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="bg-white text-gray-900 pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Left: For Customized Products */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-wide text-gray-900 mb-6">
                For Customized Products
              </h1>
              <p className="text-gray-700 mb-4">
                For any product design contact our designer via WhatsApp &amp; Facebook page link.
              </p>
              <p className="text-gray-700">
                For custom leather suit measurement chart contact at email:{" "}
                <a
                  href="mailto:yexonimpex@gmail.com"
                  className="text-primary font-semibold hover:underline"
                >
                  yexonimpex@gmail.com
                </a>
              </p>
            </div>

            {/* Right: Contact Designer */}
            <div>
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-wide text-gray-900 mb-6">
                Contact Designer
              </h2>
              <div className="flex flex-wrap gap-4">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-12 h-12 rounded bg-[#38a94d] text-white hover:opacity-90 transition-opacity"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-6 h-6" />
                </a>
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-12 h-12 rounded bg-[#3b5999] text-white hover:opacity-90 transition-opacity"
                  aria-label="Facebook"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a
                  href="mailto:yexonimpex@gmail.com"
                  className="inline-flex items-center justify-center w-12 h-12 rounded bg-gray-700 text-white hover:opacity-90 transition-opacity"
                  aria-label="Email"
                >
                  <Mail className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CustomizedProductsPage;
