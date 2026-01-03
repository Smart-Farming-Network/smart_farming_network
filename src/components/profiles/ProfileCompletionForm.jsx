'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import StepPersonalInfo from './steps/StepPersonalInfo';
import StepRoleSpecific from './steps/StepRoleSpecific';
import StepDocumentsUpload from './steps/StepDocumentsUpload';
import StepReviewSubmit from './steps/StepReviewSubmit';
import ProgressTracker from './steps/ProgressTracker';

const TOTAL_STEPS = 4; // 0 - 3

export default function ProfileCompletionForm({ user }) {
    const router = useRouter();

    /**
     * 🔒 Clamp backend profileStage to UI-safe range
     * Prevents invisible step bug forever
     */
    const initialStep = Math.min(
        user.profileStage ?? 0,
        TOTAL_STEPS - 1
    );

    const [currentStep, setCurrentStep] = useState(initialStep);

    /**
     * Editable until APPROVED
     */
    const isLocked = user.verificationStatus === 'APPROVED';

    const [formData, setFormData] = useState({
        firstName: user.profile?.firstName || '',
        lastName: user.profile?.lastName || '',
        phone: user.profile?.phone || '',
        roleSpecific: user.profile?.roleSpecific || {},
        documents: user.profile?.documents || [],
    });

    /**
     * Progress derived from backend truth
     * NOT navigation state
     */
    const progressPct = Math.min(
        user.profileCompletionPct || 0,
        100
    );

    const nextStep = () =>
        setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS - 1));

    const prevStep = () =>
        setCurrentStep((prev) => Math.max(prev - 1, 0));

    const updateFormData = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    /**
     * 🚫 Client no longer sends profileStage
     * Backend owns completion logic
     */
    const handleSubmit = async () => {
        try {
            const res = await fetch('/api/user/profile', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Submission failed');

            router.refresh(); // reload with updated server state
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    };

    if (isLocked) {
        return (
            <div className="alert alert-info">
                Your profile is under review. Editing is disabled.
            </div>
        );
    }

    return (
        <div className="profile-completion-form container py-4">
            <ProgressTracker progress={progressPct} />

            <div className="form-steps mt-4">
                {currentStep === 0 && (
                    <StepPersonalInfo
                        data={formData}
                        updateData={updateFormData}
                        nextStep={nextStep}
                    />
                )}

                {currentStep === 1 && (
                    <StepRoleSpecific
                        role={user.requestedRole}
                        data={formData.roleSpecific}
                        updateData={(val) => updateFormData('roleSpecific', val)}
                        nextStep={nextStep}
                        prevStep={prevStep}
                    />
                )}

                {currentStep === 2 && (
                    <StepDocumentsUpload
                        documents={formData.documents}
                        updateData={(docs) => updateFormData('documents', docs)}
                        nextStep={nextStep}
                        prevStep={prevStep}
                    />
                )}

                {currentStep === 3 && (
                    <StepReviewSubmit
                        data={formData}
                        prevStep={prevStep}
                        handleSubmit={handleSubmit}
                    />
                )}
            </div>
        </div>
    );
}
