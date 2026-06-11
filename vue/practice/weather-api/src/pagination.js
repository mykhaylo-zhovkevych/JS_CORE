export const ALLOWED_PAGE_SIZES = Object.freeze([
    5, 10, 20
]);

export const DEFAULT_PAGE = 1;
export const DEFAULT_PAGE_SIZE = 10;

export function parsePageSize(val) {
    if (val === null) {
        return {
            ok: true,
            limit: DEFAULT_PAGE_SIZE,
        };
    }

    const limit = Number(val);

    if (!ALLOWED_PAGE_SIZES.includes(limit)) {
        return {
            ok: false,
            error: `_limit must be one of: ${ALLOWED_PAGE_SIZES.join(', ')}`
        };
    }

    return {
        ok: true,
        limit
    };
}

export function parsePagination(url) {
    const pageValue = url.searchParams.get('_page');
    const limitValue = url.searchParams.get('_limit');

    const page = pageValue === null ? DEFAULT_PAGE : Number(pageValue);

    if (!Number.isInteger(page) || page < 1) {
        return {
            ok: false,
            error: '_page must be a positive integer'
        };
    }

    const pageSizeResult = parsePageSize(limitValue);

    if (!pageSizeResult.ok) {
        return pageSizeResult;
    }

    return {
        ok: true,
        page,
        limit: pageSizeResult.limit
    };
}
