import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/LanguageSwitcher';
import ThemeToggle from '../components/ThemeToggle';
import LoginButton from '../components/LoginButton';

const PublicHomePage: React.FC = () => {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  return (
    <div className="min-h-screen bg-background dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <header className="bg-card/80 backdrop-blur-md shadow-sm border-b border-border dark:border-slate-700/50 dark:shadow-lg dark:shadow-black/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Shop Name */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-foreground dark:text-white bg-gradient-to-r from-primary-600 to-primary-500 bg-clip-text text-transparent">
                {t('public.companyName')}
              </h1>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 dark:hover:text-blue-400">
                {t('public.navigation.home')}
              </a>
              <a href="#services" className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 dark:hover:text-blue-400">
                {t('public.navigation.services')}
              </a>
              <a href="#contact" className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium transition-all duration-200 hover:scale-105 dark:hover:text-blue-400">
                {t('public.navigation.contact')}
              </a>
            </nav>

            {/* Controls: Theme Toggle, Language Switcher */}
            <div className="flex items-center space-x-3">
              <ThemeToggle variant="icon" />
              <LanguageSwitcher />
              {/* Login button shown only on desktop */}
              <div className="hidden md:block">
                <LoginButton variant="primary" size="md" />
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-muted-foreground hover:text-foreground p-2 transition-all duration-200 hover:scale-110 dark:hover:text-blue-400"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-card/95 backdrop-blur-md border-t border-border dark:border-slate-700/50">
            <div className="px-4 py-3 space-y-3">
              <a 
                href="#" 
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 px-3 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-all duration-200 dark:hover:text-blue-400 dark:hover:bg-slate-800/50"
              >
                {t('public.navigation.home')}
              </a>
              <a 
                href="#services" 
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 px-3 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-all duration-200 dark:hover:text-blue-400 dark:hover:bg-slate-800/50"
              >
                {t('public.navigation.services')}
              </a>
              <a 
                href="#contact" 
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 px-3 text-muted-foreground hover:text-foreground hover:bg-accent rounded-md transition-all duration-200 dark:hover:text-blue-400 dark:hover:bg-slate-800/50"
              >
                {t('public.navigation.contact')}
              </a>
              
              {/* Login button for mobile */}
              <div className="pt-3 border-t border-border dark:border-slate-700/50">
                <div onClick={() => setMobileMenuOpen(false)}>
                  <LoginButton variant="primary" size="md" className="w-full" />
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 dark:from-slate-800 dark:via-blue-900 dark:to-slate-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-blue-800/90 dark:from-slate-900/80 dark:to-blue-900/80"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/20 dark:bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/20 dark:bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-32">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent dark:from-white dark:to-blue-200 leading-tight">
              {t('public.hero.title')}
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl mb-6 sm:mb-8 text-blue-100 dark:text-blue-200 max-w-3xl mx-auto leading-relaxed px-2">
              {t('public.hero.subtitle')}
            </p>

          </div>
        </div>
        
        {/* Enhanced Background Pattern */}
        <div className="absolute inset-0 bg-black/10 dark:bg-black/30">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 sm:py-20 bg-muted dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4 dark:bg-gradient-to-r dark:from-white dark:to-blue-200 dark:bg-clip-text dark:text-transparent">{t('public.services.title')}</h3>
            <p className="text-lg sm:text-xl text-muted-foreground dark:text-slate-300 px-4">{t('public.services.subtitle')}</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="card dark-card p-8 text-center hover:shadow-lg dark:hover:shadow-2xl dark:hover:shadow-blue-500/10 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 group">
              <div className="w-16 h-16 bg-blue-100 dark:bg-gradient-to-br dark:from-blue-500/20 dark:to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-card-foreground mb-2 dark:text-white">{t('public.services.roadside.title')}</h4>
              <p className="text-muted-foreground dark:text-slate-300 leading-relaxed">{t('public.services.roadside.description')}</p>
            </div>
            
            <div className="card dark-card p-8 text-center hover:shadow-lg dark:hover:shadow-2xl dark:hover:shadow-blue-500/10 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 group">
              <div className="w-16 h-16 bg-blue-100 dark:bg-gradient-to-br dark:from-green-500/20 dark:to-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-blue-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-card-foreground mb-2 dark:text-white">{t('public.services.tireChange.title')}</h4>
              <p className="text-muted-foreground dark:text-slate-300 leading-relaxed">{t('public.services.tireChange.description')}</p>
            </div>
            
            <div className="card dark-card p-8 text-center hover:shadow-lg dark:hover:shadow-2xl dark:hover:shadow-blue-500/10 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 group">
              <div className="w-16 h-16 bg-blue-100 dark:bg-gradient-to-br dark:from-purple-500/20 dark:to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-blue-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
              <h4 className="text-xl font-semibold text-card-foreground mb-2 dark:text-white">{t('public.services.storage.title')}</h4>
              <p className="text-muted-foreground dark:text-slate-300 leading-relaxed">{t('public.services.storage.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tire Brands Section */}
      <section className="py-12 sm:py-16 bg-background dark:bg-slate-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2 sm:mb-3 dark:text-white">{t('public.brands.title')}</h3>
            <p className="text-sm sm:text-base text-muted-foreground dark:text-slate-400 px-4">{t('public.brands.subtitle')}</p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 lg:gap-8 items-center">
            {['Michelin', 'Bridgestone', 'Continental', 'Pirelli', 'Goodyear', 'Dunlop'].map((brand) => (
              <div key={brand} className="flex items-center justify-center p-4 card dark-card hover:shadow-md transition-all duration-200 group">
                <span className="text-lg font-semibold text-muted-foreground group-hover:text-foreground dark:text-slate-400 dark:group-hover:text-slate-200 transition-colors duration-200">
                  {brand}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 sm:py-20 bg-muted dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4 dark:bg-gradient-to-r dark:from-white dark:to-blue-200 dark:bg-clip-text dark:text-transparent">{t('public.testimonials.title')}</h3>
            <p className="text-lg sm:text-xl text-muted-foreground dark:text-slate-300 px-4">{t('public.testimonials.subtitle')}</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="card dark-card p-6 hover:shadow-lg dark:hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
                    A
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-foreground dark:text-white">Ahmet Yılmaz</h4>
                  <div className="flex text-yellow-400">
                    {'★'.repeat(5)}
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground dark:text-slate-300 italic leading-relaxed">"{t('public.testimonials.review1')}"</p>
            </div>
            
            <div className="card dark-card p-6 hover:shadow-lg dark:hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                    M
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-foreground dark:text-white">Mehmet Kaya</h4>
                  <div className="flex text-yellow-400">
                    {'★'.repeat(5)}
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground dark:text-slate-300 italic leading-relaxed">"{t('public.testimonials.review2')}"</p>
            </div>
            
            <div className="card dark-card p-6 hover:shadow-lg dark:hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                    F
                  </div>
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-foreground dark:text-white">Fatma Demir</h4>
                  <div className="flex text-yellow-400">
                    {'★'.repeat(5)}
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground dark:text-slate-300 italic leading-relaxed">"{t('public.testimonials.review3')}"</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-20 bg-background dark:bg-gradient-to-br dark:from-slate-800 dark:to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-3 sm:mb-4 dark:bg-gradient-to-r dark:from-white dark:to-blue-200 dark:bg-clip-text dark:text-transparent">{t('public.contact.title')}</h3>
            <p className="text-lg sm:text-xl text-muted-foreground dark:text-slate-300 px-4">{t('public.contact.subtitle')}</p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            {/* Contact Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              <div className="text-center group">
                <div className="w-16 h-16 bg-blue-100 dark:bg-gradient-to-br dark:from-blue-500/20 dark:to-cyan-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 dark:shadow-lg dark:shadow-blue-500/20">
                  <svg className="w-8 h-8 text-blue-600 dark:text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-foreground mb-2 dark:text-white">{t('public.contact.address.title')}</h4>
                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Osmanlı+Caddesi+Bosna+Hersek+Mahallesi+Konya+Türkiye"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground dark:text-slate-300 leading-relaxed hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 cursor-pointer inline-block"
                >
                  {t('public.contact.address.line1')}<br />
                  {t('public.contact.address.line2')}<br />
                  {t('public.contact.address.line3')}
                </a>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 bg-blue-100 dark:bg-gradient-to-br dark:from-green-500/20 dark:to-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 dark:shadow-lg dark:shadow-green-500/20">
                  <svg className="w-8 h-8 text-blue-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-foreground mb-2 dark:text-white">{t('public.contact.phone.title')}</h4>
                <p className="text-muted-foreground dark:text-slate-300 leading-relaxed">
                  +90 212 555 01 23<br />
                  +90 532 555 01 23
                </p>
              </div>
              
              <div className="text-center group">
                <div className="w-16 h-16 bg-blue-100 dark:bg-gradient-to-br dark:from-orange-500/20 dark:to-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300 dark:shadow-lg dark:shadow-orange-500/20">
                  <svg className="w-8 h-8 text-blue-600 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="text-xl font-semibold text-foreground mb-2 dark:text-white">{t('public.contact.hours.title')}</h4>
                <p className="text-muted-foreground dark:text-slate-300 leading-relaxed">
                  {t('public.contact.hours.weekdays')}<br />
                  {t('public.contact.hours.time')}<br />
                  {t('public.contact.hours.closed')}
                </p>
              </div>
            </div>


          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 dark:bg-gradient-to-br dark:from-slate-950 dark:to-slate-900 text-white py-12 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="col-span-1 sm:col-span-2 lg:col-span-2">
              <h5 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">{t('public.companyName')}</h5>
              <p className="text-gray-400 dark:text-slate-400 mb-4 leading-relaxed">
                {t('public.footer.description')}
              </p>
            </div>
            
            <div>
              <h6 className="text-lg font-semibold mb-4 text-blue-200">{t('public.footer.servicesTitle')}</h6>
              <ul className="space-y-2 text-gray-400 dark:text-slate-400">
                <li><a href="#" className="hover:text-white transition-colors duration-200 hover:text-blue-300">{t('public.footer.servicesList.roadside')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200 hover:text-blue-300">{t('public.footer.servicesList.tireChange')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200 hover:text-blue-300">{t('public.footer.servicesList.storage')}</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200 hover:text-blue-300">{t('public.footer.servicesList.appointment')}</a></li>
              </ul>
            </div>
            
            <div>
              <h6 className="text-lg font-semibold mb-4 text-blue-200">{t('public.footer.contactTitle')}</h6>
              <ul className="space-y-2 text-gray-400 dark:text-slate-400">
                <li className="hover:text-blue-300 transition-colors duration-200">+90 212 555 01 23</li>
                <li className="hover:text-blue-300 transition-colors duration-200">info@buyukyilmazoto.com</li>
                <li className="hover:text-blue-300 transition-colors duration-200">{t('public.contact.address.line1')}</li>
                <li className="hover:text-blue-300 transition-colors duration-200">{t('public.contact.address.line2')}</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 dark:border-slate-700 mt-8 pt-8 text-center text-gray-400 dark:text-slate-500">
            <p className="hover:text-blue-300 transition-colors duration-200">{t('public.footer.copyright')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicHomePage; 