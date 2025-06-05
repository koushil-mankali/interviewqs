const nameObj = {
  firstname: "Koushil",
  lastname: "Mankali",
};

const printDetails = function (town, bff) {
  console.log(
    "Name: " +
      this.firstname +
      " " +
      this.lastname +
      " Town:" +
      " " +
      town +
      " BFF: " +
      bff
  );
};

printDetails("Nanniiii"); // Name: undefined undefined

/**
 * Using bind function to bind the this conext to printDetails function.
 *
 */
const printDetailsBinded = printDetails.bind(nameObj, "Nirmal");
printDetailsBinded("Nani"); // Name: Koushil Mankali

// OWN Bind function implementation.
const ownBind = function (...args) {
  const thisObj = this;
  const restOfTheParams = args.slice(1);
  return function (...args2) {
    // Using Call method
    thisObj.call(args[0], ...restOfTheParams, ...args2);

    // Using apply method
    thisObj.apply(args[0], [...restOfTheParams, ...args2]);
  };
};

// Adding own bind funciton to Funciton prototype so that it will be available as a method in all functions.
Function.prototype.ownBind = ownBind;

const printDetailsOwnBinded = printDetails.ownBind(nameObj, "Nizamabad");
printDetailsOwnBinded("Chitaluka"); // Name: Koushil Mankali
