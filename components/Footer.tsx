export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-yellow-500 font-bold text-lg mb-4">Which Food Is Killing You?</h3>
            <p className="text-sm mb-4">
              A feature-length documentary that puts you on the jury. Weigh the evidence,
              answer as you watch, and deliver your verdict.
            </p>
            <p className="text-sm text-yellow-500">
              Made in Mallorca, Spain
            </p>
          </div>

          <div>
            <h3 className="text-yellow-500 font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="/movie" className="hover:text-yellow-500">Watch the Film</a></li>
              <li><a href="/about" className="hover:text-yellow-500">The Back Story</a></li>
              <li><a href="/blog" className="hover:text-yellow-500">Blog</a></li>
              <li><a href="/press" className="hover:text-yellow-500">Press</a></li>
              <li><a href="/licensing" className="hover:text-yellow-500">Group &amp; Educational Licences</a></li>
              <li><a href="/terms" className="hover:text-yellow-500">Terms &amp; Conditions</a></li>
              <li><a href="/privacy" className="hover:text-yellow-500">Privacy Policy</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-yellow-500 font-bold text-lg mb-4">Contact</h3>
            <div className="space-y-3 text-sm">
              <p>📧 <a href="mailto:colin@poshpork.com" className="hover:text-yellow-500">colin@poshpork.com</a></p>
              <p>🎬 Screenings for schools, workplaces and groups:<br/>
                <a href="mailto:screenings@poshpork.com" className="hover:text-yellow-500">screenings@poshpork.com</a></p>
              <p className="text-xs text-gray-500 pt-2">
                €15 — one payment, permanent access.<br/>
                One purchase covers your household.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-700 text-center text-sm">
          <p className="text-yellow-500 mb-2">
            © 2026 Posh Pork. All rights reserved.
          </p>
          <p className="text-xs text-gray-500 max-w-2xl mx-auto">
            Written and directed by Colin Marry. Sources cited on screen throughout the film.
            This film is for entertainment and education only — it is not medical advice,
            and nothing in it should replace a conversation with your doctor.
          </p>
        </div>
      </div>
    </footer>
  );
}
