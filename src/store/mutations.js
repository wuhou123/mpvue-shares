import * as types from './mutation-types'
const matations={
    /**
     * state:当前状态树
     * v: 提交matations时传的参数
     */
    [types.SET_OPEN_ID] (state, v) {
        state.openId = v;
    },
    // 登录
    [types.SET_CODE] (state, v){
        state.code = v
    },
    //保存用户
    [types.SET_USERINFO] (state, v){
        state.userInfo = v
    },
    // 登录信息
    [types.SET_LOGIN] (state, v){
        state.loginMsg = v
    },
    //toast
    showToast(state,v){
        wx.showToast({
            title: v.text,
            icon: v.icon,
            duration: 1000
            })        
    }
}

export default matations