import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { DataProvider } from './contexts/DataContext';
import { LoadingSpinner } from './components/ui';

// Lazy loading для ВСІХ секцій та компонентів
const Hero = lazy(() => import('./sections/_0_Herro/Hero'));
const About = lazy(() => import('./sections/_1_About/About'));
const Work = lazy(() => import('./sections/_2_Work/Work'));
const Services = lazy(() => import('./sections/_3_Services/Services'));
const Process = lazy(() => import('./sections/_4_Process/Process'));
const Pricing = lazy(() => import('./sections/_5_Pricing/Pricing'));
const Faq = lazy(() => import('./sections/_6_FAQ/Faq'));
const Contact = lazy(() => import('./sections/_7_Contact/Contact'));
const Footer = lazy(() => import('./components/common/Footer/Footer'));
const AdminPanel = lazy(() => import('./admin/AdminPanel'));
const Page = lazy(() => import('./pages/Page'));

/**
 * Main App Component
 */
function MainContent() {
    return (
        <>
            <main>
                <Suspense fallback={<LoadingSpinner />}>
                    <Hero />
                    <About />
                    <Work />
                    <Services />
                    <Process />
                    <Pricing />
                    <Faq />
                    <Contact />
                </Suspense>
            </main>
            <Suspense fallback={null}>
                <Footer />
            </Suspense>
        </>
    );
}

function App() {
    return (
        <DataProvider>
            <div className="app">
                <Suspense fallback={<LoadingSpinner />}>
                    <Routes>
                        <Route path="/" element={<MainContent />} />
                        <Route path="/admin" element={<AdminPanel />} />
                        <Route path="/pages/:slug" element={<Page />} />
                    </Routes>
                </Suspense>
            </div>
        </DataProvider>
    );
}

export default App;
