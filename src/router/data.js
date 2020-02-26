// data模块的路由
export default [
    {
        path: 'data-upload',
        name: 'data-upload',
        component: () => import('@/views/data/DataUpload')
    },
    {
        path: 'data-review',
        name: 'data-review',
        component: () => import('@/views/data/DataReview')
    },
]