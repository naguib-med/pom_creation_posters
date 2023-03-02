import { mount } from "@vue/test-utils";
import About from "@/components/About";
import Login from "@/views/Login";

test(" about test ", () => {
  const wrapper = mount(About);

  expect(wrapper.get(".description").text()).toBe(
    "Je suis un étudiant en master informatique à l'université Claude Bernard Lyon 1."
  );
});

test("Login", () => {
  const wrapper = mount(Login, {
    data() {
      return {
        userLogin: true,
      };
    },
  });

  expect(wrapper.get(".ren").text()).toBe(
    "Pour se connecter, veuillez renseigner les champs suivants."
  );
});

// test("Login test", () => {
//   const wrapper = mount(LoginRegister, {
//     data() {
//       return {
//         userlogin: true,
//       };
//     },
//   });
//
//   expect(wrapper.get(".ren").text()).toBe(
//     "Pour se connecter, veuillez renseigner les champs suivants."
//   );
// });
