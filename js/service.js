var listService = (function () {
    function duplicateArray(arr, count) {
        let res = [];
        for(let i = 0; i <= count; i++){
            res = res.concat(arr.map(a => Object.assign({}, a)))
        }
        return res;
    }

    function hideElements(elementArray) {
        elementArray.forEach(function (element) {
            element.classList.add('hide');
        })
    }

    function showElements(elementArray) {
        elementArray.forEach(function (element) {
            element.classList.remove('hide');
        })
    }

    function sortEmailAsc(a, b) {
        return a.email > b.email ? 1 : -1;
    }
    
    function sortEmailDesc(a, b) {
        return a.email < b.email ? 1 : -1;
    }
    
    function filterAdminRole(item) {
        return item.role == 'Admin';
    }
    
    function filterUserRole(item) {
        return item.role == 'User';
    }
    
    function initTooltip() {
        $('[data-toggle="tooltip"]').tooltip();        
    }
    
    function tableTemplate(item) {
        return `<tr>
        <th scope="row">
            <input type="checkbox">
        </th>
        <th scope="row">${item.id}</th>
        <td>${item.name}</td>
        <td>${item.username}</td>
        <td>${item.role}</td>
        <td>${item.email}</td>
        
        <td data-toggle="tooltip" title="${item.address.zipcode}, ${item.address.city}, ${item.address.street}">${item.address.street}</td>
        <td>${item.website}</td>
        <td>
            <div class="text-center">
            <a href="#" data-row-id="${item.id}" class="btn btn-primary btn-sm">Открыть</a>
            </div>
        </td>
    </tr>`;
    }
    
    function detailsTemplate() {

    }

    function inheritance(parent, child) {
        let tempChild = child.prototype;
        child.prototype = Object.create(parent.prototype);
        child.prototype.constructor = child;

        for(let key in tempChild){
            if(tempChild.hasOwnProperty(key)){
                child.prototype[key] = tempChild[key];
            }
        }
    }

    return {
        duplicateArray,
        sortEmailAsc,
        sortEmailDesc,
        filterAdminRole,
        filterUserRole,
        hideElements,
        showElements,
        tableTemplate,
        detailsTemplate,
        initTooltip,
        inheritance
    }
})();