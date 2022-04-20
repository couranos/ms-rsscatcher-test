import {cdg} from '../utils';

const password = 'P@ssword0'
let passwordCrypt: any;

test('check string empty', () => {
    expect(cdg.string.is_empty('azerty')).toBe(false);
});
test('check string is email', () => {
    expect(typeof cdg.string.is_email('johndoe@gmail.com')).toBe('boolean');
});
test('check string is number', () => {
    expect(cdg.string.is_number(1234567890)).toBe(true);
});

test('check string is date', () => {
    expect(cdg.string.is_date(new Date())).toBe(true);
});
test('Generate ObjectId', () => {
    let object = cdg.string.generateObjectId()
    expect(typeof object).toBe('object');
});
test('Convert string to ObjectId', () => {
    let object = cdg.string.toObjectId('6168eeeda61f3b1c28cd161f')
    expect(typeof object).toBe('object');
});
test('Crypt password', async () => {
    let object = await cdg.encryptPassword(password)
    passwordCrypt = object
    expect(typeof object).toBe('string');
});
test('Verify password', async () => {
    let object = await cdg.verifyPassword(password, passwordCrypt)
    expect(object).toBe(true);
});
test('Generate unique identifier', () => {
    let object = cdg.generateSlug()
    expect(typeof object).toBe('string');
});
test('Check item is in array', () => {
    let object = cdg.inArray('azerty', ['qwerty', 'azerty'])
    expect(object).toBe(true);
});
test('Beautify method error handler', () => {
    let object = cdg.buildApiError({})
    expect(typeof object).toBe('object');
});
test('Get current date', () => {
    let object = cdg.getDate()
    expect(typeof object).toBe('object');
});
test('Get date from date string', () => {
    let object = cdg.dateOnlyFormat('2021-10-15T03:01:01.056+00:00')
    expect(typeof object).toBe('string');
});

