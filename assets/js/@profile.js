const triggerTabList = document.querySelectorAll('#profile-tab button')
triggerTabList.forEach(async triggerEl => {
    await console.log(triggerEl);
    let tabTrigger = new bootstrap.Tab(triggerEl);

    await triggerEl.addEventListener('click', event => {
        event.preventDefault();
        tabTrigger.show();
        console.log(event.type);
    })
})