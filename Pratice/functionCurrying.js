const func = (a) => {
  return (b) => {
    if (b) {
      return func(a + b);
    } else {
      return a;
    }
  };
};

console.log("VAL", func(10)(5)(4)(3)());
