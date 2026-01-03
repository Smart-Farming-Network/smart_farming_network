export default function StepRoleSpecific({ role, data, updateData, nextStep, prevStep }) {
    const handleChange = (e) => {
        updateData({ ...data, [e.target.name]: e.target.value });
    };

    return (
        <div>
            <h4>Step 2: {role} Info</h4>
            {role === 'FARMER' && (
                <>
                    <input
                        type="text"
                        name="farmName"
                        className="form-control mb-2"
                        placeholder="Farm Name*"
                        value={data.farmName || ''}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="text"
                        name="farmLocation"
                        className="form-control mb-2"
                        placeholder="Farm Location*"
                        value={data.farmLocation || ''}
                        onChange={handleChange}
                        required
                    />
                </>
            )}
            {role === 'INVESTOR' && (
                <>
                    <input
                        type="text"
                        name="companyName"
                        className="form-control mb-2"
                        placeholder="Company Name*"
                        value={data.companyName || ''}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="number"
                        name="investmentAmount"
                        className="form-control mb-2"
                        placeholder="Investment Amount*"
                        value={data.investmentAmount || ''}
                        onChange={handleChange}
                        required
                    />
                </>
            )}
            <div className="d-flex gap-2">
                <button className="btn btn-secondary" onClick={prevStep}>
                    Back
                </button>
                <button className="btn btn-primary" onClick={nextStep}>
                    Next
                </button>
            </div>
        </div>
    );
}
