// export const typesStatusWork = {
//     Sin_revisar: {
//         color: '#000',
//         icon: 'visibility_off',
//         text: 'Visita SO Claro',
//         value: 'Sin_revisar',
//         bd: true
//     }, 
//     Problema: {
//         color: '#D9312C',
//         icon: 'report_problem',
//         text: 'Alerta',
//         value: 'Problema',
//         bd: true
//     },
//     Navegacion: {
//         color: '#2C5ED9',
//         icon: 'near_me',
//         text: 'Sitios en PRE-STAGING',
//         value: 'Navegacion',
//         bd: true
//     },
//     Inicio_tarea: {
//         color: '#EEE309',
//         icon: 'settings_power',
//         text: 'Sitios en implementación',
//         value: 'Inicio_tarea',
//         bd: true
//     },
//     Culminada: {
//         color: '#53CF07',
//         icon: 'check_circle_outline',
//         text: 'Sitios integrados',
//         value: 'Culminada',
//         bd: true
//     },
//     Vista: {
//         color: '#9507CF',
//         icon: 'done_all',
//         text: 'Documentación aprobada',
//         value: 'Vista',
//         bd: true
//     },
//     Tarea: {
//         color: '#069b9b',
//         icon: 'list_alt',
//         text: 'MOS',
//         value: 'Tarea',
//         bd: false
//     },
//     Pendiente: {
//         color: '#fb8c00',
//         icon: 'list_alt',
//         text: 'Documentanción radicada',
//         value: 'Pendiente',
//         bd: true
//     },
//     Default: {
//         color: '#9507CF',
//         icon: 'list_alt',
//         text: '',
//         bd: false
//     }
// };
export const typesStatusWork = {
    Sin_revisar: {
        color: '#000',
        icon: 'visibility_off',
        text: 'Sin revisar',
        textDb: 'Tareas sin revisar',
        value: 'Sin_revisar',
        bd: true
    }, 
    Problema: {
        color: '#D9312C',
        icon: 'report_problem',
        text: 'Alerta',
        textDb: 'Alerta',
        value: 'Problema',
        bd: true
    },
    Navegacion: {
        color: '#2C5ED9',
        icon: 'near_me',
        text: 'Desplazamiento',
        value: 'Navegacion',
        bd: true
    },
    Inicio_tarea: {
        color: '#EEE309',
        icon: 'settings_power',
        text: 'Inicio tarea',
        value: 'Inicio_tarea',
        bd: true
    },
    Culminada: {
        color: '#53CF07',
        icon: 'check_circle_outline',
        text: 'Culminada',
        textDb: 'Tareas culminadas por cuadrillas en campo',
        value: 'Culminada',
        bd: true
    },
    Vista: {
        color: '#9507CF',
        icon: 'done_all',
        text: 'Vista',
        textDb: 'Tareas vistas por cuadrillas en campo',
        value: 'Vista',
        bd: true
    },
    Tarea: {
        color: '#069b9b',
        icon: 'list_alt',
        text: 'Tareas generales',
        value: 'Tarea',
        bd: false
    },
    Pendiente: {
        color: '#fb8c00',
        icon: 'list_alt',
        text: 'Pendiente aprobación',
        value: 'Pendiente',
        bd: true
    },
    Default: {
        color: '#9507CF',
        icon: 'list_alt',
        text: '',
        bd: false
    }
};
export const typesWork = {
    "MOS": {
        color: '#203e4b',
        icon: 'qr_code',
        text: 'MOS',
        textDb: 'MOS',
        value: 'MOS',
        bd: true
    }, 
    "implementacion": {
        color: '#efe200',
        icon: 'engineering',
        text: 'Sitios en implementación',
        textDb: 'Sitios en implementación',
        value: 'implementacion',
        bd: true
    },
    "integracion": {
        color: '#064740',
        icon: 'network_check',
        text: 'Sitios integrados',
        textDb: 'Sitios integrados',
        value: 'integracion',
        bd: true
    },
    "PRE-STAGING": {
        color: '#2d5ed8',
        icon: 'construction',
        text: 'Sitios en PRE-STAGING',
        textDb: 'Sitios en PRE-STAGING',
        value: 'PRE-STAGING',
        bd: true
    },
    "Documentación Radicada": {
        color: '#fb8d00',
        icon: 'web',
        text: 'Documentación radicada',
        textDb: 'Documentación radicada',
        value: 'Documentación radicada',
        bd: true
    },
    "Documentación aprobada": {
        color: '#5f48a5',
        icon: 'library_add_check',
        text: 'Documentación aprobada',
        textDb: 'Documentación aprobada',
        value: 'Documentación aprobada',
        bd: true
    },
    "Visita SO Claro": {
        color: '#000',
        image: '/arquivos/logo_claro.png',
        text: 'Visita SO Claro',
        textDb: 'Visita SO Claro',
        value: 'Visita SO Claro',
        bd: true
    }
};