import { action, Action, persist } from "easy-peasy"
import modalModel, { ModalModel } from "./ModalModel"

export interface StoreModel {
    firstLaunch: boolean
    launch: Action<StoreModel>

    modal: ModalModel
}

const storeModel: StoreModel = {
    firstLaunch: true,
    launch: action((state) => { state.firstLaunch = false }),

    modal: modalModel
}

export default persist(storeModel, { blacklist: ["modal"] })