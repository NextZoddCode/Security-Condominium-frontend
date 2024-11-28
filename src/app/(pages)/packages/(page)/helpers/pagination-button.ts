export const PaginationButton = (currentPage: number, totalPages: number) => {

    // As variáveis abaixo serve para na paginacao so existem 5 paginas para aparecer, conforme vai se passando as paginas, uma sai e a proxima entra na lista dos 5, entao a logica abaixo é para isto.
    const MAX_VISIBLE_PAGES = 5;
    const startedPage = Math.max(currentPage - (MAX_VISIBLE_PAGES / 2), 1)
    const endPage = Math.min(startedPage + MAX_VISIBLE_PAGES - 1, totalPages)
    const ajustedPage = Math.max(endPage - MAX_VISIBLE_PAGES + 1, 1)

    return {
        MAX_VISIBLE_PAGES,
        ajustedPage
    }

}