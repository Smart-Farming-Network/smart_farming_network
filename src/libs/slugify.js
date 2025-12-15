export function generateSlug(text) {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

export function generateSlugWithTimestamp(text) {
    const timestamp = Date.now();
    const slug = generateSlug(text);
    return `${slug}-${timestamp}`;
}
