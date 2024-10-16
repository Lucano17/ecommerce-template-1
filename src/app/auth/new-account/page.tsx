import { titleFont } from '@/fonts/fonts';
import Link from 'next/link';
import styles from "./page.module.css"
import { RegisterForm } from './ui/RegisterForm';

export default function NewAccountPage() {
  return (
    <main>
      <RegisterForm/>
    </main>
  );
}