

export const generatePaginationNumbers = (currentPage: number, totalPages: number)=> {

    // If the total number of pages is <= 5
    // Show the total pages without "..."
    if (totalPages <= 5) {
        return Array.from({length: totalPages}, (_, i) => i + 1)
    }

    // If current page is between the 3 firsts pages
    // Show the 3 firsts, "...", and the 2 lasts
    if (currentPage <=3) {
        return [1, 2, 3, "...", totalPages -1, totalPages];
    }

    // If the current page is between the 3 lasts pages 
    // Show the 2 firsts, "...", and the last 3
    if (currentPage >= totalPages -2) {
        return [1, 2, "...", totalPages -2, totalPages -1, totalPages]
    }

    // If the current page is in the middle
    // Show the first & second pages, "...", current page and the nearests, "...", the 2 lasts
    return [
        1, 2, "...", currentPage -1, currentPage, currentPage +1, totalPages -1, totalPages
    ]
} 