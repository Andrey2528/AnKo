import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Footer } from './components/common';
import { Hero, About, Work, Services, Contact, Process, Pricing, Faq } from './sections';
import AdminPanel from './admin/AdminPanel';
import Page from './pages/Page';

/**
 * Main App Component
 */
function MainContent() {
    return (
        <>
            <main>
                <Hero />
                <About />
                <Work />
                <Services />
                <Process/>
                <Pricing />
                <Faq />
                <Contact />
            </main>

            <Footer />
        </>
    );
}

function App() {
    return (
        <div className="app">
            <Routes>
                <Route path="/" element={<MainContent />} />
                <Route path="/admin" element={<AdminPanel />} />
                    <Route path="/pages/:slug" element={<Page />} />
            </Routes>
        </div>
    );
}

export default App;
