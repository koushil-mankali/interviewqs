/**
 *
 * 1. Charecter count of the string.
 * 2. About Promises. - Explained in words.
 * 3. Async Await. - Explained in words.
 * 4. Fetch API Call
 * 5. Flatten Objects or Objects without using inbuilt methods.
 *
 */

//Charecter count of the string.

const str = "Hello World!";
const obj = {};

str?.split("")?.map((char) => {
  if (obj?.[char] != undefined) {
    obj[char] += 1;
  } else {
    obj[char] = 1;
  }
});

console.log("obj", obj);

//Fetch API Call

const fetcheData = await fetch("https://dummyjson.com/todos"); // Returns promise
const parsedFetcheData = await fetcheData?.json(); // parse promise once its resolved

// console.log("parsedFetcheData", parsedFetcheData);

// Flattent Objects or Objects without using inbuilt methods.

const obj1 = {
  name: "Koushil",
  address: {
    address1: "some add1",
    address2: {
      home: "home add",
      office: "office add",
    },
  },
};

const flattenedObject = {};
const flattenObj = (objectToFlatten, prevkey) =>
  Object.entries(objectToFlatten)?.map(([key, value]) => {
    if (typeof value == "object") {
      flattenObj(value, prevkey ? `${prevkey}.${key}` : key);
    } else {
      prevkey
        ? (flattenedObject[`${prevkey}.${key}`] = value)
        : (flattenedObject[key] = value);
    }
  });
flattenObj(obj1);
console.log("flattenedObject", flattenedObject);
