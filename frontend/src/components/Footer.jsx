import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-black p-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="font-semibold mb-2">Support</h3>
          <ul className="space-y-1 text-sm">
            <li>Help Centre</li>
            <li>AirCover</li>
            <li>Anti-discrimination</li>
            <li>Disability support</li>
            <li>Cancellation options</li>
            <li>Report neighbourhood concern</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Hosting</h3>
          <ul className="space-y-1 text-sm">
            <li>Airbnb your home</li>
            <li>AirCover for Hosts</li>
            <li>Hosting resources</li>
            <li>Community forum</li>
            <li>Hosting responsibly</li>
            <li>Join a free Hosting class</li>
            <li>Find a co-host</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-2">Airbnb</h3>
          <ul className="space-y-1 text-sm">
            <li>Newsroom</li>
            <li>New features</li>
            <li>Careers</li>
            <li>Investors</li>
            <li>Airbnb.org emergency stays</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-300 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-600">
        <div className="mb-2 md:mb-0">&copy; 2025 Airbnb, Inc.</div>
        <div className="flex gap-4">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Sitemap</a>
          <a href="#">Company details</a>
        </div>
        <div className="flex items-center gap-4 mt-2 md:mt-0">
          <span>🌐 English (IN)</span>
          <span>₹ INR</span>
          <span>🔵</span>
          <span>❌</span>
          <span>📷</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
