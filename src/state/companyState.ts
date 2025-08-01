import {Company} from "../service/company";
import {atom} from "recoil";

export const currentCompanyState = atom<Company | null>({
    key: "currentCompanyState",
    default: null,
});
