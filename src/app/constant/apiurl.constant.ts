let SearchAsset = '/lg/findNode';
let GetProperties = '/lg/getProperties';
let ExpendNode = 'lg/expand/v2';
let LogOutApi = '/logout';
let PrivateLogin = '/lg/login/private';
let ParentApi = '/lg/account/getParent';
let UserOrg = '/lg/user/org/get';
let ChildClasses = '/lg/classes';
let DIClasses = '/lg/getDIclasses';
const ChildOrg = '/lg/user/get';
let CreateOrganisation = '/lg/org/create';
let CreateContract = '/lg/contractType/create';
let CreatePrincipal = '/lg/person/create';
let CreateClassNode = '/lg/class/create';
let CreateModelClassNode = 'lg/modelclass/create';
let OrgAssetsApi = 'lg/getOrgAssets';
const CreateDIAssociation = '/lg/dataitem/association';
const CreateEventAssociation = '/lg/event/association';
let CheckValidation = '/lg/account/validate';
let CreateDataItem = 'lg/dataitem/create';
let CreateEvent = 'lg/event/create';
const CreateAggAssociation = 'lg/dataitem/aggassociation';
let CreateLicenseTerm = 'lg/licenseTerm/create';
let CreateAssetLicense = 'lg/licenseAsset/create';
let ContractTypeApi = 'lg/user/contracttype/get';
let GenerateQrCode = 'lg/asset/token/create';
let CreateAssociation = '/lg/person/association';
let ProductRegistration = 'lg/account/license/subscribe';
let CreateContractType = 'lg/contractType/create';
let CreateAsset = '/lg/asset/create/';
let CreateAdminUnit = 'lg/adminunit/create';
let CreateAccountToken = 'lg/account/token/create';
let CreateAccount = 'lg/account/create';
let ContractAssociate = 'lg/principal/contract/associate';
// const ENVIRONMENT = process.env.ENV;
let  ENVIRONMENT = 'local';
if ( ENVIRONMENT === 'local') {
    SearchAsset = 'http://localhost:8087/assetSearch';
    ExpendNode = 'http://localhost:8087/expend';
    LogOutApi = 'http://localhost:8087/logout';
    PrivateLogin = 'http://localhost:8087/login';
    ParentApi = 'http://localhost:8087/getParent';
    ChildClasses = 'http://localhost:8087/getChildClass';
    CreateOrganisation = 'http://localhost:8087/createOrg';
    CreateContract = 'http://localhost:8087/createContractType';
    CreatePrincipal = 'http://localhost:8087/createPrincipal';
    CreateClassNode = 'http://localhost:8087/createClassNode';
    CreateModelClassNode = 'http://localhost:8087/createModelClassNode';
    CreateAssociation = 'http://localhost:8087/createAssociation';
    CheckValidation = 'http://localhost:8087/checkValidation';
    CreateAdminUnit = 'http://localhost:8087/createAdminUnit';
    CreateDataItem = 'http://localhost:8087/createDataItem';
    CreateEvent = 'http://localhost:8087/createEvent';
    UserOrg = 'http://localhost:8087/userOrgTree';
    CreateAsset = 'http://localhost:8087/createAsset';
    DIClasses = 'http://localhost:8087/getDIClasses';
    ContractTypeApi = 'http://localhost:8087/getContractTypeData';
    CreateLicenseTerm = 'http://localhost:8087/creationLicenseTerm';
    CreateContractType = 'http://localhost:8087/createContractType';
    CreateAssetLicense = 'http://localhost:8087/createAssetLicense';
    GenerateQrCode = 'http://localhost:8087/generateQRCode';
    ProductRegistration = 'http://localhost:8087/registerProduct';
    CreateAccountToken = 'http://localhost:8087/generateNewAccountToken';
    CreateAccount = 'http://localhost:8087/signup';
    ContractAssociate = 'http://localhost:8087/associateContract';
    OrgAssetsApi = 'http://localhost:8087/getOrgAssets';

}

const CreateNodeUrlObj = {
    Organisation: CreateOrganisation,
    Principal: CreatePrincipal,
    Contract: CreateContract,
    Class: CreateClassNode,
    ProductClass: CreateModelClassNode,
    ContractType: CreateContractType,
    Association: CreateAssociation,
    DataItemAssociation: CreateDIAssociation,
    Validation: CheckValidation,
    AdminUnit: CreateAdminUnit,
    DataItem: CreateDataItem,
    Event: CreateEvent,
    AggAssociation: CreateAggAssociation,
    EventAssociation: CreateEventAssociation,
    LicenseAsset: CreateAssetLicense,
    asset: CreateAsset

};

export { ENVIRONMENT };
export { SearchAsset };
export { ExpendNode };
export { PrivateLogin };
export { LogOutApi };
export { ParentApi };
export { ChildClasses };
export { CreateOrganisation };
export { CreateContract };
export { CreateClassNode };
export { CreateModelClassNode };
export { CreateContractType };
export { CreateNodeUrlObj };
export { CreateAssociation };
export { CreateDIAssociation };
export { CheckValidation };
export { ChildOrg };
export { CreateDataItem };
export { CreateAggAssociation };
export { CreateEventAssociation };
export { CreateEvent };
export { UserOrg };
export { CreateAssetLicense };
export { ContractTypeApi };
export { GenerateQrCode };
export { ProductRegistration };
export { CreateLicenseTerm };
export { CreateAccountToken };
export { CreateAccount };
export { ContractAssociate };
export { OrgAssetsApi };
export { DIClasses };
export { GetProperties };
