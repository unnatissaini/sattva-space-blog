import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'hi';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.blog': 'Blog',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.admin': 'Admin',
    
    // Hero Section
    'hero.title': 'Transform Your Mind, Transform Your Life',
    'hero.subtitle': 'Discover ancient wisdom for modern living through mindfulness, meditation, and spiritual growth.',
    'hero.cta': 'About Sattva Space',
    'hero.secondary': 'Explore Blog',
    
    // Features
    'features.mindfulness': 'Mindfulness',
    'features.mindfulness.desc': 'Learn to be present and aware in every moment of your life.',
    'features.meditation': 'Meditation',
    'features.meditation.desc': 'Develop inner peace and clarity through guided meditation practices.',
    'features.wisdom': 'Ancient Wisdom',
    'features.wisdom.desc': 'Discover timeless teachings adapted for contemporary living.',
    
    // Stats
    'stats.students': 'Active Students',
    'stats.courses': 'Meditation Courses',
    'stats.teachers': 'Expert Teachers',
    'stats.success': 'Success Rate',
    
    // Testimonials
    'testimonials.title': 'What Our Community Says',
    'testimonials.subtitle': 'Real stories from people who have transformed their lives through our practices.',
    
    // CTA Section
    'cta.title': 'Begin Your Journey Today',
    'cta.subtitle': 'Join thousands who have found peace and purpose through mindfulness and meditation.',
    'cta.button': 'Get Started Now',
    'cta.secondary': 'Learn More',
    
    // Newsletter
    'newsletter.title': 'Stay Connected',
    'newsletter.subtitle': 'Get weekly insights on mindfulness and spiritual growth.',
    'newsletter.placeholder': 'Enter your email',
    'newsletter.button': 'Subscribe',
    
    // Footer
    'footer.description': 'Nurturing mind, body, and spirit through mindful wellness content. Join our community on the journey to holistic health and inner peace.',
    'footer.links': 'Quick Links',
    'footer.contact': 'Contact',
    'footer.follow': 'Follow Us',
    'footer.rights': 'All rights reserved.',
    'footer.articles': 'Latest Articles',
    'footer.categories': 'Categories',
    'footer.about': 'About Us',
    'footer.newsletter': 'Stay Updated',
    'footer.newsletter.desc': 'Get the latest wellness tips and articles delivered to your inbox.',
    'footer.newsletter.placeholder': 'Your email address',
    'footer.newsletter.subscribe': 'Subscribe',
    'footer.made': 'Made with',
    'footer.wellness': 'for wellness',

    // Blog Page
    'blog.title': 'Wellness Articles',
    'blog.subtitle': 'Discover insights, tips, and practices for your holistic wellness journey',
    'blog.search.placeholder': 'Search articles, topics, or tags...',
    'blog.filter': 'Filter',
    'blog.categories.all': 'All',
    'blog.categories.health': 'Health',
    'blog.categories.fitness': 'Fitness',
    'blog.categories.remedies': 'Remedies',
    'blog.categories.lifestyle': 'Lifestyle',
    'blog.results': 'article',
    'blog.results.plural': 'articles',
    'blog.results.found': 'found',
    'blog.results.in': 'in',
    'blog.results.for': 'for',
    'blog.no.results': 'No articles found matching your criteria.',
    'blog.clear.filters': 'Clear filters',

    // About Page
    'about.title': 'About Sattva Space',
    'about.subtitle': 'Sattva Space is a sanctuary for holistic wellness, where ancient wisdom meets modern science to nurture your mind, body, and spirit. We believe that true health encompasses more than just the absence of illness—it\'s about thriving in all aspects of life.',
    'about.mission': 'Our Mission',
    'about.mission.desc': 'In Sanskrit, "Sattva" represents purity, balance, and harmony—the perfect state of being where mind, body, and spirit exist in beautiful equilibrium. Our mission is to guide you toward this state through:',
    'about.mission.point1': 'Evidence-based wellness content that honors both science and tradition',
    'about.mission.point2': 'Practical tools and techniques for daily wellness practices',
    'about.mission.point3': 'Natural remedies and holistic approaches to health challenges',
    'about.mission.point4': 'A supportive community for sharing experiences and wisdom',
    'about.expertise': 'Trusted Expertise',
    'about.expertise.desc': 'Our content is created and reviewed by certified wellness practitioners, licensed healthcare providers, and experienced wellness coaches who are passionate about holistic health.',
    'about.values': 'Our Values',
    'about.values.subtitle': 'These core principles guide everything we do and every piece of content we create.',
    'about.values.compassion': 'Compassionate Care',
    'about.values.compassion.desc': 'We approach wellness with empathy, understanding that every person\'s journey is unique and sacred.',
    'about.values.wisdom': 'Natural Wisdom',
    'about.values.wisdom.desc': 'We honor traditional healing practices while embracing modern scientific understanding.',
    'about.values.community': 'Community Connection',
    'about.values.community.desc': 'Healing happens in community. We foster supportive connections and shared experiences.',
    'about.values.learning': 'Continuous Learning',
    'about.values.learning.desc': 'We\'re committed to ongoing education and sharing evidence-based wellness practices.',
    'about.stats.title': 'Growing Together',
    'about.stats.subtitle': 'Join thousands of wellness enthusiasts on their journey to better health and inner peace.',
    'about.stats.members': 'Community Members',
    'about.stats.articles': 'Articles Published',
    'about.stats.contributors': 'Expert Contributors',
    'about.stats.countries': 'Countries Reached',
    'about.story': 'Our Story',
    'about.story.p1': 'Sattva Space was born from a simple realization: in our fast-paced, technology-driven world, we had lost touch with the fundamental principles of holistic health that have sustained human wellness for millennia.',
    'about.story.p2': 'Founded by a team of wellness practitioners, researchers, and health enthusiasts, we set out to create a space where ancient wisdom could meet modern science, where natural remedies could complement conventional medicine, and where community support could accelerate individual healing.',
    'about.story.p3': 'Today, Sattva Space serves as a trusted resource for thousands of people worldwide who are seeking a more balanced, mindful approach to health and wellness. We continue to grow and evolve, always staying true to our core mission of nurturing mind, body, and spirit.',
    'about.join': 'Join Our Community',
    'about.join.desc': 'Whether you\'re just beginning your wellness journey or looking to deepen your practice, you\'ll find a welcoming community and valuable resources here at Sattva Space.',
    'about.join.placeholder': 'Enter your email address',
    'about.join.button': 'Join Us',

    // Contact Page
    'contact.title': 'Get in Touch',
    'contact.subtitle': 'Have a question about wellness, need guidance on your journey, or want to collaborate? We\'d love to hear from you.',
    'contact.connect': 'Let\'s Connect',
    'contact.connect.desc': 'Whether you\'re seeking wellness advice, have feedback about our content, or want to explore partnership opportunities, we\'re here to help.',
    'contact.email': 'Email Us',
    'contact.email.content': 'hello@sattvaspace.com',
    'contact.email.desc': 'Send us an email anytime',
    'contact.chat': 'Live Chat',
    'contact.chat.content': 'Available 9 AM - 6 PM PST',
    'contact.chat.desc': 'Get instant answers to your questions',
    'contact.response': 'Response Time',
    'contact.response.content': 'Within 24 hours',
    'contact.response.desc': 'We typically respond the same day',
    'contact.follow': 'Follow Our Journey',
    'contact.follow.desc': 'Stay connected with our wellness community on social media for daily inspiration and tips.',
    'contact.form.title': 'Send Us a Message',
    'contact.form.name': 'Full Name',
    'contact.form.email': 'Email Address',
    'contact.form.subject': 'Subject',
    'contact.form.message': 'Message',
    'contact.form.name.placeholder': 'Your full name',
    'contact.form.email.placeholder': 'your.email@example.com',
    'contact.form.subject.placeholder': 'What\'s this about?',
    'contact.form.message.placeholder': 'Tell us how we can help you on your wellness journey...',
    'contact.form.send': 'Send Message',
    'contact.form.sending': 'Sending...',
    'contact.form.required': '* Required fields. We respect your privacy and will never share your information.',
    'contact.faq': 'Frequently Asked Questions',
    'contact.faq.q1': 'How quickly do you respond to messages?',
    'contact.faq.a1': 'We typically respond within 24 hours, often the same day during business hours.',
    'contact.faq.q2': 'Can you provide personalized health advice?',
    'contact.faq.a2': 'While we can offer general wellness guidance, we always recommend consulting with qualified healthcare providers for personalized medical advice.',
    'contact.faq.q3': 'Do you accept guest article submissions?',
    'contact.faq.a3': 'Yes! We welcome submissions from qualified wellness practitioners. Please include your credentials and article outline in your message.'
  },
  hi: {
    // Navigation
    'nav.home': 'होम',
    'nav.blog': 'ब्लॉग',
    'nav.about': 'हमारे बारे में',
    'nav.contact': 'संपर्क',
    'nav.admin': 'एडमिन',
    
    // Hero Section
    'hero.title': 'अपने मन को बदलें, अपने जीवन को बदलें',
    'hero.subtitle': 'माइंडफुलनेस, ध्यान और आध्यात्मिक विकास के माध्यम से आधुनिक जीवन के लिए प्राचीन ज्ञान की खोज करें।',
    'hero.cta': 'सत्त्व स्पेस के बारे में',
    'hero.secondary': 'ब्लॉग देखें',
    
    // Features
    'features.mindfulness': 'माइंडफुलनेस',
    'features.mindfulness.desc': 'अपने जीवन के हर क्षण में उपस्थित और जागरूक रहना सीखें।',
    'features.meditation': 'ध्यान',
    'features.meditation.desc': 'निर्देशित ध्यान अभ्यास के माध्यम से आंतरिक शांति और स्पष्टता विकसित करें।',
    'features.wisdom': 'प्राचीन ज्ञान',
    'features.wisdom.desc': 'समकालीन जीवन के लिए अनुकूलित शाश्वत शिक्षाओं की खोज करें।',
    
    // Stats
    'stats.students': 'सक्रिय छात्र',
    'stats.courses': 'ध्यान पाठ्यक्रम',
    'stats.teachers': 'विशेषज्ञ शिक्षक',
    'stats.success': 'सफलता दर',
    
    // Testimonials
    'testimonials.title': 'हमारे समुदाय का क्या कहना है',
    'testimonials.subtitle': 'उन लोगों की वास्तविक कहानियां जिन्होंने हमारी प्रथाओं के माध्यम से अपने जीवन को बदल दिया है।',
    
    // CTA Section
    'cta.title': 'आज ही अपनी यात्रा शुरू करें',
    'cta.subtitle': 'हजारों लोगों के साथ जुड़ें जिन्होंने माइंडफुलनेस और ध्यान के माध्यम से शांति और उद्देश्य पाया है।',
    'cta.button': 'अभी शुरू करें',
    'cta.secondary': 'और जानें',
    
    // Newsletter
    'newsletter.title': 'जुड़े रहें',
    'newsletter.subtitle': 'माइंडफुलनेस और आध्यात्मिक विकास पर साप्ताहिक अंतर्दृष्टि प्राप्त करें।',
    'newsletter.placeholder': 'अपना ईमेल दर्ज करें',
    'newsletter.button': 'सब्सक्राइब करें',
    
    // Footer
    'footer.description': 'माइंडफुल वेलनेस कंटेंट के माध्यम से मन, शरीर और आत्मा का पोषण। समग्र स्वास्थ्य और आंतरिक शांति की यात्रा में हमारे समुदाय से जुड़ें।',
    'footer.links': 'त्वरित लिंक',
    'footer.contact': 'संपर्क',
    'footer.follow': 'हमें फॉलो करें',
    'footer.rights': 'सभी अधिकार सुरक्षित।',
    'footer.articles': 'नवीनतम लेख',
    'footer.categories': 'श्रेणियां',
    'footer.about': 'हमारे बारे में',
    'footer.newsletter': 'अपडेट रहें',
    'footer.newsletter.desc': 'नवीनतम वेलनेस टिप्स और लेख अपने इनबॉक्स में प्राप्त करें।',
    'footer.newsletter.placeholder': 'आपका ईमेल पता',
    'footer.newsletter.subscribe': 'सब्सक्राइब करें',
    'footer.made': 'के साथ बनाया गया',
    'footer.wellness': 'वेलनेस के लिए',

    // Blog Page
    'blog.title': 'वेलनेस लेख',
    'blog.subtitle': 'अपनी समग्र कल्याण यात्रा के लिए अंतर्दृष्टि, सुझाव और प्रथाओं की खोज करें',
    'blog.search.placeholder': 'लेख, विषय या टैग खोजें...',
    'blog.filter': 'फिल्टर',
    'blog.categories.all': 'सभी',
    'blog.categories.health': 'स्वास्थ्य',
    'blog.categories.fitness': 'फिटनेस',
    'blog.categories.remedies': 'उपचार',
    'blog.categories.lifestyle': 'जीवनशैली',
    'blog.results': 'लेख',
    'blog.results.plural': 'लेख',
    'blog.results.found': 'मिले',
    'blog.results.in': 'में',
    'blog.results.for': 'के लिए',
    'blog.no.results': 'आपके मानदंडों से मेल खाने वाले कोई लेख नहीं मिले।',
    'blog.clear.filters': 'फिल्टर साफ़ करें',

    // About Page
    'about.title': 'सत्त्व स्पेस के बारे में',
    'about.subtitle': 'सत्त्व स्पेस समग्र कल्याण के लिए एक अभयारण्य है, जहाँ प्राचीन ज्ञान आधुनिक विज्ञान से मिलता है ताकि आपके मन, शरीर और आत्मा का पोषण हो सके। हमारा मानना है कि सच्चा स्वास्थ्य केवल बीमारी की अनुपस्थिति से कहीं अधिक है—यह जीवन के सभी पहलुओं में फलना-फूलना है।',
    'about.mission': 'हमारा मिशन',
    'about.mission.desc': 'संस्कृत में, "सत्त्व" शुद्धता, संतुलन और सामंजस्य का प्रतिनिधित्व करता है—वह आदर्श स्थिति जहाँ मन, शरीर और आत्मा सुंदर संतुलन में मौजूद होते हैं। हमारा मिशन इस के माध्यम से आपको इस स्थिति तक पहुँचाना है:',
    'about.mission.point1': 'साक्ष्य-आधारित कल्याण सामग्री जो विज्ञान और परंपरा दोनों का सम्मान करती है',
    'about.mission.point2': 'दैनिक कल्याण प्रथाओं के लिए व्यावहारिक उपकरण और तकनीकें',
    'about.mission.point3': 'स्वास्थ्य चुनौतियों के लिए प्राकृतिक उपचार और समग्र दृष्टिकोण',
    'about.mission.point4': 'अनुभव और ज्ञान साझा करने के लिए एक सहायक समुदाय',
    'about.expertise': 'विश्वसनीय विशेषज्ञता',
    'about.expertise.desc': 'हमारी सामग्री प्रमाणित कल्याण व्यवसायियों, लाइसेंसप्राप्त स्वास्थ्य सेवा प्रदाताओं और अनुभवी कल्याण कोचों द्वारा बनाई और समीक्षा की जाती है जो समग्र स्वास्थ्य के प्रति जुनूनी हैं।',
    'about.values': 'हमारे मूल्य',
    'about.values.subtitle': 'ये मूल सिद्धांत हमारे द्वारा किए जाने वाले सभी कार्यों और बनाई जाने वाली हर सामग्री का मार्गदर्शन करते हैं।',
    'about.values.compassion': 'दयालु देखभाल',
    'about.values.compassion.desc': 'हम कल्याण के लिए सहानुभूति के साथ दृष्टिकोण अपनाते हैं, यह समझते हुए कि हर व्यक्ति की यात्रा अनूठी और पवित्र है।',
    'about.values.wisdom': 'प्राकृतिक ज्ञान',
    'about.values.wisdom.desc': 'हम आधुनिक वैज्ञानिक समझ को अपनाते हुए पारंपरिक उपचार प्रथाओं का सम्मान करते हैं।',
    'about.values.community': 'सामुदायिक कनेक्शन',
    'about.values.community.desc': 'उपचार समुदाय में होता है। हम सहायक कनेक्शन और साझा अनुभवों को बढ़ावा देते हैं।',
    'about.values.learning': 'निरंतर शिक्षा',
    'about.values.learning.desc': 'हम निरंतर शिक्षा और साक्ष्य-आधारित कल्याण प्रथाओं को साझा करने के लिए प्रतिबद्ध हैं।',
    'about.stats.title': 'एक साथ बढ़ना',
    'about.stats.subtitle': 'बेहतर स्वास्थ्य और आंतरिक शांति की यात्रा में हजारों कल्याण उत्साही लोगों के साथ जुड़ें।',
    'about.stats.members': 'समुदाय के सदस्य',
    'about.stats.articles': 'प्रकाशित लेख',
    'about.stats.contributors': 'विशेषज्ञ योगदानकर्ता',
    'about.stats.countries': 'देशों तक पहुंच',
    'about.story': 'हमारी कहानी',
    'about.story.p1': 'सत्त्व स्पेस एक सरल एहसास से जन्मा था: हमारी तेज़-तर्रार, तकनीक-संचालित दुनिया में, हमने समग्र स्वास्थ्य के उन मौलिक सिद्धांतों से संपर्क खो दिया था जो सहस्राब्दियों से मानव कल्याण को बनाए रखते आए हैं।',
    'about.story.p2': 'कल्याण व्यवसायियों, शोधकर्ताओं और स्वास्थ्य उत्साही लोगों की एक टीम द्वारा स्थापित, हमने एक ऐसी जगह बनाने का लक्ष्य रखा जहाँ प्राचीन ज्ञान आधुनिक विज्ञान से मिल सके, जहाँ प्राकृतिक उपचार पारंपरिक चिकित्सा का पूरक हो सके, और जहाँ सामुदायिक समर्थन व्यक्तिगत उपचार को तेज़ कर सके।',
    'about.story.p3': 'आज, सत्त्व स्पेस दुनिया भर के हजारों लोगों के लिए एक विश्वसनीय संसाधन के रूप में काम करता है जो स्वास्थ्य और कल्याण के लिए अधिक संतुलित, सचेत दृष्टिकोण की तलाश कर रहे हैं। हम बढ़ते और विकसित होते रहते हैं, हमेशा मन, शरीर और आत्मा के पोषण के अपने मूल मिशन के प्रति सच्चे रहते हुए।',
    'about.join': 'हमारे समुदाय में शामिल हों',
    'about.join.desc': 'चाहे आप अपनी कल्याण यात्रा शुरू कर रहे हों या अपनी प्रथा को गहरा करना चाहते हों, आपको सत्त्व स्पेस में एक स्वागत करने वाला समुदाय और मूल्यवान संसाधन मिलेंगे।',
    'about.join.placeholder': 'अपना ईमेल पता दर्ज करें',
    'about.join.button': 'हमसे जुड़ें',

    // Contact Page
    'contact.title': 'संपर्क में रहें',
    'contact.subtitle': 'क्या आपका कल्याण के बारे में कोई प्रश्न है, अपनी यात्रा पर मार्गदर्शन चाहिए, या सहयोग करना चाहते हैं? हम आपसे सुनना पसंद करेंगे।',
    'contact.connect': 'आइए जुड़ें',
    'contact.connect.desc': 'चाहे आप कल्याण सलाह मांग रहे हों, हमारी सामग्री के बारे में प्रतिक्रिया हो, या साझेदारी के अवसरों का पता लगाना चाहते हों, हम यहाँ मदद के लिए हैं।',
    'contact.email': 'ईमेल करें',
    'contact.email.content': 'hello@sattvaspace.com',
    'contact.email.desc': 'कभी भी हमें ईमेल भेजें',
    'contact.chat': 'लाइव चैट',
    'contact.chat.content': 'सुबह 9 बजे से शाम 6 बजे PST तक उपलब्ध',
    'contact.chat.desc': 'अपने प्रश्नों के तत्काल उत्तर पाएं',
    'contact.response': 'प्रतिक्रिया समय',
    'contact.response.content': '24 घंटे के भीतर',
    'contact.response.desc': 'हम आमतौर पर उसी दिन जवाब देते हैं',
    'contact.follow': 'हमारी यात्रा का पालन करें',
    'contact.follow.desc': 'दैनिक प्रेरणा और सुझावों के लिए सोशल मीडिया पर हमारे कल्याण समुदाय से जुड़े रहें।',
    'contact.form.title': 'हमें संदेश भेजें',
    'contact.form.name': 'पूरा नाम',
    'contact.form.email': 'ईमेल पता',
    'contact.form.subject': 'विषय',
    'contact.form.message': 'संदेश',
    'contact.form.name.placeholder': 'आपका पूरा नाम',
    'contact.form.email.placeholder': 'your.email@example.com',
    'contact.form.subject.placeholder': 'यह किस बारे में है?',
    'contact.form.message.placeholder': 'बताएं कि हम आपकी कल्याण यात्रा में कैसे मदद कर सकते हैं...',
    'contact.form.send': 'संदेश भेजें',
    'contact.form.sending': 'भेजा जा रहा है...',
    'contact.form.required': '* आवश्यक फ़ील्ड। हम आपकी गोपनीयता का सम्मान करते हैं और कभी भी आपकी जानकारी साझा नहीं करेंगे।',
    'contact.faq': 'अक्सर पूछे जाने वाले प्रश्न',
    'contact.faq.q1': 'आप संदेशों का कितनी जल्दी जवाब देते हैं?',
    'contact.faq.a1': 'हम आमतौर पर 24 घंटे के भीतर, अक्सर व्यावसायिक घंटों के दौरान उसी दिन जवाब देते हैं।',
    'contact.faq.q2': 'क्या आप व्यक्तिगत स्वास्थ्य सलाह प्रदान कर सकते हैं?',
    'contact.faq.a2': 'जबकि हम सामान्य कल्याण मार्गदर्शन प्रदान कर सकते हैं, हम हमेशा व्यक्तिगत चिकित्सा सलाह के लिए योग्य स्वास्थ्य सेवा प्रदाताओं से परामर्श करने की सलाह देते हैं।',
    'contact.faq.q3': 'क्या आप अतिथि लेख प्रस्तुतियां स्वीकार करते हैं?',
    'contact.faq.a3': 'हाँ! हम योग्य कल्याण व्यवसायियों की प्रस्तुतियों का स्वागत करते हैं। कृपया अपने संदेश में अपनी साख और लेख की रूपरेखा शामिल करें।'
  },
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};