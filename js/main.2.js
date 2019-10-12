(function () {
    const userList = document.querySelector('#user-list');
    const selectAll = document.querySelector('#select-all');
    const statsInfo = document.querySelector('#stats');

    const search = document.querySelector('#inputSearch');
    const emailDropdown = document.querySelector('#dropdown-email');
    const roleDropdown = document.querySelector('#dropdown-role');
    const nextBtn = document.querySelector('#next-page');
    const backBtn = document.querySelector('#back-btn');

    const detailsView = document.querySelector('#details-view');
    const mainView = document.querySelector('#main-view');
    const detailsItems = document.querySelector('#details-items');

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
        // userList.addEventListener('click', selectTableLine);
        userList.addEventListener('click', selectLineHandler);

        search.addEventListener('keyup', searchHandler);
        emailDropdown.addEventListener('click', sortingHandler);
        roleDropdown.addEventListener('click', sortingHandler);

        nextBtn.addEventListener('click', getNextPageHandler);
        backBtn.addEventListener('click', openMain);
    }

    function selectAllItems() {
        let checkboxes = userList.querySelectorAll('input[type=checkbox]');

        checkboxes.forEach(item => selectAll.checked ? item.checked = true : item.checked = false);
    }

    function selectTableLine(event) {
        let tableLines = event.currentTarget.querySelectorAll('tr');
        tableLines.forEach(item => item.classList.remove('table-active'));
        event.target.closest('tr').classList.add('table-active');
    }

    function selectLineHandler(event) {
        let isButton = event.target.getAttribute('data-row-id');
        isButton ? openDetail(isButton) : selectTableLine(event);
    }

    function openDetail(buttonId) {
        listService.hideElements([mainView]);
        listService.showElements([detailsView]);

        let user = userListData.filter(item => item.id == buttonId);
        detailsItems.innerHTML = listService.detailsTemplate(user[0]);
    }

    function openMain() {
        listService.hideElements([detailsView]);
        listService.showElements([mainView]);
    }

    function searchHandler(event) {
        event.preventDefault();
        let value = event.target.value;
        if(event.keyCode === 13 && (value.length == 0 || value.length > 2)){
            pageConfig.currentPage = 0;
            userList.innerHTML = '';

            buildUsersList(config.sortingConfig['Find']);
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
        userList.innerHTML = "";
        buildUsersList(config.sortingConfig[sortingType]);
    }

    function getNextPageHandler(event) {
        event && event.preventDefault();
        buildUsersList();
        if(isMaxPage()){
            blockNextPage();
            countStars();
        }
    }

    function isMaxPage() {
        return (pageConfig.currentPage * pageConfig.itemsPerPage) >= userListData.length;
    }
    function blockNextPage() {
        nextBtn.classList.add('disabled');
    }
    function countStars()  {
        let stats = userListData.reduce(function (sum, item) {
            (item.role == 'Admin') ? sum.admins++ : sum.users++;
            return sum;
        }, {admins: 0, users: 0});
        statsInfo.innerHTML = `Статистика системы. Админов: ${stats.admins}, Пользователей: ${stats.users}`;
    }
    function getNextPage() {
        let start = pageConfig.itemsPerPage * pageConfig.currentPage;
        let end = pageConfig.itemsPerPage + start;
        pageConfig.currentPage++;
        return userListData.slice(start, end);
    }

    function buildUsersList(filterSortFunction) {
        let page = getNextPage();
        filterSortFunction && (page = filterSortFunction(page));
        let result = page.map(item => listService.tableTemplate(item));
        userList.innerHTML += result.join("");
        listService.initTooltip();
    }

    function init() {
        initListeners()
        prepareUsersListData()
        buildUsersList()
    }
    init();
})();