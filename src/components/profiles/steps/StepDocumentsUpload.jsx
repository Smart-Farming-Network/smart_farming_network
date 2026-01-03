export default function StepDocumentsUpload({ documents, updateData, nextStep, prevStep }) {
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files).map((file) => ({
            name: file.name,
            size: file.size,
            type: file.type,
        }));
        updateData([...documents, ...files]);
    };

    return (
        <div>
            <h4>Step 3: Upload Documents</h4>
            <input type="file" multiple onChange={handleFileChange} className="form-control mb-3" />
            {documents.length > 0 && (
                <ul>
                    {documents.map((doc, i) => (
                        <li key={i}>{doc.name}</li>
                    ))}
                </ul>
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
