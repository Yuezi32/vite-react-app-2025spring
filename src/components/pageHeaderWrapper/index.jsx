import { Card } from 'antd'
import './pageHeaderWrapper.styl'

function PageHeaderWrapper(props) {
    const { title, subtitle } = props

    return (
        <Card className="M-pageHeaderWrapper" bordered={false}>
            <span className="page-header-title">{title}</span>
            <span className="page-header-subtitle">{subtitle}</span>
        </Card>
    )
}

export default PageHeaderWrapper