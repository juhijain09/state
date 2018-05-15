const AppKeys = {
	main: 'WiproAdmin',
	assetDashBoard: 'AssetDashboard',
	license: 'LicenseApp',
	app: 'registerProduct',
	brand: 'WarantyApp'
};
const nodeType = [
		{ 'name' : 'org', 'label': 'Organisation' },
		{ 'name' : 'adminUnit', 'label': 'AdminUnit' },
		{ 'name' : 'contractType', 'label': 'Contracts' },
		{ 'name' : 'principal', 'label': 'Principal' },
		{ 'name' : 'dataItem', 'label': 'Data Item' },
		{ 'name' : 'asset', 'label': 'Asset' },
		// { 'name' : 'contract', 'label': '' },
		{ 'name' : 'class', 'label': 'Class' },
		{ 'name' : 'termData', 'label': 'Term Data' },
		{ 'name' : 'termEventType', 'label': 'TermEventType' },
		// { 'name' : 'termEvent', 'label': 'TermEvent' },
		{ 'name' : 'termAction', 'label': 'Term Action' },
		{ 'name' : 'termService', 'label': 'Term Service' },
		{ 'name' : 'productClass', 'label': 'Product Class' },
		{ 'name' : 'events', 'label': 'Events' },
		{ 'name' : 'termEvent', 'label': 'Term Event' },
		{ 'name' : 'scriptTemp', 'label': 'ScriptTemp' },
		{ 'name' : 'mashup', 'label': 'Mash Up' },
		{ 'name' : 'termActionType', 'label': 'TermActionType' },
	];
const PanelLabel = [
		{ 'name': 'Overview', 'label': 'overview' },
		{ 'name': 'Associations', 'label': 'assoc' },
		{ 'name': 'Modules', 'label': 'modules' },
		{ 'name': 'Contracts', 'label': 'contract' },
		{ 'name': 'Accounts', 'label': 'account' },
		{ 'name': 'Uploads', 'label': 'upload' },
		{ 'name': 'Labels', 'label': 'label' },
		];

 const createNode = [
        { 'name': 'Organisation', 'label': 'Og' ,'enable':'true'},
		{ 'name': 'AdminUnit', 'label': 'Ad' ,'enable':'true'},
		{ 'name': 'Principal', 'label': 'Pn' ,'enable':'true'},
		{ 'name': 'ContractType', 'label': 'Ct' ,'enable':'true'},
		{ 'name': 'Class', 'label': 'Cl' ,'enable':'true'},
		{ 'name': 'Asset', 'label': 'As' ,'enable':'true'},
		{ 'name': 'DataItem', 'label': 'DI' ,'enable':'true'},
		{ 'name': 'Event', 'label': 'Ev' ,'enable':'true'},
		{ 'name': 'ScriptTemp', 'label': 'St' ,'enable':'true'},
		{ 'name': 'Mash Up', 'label': 'Mp' ,'enable':'true'},
];
const ChildNodes = { 
	org: ['Organisation','Asset','ContractType'],
    asset: ['Asset'],
 	adminUnit: ['Principal', 'AdminUnit'],
 	class: ['Class'],
 	productClass: ['DataItem','Event'],
 	contractType: ['ContractType'],
 	principal: []
 }

export { AppKeys };
export { nodeType };
export { PanelLabel };
export { createNode };
export { ChildNodes };
