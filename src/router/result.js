// result模块的路由
export default [
    {
        path: 'result-score',
        name: 'result-score',
        component: () => import('@/views/ResultScore')
    },
    {
        path: 'result-indicator',
        name: 'result-indicator',
        component: () => import('@/views/ResultIndicator')
    },
]