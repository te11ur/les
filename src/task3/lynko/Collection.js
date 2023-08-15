export class Collection {
    constructor() {
        this.elements = {};
        this.elements.numbers = [];
        this.elements.strings = [];
        this.elements.objects = [];   
        this.length = 0;
    }

    //все элементы при добавлении разбиваются на 3 объекта по типу данных
    // length - общая величина всех элементов
    //чтобы удалить элемент методами shift и pop нужно указать тип объекта
    pop(type) {
        if(type !== 'number' && type !== 'string' && type !== 'object') {
            console.error('data type is not supported');
        }
        else {
            this.length--;
            const arrayOfType = this.elements[`${type}s`];
            const deletedElement = arrayOfType[arrayOfType.length - 1];
            arrayOfType[arrayOfType.length - 1] = null;
            arrayOfType.length = arrayOfType.length - 1;
            return deletedElement;
        }
    }
    push(elem) {
        switch (typeof(elem)) {
            case 'number': this.elements.numbers[this.elements.numbers.length] = elem;
            break;
            case 'string': this.elements.strings[this.elements.strings.length] = elem;
            break;
            case 'object': this.elements.objects[this.elements.objects.length] = elem;
            break;
            default: console.error('data type is not supported');
        }
        this.length++;
        return this.length;
    }
    shift(type) {
        if(type !== 'number' && type !== 'string' && type !== 'object') {
            console.error('data type is not supported');
        }
        else {
            this.length--;
            const arrayOfType = this.elements[`${type}s`];
            const deletedElement = arrayOfType[0];
            for(let i = 0; i < arrayOfType.length; i++) {
                if(arrayOfType[i + 1]) {
                    arrayOfType[i] = arrayOfType[i+1]
                }
            }
            arrayOfType.length = arrayOfType.length - 1;
            return deletedElement;
        }
    }
    unshift(elem) {
        if(typeof(elem) !== 'number' && typeof(elem) !== 'string' && typeof(elem) !== 'object') {
            console.error('data type is not supported');
        }
        else {
            let helper = [elem];
            this.elements[`${typeof(elem)}s`] = helper.concat(this.elements[`${typeof(elem)}s`]);
            this.length++;
        }
        return this.length;
    }
    each(cb) {
        for(let key in this.elements) {
            this.elements[key].forEach(element => {
                cb & cb(element);
            }) 
        }
    }
    sort() {
        for(let key in this.elements) {
            if(key === "numbers" || key === "strings") {
                this._sortHelper(this.elements[key]);
            }
            else if(key === "objects") {
                this._sortHelperObj(this.elements[key]);
            }
        }
    }
    _sortHelperObj(arr) {
        
        //Пока не доделал сортировку объектов))
    }
    _sortHelper(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            for (let j = 0; j < i; j++) {
                if (arr[j] > arr[j + 1]) {
                    let temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }
}