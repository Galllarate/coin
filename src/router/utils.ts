import {NavigationGuardNext} from "vue-router";
import {isUserLoggedIn} from "@/databaseService/auth";

export const logInRequired = async (next: NavigationGuardNext) => {
    await isUserLoggedIn() ? next() : next({name: 'Auth'})
}