let constantRoutes = [
    {
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        name: 'login',
        meta: {
            title: '登录',
            hidden: true
        }
    },
    {
        //登录成功以后展示数据的路由
        path: '/',
        component: () => import('@/layout/index.vue'),
        meta: {
            hidden: false,
        },
        redirect: '/home',
        children: [
            {
                path: 'home',
                component: () => import('@/views/home/index.vue'),
                meta: {
                    title: '首页',
                    hidden: false,
                    icon: 'HomeFilled'
                }
            }
        ]
    },
    {
        path: '/base',
        component: () => import('@/layout/index.vue'), // 父路由要有router-view
        meta: {
            title: 'MI-BASE',
            hidden: false,
            icon: 'Tools'
        },
        redirect: '/base/datasource',
        children: [
            {
                path: 'datasource',
                component: () => import('@/views/base/datasource/index.vue'),
                name: 'datasource',
                meta: {
                    title: '数据源连接',
                    hidden: false,
                    icon: 'Link'
                }
            },
            {
                path: 'datacollection',
                component: () => import('@/views/base/datacollection/index.vue'),
                name: 'datacollection',
                meta: {
                    title: '数据集',
                    hidden: false,
                    icon: 'Star'
                }
            }
        ]
    },
    {
        path: '/dev',
        component: () => import('@/layout/index.vue'),
        meta: {
            hidden: false,
        },
        children: [
            {
                path: '/dev/echart',
                component: () => import('@/views/echart/index.vue'),
                name: 'echart',
                meta: {
                    title: '图表开发',
                    hidden: false,
                    icon: 'Document'
                }
            }
        ]
    },
    {
        path: '/datasource',
        component: () => import('@/layout/index.vue'),
        meta: {
            hidden: true
        },
        children: [
            {
                path: 'edit',
                component: () => import('@/views/base/datasource/edit/index.vue'),
                meta: {
                    hidden: true
                },
            }
        ]
    },
    {
        path: '/datacollection',
        component: () => import('@/layout/index.vue'),
        meta: {
            hidden: true,
        },
        children: [
            {
                path: '/datacollection/edit',
                component: () => import('@/views/base/datacollection/edit/index.vue'),
                meta: {
                    hidden: true,
                },
            }
        ]
    },
    {
        path: '/echart',
        component: () => import('@/views/echart/list/index.vue'),
        meta: {
            title: '测试',
            hidden: false
        }
    },
    {
        path: '/404',
        component: () => import('@/views/404/index.vue'),
        name: '404', // 命名路由 
        meta: {
            title: '404',
            hidden: true
        }
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        name: 'Any',
        meta: {
            title: '任意路由',
            hidden: true
        }
    }
]

export default constantRoutes;