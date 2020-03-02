export default [
    {
        path: 'report-quarter',
        name: 'report-quarter',
        component: () => import('@/views/report/ReportQuarter')
    },
    {
        path: 'report-month',
        name: 'report-month',
        component: () => import('@/views/report/ReportMonth')
    },
]