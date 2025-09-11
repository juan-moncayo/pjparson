// app/privacy-policy/page.tsx
import PrivacyPolicyPage from './privacy-policy-content';

export const metadata = {
  title: 'Privacy Policy & Terms of Service - PJ Parsons Presents',
  description: 'Privacy Policy, Cookie Policy, and Terms of Service for PJ Parsons Presents wedding and event services.',
  robots: 'noindex, nofollow', // Opcional: evita indexación en motores de búsqueda
};

export default function PrivacyPolicy() {
  return <PrivacyPolicyPage />;
}