import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Footer } from './components/common';
import { Hero, About } from './sections';
import { DataProvider } from './contexts/DataContext';

// Lazy loading для секцій що не в першому viewport
const Work = lazy(() => import('./sections/_2_Work/Work'));
const Services = lazy(() => import('./sections/_3_Services/Services'));
const Process = lazy(() => import('./sections/_4_Process/Process'));
const Pricing = lazy(() => import('./sections/_5_Pricing/Pricing'));
const Faq = lazy(() => import('./sections/_6_FAQ/Faq'));
const Contact = lazy(() => import('./sections/_7_Contact/Contact'));
const AdminPanel = lazy(() => import('./admin/AdminPanel'));
const Page = lazy(() => import('./pages/Page'));

// Loading компонент
const LoadingFallback = () => (
    <div style={{ 
        padding: '40px', 
        textAlign: 'center',
        minHeight: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    }}>
        Завантаження...
    </div>
);

/**
 * Main App Component
 */
function MainContent() {
    return (
        <>
            <main>
                <Hero />
                <About />
                <Suspense fallback={<LoadingFallback />}>
                    <Work />
                    <Services />
                    <Process />
                    <Pricing />
                    <Faq />
                    <Contact />
                </Suspense>
            </main>
        </>
    );
}

function App() {
    return (
        <DataProvider>
            <div className="app">
                <Suspense fallback={<LoadingFallback />}>
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
