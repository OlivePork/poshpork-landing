export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-yellow-500 font-bold text-lg mb-4">The Posh Pork Experience</h3>
            <p className="text-sm mb-4">
              An original interactive murder mystery experience combining entertainment with life-changing nutritional education.
            </p>
            <p className="text-sm text-yellow-500">
              Based in Mallorca, Spain
            </p>
          </div>

          <div>
            <h3 className="text-yellow-500 font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#booking" className="hover:text-yellow-500">Book Now</a></li>
              <li><a href="#video" className="hover:text-yellow-500">Watch Trailer</a></li>
              <li><a href="mailto:hello@poshpork.com" className="hover:text-yellow-500">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-yellow-500 font-bold text-lg mb-4">Contact</h3>
            <div className="space-y-3 text-sm">
              <p>📧 hello@poshpork.com</p>
              <p>📍 Possessió Vernissa, Llucmajor, Mallorca</p>
              <p>⏰ Wed, Fri, Sat at 10:00 AM</p>
              <p>Starting May 1st, 2026</p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-700 text-center text-sm">
          <p className="text-yellow-500 mb-2">
            © 2026 The Posh Pork Murder Mystery Experience. All rights reserved.
          </p>
          <p className="text-xs text-gray-500">
            An original experience by Colin • Based on peer-reviewed nutritional science
          </p>
        </div>
      </div>
    </footer>
  );
}