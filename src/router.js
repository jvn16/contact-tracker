import { createRouter, createWebHistory } from 'vue-router'

import ContactsPage from './components/pages/ContactsPage.vue'
import AddContact from './components/pages/AddContact.vue'
import ViewContact from './components/pages/ViewContact.vue'
import EditContact from './components/pages/EditContact.vue'
import NotFound from './components/pages/NotFound.vue'

const router = createRouter({
    history: createWebHistory(),
    routes: [{
        path: '/',
        redirect: '/contacts',
    },
    {   
        name: 'ContactsPage',
        path: '/contacts',
        component: ContactsPage

    },
    {   
        name: 'AddContact',
        path: '/contacts/add',
        component: AddContact

    },
    {   
        name: 'EditContact',
        path: '/contacts/edit/:contactId',
        component: EditContact,
        props: true

    },
    {   
        name: 'ViewContact',
        path: '/contacts/view/:contactId',
        component: ViewContact,
        props: true

    },
    {
        name: 'NotFound',
        path: '/:notFound(.*)*',
        component: NotFound
    }
]
})

export default router