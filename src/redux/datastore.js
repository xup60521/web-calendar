import { createSlice } from "@reduxjs/toolkit";

let datacache = [];
if (JSON.parse(localStorage.getItem("user")) == null) {
    datacache = [];
    localStorage.setItem("user", JSON.stringify({
        "posts": []
    }))
} else {
    datacache = new Array(JSON.parse(localStorage.getItem("user")).posts);
}

let settingcache = {};
if (JSON.parse(localStorage.getItem("setting")) == null) {
    settingcache = {
        "group": []
    }
    localStorage.setItem("setting", JSON.stringify(settingcache));
} else {
    settingcache = JSON.parse(localStorage.getItem("setting"));
}

export const dataSlice = createSlice({
    name: "data",
    initialState: {
        list: datacache.flat(),
        setting: settingcache
    },
    reducers: {
        additem: (state, action) => {
            state.list = [
                ...state.list,
                action.payload,
            ].flat()
            let buf = JSON.parse(localStorage.getItem("user"));
            buf.posts = state.list.flat();
            localStorage.setItem("user", JSON.stringify(buf))
        },
        removeitem: (state, action) => {
            state.list = state.list.filter((d)=>d.id != action.payload.id).flat();
            let buf = JSON.parse(localStorage.getItem("user"));
            buf.posts = state.list.flat();
            localStorage.setItem("user", JSON.stringify(buf))
        },
        replaceitem: (state, action) => {
            state.list = action.payload.flat();
            let buf = JSON.parse(localStorage.getItem("user"));
            buf.posts = state.list.flat();
            localStorage.setItem("user", JSON.stringify(buf))
        },
        setsetting: (state, action) => {
            state.setting = action.payload;
            localStorage.setItem("setting", JSON.stringify(state.setting));
        },
        newgroupsetting: (state, action) => {
            state.setting.group.push(action.payload);
            localStorage.setItem("setting", JSON.stringify(state.setting));
        }
    }
});

export const { additem, removeitem, replaceitem, setsetting, newgroupsetting } = dataSlice.actions;
export default dataSlice.reducer;