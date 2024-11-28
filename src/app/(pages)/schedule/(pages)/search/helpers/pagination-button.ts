export const PaginationButton = (currentPage: number, totalPages: number) => {

    const MAX_PAGES = 5

    const startedPage = Math.max(currentPage - (MAX_PAGES / 2), 1)
    const endPage = Math.min(startedPage + MAX_PAGES - 1, totalPages)
    const ajustedPage = Math.max(endPage - MAX_PAGES + 1, 1)

    return {
        ajustedPage,
        MAX_PAGES
    }

}