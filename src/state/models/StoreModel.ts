import { action, Action, persist } from "easy-peasy"
import modalModel, { ModalModel } from "./ModalModel"

export interface StoreModel {
    // Menu
    editing: boolean
    setEditing: Action<StoreModel, boolean>
    menuVisible: boolean
    setMenuVisible: Action<StoreModel, boolean>

    // Layout
    cols: number | undefined
    setCols: Action<StoreModel, number>
    counter: number
    pairNames: { [i: string]: string }
    setPairName: Action<StoreModel, { i: string, name: string }>
    layout: ReactGridLayout.Layout[]
    setLayout: Action<StoreModel, ReactGridLayout.Layout[]>
    addItem: Action<StoreModel>

    modal: ModalModel
}

const defaultLayout = [0, 1].map((i, key, list) => ({
    i: i.toString(),
    x: i * 2,
    y: 0,
    w: 2,
    h: 2
}))

const storeModel: StoreModel = {
    editing: true,
    setEditing: action((state, editing) => { state.editing = editing }),

    menuVisible: true,
    setMenuVisible: action((state, menuVisible) => { state.menuVisible = menuVisible }),

    cols: undefined,
    setCols: action((state, cols) => { state.cols = cols }),
    counter: defaultLayout.length,
    pairNames: {},
    setPairName: action((state, { i, name }) => { state.pairNames = { ...state.pairNames, [i]: name } }),
    layout: defaultLayout,
    setLayout: action((state, layout) => { state.layout = layout }),
    addItem: action((state) => {
        state.layout = [...state.layout, {
            i: state.counter.toString(),
            x: (state.layout.length * 2) % (state.cols || 12),
            y: Infinity, // puts it at the bottom
            w: 2,
            h: 2
        }]
        state.counter++
    }),

    modal: modalModel
}

export default persist(storeModel, { blacklist: ["modal"] })