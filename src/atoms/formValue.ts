import { atom } from "recoil";

export const formValue = atom({
  key: "formValue",
  default: {
    trash_id: 0,
    member_id: 0,
    weight: 0,
  },
});
