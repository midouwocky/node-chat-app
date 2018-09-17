const expect = require('expect');
const { generateMessage,generateLocationMessage } = require('./message');

describe('message tests', () => {
    it('should generate a correct message object', () => {
        var text ="some text";
        var from ="some user";
        var generatedMessage = generateMessage(from,text);
        
        expect(generatedMessage.createdAt).toBeDefined();
        expect(generatedMessage.text).toBe(text);
        expect(generatedMessage.from).toBe(from);

    });
});

describe('location message test : ',()=>{
    it('should return a correct location message',()=>{
        var lat =123;
        var long=321;
        var url = `https://www.google.com/maps?q=${lat},${long}`;
        var from ="some user";
        var generatedMessage = generateLocationMessage(from,lat,long);
        
        expect(generatedMessage.createdAt).toBeDefined();
        expect(generatedMessage.url).toBe(url);
        expect(generatedMessage.from).toBe(from);
    });
});