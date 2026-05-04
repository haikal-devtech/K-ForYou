import { NextResponse } from 'next/server';
import { seedFirestore } from '@/lib/seed-firestore';

export async function GET() {
  try {
    await seedFirestore();
    return NextResponse.json({ message: 'Database seeded successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
