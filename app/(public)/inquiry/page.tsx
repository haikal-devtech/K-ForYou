'use client';

import { useCartStore } from '@/lib/cart-store';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { inquirySchema } from '@/lib/validators';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { formatIDR } from '@/lib/utils';
import Image from 'next/image';
import { useState } from 'react';
import { ShoppingBag, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
// import { collection, addDoc } from 'firebase/firestore';
// import { db } from '@/lib/firebase';

type InquiryForm = z.infer<typeof inquirySchema>;

export default function InquiryPage() {
  return <div>Inquiry Page</div>;
}
