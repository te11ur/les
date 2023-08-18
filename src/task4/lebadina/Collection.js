import {Collection} from "../../task3/lebadina/Collection.js";
import {SortCollection} from "../../task3/kalandarov/SortCollection.js";
import {timer} from "./decorators.js";

export class Collection2 extends Collection {

    @timer()
    push(...args) {
        return super.push(...args);
    }
}

export class Collection3 extends SortCollection {

    @timer()
    add(...args) {
        return super.add(...args);
    }
}
