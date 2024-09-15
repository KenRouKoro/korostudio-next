import {GlobalThemeOverrides} from "naive-ui";

const themeOverrides: GlobalThemeOverrides = {
    common: {
        borderRadius: "0",
        scrollbarBorderRadius:"0",
        borderRadiusSmall: "0",
        primaryColorSuppl: "rgba(240, 138, 0, 1)",
        primaryColorPressed: "rgb(255,178,88)",
        primaryColorHover: "rgb(255,196,113)",
        primaryColor: "rgba(240, 138, 0, 1)"
    },
    Scrollbar: {
        borderRadius: "0"
    },
    Image:{
        toolbarBorderRadius: "0"
    },
    Anchor:{
        linkPadding: "0 0 0 8px"
    }
}
export default themeOverrides