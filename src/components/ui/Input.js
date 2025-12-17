export default function Input({ label, ...props }) {
    return (
        <div className="flex flex-col gap-1 w-full form-group mb-2">
            {label && <label className="text-sm font-medium text-gray-700">{label}</label>}
            <input
                {...props}
                className="form-control w-full border border-gray-300 px-3 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
        </div>
    );
}
