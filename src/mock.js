export const fetchUser = () => {
  return new Promise((r) => {
    setTimeout(
      () =>
        r({
          name: "deepak",
          age: 20,
          address: {
            street: "No Where",
            pin: 2222
          }
        }),
      2000
    );
  });
};
