export default [
    {
        path: 'result-score',
        name: 'result-score',
        component: () => import('@/views/result/ResultScore')
    },
    {
        path: 'result-indicator',
        name: 'result-indicator',
        component: () => import('@/views/result/ResultIndicator')
    },
]