'use client';

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ConfirmationModal } from "@/components/ConfirmationModal";

const INTENTS = {
    USER: { label: 'Regular User', description: 'Create a standard account' },
    FARMER: { label: 'Farmer', description: 'Join as a farmer on the platform' },
    INVESTOR: { label: 'Investor', description: 'Register as an investor' },
};

export default function RegisterForm() {
    // Intent state
    const [intent, setIntent] = useState('USER');

    // Form state
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Modal state
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email: email.toLowerCase().trim(),
                    password,
                    phone,
                    intent,
                }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.error || 'Registration failed');

            setShowSuccessModal(true);
        } catch (err) {
            setError(err.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    const handleSuccessConfirm = () => {
        setShowSuccessModal(false);
        router.push(`/login?registered=true&callbackUrl=${encodeURIComponent(callbackUrl)}`);
    };

    return (
        <div className="signup-area default-padding">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 offset-lg-3">
                        <div className="signup-form">

                            {/* Intent Switcher */}
                            <div className="intent-switch mb-4 text-center">
                                <div className="d-flex justify-content-between align-items-center">
                                    {Object.keys(INTENTS).map(key => (

                                        <button
                                            key={key}
                                            type="button"
                                            className={`btn me-2 text-nowrap ${intent === key ? 'btn-primary' : 'btn-outline-primary'}`}
                                            onClick={() => setIntent(key)}
                                        >
                                            {INTENTS[key].label}
                                        </button>

                                    ))}
                                </div>
                                <p className="mt-2 text-muted">
                                    {INTENTS[intent].description}
                                </p>
                            </div>

                            {error && <div className="alert alert-danger">{error}</div>}

                            <form onSubmit={handleSubmit}>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <input
                                            className="form-control"
                                            placeholder="First Name*"
                                            value={firstName}
                                            onChange={e => setFirstName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="col-lg-6">
                                        <input
                                            className="form-control"
                                            placeholder="Last Name*"
                                            value={lastName}
                                            onChange={e => setLastName(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="col-lg-12">
                                        <input
                                            className="form-control"
                                            placeholder="Email*"
                                            type="email"
                                            value={email}
                                            onChange={e => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="col-lg-12">
                                        <input
                                            className="form-control"
                                            placeholder="Password*"
                                            type="password"
                                            value={password}
                                            onChange={e => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="col-lg-12">
                                        <input
                                            className="form-control"
                                            placeholder="Phone Number"
                                            value={phone}
                                            onChange={e => setPhone(e.target.value)}
                                        />
                                    </div>

                                    {/* Intent Field (Read-only) */}
                                    <div className="col-lg-12">
                                        <input
                                            className="form-control bg-light"
                                            value={`Registering as: ${INTENTS[intent].label}`}
                                            readOnly
                                        />
                                    </div>

                                    <div className="col-lg-12 mt-3">
                                        <button className="btn btn-primary w-100" disabled={loading}>
                                            {loading ? 'Creating Account…' : 'Create Account'}
                                        </button>
                                    </div>

                                    <div className="col-lg-12 text-center mt-3">
                                        Already have an account? <Link href="/login">Login</Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <ConfirmationModal
                isOpen={showSuccessModal}
                title="Registration Successful"
                message="Your account has been created. Please log in to continue."
                confirmText="Continue to Login"
                onConfirm={handleSuccessConfirm}
                showCancelButton={false}
            />
        </div>
    );
}
