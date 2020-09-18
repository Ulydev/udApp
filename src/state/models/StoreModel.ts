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
    
    firstLaunch: boolean
    launch: Action<StoreModel>

    modal: ModalModel
}

const defaultLayout = [0, 1].map((i, key, list) => ({
    i: i.toString(),
    x: 0,
    y: 2,
    w: 8,
    h: 2
}))

const storeModel: StoreModel = {
    editing: false,
    setEditing: action((state, editing) => { state.editing = editing }),

    menuVisible: true,
    setMenuVisible: action((state, menuVisible) => { state.menuVisible = menuVisible }),

    cols: undefined,
    setCols: action((state, cols) => { state.cols = cols }),
    counter: defaultLayout.length,
    pairNames: { "0": "ETHUSDC", "1": "UNIUSDC" },
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

    firstLaunch: true,
    launch: action((state) => { state.firstLaunch = false }),

    modal: modalModel
}

export default persist(storeModel, { blacklist: ["modal"] })