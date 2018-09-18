const expect = require('expect');

const {isRealString} = require('./validation');

describe('validation test : ',()=>{
    it('should reject a non-string value',()=>{
        var name = '';
        expect(isRealString(name)).toBe(false);
    });
    it('should reject a string with only spaces',()=>{
        var name = '     ';
        expect(isRealString(name)).toBe(false);
    });
    it('should allow string with non-space value',()=>{
        var name = 'ahmed hamdaoui';
        expect(isRealString(name)).toBe(true);
    });
});