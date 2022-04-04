import {bString, aString} from './a';
import {reverse, isOdd} from './utils';
import * as config from './config.json';

console.log(config.userSetting1);

console.log(bString);

import {cube} from 'cube';

declare module 'cube' {
    export function cube(): string;
}

cube(5)
cube()


import $ from 'jquery';

declare global {
    interface JQuery {
        debug(): JQuery
    }
}


$().debug = function () {
    console.debug($(this));
    return $(this);
}

$(document).ready(() => console.log('jQuery'));
