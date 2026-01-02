import { hash } from 'bcryptjs';
import { NextResponse } from 'next/server';
import { prisma } from '@/libs/prisma';

// Allowed roles for registration (frontend intent mapping)
const ALLOWED_REQUESTED_ROLES = ['USER', 'FARMER', 'INVESTOR'];

export async function POST(req) {
  try {
    const { firstName, lastName, email, password, phone, intent } = await req.json();

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Validate requestedRole
    const requestedRole = intent && ALLOWED_REQUESTED_ROLES.includes(intent.toUpperCase())
      ? intent.toUpperCase()
      : 'USER';

    const normalizedEmail = email.toLowerCase().trim();

    // Check for duplicate user
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });
    if (existingUser) {
      return NextResponse.json({ error: 'Email already exists' }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await hash(password, 12);

    // Create user with requestedRole safely validated
    const user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        password: hashedPassword,
        role: 'USER', // always default assigned role
        requestedRole, // validated requested role
        verificationStatus: 'PENDING',
        profileStage: 0,
        profileCompletionPct: 0,
        profile: {
          create: { firstName, lastName, phone },
        },
      },
      include: { profile: true },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'User created successfully',
        user: {
          id: user.id,
          email: user.email,
          requestedRole: user.requestedRole,
          profile: user.profile,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Registration failed. Please try again later.' },
      { status: 500 }
    );
  }
}
