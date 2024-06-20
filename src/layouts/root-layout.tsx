import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';

import Footer from '../components/shared/footer';
import Navbar from '../components/shared/navbar';
import { Suspensed } from '../components/ui';

const HomeModule = lazy(() => import('../pages/Home'));
const InterviewModule = lazy(() => import('../pages/interviews'));

function Layout() {
  return (
    <div className=" h-screen relative">
      <Navbar />
      <main className=" bg-gray-100 h-full py-6 overflow-y-auto ">
        <div className="container mx-auto xs:px-5 sm:px-5">
          <Routes>
            <Route
              path="/"
              element={
                <Suspensed>
                  <HomeModule />
                </Suspensed>
              }
            />
            <Route
              path="/assessment"
              element={
                <Suspensed>
                  <InterviewModule />
                </Suspensed>
              }
            />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
