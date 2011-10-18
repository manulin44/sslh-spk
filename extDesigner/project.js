MyFormUi = Ext.extend(Ext.form.FormPanel, {
    autoHeight: true,
    width: 431,
    bodyStyle: 'padding:5px 5px 0',
    buttonAlign: 'left',
    frame: true,
    padding: 10,
    title: 'SSLH - SCP - Tinyproxy',
    method: 'POST',
    timeout: 15000,
    url: 'services.cgi',

    initComponent: function() {
        this.layout = {
            labelWidth: 75,
            type: 'form'
        };
        this.items = [
            {
                xtype: 'fieldset',
                autoHeight: true,
                autoWidth: true,
                defaultType: 'textfield',
                buttonAlign: 'left',
                title: 'Services actifs',
                items: [
                    {
                        xtype: 'label',
                        html: '<font size="2">Sélectionner les services qui seront activés avec l\'extension :</font><P><BR>',
                        text: 'Label:'
                    },
                    {
                        xtype: 'container',
                        defaultType: 'checkbox',
                        layout: {
                            type: 'anchor'
                        },
                        hideLabel: true,
                        items: [
                            {
                                xtype: 'checkbox',
                                id: 'sslh',
                                name: 'sslh',
                                boxLabel: 'SSLH : permet d\'utiliser SSH, HTTPS et OpenVPN sur un même port',
                                anchor: '100%'
                            },
                            {
                                xtype: 'checkbox',
                                id: 'scp',
                                name: 'scp',
                                boxLabel: 'SCP : permet la copie sécurisée de fichier à distance',
                                anchor: '100%'
                            },
                            {
                                xtype: 'checkbox',
                                id: 'proxy',
                                name: 'proxy',
                                boxLabel: 'Tinyproxy : proxy HTTP très léger',
                                anchor: '100%'
                            },
                            {
                                xtype: 'label',
                                html: '<br>',
                                text: 'Label:'
                            }
                        ]
                    }
                ]
            },
            {
                xtype: 'fieldset',
                autoHeight: true,
                autoWidth: true,
                layout: {
                    columns: 4,
                    type: 'table'
                },
                animCollapse: true,
                collapseFirst: false,
                collapsible: true,
                title: 'SSLH',
                items: [
                    {
                        xtype: 'label',
                        text: 'Adresse et port d\'écoute :'
                    },
                    {
                        xtype: 'textfield',
                        name: 'sslhaddress',
                        allowBlank: false
                    },
                    {
                        xtype: 'label',
                        html: '&nbsp;:&nbsp;',
                        text: ''
                    },
                    {
                        xtype: 'textfield',
                        width: 50,
                        name: 'sslhport'
                    },
                    {
                        xtype: 'label',
                        text: 'Adresse et port SSH :'
                    },
                    {
                        xtype: 'textfield',
                        name: 'scpaddress',
                        allowBlank: false
                    },
                    {
                        xtype: 'label',
                        html: '&nbsp;:&nbsp;',
                        text: ''
                    },
                    {
                        xtype: 'textfield',
                        width: 50,
                        name: 'scpport'
                    },
                    {
                        xtype: 'label',
                        text: 'Adresse et port SSL :'
                    },
                    {
                        xtype: 'textfield',
                        name: 'ssladdress',
                        allowBlank: false
                    },
                    {
                        xtype: 'label',
                        html: '&nbsp;:&nbsp;',
                        text: ''
                    },
                    {
                        xtype: 'textfield',
                        width: 50,
                        name: 'sslport'
                    },
                    {
                        xtype: 'label',
                        text: 'Adresse et port OpenVPN :'
                    },
                    {
                        xtype: 'textfield',
                        name: 'vpnaddress',
                        allowBlank: false
                    },
                    {
                        xtype: 'label',
                        html: '&nbsp;:&nbsp;',
                        text: ''
                    },
                    {
                        xtype: 'textfield',
                        width: 50,
                        name: 'vpnport'
                    }
                ]
            },
            {
                xtype: 'fieldset',
                autoHeight: true,
                autoWidth: true,
                layout: {
                    columns: 4,
                    type: 'table'
                },
                animCollapse: true,
                collapseFirst: false,
                collapsible: true,
                title: 'Tinyproxy',
                items: [
                    {
                        xtype: 'label',
                        text: 'Adresse et port d\'écoute :'
                    },
                    {
                        xtype: 'textfield',
                        name: 'proxyaddress',
                        allowBlank: false
                    },
                    {
                        xtype: 'label',
                        html: '&nbsp;:&nbsp;',
                        text: ''
                    },
                    {
                        xtype: 'textfield',
                        width: 50,
                        name: 'proxyport'
                    }
                ]
            },
            {
                xtype: 'container',
                autoHeight: true,
                autoWidth: true,
                layout: {
                    type: 'fit'
                },
                items: [
                    {
                        xtype: 'button',
                        disabled: true,
                        id: 'services-submit',
                        scale: 'medium',
                        text: 'Valider',
                        type: 'submit'
                    }
                ]
            }
        ];
        MyFormUi.superclass.initComponent.call(this);
    }
});