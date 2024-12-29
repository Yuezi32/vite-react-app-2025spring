import { Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ConfigProvider, Layout, theme } from 'antd'
import { Navigate } from 'react-router-dom'
import { globalConfig } from '@/globalConfig'
import Sider from '@/components/sider'
import Header from '@/components/header'

const { darkAlgorithm, defaultAlgorithm } = theme
const { Content } = Layout

function PrivateRoute(props) {
    // 判断localStorage是否有登录用户信息，如果没有则跳转登录页
    return window.localStorage.getItem(globalConfig.SESSION_LOGIN_INFO) ? (
        props.children
    ) : (
        <Navigate to="/login" />
    )
}

function Entry() {
    // 使用useSelector获取store中的theme
    const globalTheme = useSelector((state) => state.theme)

    // 在body上添加theme-mode属性，标记当前主题模式（便于实现亮暗模式下的CSS差异化）
    globalTheme.dark
        ? document.body.setAttribute('theme-mode', 'dark')
        : document.body.setAttribute('theme-mode', 'light')

    // Ant Design主题
    let antdTheme = {
        algorithm: globalTheme.dark ? darkAlgorithm : defaultAlgorithm,
    }
    // 应用自定义主题色
    if (globalTheme.colorPrimary) {
        antdTheme.token = {
            colorPrimary: globalTheme.colorPrimary,
        }
    }

    return (
        <PrivateRoute>
            <ConfigProvider theme={antdTheme}>
                <Layout className="G-fullpage">
                    <Header />
                    <Layout style={{ overflow: 'hidden', flex: 1 }}>
                        <Sider />
                        <Layout>
                            <div className="G-layout-main">
                                <Content style={{ minWidth: 800 }}>
                                    {/* Outlet用来放置二级路由页面 */}
                                    <Outlet />
                                </Content>
                            </div>
                        </Layout>
                    </Layout>
                </Layout>
            </ConfigProvider>
        </PrivateRoute>
    )
}

export default Entry
