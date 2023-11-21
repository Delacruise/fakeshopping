import './globals.css';
import Footer from './components/footer';
import Navigation from './components/navigation';

export const metadata = {
  title: 'Old Crow Shopping App',
  description: 'Fake shopping with old crows.',
};

export default function RootLayout({ children }) {

  return (
    <html lang='en'>
      <body className='overflow-x-hidden'>
        <Navigation /> {children}
        <Footer />
      </body>
    </html>
  );
}
