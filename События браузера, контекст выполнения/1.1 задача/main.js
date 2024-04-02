document.addEventListener('DOMContentLoaded', function() {
    const button = document.querySelector('button');
    const list = document.querySelector('.list');

    button.addEventListener('click', () => {
        list.style.display = 'block';
    });

    document.addEventListener('click', event => {
        const targetElement = event.target;
        if (!list.contains(targetElement) && targetElement !== button) {
            list.style.display = 'none';
        }
    });
});
