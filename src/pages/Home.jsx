import React from "react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const Home = () => {
  const { translations } = useLanguage();
  const {
    hero = {},
    categories: categoryTranslations = {},
    testimonials = {},
    designInspiration: {
      title: designTitle = 'DESIGN INSPIRATION',
      homeStylingTitle = 'Home Styling Tips',
      homeStylingDescription = 'Discover the latest trends and expert advice to transform your living spaces.',
      colorGuide: {
        title: colorGuideTitle = 'Ultimate Color Guide',
        description: colorGuideDesc = 'Discover the perfect color palette to transform your living spaces with our expert guide.',
        cta: colorGuideCta = 'Explore Guide'
      } = {},
      diyProjects: {
        title: diyTitle = 'Creative DIY Ideas',
        description: diyDesc = 'Transform your space with these creative and affordable do-it-yourself home projects.',
        cta: diyCta = 'View Projects'
      } = {},
      livingRoom: {
        title: livingRoomTitle = 'Modern Living Room Ideas',
        description: livingRoomDesc = 'Get inspired with our curated collection of stunning living room designs and layouts.',
        cta: livingRoomCta = 'Get Inspired'
      } = {}
    } = {},
    newsletter = {}
  } = translations.home || {};

  const categories = [
    {
      id: 1,
      name: categoryTranslations.living?.name || "Living",
      description: categoryTranslations.living?.description || "Comfortable and stylish furniture for your living space",
      image: "/Living.jpg",
      slug: "living"
    },
    {
      id: 2,
      name: categoryTranslations.dining?.name || "Dining",
      description: categoryTranslations.dining?.description || "Elegant dining sets for memorable meals",
      image: "/Dining.jpg",
      slug: "dining"
    },
    {
      id: 3,
      name: categoryTranslations.bedroom?.name || "Bedroom",
      description: categoryTranslations.bedroom?.description || "Restful and stylish bedroom collections",
      image: "/Bedroom.jpg",
      slug: "bedroom"
    },
    {
      id: 4,
      name: categoryTranslations.decor?.name || "Decor",
      description: categoryTranslations.decor?.description || "Beautiful accents to complete your home",
      image: "/Decor.jpg",
      slug: "decor"
    }
  ];

  return (
    <div className="flex flex-col items-center bg-white">
      {/* Hero Section */}
      <section className="w-full min-h-[calc(100vh-64px)] relative bg-primary">
        <div className="absolute inset-0 overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/hero-banner.jpg')" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-black/20"></div>
          </div>
          {/* Subtle pattern overlay */}
          <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-[0.03] bg-[length:300px]"></div>
        </div>
        <div className="relative z-10 container mx-auto h-full flex items-center justify-center text-center px-5 py-20 md:py-32">
          <div className="max-w-5xl px-4">
            <span className="inline-block text-accent font-medium mb-4 text-sm tracking-[0.2em] uppercase">
              {hero.newCollection}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-white leading-[1.1] tracking-tight">
              {hero.title}
            </h1>
            {hero.subtitle && (
              <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-10 leading-relaxed font-light">
                {hero.subtitle}
              </p>
            )}
            <div className="flex justify-center">
              <a 
                href="/category"
                className="group relative overflow-hidden bg-accent hover:bg-accent/90 text-primary font-medium py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl shadow-primary/30 inline-block"
              >
                <span className="relative z-10">{hero.button}</span>
                <span className="absolute inset-0 bg-gradient-to-r from-accent/80 to-accent/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="w-full py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-accent font-medium mb-3 inline-block text-sm tracking-[0.2em] uppercase">
            {categoryTranslations.collectionsTitle}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-5 leading-tight">
            {categoryTranslations.sectionTitle}
          </h2>
          <div className="w-16 h-0.5 bg-accent mx-auto my-6"></div>
          <p className="text-gray-600 text-lg font-light">
            {categoryTranslations.sectionDescription}
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <div key={category.id} className="group relative overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
              <div className="aspect-square overflow-hidden bg-gray-50 transition-colors duration-300 group-hover:bg-gray-100/50">
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <h3 className="text-white font-semibold text-xl mb-2">{category.name}</h3>
                  <p className="text-white/90 text-sm mb-4">{category.description}</p>
                  <a 
                    href={`/category/${category.slug}`}
                    className="inline-block bg-white text-primary hover:bg-accent hover:text-white font-medium py-2 px-4 rounded-full transition-colors duration-300 self-start"
                  >
                    {categoryTranslations.shopNowButton || 'Shop Now'}
                  </a>
                </div>
              </div>
              <div className="p-6 text-center group-hover:hidden">
                <h3 className="text-xl font-semibold text-primary mb-3">{category.name}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {category.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="w-full bg-primary py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <span className="text-accent font-medium mb-3 inline-block text-sm tracking-[0.2em] uppercase">
              {testimonials.title}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">
              {testimonials.subtitle}
            </h2>
            <div className="w-16 h-0.5 bg-accent mx-auto my-6"></div>
            <p className="text-white/80 text-lg font-light">
              {testimonials.description}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="group p-8 h-full bg-white/5 backdrop-blur-sm border border-white/5 hover:border-accent/30 rounded-2xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
              <div className="flex items-center mb-5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-white/90 mb-8 text-lg leading-relaxed font-light italic">"{testimonials.customer1?.quote}"</p>
              <div className="flex items-center">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white/20 group-hover:border-accent/50 transition-all duration-300">
                  <img 
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&h=200&fit=crop&crop=faces" 
                    alt={testimonials.customer1?.name} 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="ml-4">
                  <p className="font-medium text-white text-lg">{testimonials.customer1?.name}</p>
                  <p className="text-sm text-white/60">{testimonials.customer1?.role}</p>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="group p-8 h-full bg-white/5 backdrop-blur-sm border border-white/5 hover:border-accent/30 rounded-2xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
              <div className="flex items-center mb-5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-white/90 mb-8 text-lg leading-relaxed font-light italic">"{testimonials.customer2?.quote}"</p>
              <div className="flex items-center">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white/20 group-hover:border-accent/50 transition-all duration-300">
                  <img 
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=faces" 
                    alt={testimonials.customer2?.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="ml-4">
                  <p className="font-medium text-white text-lg">{testimonials.customer2?.name}</p>
                  <p className="text-sm text-white/60">{testimonials.customer2?.role}</p>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="group p-8 h-full bg-white/5 backdrop-blur-sm border border-white/5 hover:border-accent/30 rounded-2xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
              <div className="flex items-center mb-5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-white/90 mb-8 text-lg leading-relaxed font-light italic">"{testimonials.customer3?.quote}"</p>
              <div className="flex items-center">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white/20 group-hover:border-accent/50 transition-all duration-300">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=200&h=200&fit=crop&crop=faces" 
                    alt={testimonials.customer3?.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="ml-4">
                  <p className="font-medium text-white text-lg">{testimonials.customer3?.name}</p>
                  <p className="text-sm text-white/60">{testimonials.customer3?.role}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Home Styling Tips */}
      <section className="w-full py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <span className="text-accent font-medium mb-3 inline-block text-sm tracking-[0.2em] uppercase">
            {designTitle}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-5 leading-tight">
            {homeStylingTitle}
          </h2>
          <div className="w-16 h-0.5 bg-accent mx-auto my-6"></div>
          <p className="text-gray-600 text-lg font-light">
            {homeStylingDescription}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Color Guide */}
          <div className="group overflow-hidden rounded-2xl bg-white border border-gray-100 hover:border-accent/30 transition-all duration-500 hover:shadow-xl hover:-translate-y-2">
            <div className="h-56 bg-gray-50 relative overflow-hidden">
              <img 
                src="/Color Guide.jpg" 
                alt="Color Guide"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6">
                <span className="text-white font-medium text-lg">Color Guide</span>
              </div>
              <div className="absolute top-4 right-4 bg-accent text-primary text-xs font-bold px-3 py-1 rounded-full">
                New
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-primary mb-3 group-hover:text-accent transition-colors duration-300">{colorGuideTitle}</h3>
              <p className="text-gray-500 mb-5 leading-relaxed">
                {colorGuideDesc}
              </p>
              <a href="#" className="relative inline-flex items-center text-accent font-medium group-hover:translate-x-1 transition-all duration-300">
                <span className="border-b border-transparent group-hover:border-accent pb-0.5">{colorGuideCta}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1.5 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* DIY Projects */}
          <div className="group overflow-hidden rounded-xl bg-white border border-gray-100 hover:border-accent/30 transition-all duration-300 hover:shadow-lg">
            <div className="h-48 bg-gray-50 relative overflow-hidden">
              <img 
                src="/DIY Projects.jpg" 
                alt="DIY Projects"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="text-white font-medium text-lg">DIY Projects</span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">{diyTitle}</h3>
              <p className="text-secondary mb-4">
                {diyDesc}
              </p>
              <a href="#" className="text-accent hover:text-accent-dark text-sm font-medium inline-flex items-center group-hover:translate-x-1 transition-transform duration-300">
                {diyCta}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>

          {/* Living Room */}
          <div className="group overflow-hidden rounded-xl bg-white border border-gray-100 hover:border-accent/30 transition-all duration-300 hover:shadow-lg">
            <div className="h-48 bg-gray-50 relative overflow-hidden">
              <img 
                src="/Living Room.jpg" 
                alt="Living Room Design"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <span className="text-white font-medium text-lg">Living Spaces</span>
              </div>
              <div className="absolute top-4 right-4 bg-accent text-primary text-xs font-bold px-3 py-1 rounded-full">
                Popular
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-primary mb-3">{livingRoomTitle}</h3>
              <p className="text-secondary mb-4">
                {livingRoomDesc}
              </p>
              <a href="#" className="text-accent hover:text-accent-dark text-sm font-medium inline-flex items-center group-hover:translate-x-1 transition-transform duration-300">
                {livingRoomCta}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="w-full bg-gray-50 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-primary to-primary/90 rounded-3xl overflow-hidden shadow-2xl">
          <div className="grid md:grid-cols-2">
            <div className="p-10 md:p-14 flex flex-col justify-center">
              <div className="w-16 h-0.5 bg-accent mb-8"></div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                {newsletter.title}
              </h2>
              <p className="text-accent/90 mb-8 text-lg leading-relaxed">
                {newsletter.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1 group">
                  <input 
                    type="email" 
                    placeholder={newsletter.emailPlaceholder} 
                    className="w-full px-6 py-4 rounded-xl border-2 border-white/10 bg-white/10 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-all duration-300 backdrop-blur-sm group-hover:border-accent/30"
                  />
                  <svg className="w-5 h-5 text-white/50 absolute right-5 top-1/2 transform -translate-y-1/2 group-focus-within:text-accent transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <button className="relative overflow-hidden bg-accent hover:bg-accent/90 text-primary font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg group">
                  <span className="relative z-10">{newsletter.subscribeButton}</span>
                  <span className="absolute inset-0 bg-gradient-to-r from-accent/80 to-accent/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </button>
              </div>
              <p className="text-sm text-white/60 mt-5">
                {newsletter.privacyText}
              </p>
            </div>
            <div className="bg-accent/5 hidden md:flex items-center justify-center p-8 relative overflow-hidden">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-accent/10 rounded-full animate-float"></div>
              <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-accent/5 rounded-full animate-float animation-delay-2000"></div>
              <div className="relative z-10 text-center p-8">
                <div className="text-5xl md:text-6xl font-bold text-white mb-3">{newsletter.discountTitle}</div>
                <div className="text-accent/80 uppercase text-sm tracking-wider font-medium mb-8">
                  {newsletter.discountSubtitle}
                </div>
                <div className="w-16 h-0.5 bg-accent mx-auto mb-8"></div>
                <p className="text-white/80 text-sm max-w-xs mx-auto leading-relaxed">
                  {newsletter.discountDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
