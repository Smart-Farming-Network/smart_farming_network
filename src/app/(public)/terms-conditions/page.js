'use client';

export default function TermsAndConditions() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-green-700 mb-6">TERMS & CONDITIONS</h1>
            <p suppressHydrationWarning className="text-gray-600 mb-8">Effective Date: {new Date().toLocaleDateString()}</p>

            <p className="mb-6 text-lg">
                Welcome to the Smart Farming Network (GSFN) platform. By accessing or using our app, services, website, or AgriGo chatbot, you agree to be bound by the following Terms and Conditions.
            </p>

            <div className="space-y-8">
                <section>
                    <h2 className="text-xl font-semibold text-green-600 mb-3">1. Acceptance of Terms</h2>
                    <p className="text-gray-700">
                        By using GSFN, you confirm that you are at least 18 years old or have parental/guardian permission. You agree to abide by all local laws and the terms outlined here.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-green-600 mb-3">2. User Responsibilities</h2>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        <li>You must provide accurate, up-to-date information when registering.</li>
                        <li>You are responsible for the content and data you submit.</li>
                        <li>You may not use GSFN for unlawful or fraudulent purposes.</li>
                        <li>You agree not to harm, hack, disrupt, or misuse the platform in any way.</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-green-600 mb-3">3. Use of Services</h2>
                    <p className="text-gray-700 mb-3">
                        GSFN provides access to:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-3">
                        <li>Verified farming resources</li>
                        <li>Smart chatbot assistance (AgriGo)</li>
                        <li>Market connections and farming intelligence</li>
                        <li>Community tools for farmers, buyers, and investors</li>
                    </ul>
                    <p className="text-gray-700">
                        You may not reproduce, resell, or repurpose content or data from GSFN without written permission.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-green-600 mb-3">4. Data Accuracy & Liability</h2>
                    <p className="text-gray-700">
                        GSFN uses advanced AI and real-time data; however, we cannot guarantee 100% accuracy. You use the insights and tools at your own discretion. GSFN is not liable for any loss, damage, or farming decision made solely based on the platform&apos;s advice.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-green-600 mb-3">5. Termination</h2>
                    <p className="text-gray-700">
                        We reserve the right to suspend or terminate access to your account if any misuse, dishonesty, or abuse is detected.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-green-600 mb-3">6. Modifications</h2>
                    <p className="text-gray-700">
                        We may update these terms periodically. Continued use of the platform after updates means you agree to the new terms.
                    </p>
                </section>
            </div>

            <div className="mt-10 pt-6 border-t border-gray-200">
                <p className="text-gray-500 text-sm">
                    If you have any questions about these Terms and Conditions, please contact us through the platform.
                </p>
            </div>
        </div>
    )
}