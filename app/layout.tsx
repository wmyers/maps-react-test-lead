import 'bootstrap/dist/css/bootstrap.min.css';
import '@/app/ui/styles/globals.css';
import { inter } from './ui/fonts';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavbarBrand from 'react-bootstrap/NavbarBrand';
import React from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Navbar className="bg-body-tertiary">
          <Container>
            <NavbarBrand>Mortgage Calculator</NavbarBrand>
          </Container>
        </Navbar>
        {children}
      </body>
    </html>
  );
}
