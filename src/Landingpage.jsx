import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './LandingPage.css';

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    visible && (
      <button onClick={scrollToTop} className="scrollToTopBtn" aria-label="Scroll to top">
        ↑
      </button>
    )
  );
};

const LandingPage = () => {
  const navigate = useNavigate();
  const [faqOpen, setFaqOpen] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const toggleFaq = (index) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  return (
    <div className="container">
      <header className="header">
        <div className="logo">TaskManager</div>
        <div>
          <button className="navButton" onClick={() => navigate('/signin')}>Sign In</button>
          <button className="navButton" onClick={() => navigate('/signup')}>Sign Up</button>
        </div>
      </header>

      <section className="hero" data-aos="zoom-in">
        <h1 className="heroTitle">Boost Your Productivity</h1>
        <p className="heroSubtitle">Manage your tasks with clarity, speed, and ease.</p>
        <button
          className="getStartedButton"
          data-aos="fade-up"
          onClick={() => navigate('/signup')}
          onTouchStart={(e) => e.currentTarget.classList.add('active')}
          onTouchEnd={(e) => e.currentTarget.classList.remove('active')}
        >
          Get Started
        </button>
      </section>

      <main className="main">
        <div className="featuresContainer">
          {features.map((feature, index) => (
            <div
              className="featureWrapper"
              key={index}
              data-aos={index % 2 === 0 ? 'fade-right' : 'fade-left'}
            >
              <Feature {...feature} />
            </div>
          ))}
        </div>

        <div className="whyChooseSection" data-aos="zoom-in">
          <h2 className="sectionTitle">Why Choose Us?</h2>
          <div className="whyGrid">
            {whyPoints.map((point, i) => (
              <div key={i} className="whyItem" data-aos="fade-left">
                <div className="whyIcon">✓</div>
                <p className="whyText">{point}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="testimonials" data-aos="fade-up">
          <h2 className="sectionTitle">What Our Users Say</h2>
          <div className="testimonialGrid">
            <div className="testimonialCard" data-aos="fade-right">
              <p>"TaskManager transformed the way I handle daily tasks. Highly recommended!"</p>
              <strong>- Maxwell Okonkwo</strong>
            </div>
            <div className="testimonialCard" data-aos="fade-left">
              <p>"A clean, professional app that makes team collaboration simple."</p>
              <strong>- Julliet Okafor</strong>
            </div>
            <div className="testimonialCard" data-aos="fade-right">
              <p>"The real-time updates keep me in sync with my team no matter where I am."</p>
              <strong>- Elizabeth Steven</strong>
            </div>
            <div className="testimonialCard" data-aos="fade-left">
              <p>"Love the intuitive UI and quick task creation — saves me so much time."</p>
              <strong>- David James</strong>
            </div>
          </div>
        </div>

        <section className="ctaBanner" data-aos="zoom-in">
          <h2>Ready to get started?</h2>
          <button className="getStartedButton" onClick={() => navigate('/signup')}>
            Join Now
          </button>
        </section>

        <section className="faqSection" data-aos="fade-up">
          <h2 className="sectionTitle">Frequently Asked Questions</h2>
          <div className="faqContainer">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className={`faqItem ${faqOpen === index ? 'open' : ''}`}
                onClick={() => toggleFaq(index)}
              >
                <div className="faqQuestion">{faq.question}</div>
                {faqOpen === index && <div className="faqAnswer">{faq.answer}</div>}
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Scroll to Top Button */}
      <ScrollToTopButton />
    </div>
  );
};

const Feature = ({ number, title, description }) => (
  <div className="feature">
    <div className="featureNumberBox">{number}</div>
    <div>
      <h3 className="featureTitle">{title}</h3>
      <p className="featureDescription">{description}</p>
    </div>
  </div>
);

const features = [
  { number: '1', title: 'Create Tasks', description: 'Quickly add and organize your daily tasks with an intuitive interface.' },
  { number: '2', title: 'Manage Deadlines', description: 'Set deadlines and get reminders so you never miss an important task.' },
  { number: '3', title: 'Track Progress', description: 'Mark tasks complete and monitor your productivity growth over time.' },
  { number: '4', title: 'Collaborate', description: 'Share tasks and projects with your team for better coordination.' },
];

const whyPoints = [
  'Fast and intuitive UI',
  'Cross-device sync',
  'Secure and reliable',
  'Real-time updates',
];

const faqs = [
  {
    question: 'Is TaskManager free to use?',
    answer: 'Yes, TaskManager offers a free tier with basic features and paid plans for premium options.',
  },
  {
    question: 'Can I collaborate with my team?',
    answer: 'Absolutely! You can share tasks and projects with your team to boost collaboration.',
  },
  {
    question: 'Does it sync across devices?',
    answer: 'Yes, your tasks and updates sync in real-time across all your devices.',
  },
  {
    question: 'Is my data secure?',
    answer: 'We use industry-standard security protocols to keep your data safe and private.',
  },
];

export default LandingPage;