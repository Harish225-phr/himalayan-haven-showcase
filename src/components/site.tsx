import { Link, useRouterState } from '@tanstack/react-router';
import { useEffect, useState, type ReactNode } from 'react';
import { ArrowRight, ArrowUpRight, Menu, X, Phone, MapPin, MessageCircle, Mountain, Wifi, Car, Flame, UtensilsCrossed, PawPrint, Sparkles, Sun, Heart, Coffee, Zap, Compass, Trees, Check, ChevronLeft, ChevronRight, Plus, Snowflake, Leaf, CloudSun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollReveal, useScrollProgress, useParallax } from '@/hooks/use-scroll-reveal';
import propertyDaylight from '@/assets/property-daylight.webp';
import propertyGarden from '@/assets/property-garden.webp';
import propertyNight from '@/assets/property-night.webp';
import mountainGateway from '@/assets/mountain-gateway.webp';
import terraceEvening from '@/assets/terrace-evening.webp';
import deluxeRoom from '@/assets/deluxe-room.webp';
const standardRoom = deluxeRoom; // Fallback: standard-room.webp is missing
import balconyRoom from '@/assets/balcony-room.webp';
import gardenEvening from '@/assets/garden-evening.webp';

export const whatsapp = 'https://wa.me/918219967293?text=Hello%20Ecstasy%20Farms%20Dalhousie%2C%20I%20would%20like%20to%20enquire%20about%20room%20availability%20and%20booking.';
export const directions = 'https://www.google.com/maps/dir/?api=1&destination=Ecstasy+Farms+Dalhousie+Village+Manola';
const links = [
  { label: 'Home', to: '/' }, { label: 'Rooms', to: '/rooms' }, { label: 'About', to: '/about' },
  { label: 'Amenities', to: '/amenities' }, { label: 'Dining', to: '/dining' }, { label: 'Experiences', to: '/experiences' },
  { label: 'Gallery', to: '/gallery' }, { label: 'Location', to: '/location' }, { label: 'Contact', to: '/contact' },
] as const;

const heroSlides = [
  { src: propertyDaylight, alt: 'Ecstasy Farms Dalhousie homestay with red roof and pine trees' },
  { src: mountainGateway, alt: 'Mountain view beyond the entrance to Ecstasy Farms' },
  { src: propertyNight, alt: 'Ecstasy Farms Dalhousie at night under the stars' },
  { src: terraceEvening, alt: 'Evening setup on the terrace at Ecstasy Farms' },
];

function ScrollProgressBar() {
  const progress = useScrollProgress();
  return (
    <div className="scroll-progress-track" aria-hidden="true">
      <div className="scroll-progress-fill" style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
}

function Reveal({ children, delay = 0, y = 40, className = '' }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  const [ref, visible] = useScrollReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`reveal ${visible ? 'reveal-in' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}ms`, '--reveal-y': `${y}px` } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % heroSlides.length), 5000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="hero-carousel" aria-label="Property highlights slideshow">
      {heroSlides.map((slide, i) => (
        <img
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          className={`hero-slide ${i === current ? 'active' : ''}`}
          fetchPriority={i === 0 ? 'high' : 'low'}
          loading={i === 0 ? 'eager' : 'lazy'}
        />
      ))}
      <div className="hero-carousel-dots">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            className={`hero-dot ${i === current ? 'active' : ''}`}
            onClick={() => setCurrent(i)}
            aria-label={`Show slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`faq-item ${open ? 'open' : ''}`}>
      <div className="faq-summary" onClick={() => setOpen(!open)} role="button" tabIndex={0} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(!open); } }}>
        <h3>{question}</h3>
        <span className="faq-toggle"><Plus size={18} /></span>
      </div>
      <div className="faq-answer"><p>{answer}</p></div>
    </div>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => { const onScroll = () => setScrolled(window.scrollY > 24); onScroll(); window.addEventListener('scroll', onScroll, { passive: true }); return () => window.removeEventListener('scroll', onScroll); }, []);
  return <div className="site-shell">
    <ScrollProgressBar />
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="header-inner">
        <Link to="/" className="brand" aria-label="Ecstasy Farms Dalhousie home"><span className="brand-mark"><Mountain size={23} strokeWidth={1.4}/></span><span className="brand-type"><strong>ECSTASY FARMS</strong><small>DALHOUSIE · HIMACHAL</small></span></Link>
        <nav className="desktop-nav" aria-label="Main navigation">{links.map((link) => <Link key={link.to} to={link.to} className={pathname === link.to ? 'nav-active' : ''}>{link.label}</Link>)}</nav>
        <div className="header-actions"><Button asChild variant="booking" size="sm" className="header-book"><a href={whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={16}/> Book Now</a></Button><Button variant="ghost" size="icon" className="menu-button" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>{open ? <X/> : <Menu/>}</Button></div>
      </div>
      {open && <nav className="mobile-nav" aria-label="Mobile navigation">{links.map((link) => <Link key={link.to} to={link.to} className={pathname === link.to ? 'nav-active' : ''}>{link.label}<ArrowUpRight size={16}/></Link>)}<a href={whatsapp} target="_blank" rel="noopener noreferrer">Book on WhatsApp <ArrowUpRight size={16}/></a></nav>}
    </header>
    <main>{children}</main>
    <div className="floating-actions">
      <a href="tel:+918219967293" className="floating-btn floating-call" aria-label="Call Ecstasy Farms" title="Call Now"><Phone size={26}/></a>
      <a href={whatsapp} target="_blank" rel="noopener noreferrer" className="floating-btn floating-whatsapp" aria-label="Chat on WhatsApp" title="Book on WhatsApp">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        <span className="floating-label">Book Now</span>
      </a>
    </div>
    <footer className="footer"><div className="container footer-top"><div className="footer-brand"><span className="eyebrow light">A LITTLE CLOSER TO NATURE</span><h2>Find your quiet<br/><em>in the hills.</em></h2><Button asChild variant="light" size="lg"><a href={whatsapp} target="_blank" rel="noopener noreferrer">Enquire on WhatsApp <ArrowUpRight/></a></Button></div><div className="footer-columns"><div><h3>Explore</h3><Link to="/rooms">Rooms</Link><Link to="/about">Our story</Link><Link to="/dining">Dining</Link><Link to="/gallery">Gallery</Link><Link to="/experiences">Experiences</Link></div><div><h3>Plan your stay</h3><Link to="/amenities">Amenities</Link><Link to="/location">Location</Link><Link to="/contact">Contact</Link><a href={directions} target="_blank" rel="noopener noreferrer">Directions</a></div><div><h3>Say hello</h3><a href="tel:+918219967293">+91 82199 67293</a><a href="tel:+919418010753">+91 94180 10753</a><a href={whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp us</a><p>Village Manola, Dalhousie–Chamba Road<br/>Himachal Pradesh 176306</p></div></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Ecstasy Farms Dalhousie. All rights reserved.</span><span>Made for the slower moments.</span></div></footer>
  </div>;
}
export function SectionLabel({ children }: { children: ReactNode }) { return <span className="eyebrow"><span className="eyebrow-line"/>{children}</span>; }
export function BookingButton({ children = 'Book on WhatsApp', className = '' }: { children?: ReactNode; className?: string }) { return <Button asChild variant="booking" size="lg" className={className}><a href={whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={17}/>{children}<ArrowUpRight size={17}/></a></Button>; }
export function TextLink({ to, children }: { to: '/' | '/rooms' | '/about' | '/amenities' | '/dining' | '/experiences' | '/gallery' | '/location' | '/contact'; children: ReactNode }) { return <Link to={to} className="text-link">{children}<ArrowUpRight size={18}/></Link>; }
export function PageHero({ label, title, description, image, alt }: { label: string; title: string; description: string; image: string; alt: string }) {
  const parallaxRef = useParallax<HTMLDivElement>(0.15);
  return <section className="page-hero"><div ref={parallaxRef} className="page-hero-bg" style={{ '--parallax-img': `url(${image})` } as React.CSSProperties} /><div className="hero-shade"/><div className="container page-hero-content"><span className="eyebrow light"><span className="eyebrow-line" />{label}</span><h1 className="page-hero-title">{title}</h1><p className="page-hero-desc">{description}</p></div></section>;
}
export function ClosingCTA({ title = 'Your mountain escape is waiting.', description = 'Come for the views. Stay for the feeling of being right where you belong.' }: { title?: string; description?: string }) {
  const parallaxRef = useParallax<HTMLElement>(0.2);
  return <section ref={parallaxRef} className="closing-cta"><img src={terraceEvening} alt="Evening setup on the terrace at Ecstasy Farms" loading="lazy"/><div className="hero-shade"/><div className="container closing-content"><SectionLabel>MAKE ROOM FOR STILLNESS</SectionLabel><h2>{title}</h2><p>{description}</p><BookingButton>Enquire about your stay</BookingButton></div></section>;
}
export function RoomCards() { return <div className="room-grid">
  <Reveal delay={0}><article className="room-card"><Link to="/rooms" className="room-photo"><img src={standardRoom} alt="Standard Room with double bed at Ecstasy Farms" loading="lazy"/><span className="photo-arrow"><ArrowUpRight size={18}/></span></Link><div className="room-copy"><span className="card-kicker">01 / YOUR STAY</span><h3>Standard Room</h3><p>A comfortable place to settle in after a day in the hills, with the peace and warmth of a homestay.</p><TextLink to="/rooms">Discover the room</TextLink></div></article></Reveal>
  <Reveal delay={120}><article className="room-card"><Link to="/rooms" className="room-photo"><img src={deluxeRoom} alt="Deluxe AC Room with Terrace interior" loading="lazy"/><span className="photo-arrow"><ArrowUpRight size={18}/></span></Link><div className="room-copy"><span className="card-kicker">02 / YOUR STAY</span><h3>Deluxe AC Room<br/>with Terrace</h3><p>Comfortable interiors and an outdoor terrace for taking in the unhurried mountain atmosphere.</p><TextLink to="/rooms">Discover the room</TextLink></div></article></Reveal>
  <Reveal delay={240}><article className="room-card"><Link to="/rooms" className="room-photo"><img src={balconyRoom} alt="Superior Deluxe Room with Balcony and mountain-facing windows" loading="lazy"/><span className="photo-arrow"><ArrowUpRight size={18}/></span></Link><div className="room-copy"><span className="card-kicker">03 / YOUR STAY</span><h3>Superior Deluxe Room<br/>with Balcony</h3><p>Make space for slower mornings, comfortable evenings and a private balcony overlooking the hills.</p><TextLink to="/rooms">Discover the room</TextLink></div></article></Reveal>
</div>; }

export function HomePage() {
  const heroParallaxRef = useParallax<HTMLDivElement>(0.12);
  const introParallaxRef = useParallax<HTMLDivElement>(0.1);
  const locationParallaxRef = useParallax<HTMLDivElement>(0.15);
  return <>
    <section className="home-hero">
      <div ref={heroParallaxRef} className="home-hero-bg">
        <HeroCarousel />
      </div>
      <div className="hero-shade"/>
      <div className="container home-hero-content">
        <span className="eyebrow light hero-eyebrow"><span className="eyebrow-line"/>ECSTASY FARMS · DALHOUSIE</span>
        <h1 className="home-hero-title">Escape to the<br/><em>Quiet Side</em><br/>of Dalhousie</h1>
        <p className="home-hero-sub">A peaceful Himalayan homestay surrounded by mountain views, fresh air and warm local hospitality.</p>
        <div className="hero-actions"><BookingButton>Book Your Stay</BookingButton><Button asChild variant="heroOutline" size="lg"><a href="tel:+918219967293"><Phone size={17}/> Call Now</a></Button></div>
        <Link to="/rooms" className="hero-explore">EXPLORE ROOMS <ArrowRight size={17}/></Link>
      </div>
      <div className="hero-bottom"><span>32°34' N &nbsp; 75°59' E</span><span>VILLAGE MANOLA · HIMACHAL PRADESH</span><span className="scroll-hint">SCROLL TO EXPLORE <span className="scroll-arrow" /></span></div>
    </section>

    {/* Stats band */}
    <section className="stats-band">
      <div className="stats-grid">
        <Reveal delay={0}><div className="stat-item"><div className="stat-number">2018</div><div className="stat-label">Hosting Since</div></div></Reveal>
        <Reveal delay={100}><div className="stat-item"><div className="stat-number">3</div><div className="stat-label">Room Types</div></div></Reveal>
        <Reveal delay={200}><div className="stat-item"><div className="stat-number">₹1,206</div><div className="stat-label">Starting / Night</div></div></Reveal>
        <Reveal delay={300}><div className="stat-item"><div className="stat-number">7 km</div><div className="stat-label">From Banikhet</div></div></Reveal>
      </div>
    </section>

    <section className="intro-section section-space"><div className="container intro-grid">
      <Reveal delay={0}><div className="intro-image-wrap" ref={introParallaxRef}><img src={mountainGateway} alt="Mountain view beyond the entrance to Ecstasy Farms" loading="lazy"/><div className="image-caption">THE WAY TO SLOWER DAYS · MANOLA</div></div></Reveal>
      <Reveal delay={150}><div className="intro-copy"><SectionLabel>WELCOME TO ECSTASY FARMS</SectionLabel><h2>A slower rhythm,<br/><em>a little closer</em><br/>to nature.</h2><p>Set in Village Manola along the Dalhousie–Chamba Road, Ecstasy Farms is a quiet place to pause. Far from the rush of town, the days unfold with mountain air, open views and the easy comfort of being looked after.</p><p>Whether you're travelling together, taking a breather as a couple or bringing your furry friend along, there's room here to simply be.</p><p>Tucked away from the crowded town centre, the property sits among trees and open sky — a gentle reminder that some of the best moments happen when you're not in a hurry to go anywhere.</p><TextLink to="/about">Our story</TextLink></div></Reveal>
    </div></section>

    <section className="why-section section-space"><div className="container">
      <Reveal><div className="section-heading centered"><SectionLabel>THE BEAUTY OF BEING HERE</SectionLabel><h2>Little things. <em>Lasting memories.</em></h2><p>A stay shaped by the simple pleasures of the hills.</p></div></Reveal>
      <div className="why-grid">
        <Reveal delay={0}><div className="why-item"><Mountain/><h3>Room to breathe</h3><p>Mountain and valley views, fresh air and a slower pace away from the crowded town centre.</p></div></Reveal>
        <Reveal delay={100}><div className="why-item"><UtensilsCrossed/><h3>Food that feels like home</h3><p>Fresh, hygienic home-cooked meals, with options to suit your preferences.</p></div></Reveal>
        <Reveal delay={200}><div className="why-item"><PawPrint/><h3>Everyone is welcome</h3><p>Time together for families, couples, groups and your four-legged companions.</p></div></Reveal>
        <Reveal delay={300}><div className="why-item"><Flame/><h3>Evenings worth keeping</h3><p>Ask about bonfire and BBQ arrangements for evenings under the Himalayan sky.</p></div></Reveal>
      </div>
    </div></section>

    <section className="rooms-section section-space"><div className="container">
      <Reveal><div className="section-heading split-heading"><div><SectionLabel>REST COMES NATURALLY</SectionLabel><h2>Find your kind<br/>of <em>comfort.</em></h2></div><div><p>Thoughtful places to come back to, each with the quiet character of a stay in the hills. Three room types — from a cosy standard to a superior deluxe with private balcony — each suited for couples, families and groups.</p><TextLink to="/rooms">Explore all rooms</TextLink></div></div></Reveal>
      <RoomCards/>
      <Reveal delay={200}><div className="price-note">Rooms from ₹1,206/night* <span>· Rates may vary. Please enquire for current availability and pricing.</span></div></Reveal>
    </div></section>

    <section className="editorial-band"><div className="editorial-image"><img src={terraceEvening} alt="Terrace table prepared for a relaxed evening at Ecstasy Farms" loading="lazy"/></div><Reveal><div className="editorial-copy"><SectionLabel>THE GOOD PART OF STAYING IN</SectionLabel><h2>Gather around.<br/><em>Stay a while.</em></h2><p>Here, the best moments aren't scheduled. They happen over home-cooked food, unhurried conversation and evenings spent together on the terrace. Bonfire and BBQ can be arranged on request.</p><TextLink to="/dining">Discover dining</TextLink></div></Reveal></section>

    {/* Host section */}
    <section className="host-section section-space"><div className="container host-grid">
      <Reveal delay={0}><div className="host-image-wrap"><img src={propertyDaylight} alt="Ecstasy Farms homestay property" loading="lazy"/><div className="host-since"><small>HOSTING SINCE</small><span>2018</span></div></div></Reveal>
      <Reveal delay={150}><div className="host-copy"><SectionLabel>YOUR HOSTS</SectionLabel><h2>Looked after by<br/>people who <em>care.</em></h2><p>Ecstasy Farms has been hosted by Navdeep since 2018, with caretaking support from Sunny, Sunil and their family. Their warmth and attention are what make a stay here feel less like a booking and more like being welcomed into a home.</p><p>From arranging meals to helping plan your day, the team is always nearby — never in the way, always at hand when you need them.</p><div className="host-name">Navdeep</div><div className="host-role">Host · Since 2018</div></div></Reveal>
    </div></section>

    <section className="nature-section section-space"><div className="container nature-grid">
      <Reveal delay={0}><div className="nature-copy"><SectionLabel>FOR EVERY MEMBER OF THE FAMILY</SectionLabel><h2>Good company<br/>has <em>four paws.</em></h2><p>Bring your furry companions along. With outdoor spaces and a welcoming, pet-friendly atmosphere, your time away can include the whole family.</p><TextLink to="/experiences">Explore experiences</TextLink></div></Reveal>
      <Reveal delay={150}><div className="nature-image"><img src={gardenEvening} alt="Green outdoor garden and seating area at Ecstasy Farms" loading="lazy"/></div></Reveal>
    </div></section>

    {/* Seasons section */}
    <section className="section-space"><div className="container">
      <Reveal><div className="section-heading centered"><SectionLabel>WHEN TO VISIT</SectionLabel><h2>Every season<br/>has its own <em>magic.</em></h2><p>The hills change through the year — here's what to expect in each season.</p></div></Reveal>
      <div className="seasons-grid">
        <Reveal delay={0}><div className="season-card"><div className="season-icon"><Snowflake/></div><h3>Winter</h3><div className="season-months">DEC — FEB</div><p>Crisp mountain air and the possibility of snow. Cosy up indoors with warm meals and quiet evenings by the fire.</p></div></Reveal>
        <Reveal delay={100}><div className="season-card"><div className="season-icon"><Leaf/></div><h3>Spring</h3><div className="season-months">MAR — APR</div><p>The hills come alive with greenery and flowers. Pleasant days and cool nights make it perfect for nature walks.</p></div></Reveal>
        <Reveal delay={200}><div className="season-card"><div className="season-icon"><Sun/></div><h3>Summer</h3><div className="season-months">MAY — JUN</div><p>The busiest time for good reason — clear views, comfortable weather and the ideal escape from the plains.</p></div></Reveal>
        <Reveal delay={300}><div className="season-card"><div className="season-icon"><CloudSun/></div><h3>Monsoon</h3><div className="season-months">JUL — SEP</div><p>Misty valleys, lush green surroundings and the sound of rain on the roof. A deeply peaceful time to disconnect.</p></div></Reveal>
      </div>
    </div></section>

    <section className="location-teaser" ref={locationParallaxRef}><img src={propertyGarden} alt="Ecstasy Farms among trees and garden greenery" loading="lazy"/><div className="hero-shade"/><div className="container location-teaser-content"><Reveal><SectionLabel>THE ROAD LESS HURRIED</SectionLabel><h2>A little away.<br/><em>Right where you need to be.</em></h2><p>Village Manola · Approximately 7 km from Banikhet and 15 km from Dalhousie town.</p><TextLink to="/location">Find your way here</TextLink></Reveal></div></section>

    {/* FAQ section */}
    <section className="faq-section section-space"><div className="container">
      <Reveal><div className="section-heading centered"><SectionLabel>GOOD TO KNOW</SectionLabel><h2>Questions, <em>answered.</em></h2></div></Reveal>
      <div className="faq-list">
        <Reveal delay={0}><FaqItem question="Is Ecstasy Farms pet-friendly?" answer="Yes. Pets are welcome at Ecstasy Farms. There is outdoor space for them to enjoy, and you may even meet the resident dogs, Bruno and Bagheera." /></Reveal>
        <Reveal delay={60}><FaqItem question="How far is the property from Dalhousie town?" answer="Ecstasy Farms is located in Village Manola on the Dalhousie–Chamba Road, approximately 7 km from Banikhet and 15 km from Dalhousie town — away from the crowded centre, but easy to reach." /></Reveal>
        <Reveal delay={120}><FaqItem question="What type of food is available?" answer="Fresh, hygienic home-cooked meals are prepared with care. Menus can be customized to your preferences, and bonfire and BBQ arrangements are available on request." /></Reveal>
        <Reveal delay={180}><FaqItem question="Can I book directly or do I need to enquire first?" answer="Booking is by enquiry. You can reach out via WhatsApp or phone to check availability and current rates. This helps us give you the most accurate information for your dates." /></Reveal>
        <Reveal delay={240}><FaqItem question="What amenities are available at the property?" answer="Free Wi-Fi, power backup, parking, mountain and valley views, customizable meals, vehicle rental assistance, and bonfire and BBQ on request." /></Reveal>
        <Reveal delay={300}><FaqItem question="Which room types are available?" answer="Three room types: Standard Room, Deluxe AC Room with Terrace, and Superior Deluxe Room with Balcony. Starting from ₹1,206/night. Rates vary by room and season." /></Reveal>
      </div>
    </div></section>

    <ClosingCTA/>
  </>;
}

export function RoomsPage() { return <><PageHero label="THE ROOMS" title="Stay a little longer." description="Unwind in rooms made for peaceful days and restful nights in the hills." image={balconyRoom} alt="Superior Deluxe room opening toward a mountain-view balcony"/><section className="section-space"><div className="container"><Reveal><div className="section-heading centered"><SectionLabel>YOUR PLACE IN THE HILLS</SectionLabel><h2>Rest comes <em>naturally.</em></h2><p>Choose the space that feels like yours. Suitable for couples, families and groups.</p></div></Reveal><div className="room-detail-list"><Reveal delay={0}><RoomDetail number="01" title="Standard Room" image={standardRoom} alt="Standard Room interior with double bed" description="Settle into the uncomplicated comfort of a homestay room, with a peaceful atmosphere to return to after exploring the hills." features={['Comfortable interiors', 'Peaceful homestay setting']} /></Reveal><Reveal delay={0}><RoomDetail number="02" title="Deluxe AC Room with Terrace" image={deluxeRoom} alt="Deluxe AC Room with seating and double bed" description="A comfortable room with air conditioning and a terrace, giving you a little more space to slow down and enjoy the mountain air." features={['Air conditioning', 'Terrace', 'Comfortable interiors']} reverse /></Reveal><Reveal delay={0}><RoomDetail number="03" title="Superior Deluxe Room with Balcony" image={balconyRoom} alt="Superior Deluxe room with balcony access and mountain-facing windows" description="Wake up at your own pace, then step out onto your balcony and take in the mountain and valley atmosphere." features={['Private balcony', 'Mountain and valley outlook', 'Comfortable interiors']} /></Reveal></div><Reveal><p className="room-disclaimer">Starting from ₹1,206/night* across the property. Room-specific rates and availability are shared on enquiry.</p></Reveal></div></section><ClosingCTA title="A good night's rest starts here."/></>; }
function RoomDetail({ number, title, image, alt, description, features, reverse = false }: { number: string; title: string; image: string; alt: string; description: string; features: string[]; reverse?: boolean }) { return <article className={`room-detail ${reverse ? 'reverse' : ''}`}><div className="room-detail-image"><img src={image} alt={alt} loading="lazy"/></div><div className="room-detail-copy"><span className="eyebrow">THE ROOMS / {number}</span><h2>{title}</h2><p>{description}</p><ul>{features.map(f => <li key={f}><Check size={16}/>{f}</li>)}</ul><BookingButton>Enquire about this room</BookingButton></div></article>; }
export function AboutPage() { return <><PageHero label="OUR STORY" title="A place to feel at home." description="A little off the beaten path. A lot closer to what matters." image={propertyGarden} alt="Ecstasy Farms exterior surrounded by greenery"/><section className="section-space"><div className="container intro-grid"><Reveal><div className="intro-image-wrap landscape"><img src={propertyDaylight} alt="Ecstasy Farms homestay under clear Himalayan skies" loading="lazy"/></div></Reveal><Reveal delay={150}><div className="intro-copy"><SectionLabel>WELCOME TO MANOLA</SectionLabel><h2>Beyond the bustle,<br/><em>the hills feel different.</em></h2><p>Ecstasy Farms is a peaceful homestay in Village Manola on the Dalhousie–Chamba Road. Away from the crowded town centre, it's a place to enjoy quiet Himalayan surroundings, nature and mountain views.</p><p>Hosted by Navdeep since 2018, with caretaking support from Sunny/Sunil and family, the stay is rooted in warm local hospitality and the ease of feeling welcome.</p></div></Reveal></div></section><section className="why-section section-space"><div className="container"><Reveal><div className="section-heading centered"><SectionLabel>OUR WAY OF WELCOMING YOU</SectionLabel><h2>Come as you are. <em>Stay as you like.</em></h2></div></Reveal><div className="why-grid"><Reveal delay={0}><div className="why-item"><Trees/><h3>Close to nature</h3><p>Open views, green surroundings and moments to savour the mountain air.</p></div></Reveal><Reveal delay={100}><div className="why-item"><Heart/><h3>Better together</h3><p>A welcoming place for families, couples, friends and groups.</p></div></Reveal><Reveal delay={200}><div className="why-item"><PawPrint/><h3>Pets welcome</h3><p>Your furry companion can be part of the getaway too.</p></div></Reveal><Reveal delay={300}><div className="why-item"><Sun/><h3>Local warmth</h3><p>The familiar kindness of a family-supported Himalayan homestay.</p></div></Reveal></div></div></section><ClosingCTA/></>; }
export function AmenitiesPage() { return <><PageHero label="THOUGHTFUL COMFORTS" title="Everything you need. Nothing you don't." description="The little conveniences that make it easier to settle in and stay a while." image={gardenEvening} alt="Garden and seating area at Ecstasy Farms"/><section className="section-space"><div className="container"><Reveal><div className="section-heading centered"><SectionLabel>MAKE YOURSELF AT HOME</SectionLabel><h2>Comfort in <em>every detail.</em></h2></div></Reveal><div className="amenity-grid"><Reveal delay={0}><Amenity icon={<Wifi/>} title="Free Wi-Fi" text="Stay connected whenever you need to."/></Reveal><Reveal delay={60}><Amenity icon={<Zap/>} title="Power Backup" text="A little extra peace of mind during your stay."/></Reveal><Reveal delay={120}><Amenity icon={<Car/>} title="Parking" text="Parking available at the property."/></Reveal><Reveal delay={180}><Amenity icon={<UtensilsCrossed/>} title="Home-Cooked Food" text="Fresh meals prepared with care."/></Reveal><Reveal delay={240}><Amenity icon={<Coffee/>} title="Customizable Meals" text="Ask about menu options that suit your preferences."/></Reveal><Reveal delay={300}><Amenity icon={<Flame/>} title="Bonfire on Request" text="Make the most of your evenings outdoors."/></Reveal><Reveal delay={360}><Amenity icon={<Sparkles/>} title="BBQ on Request" text="Gather for a BBQ evening by arrangement."/></Reveal><Reveal delay={420}><Amenity icon={<Compass/>} title="Vehicle Rental Assistance" text="Ask for help planning how to get around."/></Reveal><Reveal delay={480}><Amenity icon={<PawPrint/>} title="Pet Friendly" text="Bring your furry companions along."/></Reveal><Reveal delay={540}><Amenity icon={<Mountain/>} title="Mountain & Valley Views" text="Take in the Himalayan surroundings."/></Reveal></div></div></section><ClosingCTA/></>; }
function Amenity({ icon, title, text }: { icon: ReactNode; title: string; text: string }) { return <div className="amenity"><span className="amenity-icon">{icon}</span><h3>{title}</h3><p>{text}</p></div>; }
export function DiningPage() { return <><PageHero label="AT THE TABLE" title="A taste of feeling at home." description="Fresh, hygienic and home-cooked meals prepared with care." image={terraceEvening} alt="Table set for a relaxed evening meal on the terrace"/><section className="section-space"><div className="container intro-grid"><Reveal><div className="intro-image-wrap landscape"><img src={terraceEvening} alt="Outdoor dining setting on the Ecstasy Farms terrace" loading="lazy"/></div></Reveal><Reveal delay={150}><div className="intro-copy"><SectionLabel>MADE WITH CARE</SectionLabel><h2>The best meals<br/>make you <em>stay longer.</em></h2><p>Food tastes different when you're in the hills, especially when it's made with the warmth of home. Enjoy fresh, hygienic home-cooked meals and the easy comfort of family-style hospitality.</p><p>Menus can be customized to your preferences. For a memorable evening together, ask about bonfire and BBQ arrangements.</p><BookingButton>Ask about dining</BookingButton></div></Reveal></div></section><section className="why-section section-space"><div className="container"><Reveal><div className="section-heading centered"><SectionLabel>GOOD FOOD, GOOD COMPANY</SectionLabel><h2>Made for <em>gathering.</em></h2></div></Reveal><div className="why-grid three"><Reveal delay={0}><div className="why-item"><UtensilsCrossed/><h3>Home-cooked goodness</h3><p>Meals prepared with a homely touch and attention to freshness and hygiene.</p></div></Reveal><Reveal delay={120}><div className="why-item"><Coffee/><h3>Make it yours</h3><p>Customizable menu options for the people around your table.</p></div></Reveal><Reveal delay={240}><div className="why-item"><Flame/><h3>Into the evening</h3><p>Bonfire and BBQ arrangements are available on request.</p></div></Reveal></div></div></section><ClosingCTA title="Pull up a chair. Stay for the stories."/></>; }
export function ExperiencesPage() { return <><PageHero label="THE EXPERIENCE" title="The best days are unhurried." description="Simple pleasures, good company and plenty of room to breathe." image={mountainGateway} alt="Mountain view from the entrance of Ecstasy Farms"/><section className="section-space"><div className="container"><Reveal><div className="section-heading centered"><SectionLabel>HOW THE DAYS UNFOLD</SectionLabel><h2>Do a little. <em>Feel a lot.</em></h2></div></Reveal><div className="experience-grid"><Reveal delay={0}><Experience image={mountainGateway} title="Mountain Views" text="Pause and take in the hills and valley around you."/></Reveal><Reveal delay={80}><Experience image={propertyGarden} title="Peaceful Nature Walks" text="Step outside and enjoy the calm of the natural surroundings."/></Reveal><Reveal delay={160}><Experience image={terraceEvening} title="Bonfire Evenings" text="Gather around a bonfire, arranged on request."/></Reveal><Reveal delay={240}><Experience image={terraceEvening} title="BBQ Evenings" text="Make an evening of it with a BBQ by arrangement."/></Reveal><Reveal delay={320}><Experience image={gardenEvening} title="Family Time" text="Make space for moments together, indoors and out."/></Reveal><Reveal delay={400}><Experience image={gardenEvening} title="Pet-Friendly Stay" text="Bring your furry companions along for the getaway."/></Reveal><Reveal delay={480}><Experience image={propertyDaylight} title="Local Himalayan Experience" text="Enjoy the atmosphere of a local homestay in the hills."/></Reveal><Reveal delay={560}><Experience image={propertyNight} title="Vehicle Rental Assistance" text="Ask the team for help arranging local transport."/></Reveal></div></div></section><section className="pet-band"><div className="container pet-grid"><Reveal><div><SectionLabel>FURRY FRIENDS WELCOME</SectionLabel><h2>Bring your furry<br/><em>companions along.</em></h2><p>Holidays feel better together. Ecstasy Farms welcomes pets, with outdoor space to enjoy as a family. You may even meet the resident dogs, Bruno and Bagheera.</p><BookingButton>Plan a pet-friendly stay</BookingButton></div></Reveal><Reveal delay={150}><img src={gardenEvening} alt="Garden space at the pet-friendly Ecstasy Farms homestay" loading="lazy"/></Reveal></div></section><ClosingCTA/></>; }
function Experience({image,title,text}:{image:string;title:string;text:string}) { return <article className="experience-card"><div><img src={image} alt={`${title} at Ecstasy Farms Dalhousie`} loading="lazy"/></div><h3>{title}</h3><p>{text}</p></article>; }
const galleryPhotos = [
  { src: propertyDaylight, alt: 'Ecstasy Farms property in daylight with red roof and pine trees', category: 'PROPERTY' },
  { src: balconyRoom, alt: 'Superior Deluxe Room with balcony', category: 'ROOMS' },
  { src: mountainGateway, alt: 'Himalayan valley view from the property gateway', category: 'VIEWS' },
  { src: terraceEvening, alt: 'Evening dining arrangement on the terrace', category: 'DINING & OUTDOORS' },
  { src: deluxeRoom, alt: 'Deluxe AC Room interior', category: 'ROOMS' },
  { src: propertyGarden, alt: 'Property surrounded by garden and trees', category: 'NATURE' },
  { src: gardenEvening, alt: 'Garden with outdoor seating at night', category: 'OUTDOORS' },
  { src: standardRoom, alt: 'Standard Room interior', category: 'ROOMS' },
  { src: propertyNight, alt: 'Ecstasy Farms exterior at night', category: 'PROPERTY' },
];
export function GalleryPage() { const [active,setActive] = useState<number | null>(null); useEffect(() => { if(active === null) return; const handle = (e: KeyboardEvent) => { if(e.key === 'Escape') setActive(null); if(e.key === 'ArrowRight') setActive((active + 1) % galleryPhotos.length); if(e.key === 'ArrowLeft') setActive((active - 1 + galleryPhotos.length) % galleryPhotos.length); }; window.addEventListener('keydown',handle); return () => window.removeEventListener('keydown',handle); },[active]); return <><PageHero label="THE GALLERY" title="A glimpse of the good life." description="Little moments from our corner of the Himalayas." image={propertyDaylight} alt="Ecstasy Farms Dalhousie property exterior"/><section className="section-space"><div className="container"><Reveal><div className="section-heading centered"><SectionLabel>TAKE A LOOK AROUND</SectionLabel><h2>See yourself <em>here.</em></h2></div></Reveal><div className="gallery-grid">{galleryPhotos.map((photo,i) => <Reveal key={photo.src} delay={(i % 3) * 80}><Button variant="gallery" className={`gallery-item gallery-item-${i}`} onClick={() => setActive(i)} aria-label={`View photo: ${photo.alt}`}><img src={photo.src} alt={photo.alt} loading="lazy"/><span>{photo.category}<ArrowUpRight size={18}/></span></Button></Reveal>)}</div><p className="gallery-note">The gallery features actual photographs of Ecstasy Farms. Food and pet photographs have not been provided.</p></div></section>{active !== null && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer" onClick={() => setActive(null)}><Button variant="lightbox" size="icon" className="lightbox-close" onClick={() => setActive(null)} aria-label="Close viewer"><X/></Button><Button variant="lightbox" size="icon" className="lightbox-prev" onClick={(e) => {e.stopPropagation();setActive((active - 1 + galleryPhotos.length) % galleryPhotos.length)}} aria-label="Previous photo"><ChevronLeft/></Button><img src={galleryPhotos[active].src} alt={galleryPhotos[active].alt} onClick={e => e.stopPropagation()}/><Button variant="lightbox" size="icon" className="lightbox-next" onClick={(e) => {e.stopPropagation();setActive((active + 1) % galleryPhotos.length)}} aria-label="Next photo"><ChevronRight/></Button><span className="lightbox-count">{active + 1} / {galleryPhotos.length}</span></div>}<ClosingCTA/></>; }
export function LocationPage() { return <><PageHero label="FIND YOUR WAY" title="Away from it all. Close to the hills." description="Village Manola, on the Dalhousie–Chamba Road." image={mountainGateway} alt="Entrance to Ecstasy Farms with a view of the Himalayan hills"/><section className="section-space"><div className="container location-grid"><Reveal><div className="location-info"><SectionLabel>WHERE TO FIND US</SectionLabel><h2>The journey is<br/><em>part of the escape.</em></h2><address>Ecstasy Farms Dalhousie<br/>Village Manola, Dalhousie–Chamba Road,<br/>Himachal Pradesh 176306</address><div className="distance-list"><div><span>01</span><p>Approx. 7 km from Banikhet</p></div><div><span>02</span><p>Approx. 15 km from Dalhousie town</p></div></div><Button asChild variant="booking" size="lg"><a href={directions} target="_blank" rel="noopener noreferrer"><MapPin size={17}/> Get Directions <ArrowUpRight size={17}/></a></Button></div></Reveal><Reveal delay={150}><div className="map-wrap"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3362.2819562547197!2d75.98898421127332!3d32.57200377364057!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391c930eff916de3%3A0xe0341988f3a9b80f!2sEcstasy%20Farms%20Dalhousie!5e0!3m2!1sen!2sin!4v1790496452144!5m2!1sen!2sin" width="600" height="450" style={{border:0}} allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin" title="Ecstasy Farms Dalhousie location on Google Maps"/></div></Reveal></div></section><ClosingCTA/></>; }
export function ContactPage() { const [name,setName] = useState(''); const [phone,setPhone] = useState(''); const [dates,setDates] = useState(''); const [guests,setGuests] = useState(''); const [note,setNote] = useState(''); const submit = (e: React.FormEvent<HTMLFormElement>) => { e.preventDefault(); const message = `Hello Ecstasy Farms Dalhousie, I would like to enquire about room availability and booking.\nName: ${name}\nPhone: ${phone}${dates ? `\nTravel dates: ${dates}` : ''}${guests ? `\nGuests: ${guests}` : ''}${note ? `\nMessage: ${note}` : ''}`; window.open(`https://wa.me/918219967293?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer'); }; return <><PageHero label="LET'S TALK ABOUT YOUR STAY" title="Your escape starts here." description="Have a question or a date in mind? We'd love to hear from you." image={terraceEvening} alt="Warm evening on the terrace at Ecstasy Farms"/><section className="section-space"><div className="container contact-grid"><Reveal><div className="contact-details"><SectionLabel>GET IN TOUCH</SectionLabel><h2>We're just a<br/><em>message away.</em></h2><p>Every good trip starts with a conversation. Reach out to ask about rooms, current rates and availability.</p><div className="contact-method"><span><Phone size={21}/></span><div><small>CALL US</small><a href="tel:+918219967293">+91 82199 67293</a><a href="tel:+919418010753">+91 94180 10753</a></div></div><div className="contact-method"><span><MessageCircle size={21}/></span><div><small>WHATSAPP</small><a href={whatsapp} target="_blank" rel="noopener noreferrer">Start a conversation <ArrowUpRight size={16}/></a></div></div><div className="contact-method"><span><MapPin size={21}/></span><div><small>FIND US</small><p>Village Manola, Dalhousie–Chamba Road,<br/>Himachal Pradesh 176306</p><a href={directions} target="_blank" rel="noopener noreferrer">Get Directions <ArrowUpRight size={16}/></a></div></div></div></Reveal><Reveal delay={150}><div className="enquiry-panel"><span className="eyebrow">BOOKING ENQUIRY</span><h3>Let's plan your stay.</h3><p>Share a few details and your enquiry will open in WhatsApp, ready to send.</p><form onSubmit={submit}><div className="form-row"><label>Your name <input required value={name} onChange={e => setName(e.target.value)} placeholder="Your name"/></label><label>Phone number <input required type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Your phone number"/></label></div><div className="form-row"><label>Travel dates <input value={dates} onChange={e => setDates(e.target.value)} placeholder="Your preferred dates"/></label><label>Number of guests <input value={guests} onChange={e => setGuests(e.target.value)} placeholder="Adults and children"/></label></div><label>Anything else? <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="Room preference, pets or any questions" rows={4}/></label><Button type="submit" variant="booking" size="lg">Send enquiry on WhatsApp <ArrowUpRight size={17}/></Button><small>This sends an enquiry, not an instant booking confirmation.</small></form></div></Reveal></div></section><ClosingCTA title="Come for a little while. Leave with a lot."/></>; }
