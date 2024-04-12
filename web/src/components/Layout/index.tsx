import { Layout } from 'antd'
import Sider from 'antd/es/layout/Sider'
import { Content, Footer, Header } from 'antd/es/layout/layout'
import React from 'react'

export default function MyLayout() {
  return (
    <Layout >
      <Sider width="25%" >
        Sider
      </Sider>
      <Layout>
        <Header  >Header</Header>
        <Content  >Content</Content>
        <Footer  >Footer</Footer>
      </Layout>
    </Layout>
  )
}
