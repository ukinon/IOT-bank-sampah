import { Member } from "./Member";
import { Trash } from "./Trash";

export type Transaction = {
  id?: number;
  trash?: Trash;
  trash_id?: number;
  member_id?: number;
  member?: Member;
  weight: number;
  price_per_unit?: number;
  total_price?: number;
};
