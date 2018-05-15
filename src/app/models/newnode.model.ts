export interface NewNode {
	$parentId: string;
	name: string;
	parentlabel: string;
    $classIds: any[];
    type: string;
    guid: string;
}
export interface DataItemNode {
	name: string;
	parentlabel: string;
    $classIds: any[];
    type: string;
    alias: string;
    diType: string;
    checked: boolean;
    unitOfMeasurement: string;
    maximunValue: number;
    minimumValue: number;
}
export interface NewContractType {
    ctDerivedClassId: string;
    name: string;
    type: string;
    associatedAppId: string;
    parentContractTypeGuid: string;
    maxDataItem: string;
    maxConcurrentAPISessions: string;
    maxConcurrentAssetSessions: string;
    apiKey: string;
    authToken: string;
}
export interface NewAsset {
    $parentId: string;
    $classIds: any[];
    type: string;
    name: string;
    associatedAppId: string;
    serialNumber: string;
    parentLabel: string;
    maxAssetCount: string;
}
export interface ContractTypeData {
    name: string;
    guid: string;
    authToken: string;
}
export interface NewClassNode {
    name: string;
    $parentId: string;
    parentlabel: string;
    type: string;
    $model: boolean;
}
