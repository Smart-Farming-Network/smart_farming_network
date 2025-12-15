export default function Button({ children, ...props }) {
    return (
        <button
            {...props}
            className="col w-100 px-4 btn btn-primary fw-bold"
        >
            {children}
        </button>
    );
}
