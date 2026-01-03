export default function StepReviewSubmit({ data, prevStep, handleSubmit }) {
    return (
        <div>
            <h4>Step 4: Review & Submit</h4>
            <pre>{JSON.stringify(data, null, 2)}</pre>
            <div className="d-flex gap-2">
                <button className="btn btn-secondary" onClick={prevStep}>
                    Back
                </button>
                <button className="btn btn-success" onClick={handleSubmit}>
                    Submit Profile
                </button>
            </div>
        </div>
    );
}
