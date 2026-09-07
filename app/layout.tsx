import './globals.css';
export const metadata = {
  title: 'Seibab Kennel | XL American Bullies',
  description:
    'Seibab Kennel in Dallas, TX. Explore XL American Bullies, available puppies, studs, upcoming breedings, and kennel updates.',
  icons: { icon: '/assets/logo1-BDcs8sUA.jpg' },
};
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
