export const PaginationButton = (currentPage: number, totalPages: number) => {

    const MAX_VISIBLE_PAGES: number = 5;

    const startedPage = Math.max(currentPage - (MAX_VISIBLE_PAGES / 2), 1)
    const endPage = Math.min(startedPage + MAX_VISIBLE_PAGES - 1, totalPages)
    const ajustedPage = Math.max(endPage - MAX_VISIBLE_PAGES + 1, 1)

    return {
        ajustedPage,
        MAX_VISIBLE_PAGES
    }

}