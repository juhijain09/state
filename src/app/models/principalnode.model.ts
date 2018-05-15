export interface PrincipalNode {
    label: string;
    principalGuid: string;
    adminUnitGuid: string;
    principalId: string;
}
export interface AdminUnitNode {
    type: string;
    parentAdminUnit: string;
    parentOrg: string;
    name: string;
    principalId: string;
}
