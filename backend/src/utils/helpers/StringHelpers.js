
class StringHelpers{

    extractNumberFromString (str) {
        var num = str.match(/\d/g);
        num = num.join("");
        return num
    }

    
}

export default new  StringHelpers()