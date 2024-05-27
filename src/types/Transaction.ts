import { Member } from "./Member";
import { Trash } from "./Trash";

export type Transaction = {
  id: number;
  trash: Trash;
  member: Member;
  weight: number;
  price_per_unit: number;
  total_price: number;
};
