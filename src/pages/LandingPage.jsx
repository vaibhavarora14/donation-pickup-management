import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { User, Mail, Phone, MessageSquare } from "lucide-react";
import { TopBar, Header, Footer } from "../components/layout";
import { Button, Input, Textarea } from "../components/ui";
import { cn } from "../utils/cn";

const LandingPage = () => {
  // Contact Form
  const {
    register: registerContact,
    handleSubmit: handleContactSubmit,
    formState: { errors: contactErrors },
    reset: resetContact
  } = useForm();

  const onContactSubmit = (data) => {
    console.log('Contact form submitted:', data);
    // Handle form submission (API call, etc.)
    // Reset form after successful submission
    resetContact();
    alert('Thank you for your message! We will get back to you soon.');
  };

  // Newsletter Form
  const {
    register: registerNewsletter,
    handleSubmit: handleNewsletterSubmit,
    formState: { errors: newsletterErrors },
    reset: resetNewsletter
  } = useForm();

  const onNewsletterSubmit = (data) => {
    console.log('Newsletter form submitted:', data);
    // Handle newsletter subscription
    resetNewsletter();
    alert('Thank you for subscribing to our newsletter!');
  };

  return (
    <div className="w-full min-h-screen bg-white font-sans">
      <TopBar />
      <Header />

      {/* Hero Section */}
      <section className="relative w-full h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/5"></div>
        <div className="relative z-10 text-center px-5">
          <h1 className="text-4xl md:text-6xl font-bold text-heading mb-8">
            Fulfilled Souls. Happiness Delivered.
          </h1>
          <Link to="/book-donation">
            <Button variant="primary" size="large">
              Book Donation pick-up
            </Button>
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-15 px-5 bg-white">
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-15">
          <div className="text-center">
            <div className="text-4xl mb-2">👥</div>
            <div className="text-3xl font-bold text-accent mb-2">013 856</div>
            <div className="text-sm text-body">Total Lives Impacted</div>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2">🎁</div>
            <div className="text-3xl font-bold text-accent mb-2">013 856</div>
            <div className="text-sm text-body">Total Old Items Donated</div>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2">🏢</div>
            <div className="text-3xl font-bold text-accent mb-2">013 856</div>
            <div className="text-sm text-body">Total NGOs Reached</div>
          </div>
          <div className="text-center">
            <div className="text-4xl mb-2">📋</div>
            <div className="text-3xl font-bold text-accent mb-2">013 856</div>
            <div className="text-sm text-body">Total NGOs listed</div>
          </div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-15 px-5">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-15 items-center">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <img
                  src="https://www.figma.com/api/mcp/asset/53679d0d-8540-497f-b8e3-9a51c2ca8cde"
                  alt="Welcome"
                  className="w-full h-auto rounded-lg object-cover"
                />
              </div>
              <div>
                <img
                  src="https://www.figma.com/api/mcp/asset/6e329eac-5119-4ba9-bc3a-1bbcb86238eb"
                  alt="Community"
                  className="w-full h-auto rounded-lg object-cover"
                />
              </div>
              <div>
                <img
                  src="https://www.figma.com/api/mcp/asset/728242de-55f9-461b-bb4c-a34d26562ac1"
                  alt="People"
                  className="w-full h-auto rounded-lg object-cover"
                />
              </div>
              <div className="col-span-2">
                <img
                  src="https://www.figma.com/api/mcp/asset/f3b721de-d1f4-4694-a4f0-72ec324540dd"
                  alt="Children"
                  className="w-full h-auto rounded-lg object-cover"
                />
              </div>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-heading mb-4">Welcome to HappieeSouls!</h2>
              <p className="text-lg text-body mb-4 font-medium">
                We envision to build a conscious global community of happy souls
                who believe in sustainability and support grassroot NGOs in India.
              </p>
              <p className="text-base text-body leading-relaxed">
                We are on a mission to support grassroots NGOs that support
                sustainability by donating old goods in usable condition to them
                or selling upcycled, recycled or handmade products developed by
                the beneficiaries at these NGOs. It is to make "giving" a practice
                and "Happiness" a culture.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-15 px-5 bg-gray-50" id="how-it-works">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-heading mb-8">What we do?</h2>
            <div className="max-w-2xl mx-auto">
              <img
                src="https://www.figma.com/api/mcp/asset/aa1c45fd-4d2f-4ba4-a699-0f4a6bc8182d"
                alt="What we do"
                className="w-full h-auto rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How We Work Section */}
      <section className="py-15 px-5">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-heading text-center mb-12">How we work</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🚗</div>
              <h3 className="text-xl font-semibold text-heading mb-3">Schedule a Pickup</h3>
              <p className="text-body leading-relaxed">
                Select approx. quantity of the goods you are donating from below.
                It helps us in measuring the overall impact we create.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl mb-4">📦</div>
              <h3 className="text-xl font-semibold text-heading mb-3">Donate at your Doorstep</h3>
              <p className="text-body leading-relaxed">
                Pack the donations nicely (washed and folded) in any carton boxes
                or gunny or shopping bags.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl mb-4">🎁</div>
              <h3 className="text-xl font-semibold text-heading mb-3">Get Rewards</h3>
              <p className="text-body leading-relaxed">
                Select your preferred mode of pick up and book order. Sit back,
                relax and feel good.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Connect, Engage, Help Section */}
      <section className="py-15 px-5 bg-gray-50">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-5xl mb-4">👤</div>
              <h3 className="text-xl font-semibold text-heading mb-3">Connect</h3>
              <p className="text-body">
                Search and Discover NGOs near you by location or cause
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-5xl mb-4">🤝</div>
              <h3 className="text-xl font-semibold text-heading mb-3">Engage</h3>
              <p className="text-body">
                Checkout the NGO's success stories, campaigns and more
              </p>
            </div>
            <div className="text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="text-5xl mb-4">❤️</div>
              <h3 className="text-xl font-semibold text-heading mb-3">Help</h3>
              <p className="text-body">
                Donate in-kind supplies the NGOs need
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Donate Almost Anything Section */}
      <section className="py-15 px-5 bg-gray-50">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-heading mb-4">Donate Almost Anything</h2>
            <p className="text-base text-body max-w-2xl mx-auto">
              Select approx. quantity of the goods you are donating from below.
              It helps us in measuring the overall impact we create.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <img
                src="https://www.figma.com/api/mcp/asset/5fe5138b-51e9-4c94-8108-dd7b7fbb544e"
                alt="Shoes"
                className="w-16 h-16 object-contain mb-3"
              />
              <span className="text-sm font-medium text-heading">Shoes</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <img
                src="https://www.figma.com/api/mcp/asset/785b8423-81e6-4a1a-b623-16ac84c180e4"
                alt="Stationery"
                className="w-16 h-16 object-contain mb-3"
              />
              <span className="text-sm font-medium text-heading">Stationery</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <img
                src="https://www.figma.com/api/mcp/asset/2500176e-73bc-4fda-bc97-2d8ec9e9b3ca"
                alt="Bags"
                className="w-16 h-16 object-contain mb-3"
              />
              <span className="text-sm font-medium text-heading">Bags</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <img
                src="https://www.figma.com/api/mcp/asset/a2a5b27c-6acc-49df-9df7-6f2ff70011d4"
                alt="Clothes"
                className="w-16 h-16 object-contain mb-3"
              />
              <span className="text-sm font-medium text-heading">Clothes</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer">
              <img
                src="https://www.figma.com/api/mcp/asset/a2a5b27c-6acc-49df-9df7-6f2ff70011d4"
                alt="Clothes"
                className="w-16 h-16 object-contain mb-3"
              />
              <span className="text-sm font-medium text-heading">Clothes</span>
            </div>
            <div className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer relative">
              <img
                src="https://www.figma.com/api/mcp/asset/4024dbd0-6b92-455e-9e73-247a668975b6"
                alt="More"
                className="w-16 h-16 object-contain mb-3"
              />
              <span className="text-sm font-medium text-heading mb-1">More Donation</span>
              <span className="text-xs font-bold text-accent uppercase">VIEW MORE</span>
            </div>
          </div>
        </div>
      </section>

      {/* Support Cause Section */}
      <section className="py-15 px-5">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-heading text-center mb-4">Support a cause close to your heart</h2>
          <p className="text-lg text-body text-center mb-12">
            A one stop platform for directly supporting grassroots NGOs
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative rounded-lg overflow-hidden group cursor-pointer">
              <img
                src="https://www.figma.com/api/mcp/asset/f668d40b-1b1c-491b-9e04-09e8bd2907d6"
                alt="Support"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-green-500/20 group-hover:bg-green-500/30 transition-colors"></div>
            </div>
            <div className="relative rounded-lg overflow-hidden group cursor-pointer">
              <img
                src="https://www.figma.com/api/mcp/asset/8945fa60-8acd-43dd-a8de-840c4cbd8b4e"
                alt="Support"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-bg-dark/20 group-hover:bg-bg-dark/30 transition-colors"></div>
            </div>
            <div className="relative rounded-lg overflow-hidden group cursor-pointer">
              <img
                src="https://www.figma.com/api/mcp/asset/e516ac97-8366-4270-a88c-1f190a945f51"
                alt="Support"
                className="w-full h-64 object-cover"
              />
              <div className="absolute inset-0 bg-accent/20 group-hover:bg-accent/30 transition-colors"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Brand Collaborations Section */}
      <section className="py-15 px-5 bg-gray-50">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-heading text-center mb-4">OUR BRAND COLLABORATIONS</h2>
          <p className="text-base text-body text-center mb-12 max-w-2xl mx-auto">
            Our brand partners provide our donors gifts* as a "gesture of thanks"
            for making a difference.
            <br />
            Be ready to get surprised!
          </p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {["Shoes", "Stationery", "Bags", "Clothes", "Clothes"].map((name, index) => (
              <div key={index} className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
                <div className="w-24 h-24 bg-gray-200 rounded-lg mb-3"></div>
                <p className="text-sm font-medium text-heading">{name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Partners Section */}
      <section className="py-15 px-5">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-heading text-center mb-12">Our Corporate Partners</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-items-center">
            <div className="flex items-center justify-center p-4">
              <img
                src="https://www.figma.com/api/mcp/asset/431545f2-ac4a-4d8b-888d-b35d75f98e69"
                alt="Partner"
                className="max-w-full h-auto object-contain grayscale hover:grayscale-0 transition-all"
              />
            </div>
            <div className="flex items-center justify-center p-4">
              <img
                src="https://www.figma.com/api/mcp/asset/cffaae46-8838-49e4-8db7-c88ae7cda542"
                alt="Partner"
                className="max-w-full h-auto object-contain grayscale hover:grayscale-0 transition-all"
              />
            </div>
            <div className="flex items-center justify-center p-4">
              <img
                src="https://www.figma.com/api/mcp/asset/deef771f-7879-4e5b-b4a4-bcdfdc4cadfb"
                alt="Partner"
                className="max-w-full h-auto object-contain grayscale hover:grayscale-0 transition-all"
              />
            </div>
            <div className="flex items-center justify-center p-4">
              <img
                src="https://www.figma.com/api/mcp/asset/d670f110-198b-4147-8a79-494eea9bf30d"
                alt="Partner"
                className="max-w-full h-auto object-contain grayscale hover:grayscale-0 transition-all"
              />
            </div>
            <div className="flex items-center justify-center p-4">
              <img
                src="https://www.figma.com/api/mcp/asset/08b8a275-5fbf-4808-a06e-38f5b495d453"
                alt="Partner"
                className="max-w-full h-auto object-contain grayscale hover:grayscale-0 transition-all"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-15 px-5 bg-gray-50">
        <div className="max-w-[1200px] mx-auto">
          <p className="text-sm font-semibold text-accent text-center mb-2 uppercase tracking-wide">Testimonials</p>
          <h2 className="text-3xl md:text-4xl font-bold text-heading text-center mb-12">
            What they're talking
            <br />
            About Us
          </h2>
          <div className="max-w-3xl mx-auto bg-white rounded-lg p-8 md:p-12 shadow-lg">
            <p className="text-base text-body leading-relaxed mb-8">
              Happiee Souls is a miracle that I was searching for.
              <br />
              <br />I am a book lover who is quite possessive about my books.
              There is hardly a book I've thrown away and this whole bundle has
              moved homes along with us. My mum's house and mine had a cupboard
              full of books and clothes that were waiting to be
            </p>
            <div className="flex items-center gap-4 mb-8">
              <img
                src="https://www.figma.com/api/mcp/asset/25b8cf9e-b79f-4257-b23b-3ee1570877bd"
                alt="Author"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <p className="text-lg font-semibold text-heading">Shalini Jain</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4">
              <Button variant="ghost" size="small" className="text-2xl">←</Button>
              <div className="flex gap-2">
                <span className="w-2 h-2 rounded-full bg-accent"></span>
                <span className="w-2 h-2 rounded-full bg-gray-300"></span>
              </div>
              <Button variant="ghost" size="small" className="text-2xl">→</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-15 px-5" id="blog">
        <div className="max-w-[1200px] mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-heading text-center mb-12">
            Latest news & article directly from our blog
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { img: "https://www.figma.com/api/mcp/asset/3d95b9fb-324c-4695-97e2-12df7db0dc28", variant: "primary" },
              { img: "https://www.figma.com/api/mcp/asset/d9dd71a4-66e8-4b13-a52c-ecfea11fd82f", variant: "secondary" },
              { img: "https://www.figma.com/api/mcp/asset/f91d9929-e396-4d21-bc72-e7cca01968f5", variant: "secondary" },
            ].map((blog, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
                <img
                  src={blog.img}
                  alt="Blog"
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-heading mb-3">
                    5 Eco-friendly travel products of NGO Bazaar to gear up your
                    travelling
                  </h3>
                  <p className="text-sm text-body mb-4 leading-relaxed">
                    Travel takes us out to leave our comfort zones and see, taste,
                    and try new things.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="px-3 py-1 bg-gray-100 text-xs font-medium text-body rounded-full">Environment</span>
                    <span className="px-3 py-1 bg-gray-100 text-xs font-medium text-body rounded-full">Lifestyle</span>
                    <span className="px-3 py-1 bg-gray-100 text-xs font-medium text-body rounded-full">SustainableLifestyle</span>
                  </div>
                  <Button variant={blog.variant} size="small">
                    Read more
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-15 px-5 bg-gray-50" id="contact">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-heading mb-8">Be a part of our story</h2>
              <form className="space-y-5" onSubmit={handleContactSubmit(onContactSubmit)}>
                <Input
                  type="text"
                  placeholder="Name"
                  icon={<User size={20} />}
                  fullWidth
                  {...registerContact('name', {
                    required: 'Name is required',
                    minLength: {
                      value: 2,
                      message: 'Name must be at least 2 characters'
                    },
                    pattern: {
                      value: /^[A-Za-z\s]+$/,
                      message: 'Name can only contain letters and spaces'
                    }
                  })}
                  error={contactErrors.name?.message}
                />
                <Input
                  type="email"
                  placeholder="Email"
                  icon={<Mail size={20} />}
                  fullWidth
                  {...registerContact('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Invalid email address'
                    }
                  })}
                  error={contactErrors.email?.message}
                />
                <Input
                  type="tel"
                  placeholder="Contact no."
                  icon={<Phone size={20} />}
                  fullWidth
                  {...registerContact('phone', {
                    required: 'Phone number is required',
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: 'Phone number must be 10 digits'
                    }
                  })}
                  error={contactErrors.phone?.message}
                />
                <Textarea
                  placeholder="Message"
                  icon={<MessageSquare size={20} />}
                  fullWidth
                  rows={5}
                  {...registerContact('message', {
                    required: 'Message is required',
                    minLength: {
                      value: 10,
                      message: 'Message must be at least 10 characters'
                    },
                    maxLength: {
                      value: 500,
                      message: 'Message cannot exceed 500 characters'
                    }
                  })}
                  error={contactErrors.message?.message}
                />
                <Button type="submit" variant="dark" size="medium" fullWidth>
                  Send message
                </Button>
              </form>
            </div>
            <div className="relative rounded-lg overflow-hidden">
              <img
                src="https://www.figma.com/api/mcp/asset/fbf2132c-75e6-4cd2-ac2c-582fa4e423d5"
                alt="Contact"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-8 text-white">
                <h3 className="text-2xl font-bold mb-3">Join us in our mission</h3>
                <p className="text-base leading-relaxed">
                  We're always looking for great folks to join us on our mission.
                  If you want to be a part of our story, we'd love to chat.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-15 px-5 bg-accent">
        <div className="max-w-[800px] mx-auto text-center">
          <p className="text-sm font-semibold text-white/90 mb-2 uppercase tracking-wide">Join With Us</p>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">Let's be a Part of us</h2>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" onSubmit={handleNewsletterSubmit(onNewsletterSubmit)}>
            <Input
              type="email"
              placeholder="Enter your E-mail id"
              fullWidth
              {...registerNewsletter('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              error={newsletterErrors.email?.message}
            />
            <Button type="submit" variant="dark" size="medium" className="whitespace-nowrap">
              Join Now
            </Button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;
