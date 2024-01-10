import crypto from 'crypto';

const generateRandomKey = (length) => {
    return crypto.randomBytes(length).toString('hex');
};

const key = generateRandomKey(32);

console.log(key);

