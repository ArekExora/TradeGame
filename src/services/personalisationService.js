'use strict';

const allowedProperties = [
  'userName',
  'userId'
];

const proxyHandler = {
    set: (target, prop, value) => {
        console.log(target, prop, value);
        if(allowedProperties.includes(prop)){
            if(target[prop] !== undefined){
                throw new Error('User properties cannot be modified!');
            }
            target[prop] = value;
            return true;
        } else {
            throw new Error('User allowed properties are the following: ' + allowedProperties.join(', '));
        }
    }
};

const userObj = new Proxy({}, proxyHandler);

export default userObj;
