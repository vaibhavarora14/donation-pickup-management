import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="top-bar-content">
          <span className="top-bar-text">+91 96067 49381</span>
          <span className="top-bar-text">hello@happieesouls.com</span>
        </div>
      </div>

      {/* Header/Navigation */}
      <header className="header">
        <div className="header-content">
          <div className="logo-section">
            <img src="https://www.figma.com/api/mcp/asset/82592298-ff5b-4bb1-9a9f-b43231dadfa9" alt="Logo" className="logo-img" />
          </div>
          <nav className="nav-menu">
            <a href="#home" className="nav-link active">Home</a>
            <a href="#how-it-works" className="nav-link">How it works</a>
            <a href="#blog" className="nav-link">Blog</a>
            <a href="#contact" className="nav-link">Contact Us</a>
          </nav>
          <div className="header-actions">
            <div className="happiee-box">
              <span>Happiee<br />Box</span>
              <div className="heart-icon">❤️</div>
              <span className="badge">0</span>
            </div>
            <button className="ngo-login-btn">Ngo Login</button>
            <button className="login-btn">Login</button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="hero-title">Fulfilled Souls. Happiness Delivered.</h1>
          <Link to="/donate" className="cta-button">Book Donation pick-up</Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stat-item">
          <div className="stat-icon">👥</div>
          <div className="stat-number">013 856</div>
          <div className="stat-label">Total Lives Impacted</div>
        </div>
        <div className="stat-item">
          <div className="stat-icon">🎁</div>
          <div className="stat-number">013 856</div>
          <div className="stat-label">Total Old Items Donated</div>
        </div>
        <div className="stat-item">
          <div className="stat-icon">🏢</div>
          <div className="stat-number">013 856</div>
          <div className="stat-label">Total NGOs Reached</div>
        </div>
        <div className="stat-item">
          <div className="stat-icon">📋</div>
          <div className="stat-number">013 856</div>
          <div className="stat-label">Total NGOs listed</div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="welcome-section">
        <div className="welcome-content">
          <div className="welcome-images">
            <div className="welcome-img-large">
              <img src="https://www.figma.com/api/mcp/asset/53679d0d-8540-497f-b8e3-9a51c2ca8cde" alt="Welcome" />
            </div>
            <div className="welcome-img-small">
              <img src="https://www.figma.com/api/mcp/asset/6e329eac-5119-4ba9-bc3a-1bbcb86238eb" alt="Community" />
            </div>
            <div className="welcome-img-small">
              <img src="https://www.figma.com/api/mcp/asset/728242de-55f9-461b-bb4c-a34d26562ac1" alt="People" />
            </div>
            <div className="welcome-img-small">
              <img src="https://www.figma.com/api/mcp/asset/f3b721de-d1f4-4694-a4f0-72ec324540dd" alt="Children" />
            </div>
          </div>
          <div className="welcome-text">
            <h2 className="section-title">Welcome to HappieeSouls!</h2>
            <p className="section-subtitle">
              We envision to build a conscious global community of happy souls who believe in sustainability and support grassroot NGOs in India.
            </p>
            <p className="section-description">
              We are on a mission to support grassroots NGOs that support sustainability by donating old goods in usable condition to them or selling upcycled, recycled or handmade products developed by the beneficiaries at these NGOs. It is to make "giving" a practice and "Happiness" a culture.
            </p>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="what-we-do-section" id="how-it-works">
        <div className="what-we-do-content">
          <div className="what-we-do-text">
            <h2 className="section-title">What we do?</h2>
            <div className="what-we-do-image">
              <img src="https://www.figma.com/api/mcp/asset/aa1c45fd-4d2f-4ba4-a699-0f4a6bc8182d" alt="What we do" />
            </div>
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="how-we-work-section">
        <h2 className="section-title center">How we work</h2>
        <div className="how-we-work-cards">
          <div className="work-card">
            <div className="work-card-icon pink">🚗</div>
            <h3 className="work-card-title">Schedule a Pickup</h3>
            <p className="work-card-text">
              Select approx. quantity of the goods you are donating from below. It helps us in measuring the overall impact we create.
            </p>
          </div>
          <div className="work-card">
            <div className="work-card-icon green">📦</div>
            <h3 className="work-card-title">Donate at your Doorstep</h3>
            <p className="work-card-text">
              Pack the donations nicely (washed and folded) in any carton boxes or gunny or shopping bags.
            </p>
          </div>
          <div className="work-card">
            <div className="work-card-icon teal">🎁</div>
            <h3 className="work-card-title">Get Rewards</h3>
            <p className="work-card-text">
              Select your preferred mode of pick up and book order. Sit back, relax and feel good.
            </p>
          </div>
        </div>
      </section>

      {/* Connect, Engage, Help Section */}
      <section className="connect-section">
        <div className="connect-content">
          <div className="connect-card">
            <div className="connect-icon">👤</div>
            <h3 className="connect-title">Connect</h3>
            <p className="connect-text">Search and Discover NGOs near you by location or cause</p>
          </div>
          <div className="connect-card">
            <div className="connect-icon">🤝</div>
            <h3 className="connect-title">Engage</h3>
            <p className="connect-text">Checkout the NGO's success stories, campaigns and more</p>
          </div>
          <div className="connect-card">
            <div className="connect-icon">❤️</div>
            <h3 className="connect-title">Help</h3>
            <p className="connect-text">Donate in-kind supplies the NGOs need</p>
          </div>
        </div>
      </section>

      {/* Donate Almost Anything Section */}
      <section className="donate-section">
        <div className="donate-content">
          <div className="donate-text">
            <h2 className="section-title">Donate Almost Anything</h2>
            <p className="section-description">
              Select approx. quantity of the goods you are donating from below. It helps us in measuring the overall impact we create.
            </p>
          </div>
          <div className="donate-categories">
            <div className="category-card">
              <img src="https://www.figma.com/api/mcp/asset/5fe5138b-51e9-4c94-8108-dd7b7fbb544e" alt="Shoes" className="category-icon" />
              <span className="category-name">Shoes</span>
            </div>
            <div className="category-card">
              <img src="https://www.figma.com/api/mcp/asset/785b8423-81e6-4a1a-b623-16ac84c180e4" alt="Stationery" className="category-icon" />
              <span className="category-name">Stationery</span>
            </div>
            <div className="category-card">
              <img src="https://www.figma.com/api/mcp/asset/2500176e-73bc-4fda-bc97-2d8ec9e9b3ca" alt="Bags" className="category-icon" />
              <span className="category-name">Bags</span>
            </div>
            <div className="category-card">
              <img src="https://www.figma.com/api/mcp/asset/a2a5b27c-6acc-49df-9df7-6f2ff70011d4" alt="Clothes" className="category-icon" />
              <span className="category-name">Clothes</span>
            </div>
            <div className="category-card">
              <img src="https://www.figma.com/api/mcp/asset/a2a5b27c-6acc-49df-9df7-6f2ff70011d4" alt="Clothes" className="category-icon" />
              <span className="category-name">Clothes</span>
            </div>
            <div className="category-card view-more">
              <img src="https://www.figma.com/api/mcp/asset/4024dbd0-6b92-455e-9e73-247a668975b6" alt="More" className="category-icon" />
              <span className="category-name">More Donation</span>
              <span className="view-more-text">VIEW MORE</span>
            </div>
          </div>
        </div>
      </section>

      {/* Support Cause Section */}
      <section className="support-section">
        <div className="support-content">
          <h2 className="section-title">Support a cause close to your heart</h2>
          <p className="section-subtitle">
            A one stop platform for directly supporting grassroots NGOs
          </p>
          <div className="support-cards">
            <div className="support-card">
              <img src="https://www.figma.com/api/mcp/asset/f668d40b-1b1c-491b-9e04-09e8bd2907d6" alt="Support" />
              <div className="support-overlay green"></div>
            </div>
            <div className="support-card center">
              <img src="https://www.figma.com/api/mcp/asset/8945fa60-8acd-43dd-a8de-840c4cbd8b4e" alt="Support" />
              <div className="support-overlay dark"></div>
            </div>
            <div className="support-card">
              <img src="https://www.figma.com/api/mcp/asset/e516ac97-8366-4270-a88c-1f190a945f51" alt="Support" />
              <div className="support-overlay orange"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Collaborations Section */}
      <section className="brands-section">
        <h2 className="section-title center">OUR BRAND COLLABORATIONS</h2>
        <p className="section-description center">
          Our brand partners provide our donors gifts* as a "gesture of thanks" for making a difference.
          <br />Be ready to get surprised!
        </p>
        <div className="brand-cards">
          <div className="brand-card">
            <div className="brand-placeholder"></div>
            <p className="brand-name">Shoes</p>
          </div>
          <div className="brand-card">
            <div className="brand-placeholder"></div>
            <p className="brand-name">Stationery</p>
          </div>
          <div className="brand-card">
            <div className="brand-placeholder"></div>
            <p className="brand-name">Bags</p>
          </div>
          <div className="brand-card">
            <div className="brand-placeholder"></div>
            <p className="brand-name">Clothes</p>
          </div>
          <div className="brand-card">
            <div className="brand-placeholder"></div>
            <p className="brand-name">Clothes</p>
          </div>
        </div>
      </section>

      {/* Corporate Partners Section */}
      <section className="partners-section">
        <h2 className="section-title center">Our Corporate Partners</h2>
        <div className="partners-logos">
          <div className="partner-logo">
            <img src="https://www.figma.com/api/mcp/asset/431545f2-ac4a-4d8b-888d-b35d75f98e69" alt="Partner" />
          </div>
          <div className="partner-logo">
            <img src="https://www.figma.com/api/mcp/asset/cffaae46-8838-49e4-8db7-c88ae7cda542" alt="Partner" />
          </div>
          <div className="partner-logo">
            <img src="https://www.figma.com/api/mcp/asset/deef771f-7879-4e5b-b4a4-bcdfdc4cadfb" alt="Partner" />
          </div>
          <div className="partner-logo">
            <img src="https://www.figma.com/api/mcp/asset/d670f110-198b-4147-8a79-494eea9bf30d" alt="Partner" />
          </div>
          <div className="partner-logo">
            <img src="https://www.figma.com/api/mcp/asset/08b8a275-5fbf-4808-a06e-38f5b495d453" alt="Partner" />
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <p className="section-label">Testimonials</p>
        <h2 className="section-title">What they're talking<br />About Us</h2>
        <div className="testimonial-card">
          <p className="testimonial-text">
            Happiee Souls is a miracle that I was searching for.
            <br /><br />
            I am a book lover who is quite possessive about my books. There is hardly a book I've thrown away and this whole bundle has moved homes along with us. My mum's house and mine had a cupboard full of books and clothes that were waiting to be
          </p>
          <div className="testimonial-author">
            <img src="https://www.figma.com/api/mcp/asset/25b8cf9e-b79f-4257-b23b-3ee1570877bd" alt="Author" className="author-avatar" />
            <div className="author-info">
              <p className="author-name">Shalini Jain</p>
            </div>
          </div>
          <div className="testimonial-nav">
            <button className="nav-arrow">←</button>
            <div className="nav-dots">
              <span className="dot active"></span>
              <span className="dot"></span>
            </div>
            <button className="nav-arrow">→</button>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="blog-section" id="blog">
        <h2 className="section-title center">Latest news & article directly from our blog</h2>
        <div className="blog-cards">
          <div className="blog-card">
            <img src="https://www.figma.com/api/mcp/asset/3d95b9fb-324c-4695-97e2-12df7db0dc28" alt="Blog" className="blog-image" />
            <div className="blog-content">
              <h3 className="blog-title">5 Eco-friendly travel products of NGO Bazaar to gear up your travelling</h3>
              <p className="blog-excerpt">Travel takes us out to leave our comfort zones and see, taste, and try new things.</p>
              <div className="blog-tags">
                <span className="blog-tag">Environment</span>
                <span className="blog-tag">Lifestyle</span>
                <span className="blog-tag">SustainableLifestyle</span>
              </div>
              <button className="blog-read-more">Read more</button>
            </div>
          </div>
          <div className="blog-card">
            <img src="https://www.figma.com/api/mcp/asset/d9dd71a4-66e8-4b13-a52c-ecfea11fd82f" alt="Blog" className="blog-image" />
            <div className="blog-content">
              <h3 className="blog-title">5 Eco-friendly travel products of NGO Bazaar to gear up your travelling</h3>
              <p className="blog-excerpt">Travel takes us out to leave our comfort zones and see, taste, and try new things.</p>
              <div className="blog-tags">
                <span className="blog-tag">Environment</span>
                <span className="blog-tag">Lifestyle</span>
                <span className="blog-tag">SustainableLifestyle</span>
              </div>
              <button className="blog-read-more secondary">Read more</button>
            </div>
          </div>
          <div className="blog-card">
            <img src="https://www.figma.com/api/mcp/asset/f91d9929-e396-4d21-bc72-e7cca01968f5" alt="Blog" className="blog-image" />
            <div className="blog-content">
              <h3 className="blog-title">5 Eco-friendly travel products of NGO Bazaar to gear up your travelling</h3>
              <p className="blog-excerpt">Travel takes us out to leave our comfort zones and see, taste, and try new things.</p>
              <div className="blog-tags">
                <span className="blog-tag">Environment</span>
                <span className="blog-tag">Lifestyle</span>
                <span className="blog-tag">SustainableLifestyle</span>
              </div>
              <button className="blog-read-more secondary">Read more</button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-section" id="contact">
        <div className="contact-content">
          <div className="contact-form-wrapper">
            <h2 className="section-title">Be a part of our story</h2>
            <form className="contact-form">
              <div className="form-field">
                <div className="field-icon">👤</div>
                <input type="text" placeholder="Name" />
              </div>
              <div className="form-field">
                <div className="field-icon">✉️</div>
                <input type="email" placeholder="Email" />
              </div>
              <div className="form-field">
                <div className="field-icon">📞</div>
                <input type="tel" placeholder="Contact no." />
              </div>
              <div className="form-field textarea">
                <div className="field-icon">💬</div>
                <textarea placeholder="Message"></textarea>
              </div>
              <button type="submit" className="submit-message-btn">Send message</button>
            </form>
          </div>
          <div className="contact-image">
            <img src="https://www.figma.com/api/mcp/asset/fbf2132c-75e6-4cd2-ac2c-582fa4e423d5" alt="Contact" />
            <div className="contact-overlay">
              <h3>Join us in our mission</h3>
              <p>We're always looking for great folks to join us on our mission. If you want to be a part of our story, we'd love to chat.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="newsletter-content">
          <p className="section-label">Join With Us</p>
          <h2 className="section-title">Let's be a Part of us</h2>
          <div className="newsletter-form">
            <input type="email" placeholder="Enter your E-mail id" />
            <button className="newsletter-btn">Join Now</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <img src="https://www.figma.com/api/mcp/asset/d26408c8-92f2-412c-bf07-6ffd907e45ff" alt="Logo" className="footer-logo" />
          </div>
          <div className="footer-section">
            <h4 className="footer-title">Usefull Link</h4>
            <ul className="footer-links">
              <li><a href="#home">About us</a></li>
              <li><a href="#how-it-works">How can you help?</a></li>
              <li><a href="#contact">Contact us</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="footer-title">Information for</h4>
            <ul className="footer-links">
              <li><a href="#ngos">NGOs</a></li>
              <li><a href="#individuals">Individuals</a></li>
              <li><a href="#corporates">Corporates</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4 className="footer-title">How to Help</h4>
            <ul className="footer-links">
              <li><a href="#donate">Donate</a></li>
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#pricing">Pricing Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2025 happieesouls. All Rights Reseved</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

