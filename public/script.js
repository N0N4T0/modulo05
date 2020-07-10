//Selecionar active por página
const currentPage = location.pathname
const menuItems = document.querySelectorAll("header .links a")

for (item of menuItems){
    if (currentPage.includes(item.getAttribute("href"))){
        item.classList.add("active")
    }
}

//Paginação
let totalPages = 20,
    selectedPage = 15,
    pages = [],
    oldPage,
    pageAfterBefore = 2

for(let currentPage = 1; currentPage <= totalPages; currentPage++){

    const firstAndLastPage = currentPage == 1 || currentPage == totalPages
    const pagesAfterSelectedPage = currentPage <= selectedPage + pageAfterBefore
    const pagesBeforeSelected = currentPage >= selectedPage - pageAfterBefore

    if(firstAndLastPage || pagesBeforeSelected && pagesAfterSelectedPage) {
        if(oldPage && currentPage - oldPage > pageAfterBefore){
            pages.push("...")
        }        
        
        if(oldPage && currentPage - oldPage == pageAfterBefore){
            // pages.push(currentPage - 1)
            pages.push(oldPage + 1)
        }

        pages.push(currentPage)

        oldPage = currentPage
    }
}

console.log(pages)