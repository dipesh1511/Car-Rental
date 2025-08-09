import React from "react";

// --- MOCK ASSETS FOR DEMO PURPOSES ---
const assets = {
  logo: "https://placehold.co/150x40/FFECD0/78350F?text=Logo",
  facebook_logo: "https://placehold.co/20x20/FFECD0/78350F?text=FB",
  instagram_logo: "https://placehold.co/20x20/FFECD0/78350F?text=IG",
  twitter_logo: "https://placehold.co/20x20/FFECD0/78350F?text=TW",
  gmail_logo: "https://placehold.co/20x20/FFECD0/78350F?text=GM",
};
// --- END MOCK ASSETS ---

const Footer = () => {
  return (
    // The main container with a warm, soft background and reduced margins
    <div className="bg-yellow-50 px-6 md:px-16 lg:px-24 xl:px-32 py-10 md:py-12 text-sm text-gray-600 border-t border-orange-100">
      <div className="flex flex-wrap justify-between items-start gap-8 md:gap-12 pb-6 border-b border-orange-100">
        <div>
          <img src={assets.logo} alt="logo" className="h-7 md:h-8" />
          <p className="max-w-80 mt-3 text-sm">
            Premium car rental service offering a wide range of vehicles for
            every occasion. Experience luxury and convenience with our top-notch
            fleet.
          </p>

          <div className="flex items-center gap-3 mt-6">
            <a href="#" className="hover:text-orange-500 transition-colors">
              <img
                src={assets.facebook_logo}
                alt="Facebook"
                className="w-5 h-5"
              />
            </a>
            <a href="#" className="hover:text-orange-500 transition-colors">
              <img
                src={assets.instagram_logo}
                alt="Instagram"
                className="w-5 h-5"
              />
            </a>
            <a href="#" className="hover:text-orange-500 transition-colors">
              <img
                src={assets.twitter_logo}
                alt="Twitter"
                className="w-5 h-5"
              />
            </a>
            <a href="#" className="hover:text-orange-500 transition-colors">
              <img src={assets.gmail_logo} alt="Gmail" className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div>
          <h2 className="text-base font-semibold text-gray-800 uppercase">
            Quick Links
          </h2>
          <ul className="mt-3 flex flex-col gap-1.5">
            <li>
              <a href="#" className="hover:text-orange-500 transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-500 transition-colors">
                Browse Cars
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-500 transition-colors">
                List Your Car
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-500 transition-colors">
                About Us
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-base font-semibold text-gray-800 uppercase">
            Resources
          </h2>
          <ul className="mt-3 flex flex-col gap-1.5">
            <li>
              <a href="#" className="hover:text-orange-500 transition-colors">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-500 transition-colors">
                Terms of Service
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-500 transition-colors">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-orange-500 transition-colors">
                Insurance
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-base font-semibold text-gray-800 uppercase">
            Contact
          </h2>
          <ul className="mt-3 flex flex-col gap-1.5">
            <li>143 Ram Nagar</li>
            <li>Palasiya, Delhi</li>
            <li>+91 12345 67890</li>
            <li>info@gmail.com</li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-2 items-center justify-between py-5 text-xs">
        <p>© {new Date().getFullYear()} All rights reserved.</p>
        <ul className="flex items-center gap-4">
          <li>
            <a href="#" className="hover:text-orange-500 transition-colors">
              Privacy
            </a>
          </li>
          <li className="text-gray-400">|</li>
          <li>
            <a href="#" className="hover:text-orange-500 transition-colors">
              Terms
            </a>
          </li>
          <li className="text-gray-400">|</li>
          <li>
            <a href="#" className="hover:text-orange-500 transition-colors">
              Cookies
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
