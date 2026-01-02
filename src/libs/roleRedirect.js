export function getRedirectByRole(role) {
    switch (role) {
        case "FARMER":
            return "/farmers";

        case "ADMIN":
            return "/admin";

        case "INVESTOR":
            return "/investors";

        default:
            return "/dashboard"; // USER or unknown
    }
}
