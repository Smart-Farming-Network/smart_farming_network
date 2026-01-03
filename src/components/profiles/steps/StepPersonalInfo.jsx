export default function StepPersonalInfo({ data, updateData, nextStep }) {
    const handleChange = (e) => {
        updateData(e.target.name, e.target.value);
    };

    return (
        <div>
            <h4>Step 1: Personal Info</h4>
            <div className="mb-3">
                <input
                    type="text"
                    name="firstName"
                    className="form-control mb-2"
                    placeholder="First Name*"
                    value={data.firstName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="lastName"
                    className="form-control mb-2"
                    placeholder="Last Name*"
                    value={data.lastName}
                    onChange={handleChange}
                    required
                />
                <input
                    type="tel"
                    name="phone"
                    className="form-control mb-2"
                    placeholder="Phone Number"
                    value={data.phone}
                    onChange={handleChange}
                />
            </div>
            <button className="btn btn-primary" onClick={nextStep}>
                Next
            </button>
        </div>
    );
}
