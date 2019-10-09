(function () {
    const userList = document.querySelector('#user-list');
    const selectAll = document.querySelector('#select-all');
    const statsInfo = document.querySelector('#stats');

    const search = document.querySelector('#inputSearch');
    const emailDropdown = document.querySelector('#dropdown-email');
    const roleDropdown = document.querySelector('#dropdown-role');
    const nextBtn = document.querySelector('#next-page');

    let userListData = [];
    let pageConfig = {
        itemsPerPage: 10,
        currentPage: 0
    };

    function prepareUsersListData() {
        userListData = listService.duplicateArray(users, 1);
    }

    function initListeners() {
        selectAll.addEventListener('click', selectAllItems);
        userList.addEventListener('click', selectTableLine);

        search.addEventListener('click', searchHandler);
        emailDropdown.addEventListener('click', sortingHandler);
        roleDropdown.addEventListener('click', sortingHandler);
        nextBtn.addEventListener('click', getNextPageHandler);
    }

    function selectAllItems() {
        let checkboxes = userList.querySelectorAll('input[type=checkbox]');


    }

    function selectTableLine(event) {
        let tableLines = event.currentPage.querySelectorAll('tr');
        tableLines.forEach(item => item.classList.remove('table-active'));
        event.target.closest('tr').classList.add('table-active');
    }

    function searchHandler(event) {
        event.preventDefault();
        let value = event.target.value;
        if(event.keyCode === 13 && (value.length == 0 || value.length > 2)){
            pageConfig.currentPage = 0;
            userList.innerHTML = '';
            let filterFunction = (page) => {
                let exp = new RegExp(event.target.value, 'i');
                return page.filter(item => {
                    return exp.test(item.name);
                })
            }
            buildUsersList(filterFunction);
        }
    }

    function sortingHandler(event) {
        event.preventDefault();
        event.currentTarget.querySelector('button').innerHTML = event.target.innerText;
        let sortingType = event.target.getAttribute('sorting-type');
        sortingType && applySortingMethod(sortingType);
    }

    function applySortingMethod(sortingType) {
        pageConfig.currentPage = 0;
        userList.innerHTML = '';
    }





    function getNextpageHandler(event) {

    }

    function isMaxPage() {
        return (pageConfig.currentPage * pageConfig.itemsPerPage) > userListData.length;
    }
    function blockNextPage() {
        
    }
    function countStars() {

    }
    function getNextPage() {

    }

    function buildUsersList(filterSortFunction) {
        let page = getNextPage();
        filterSortFunction && (page = filterSortFunction(page));
        let result = page.map(item => listService.tableTemplate(item));
        userList.innerText += result.join('');
        listService.initTooltip();
    }

    function init() {
        initListeners()
        prepareUsersListData()
        buildUsersList()
    }
    init();
})();