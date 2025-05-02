export default function Footer() {
    return (
      <footer className="border-t py-8 px-4 md:px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-serif font-bold text-lg mb-4">Wedding Template</h3>
              <p className="text-gray-600">
                Creating unforgettable wedding experiences with professional DJ, MC, planning, and coordination services.
              </p>
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-primary">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#services" className="text-gray-600 hover:text-primary">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#about" className="text-gray-600 hover:text-primary">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#reviews" className="text-gray-600 hover:text-primary">
                    Reviews
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-600 hover:text-primary">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg mb-4">Service Areas</h3>
              <p className="text-gray-600">
                Serving weddings and events in [Your Service Areas]. Contact us to check availability for your location.
              </p>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-gray-500 text-sm">
            <p>&copy; {new Date().getFullYear()} Wedding Template. All rights reserved.</p>
          </div>
        </div>
      </footer>
    );
  }