export function formatNumber(input, decimal, fill, nonFixToZero) {
    try {
        if (input === null || isNaN(input) || input === undefined) {
            return '--';
        }
        if (input === '' && !nonFixToZero) {
            return '0';
        }
        if (decimal == null) {
            if (parseFloat(input) >= 2) {
                input = roundFloat(input, 2);
            } else {
                input = roundFloat(input, 3);
            }
        } else {
            input = roundFloat(input, decimal);
        }
        input = input
            .toString()
            .split('.');
        input[0] = input[0].replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
        if (decimal && fill) {
            if (!input[1]) input[1] = '0'.repeat(decimal);
            else input[1] += '0'.repeat(decimal - input[1].length);
        }
        return input.join('.')
    } catch (ex) {
        console.error(ex);
    }
}

export function roundFloat(numberFloat, lenght) {
    try {
        if (numberFloat == null || lenght == null) {
            return 0;
        }
        // let itenDivison = '1';
        // for (let i = 0; i < lenght; i++) {
        //     itenDivison += '0';
        // }
        // const division = Number(itenDivison);
        let numberString = numberFloat + '';
        let arrNumber = numberString.split('.');
        if (!arrNumber[1]) return numberFloat;
        for (let i = 0; i < lenght; i++) {
            if (arrNumber[1][0]) {
                arrNumber[0] += arrNumber[1][0];
                arrNumber[1] = arrNumber[1].substr(1);
            } else {
                arrNumber[0] += '0'
            }
        }
        numberString = arrNumber.join('.');
        arrNumber = Math.round(numberString).toString();
        arrNumber = arrNumber.replace(/^(-?)/, '$1' + '0'.repeat(lenght))
        let result = Number(arrNumber.substring(0, arrNumber.length - lenght) + '.' + arrNumber.substr(-lenght));
        return result
    } catch (e) {
        console.error(e);
    }
    return 0;
}