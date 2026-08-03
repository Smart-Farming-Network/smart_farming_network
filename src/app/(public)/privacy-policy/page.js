'use client';

export default function PrivacyPolicy() {
    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex items-center mb-6">
                <span className="text-2xl mr-3">🔐</span>
                <h1 className="text-3xl font-bold text-green-700">PRIVACY POLICY</h1>
            </div>

            <p className="text-gray-600 mb-8">Effective Date: {new Date().toLocaleDateString()}</p>

            <p className="mb-6 text-lg">
                This Privacy Policy explains how GSFN collects, uses, stores, and protects your information.
            </p>

            <div className="space-y-8">
                <section>
                    <h2 className="text-xl font-semibold text-green-600 mb-3">1. Information We Collect</h2>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        <li><span className="font-medium">Personal Info:</span> Name, contact, location, farm type, etc.</li>
                        <li><span className="font-medium">Usage Data:</span> Device, app activity, interactions with AgriGo</li>
                        <li><span className="font-medium">Farm Data:</span> Crops, productivity, field updates (only what you allow)</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-green-600 mb-3">2. How We Use Your Information</h2>
                    <p className="text-gray-700 mb-3">
                        We use your data to:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        <li>Offer personalized farming advice via AgriGo</li>
                        <li>Send important alerts and market opportunities</li>
                        <li>Match you with buyers or partners</li>
                        <li>Improve our services and security</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-green-600 mb-3">3. Data Protection</h2>
                    <p className="text-gray-700">
                        Your information is securely stored and never sold. We use encryption, secure servers, and regular audits to protect your data.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-green-600 mb-3">4. Third-Party Services</h2>
                    <p className="text-gray-700">
                        Some data may be shared with trusted service providers (e.g., weather APIs, financial processors) to deliver full platform value. They must adhere to strict confidentiality and usage agreements.
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-green-600 mb-3">5. Your Rights</h2>
                    <p className="text-gray-700 mb-3">
                        You have the right to:
                    </p>
                    <ul className="list-disc pl-5 space-y-2 text-gray-700 mb-4">
                        <li>Access your data</li>
                        <li>Update or correct your information</li>
                        <li>Request deletion of your profile</li>
                    </ul>
                    <p className="text-gray-700">
                        To do so, contact us at: <a href="mailto:support@smartfarmingnetwork.com" className="text-green-600 hover:underline">support@smartfarmingnetwork.com</a> or call <a href="tel:+2349121881781" className="text-green-600 hover:underline">+234 912 1881 781</a>
                    </p>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-green-600 mb-3">6. Cookies & Analytics</h2>
                    <p className="text-gray-700">
                        We use cookies to track user experience for analytics purposes. You can manage your cookie settings via your device or browser.
                    </p>
                </section>
            </div>

            <div className="mt-12 pt-6 border-t border-gray-200">
                <div className="flex items-center mb-4">
                    <span className="text-xl mr-2">🧾</span>
                    <h3 className="text-lg font-semibold text-gray-800">Contact Information</h3>
                </div>
                <p className="text-gray-700 mb-2">
                    If you have questions about these terms or your data privacy:
                </p>
                <address className="not-italic text-gray-700">
                    <p className="font-medium">Goodlife Smart Farming Network (GSFN)</p>
                    <p>📍 No. 17 Ahembaga Orsulega Street, Ankpa Quarters, Modern Market Rd, Makurdi, Nigeria</p>
                    <p>Phone: <a href="tel:+2349121881781" className="text-green-600 hover:underline">+234 912 1881 781</a></p>
                    <p>Mail: <a href="mailto:smartfarmingnetwork@gmail.com" className="text-green-600 hover:underline">smartfarmingnetwork@gmail.com</a></p>
                </address>
            </div>
        </div>
    )
}
