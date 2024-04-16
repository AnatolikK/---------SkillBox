async function showPrototypeChain() {
    const input = document.getElementById('classNameInput');
    const chainList = document.getElementById('chainList');
    const className = input.value.trim();

    // Сброс предыдущих ошибок и списка цепочки
    input.classList.remove('error');
    chainList.textContent = '';

    try {
        let Class;
        if (className.endsWith('.js')) {
            // Динамический импорт модуля
            const module = await import(className);
            Class = module.default;
        } else {
            // Проверка существования класса в window
            if (!(className in window)) {
                throw new Error(`Класс '${className}' не найден в глобальной области видимости.`);
            }
            Class = window[className];
        }

        // Проверка, является ли Class функцией-конструктором
        if (typeof Class !== 'function') {
            throw new Error(`'${className}' не является функцией-конструктором.`);
        }

        // Отображение цепочки прототипов
        let prototype = Class.prototype;
        while (prototype) {
            const listItem = document.createElement('li');
            listItem.textContent = prototype.constructor.name || '[Без названия]';
            const propertiesList = document.createElement('ol');
            for (const prop in prototype) {
                if (prototype.hasOwnProperty(prop)) {
                    const propertyItem = document.createElement('li');
                    propertyItem.textContent = `${prop} (${typeof prototype[prop]})`;
                    propertiesList.appendChild(propertyItem);
                }
            }
            listItem.appendChild(propertiesList);
            chainList.appendChild(listItem);
            prototype = Object.getPrototypeOf(prototype);
        }
    } catch (error) {
        input.classList.add('error');
        const errorMessage = document.createElement('div');
        errorMessage.id = 'error';
        errorMessage.textContent = error.message;
        chainList.appendChild(errorMessage);
    }
}
