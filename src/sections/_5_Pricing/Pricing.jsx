import React, { useState } from 'react';
import { Container, Marquee, SectionTitle, OptionButton, FormContainer } from '../../components/ui';
import './Pricing.scss';

/**
 * Pricing Calculator Section
 * 
 * Інтерактивний калькулятор вартості проекту
 */
const Pricing = () => {
  // Service type selection
  const [serviceType, setServiceType] = useState('web');
  
  // Web development states
  const [websiteType, setWebsiteType] = useState('single-page');
  const [urgency, setUrgency] = useState('still-important');
  const [complexity, setComplexity] = useState('complex');

  // Photo & Video states
  const [photoType, setPhotoType] = useState('portrait');
  const [photoDuration, setPhotoDuration] = useState('half-day');
  const [photoEditing, setPhotoEditing] = useState('standard');

  // Branding states
  const [brandingScope, setBrandingScope] = useState('logo');
  const [brandingDeliverables, setBrandingDeliverables] = useState('basic');
  const [brandingRevisions, setBrandingRevisions] = useState('standard');

  // Bot states
  const [botPlatform, setBotPlatform] = useState('telegram');
  const [botComplexity, setBotComplexity] = useState('simple');
  const [botIntegrations, setBotIntegrations] = useState('basic');

  const marquePriceText = 'Fair & Transparent Pricing. Fair & Transparent Pricing.';

  // Pricing logic
  const calculatePrice = () => {
    if (serviceType === 'web') {
      return calculateWebPrice();
    } else if (serviceType === 'photo') {
      return calculatePhotoPrice();
    } else if (serviceType === 'branding') {
      return calculateBrandingPrice();
    } else if (serviceType === 'bot') {
      return calculateBotPrice();
    }
    return 0;
  };

  const calculateWebPrice = () => {
    let basePrice = 0;

    // Website type pricing
    const typePrices = {
      'single-page': 500,
      'multi-page': 1000,
      'e-commerce': 2000
    };

    // Urgency multiplier
    const urgencyMultipliers = {
      'very-urgent': 1.5,
      'still-important': 1.2,
      'flexible': 1.0
    };

    // Complexity multiplier
    const complexityMultipliers = {
      'simple': 0.8,
      'middling': 1.0,
      'complex': 1.5
    };

    basePrice = typePrices[websiteType] || 500;
    const urgencyMultiplier = urgencyMultipliers[urgency] || 1.0;
    const complexityMultiplier = complexityMultipliers[complexity] || 1.0;

    const total = basePrice * urgencyMultiplier * complexityMultiplier;
    return Math.round(total);
  };

  const calculatePhotoPrice = () => {
    const typePrices = { 'portrait': 300, 'product': 400, 'event': 600, 'commercial': 1000 };
    const durationMultipliers = { 'half-day': 1.0, 'full-day': 1.8, 'multi-day': 3.0 };
    const editingMultipliers = { 'basic': 1.0, 'standard': 1.3, 'premium': 1.8 };

    const basePrice = typePrices[photoType] || 300;
    const total = basePrice * durationMultipliers[photoDuration] * editingMultipliers[photoEditing];
    return Math.round(total);
  };

  const calculateBrandingPrice = () => {
    const scopePrices = { 'logo': 500, 'brand-identity': 1500, 'full-branding': 3000 };
    const deliverablesMultipliers = { 'basic': 1.0, 'standard': 1.5, 'premium': 2.2 };
    const revisionsMultipliers = { 'limited': 0.9, 'standard': 1.0, 'unlimited': 1.4 };

    const basePrice = scopePrices[brandingScope] || 500;
    const total = basePrice * deliverablesMultipliers[brandingDeliverables] * revisionsMultipliers[brandingRevisions];
    return Math.round(total);
  };

  const calculateBotPrice = () => {
    const platformPrices = { 'telegram': 400, 'discord': 450, 'whatsapp': 500, 'custom': 800 };
    const complexityMultipliers = { 'simple': 1.0, 'moderate': 1.8, 'advanced': 2.5 };
    const integrationsMultipliers = { 'basic': 1.0, 'standard': 1.4, 'advanced': 2.0 };

    const basePrice = platformPrices[botPlatform] || 400;
    const total = basePrice * complexityMultipliers[botComplexity] * integrationsMultipliers[botIntegrations];
    return Math.round(total);
  };

  const renderQuestions = () => {
    if (serviceType === 'web') {
      return (
        <>
          <div className="pricing__question">
            <h3 className="pricing__question-title">1. Type of Website Required:</h3>
            <div className="pricing__options">
              <OptionButton active={websiteType === 'single-page'} onClick={() => setWebsiteType('single-page')}>
                Single Page
              </OptionButton>
              <OptionButton active={websiteType === 'multi-page'} onClick={() => setWebsiteType('multi-page')}>
                Multi-Page
              </OptionButton>
              <OptionButton active={websiteType === 'e-commerce'} onClick={() => setWebsiteType('e-commerce')}>
                E-commerce
              </OptionButton>
            </div>
          </div>

          <div className="pricing__question">
            <h3 className="pricing__question-title">2. Project Urgency:</h3>
            <div className="pricing__options">
              <OptionButton active={urgency === 'very-urgent'} onClick={() => setUrgency('very-urgent')}>
                Very Urgent
              </OptionButton>
              <OptionButton active={urgency === 'still-important'} onClick={() => setUrgency('still-important')}>
                Still Important
              </OptionButton>
              <OptionButton active={urgency === 'flexible'} onClick={() => setUrgency('flexible')}>
                Flexible
              </OptionButton>
            </div>
          </div>

          <div className="pricing__question">
            <h3 className="pricing__question-title">3. Layout & Interaction Complexity:</h3>
            <div className="pricing__options">
              <OptionButton active={complexity === 'simple'} onClick={() => setComplexity('simple')}>
                Simple
              </OptionButton>
              <OptionButton active={complexity === 'middling'} onClick={() => setComplexity('middling')}>
                Middling
              </OptionButton>
              <OptionButton active={complexity === 'complex'} onClick={() => setComplexity('complex')}>
                Complex (Go wild!)
              </OptionButton>
            </div>
          </div>
        </>
      );
    } else if (serviceType === 'photo') {
      return (
        <>
          <div className="pricing__question">
            <h3 className="pricing__question-title">1. Type of Photography:</h3>
            <div className="pricing__options">
              <OptionButton active={photoType === 'portrait'} onClick={() => setPhotoType('portrait')}>
                Portrait
              </OptionButton>
              <OptionButton active={photoType === 'product'} onClick={() => setPhotoType('product')}>
                Product
              </OptionButton>
              <OptionButton active={photoType === 'event'} onClick={() => setPhotoType('event')}>
                Event
              </OptionButton>
              <OptionButton active={photoType === 'commercial'} onClick={() => setPhotoType('commercial')}>
                Commercial
              </OptionButton>
            </div>
          </div>

          <div className="pricing__question">
            <h3 className="pricing__question-title">2. Duration:</h3>
            <div className="pricing__options">
              <OptionButton active={photoDuration === 'half-day'} onClick={() => setPhotoDuration('half-day')}>
                Half Day (4h)
              </OptionButton>
              <OptionButton active={photoDuration === 'full-day'} onClick={() => setPhotoDuration('full-day')}>
                Full Day (8h)
              </OptionButton>
              <OptionButton active={photoDuration === 'multi-day'} onClick={() => setPhotoDuration('multi-day')}>
                Multi-Day
              </OptionButton>
            </div>
          </div>

          <div className="pricing__question">
            <h3 className="pricing__question-title">3. Post-Production Level:</h3>
            <div className="pricing__options">
              <OptionButton active={photoEditing === 'basic'} onClick={() => setPhotoEditing('basic')}>
                Basic Editing
              </OptionButton>
              <OptionButton active={photoEditing === 'standard'} onClick={() => setPhotoEditing('standard')}>
                Standard Retouching
              </OptionButton>
              <OptionButton active={photoEditing === 'premium'} onClick={() => setPhotoEditing('premium')}>
                Premium Retouching
              </OptionButton>
            </div>
          </div>
        </>
      );
    } else if (serviceType === 'branding') {
      return (
        <>
          <div className="pricing__question">
            <h3 className="pricing__question-title">1. Branding Scope:</h3>
            <div className="pricing__options">
              <OptionButton active={brandingScope === 'logo'} onClick={() => setBrandingScope('logo')}>
                Logo Only
              </OptionButton>
              <OptionButton active={brandingScope === 'brand-identity'} onClick={() => setBrandingScope('brand-identity')}>
                Brand Identity
              </OptionButton>
              <OptionButton active={brandingScope === 'full-branding'} onClick={() => setBrandingScope('full-branding')}>
                Full Branding Package
              </OptionButton>
            </div>
          </div>

          <div className="pricing__question">
            <h3 className="pricing__question-title">2. Deliverables:</h3>
            <div className="pricing__options">
              <OptionButton active={brandingDeliverables === 'basic'} onClick={() => setBrandingDeliverables('basic')}>
                Basic (Logo Files)
              </OptionButton>
              <OptionButton active={brandingDeliverables === 'standard'} onClick={() => setBrandingDeliverables('standard')}>
                Standard (+ Guidelines)
              </OptionButton>
              <OptionButton active={brandingDeliverables === 'premium'} onClick={() => setBrandingDeliverables('premium')}>
                Premium (Full Package)
              </OptionButton>
            </div>
          </div>

          <div className="pricing__question">
            <h3 className="pricing__question-title">3. Revision Rounds:</h3>
            <div className="pricing__options">
              <OptionButton active={brandingRevisions === 'limited'} onClick={() => setBrandingRevisions('limited')}>
                Limited (2-3)
              </OptionButton>
              <OptionButton active={brandingRevisions === 'standard'} onClick={() => setBrandingRevisions('standard')}>
                Standard (4-6)
              </OptionButton>
              <OptionButton active={brandingRevisions === 'unlimited'} onClick={() => setBrandingRevisions('unlimited')}>
                Unlimited
              </OptionButton>
            </div>
          </div>
        </>
      );
    } else if (serviceType === 'bot') {
      return (
        <>
          <div className="pricing__question">
            <h3 className="pricing__question-title">1. Bot Platform:</h3>
            <div className="pricing__options">
              <OptionButton active={botPlatform === 'telegram'} onClick={() => setBotPlatform('telegram')}>
                Telegram
              </OptionButton>
              <OptionButton active={botPlatform === 'discord'} onClick={() => setBotPlatform('discord')}>
                Discord
              </OptionButton>
              <OptionButton active={botPlatform === 'whatsapp'} onClick={() => setBotPlatform('whatsapp')}>
                WhatsApp
              </OptionButton>
              <OptionButton active={botPlatform === 'custom'} onClick={() => setBotPlatform('custom')}>
                Custom Platform
              </OptionButton>
            </div>
          </div>

          <div className="pricing__question">
            <h3 className="pricing__question-title">2. Bot Complexity:</h3>
            <div className="pricing__options">
              <OptionButton active={botComplexity === 'simple'} onClick={() => setBotComplexity('simple')}>
                Simple (Basic Commands)
              </OptionButton>
              <OptionButton active={botComplexity === 'moderate'} onClick={() => setBotComplexity('moderate')}>
                Moderate (Workflows)
              </OptionButton>
              <OptionButton active={botComplexity === 'advanced'} onClick={() => setBotComplexity('advanced')}>
                Advanced (AI/ML)
              </OptionButton>
            </div>
          </div>

          <div className="pricing__question">
            <h3 className="pricing__question-title">3. Integrations:</h3>
            <div className="pricing__options">
              <OptionButton active={botIntegrations === 'basic'} onClick={() => setBotIntegrations('basic')}>
                Basic (Standalone)
              </OptionButton>
              <OptionButton active={botIntegrations === 'standard'} onClick={() => setBotIntegrations('standard')}>
                Standard (2-3 APIs)
              </OptionButton>
              <OptionButton active={botIntegrations === 'advanced'} onClick={() => setBotIntegrations('advanced')}>
                Advanced (Multiple)
              </OptionButton>
            </div>
          </div>
        </>
      );
    }
  };

  const estimatedPrice = calculatePrice();

  return (
    <section id="pricing" className="pricing">
      <Marquee direction="left" speed={60} pauseOnHover={false}>
        {marquePriceText}
      </Marquee>
      <Container>
        <div className="pricing__head">
          <SectionTitle title='05. Pricing' theme='white'/>
        </div>
          {/* Service Type Tabs */}

        <div className="pricing__tabs">
            <button 
              className={`pricing__tab ${serviceType === 'photo' ? 'active' : ''}`}
              onClick={() => setServiceType('photo')}
            >
              PHOTO & VIDEO
            </button>
            <button 
              className={`pricing__tab ${serviceType === 'branding' ? 'active' : ''}`}
              onClick={() => setServiceType('branding')}
            >
              BRANDING
            </button>
            <button 
              className={`pricing__tab ${serviceType === 'web' ? 'active' : ''}`}
              onClick={() => setServiceType('web')}
            >
              WEB
            </button>
            <button 
              className={`pricing__tab ${serviceType === 'bot' ? 'active' : ''}`}
              onClick={() => setServiceType('bot')}
            >
              BOT
            </button>
          </div>
        <FormContainer className="pricing__calculator">
            <div className="pricing__header">
              <div className="pricing__estimate">
                Est: {estimatedPrice.toLocaleString()} $
              </div>
            </div>

            {/* Dynamic Questions based on service type */}
            {renderQuestions()}

            {/* Footer */}
            <div className="pricing__footer">
              <p className="pricing__disclaimer">
                Our pricing calculator provides a quick estimate to get you started, but your unique vision may entail specific needs that could adjust the final cost. The pricing here isn't set in stone and will depend heavily on the final scope of your project.
              </p>

              <a href="#contact" className="pricing__cta">
                <span className="pricing__cta-text">
                  <span>Contact</span>
                  Ready to Elevate
                  Your Brand?
                </span>
                <svg className="pricing__cta-icon" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M7 17L17 7M17 7H7M17 7V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
        </FormContainer>
      </Container>
    </section>
  );
};

export default Pricing;
