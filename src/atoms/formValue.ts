import { atom } from "recoil";

export const formValue = atom({
  key: "formValue",
  default: {
    trash_type: 0,
    member_id: 0,
    weight: 0,
  },
});
