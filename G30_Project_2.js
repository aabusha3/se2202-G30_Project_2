const jobs = require('./jobs.json');


function duplicateInCatagories(jobs) {
    let catagories = [];
    for (let ele of Object.keys(jobs)) {
        catagories = catagories.concat(jobs[ele]['categories']);
    }

    const count = {};
    catagories.forEach(item => {
        if (count[item]) {
            count[item] += 1;
            return;
        }
        count[item] = 1;
    });

    const maxItem = { catagory: "", count: 0 };
    let maxConut = Number.MIN_VALUE;
    for (let prop in count) {
        if (maxConut < count[prop]) {
            maxConut = Math.max(count[prop], maxConut);
            maxItem.catagory = prop;
            maxItem.count = maxConut;
        }
    }
    return maxItem;
}

let catagoriesCounted = duplicateInCatagories(jobs);
console.log("The Category With The Most Job Postings Is: \"" + catagoriesCounted.catagory + "\" With A Count Of " + catagoriesCounted.count + "\n");



function duplicateInCities(jobs) {
    let cities = [];
    for (let ele of Object.keys(jobs)) {
        cities = cities.concat(jobs[ele]['title']);
    }

    const count = {};
    cities.forEach(item => {
        let splitItem = item.split(' ');
        let lastWord = splitItem[splitItem.length - 1].substring(0, splitItem[splitItem.length - 1].length - 1);
        let words = [];
        let i;
        if (!splitItem[splitItem.length - 1].includes('(')) {
            words.unshift(lastWord);
            for (i = 2; i < splitItem.length; i++) {
                if (splitItem[splitItem.length - i].includes('(') && !splitItem[splitItem.length - i].includes(')')) {
                    words.unshift(splitItem[splitItem.length - i].substring(1));
                    break;
                }
                words.unshift(splitItem[splitItem.length - i]);
            }
        } else {
            lastWord = lastWord.substring(1);
            words.unshift(lastWord);
        }


        let city = "";
        for (let word of words) {
            city += word + " ";
        }
        city = city.trim();
        i++;
        if (city === 'allows remote' && splitItem[splitItem.length - i] !== '()') {
            words.length = 0;
            lastWord = splitItem[splitItem.length - i].substring(0, splitItem[splitItem.length - i].length - 1)
            if (!splitItem[splitItem.length - i].includes('(')) {
                words.unshift(lastWord);
                i++;
                for (i; i < splitItem.length; i++) {
                    if (splitItem[splitItem.length - i].includes('(') && !splitItem[splitItem.length - i].includes(')')) {
                        words.unshift(splitItem[splitItem.length - i].substring(1));
                        break;
                    }
                    words.unshift(splitItem[splitItem.length - i]);
                }
            } else {
                lastWord = splitItem[splitItem.length - 1].substring(1);
                words.unshift(lastWord);
            }


            city = "";
            for (let word of words) {
                city += word + " ";
            }
        } else if (city === 'allows remote' && splitItem[splitItem.length - i] === '()')
            return;
        city = city.trim();
        city = city.split(",")[0];
        if (count[city]) {
            count[city] += 1;
            return;
        }
        count[city] = 1;
    });


    const maxItem = { city: "", count: 0 };
    let maxConut = Number.MIN_VALUE;
    for (let prop in count) {
        if (maxConut < count[prop]) {
            maxConut = Math.max(count[prop], maxConut);
            maxItem.city = prop;
            maxItem.count = maxConut;
        }
    }
    return maxItem;
}

let citiesCounted = duplicateInCities(jobs);
console.log("The City With The Most Job Postings Is: \"" + citiesCounted.city + "\" With A Count Of " + citiesCounted.count + "\n");



function duplicateInCitiesAndCategories(jobs) {
    const count = {};



    Object.values(jobs).forEach(item => {
        let splitItem = item['title'].split(' ');
        let lastWord = splitItem[splitItem.length - 1].substring(0, splitItem[splitItem.length - 1].length - 1);
        let words = [];
        let i;
        if (!splitItem[splitItem.length - 1].includes('(')) {
            words.unshift(lastWord);
            for (i = 2; i < splitItem.length; i++) {
                if (splitItem[splitItem.length - i].includes('(') && !splitItem[splitItem.length - i].includes(')')) {
                    words.unshift(splitItem[splitItem.length - i].substring(1));
                    break;
                }
                words.unshift(splitItem[splitItem.length - i]);
            }
        } else {
            lastWord = lastWord.substring(1);
            words.unshift(lastWord);
        }


        let city = "";
        for (let word of words) {
            city += word + " ";
        }
        city = city.trim();
        i++;
        if (city === 'allows remote' && splitItem[splitItem.length - i] !== '()') {
            words.length = 0;
            lastWord = splitItem[splitItem.length - i].substring(0, splitItem[splitItem.length - i].length - 1)
            if (!splitItem[splitItem.length - i].includes('(')) {
                words.unshift(lastWord);
                i++;
                for (i; i < splitItem.length; i++) {
                    if (splitItem[splitItem.length - i].includes('(') && !splitItem[splitItem.length - i].includes(')')) {
                        words.unshift(splitItem[splitItem.length - i].substring(1));
                        break;
                    }
                    words.unshift(splitItem[splitItem.length - i]);
                }
            } else {
                lastWord = splitItem[splitItem.length - 1].substring(1);
                words.unshift(lastWord);
            }
            city = "";
            for (let word of words) {
                city += word + " ";
            }

        } else if (city === 'allows remote' && splitItem[splitItem.length - i] === '()')
            return;

        city = city.trim();
        city = city.split(",")[0];
        if (count[city]) {
            item['categories'].forEach(e => {
                if (count[city][e])
                    count[city][e] += 1;
                else
                    count[city][e] = 1;
                return;
            });
        } else count[city] = item['categories'];
        count[city].forEach(catagory => {
            if (count[city][catagory]) {
                count[city][catagory] += 1;
                return;
            }
            count[city][catagory] = 1;
            for (let e in count[city]) {
                if (count[city][e] === catagory) {
                    delete count[city][e];
                    break;
                }
            }
        });
    });

    let maxConut = Number.MIN_VALUE;
    const maxItem = { city: "", catagory: "", count: 0 };
    const maxItems = {};
    let index = 0;
    Object.keys(count).forEach(cityName => {
        maxItem.city = cityName;
        Object.keys(count[cityName]).forEach(prop => {
            if (typeof count[cityName][prop] === 'number' && isFinite(count[cityName][prop])) {
                if (maxConut < count[cityName][prop]) {
                    maxConut = Math.max(count[cityName][prop], maxConut);
                    maxItem.count = maxConut;
                }
            }
        });
        for (let prop of Object.keys(count[cityName])) {
            if (count[cityName][prop] === maxConut) {
                maxItem.catagory = prop;
                break;
            }
        }
        maxItems[index++] = JSON.parse(JSON.stringify(maxItem));
        maxConut = Number.MIN_VALUE;
    });


    return maxItems;
}


let citiesAndCategoriesCounted = duplicateInCitiesAndCategories(jobs);
console.log("The Most Popular Categories In Each City Are:")
for (let ele of Object.values(citiesAndCategoriesCounted))
    console.log("City \"" + ele.city + "\" Has The Catagory \"" + ele.catagory + "\" With A Count Of " + ele.count);