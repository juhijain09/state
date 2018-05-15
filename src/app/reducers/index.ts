import * as fromSearch from './search.reducer';
import * as fromSearchresult from './searchresult.reducer';
import * as fromFilter from './filter.reducer';
import * as fromExpandresult from './expandresult.reducer';
import * as fromNodeDetails from './nodedetails.reducer';
import * as fromCreateNode from './createnode.reducer';
import * as fromRouteNode from './routenode.reducer';
import * as fromParentData from './parentdata.reducer';
import * as fromAuth from './auth.reducer';
import * as fromChildClasses from './childclasses.reducer';
import * as fromCreateNewNode from './createNewNode.reducer';
import * as fromModel from './model.reducer';
import * as fromAggregateToggle from './aggregatetoggle.reducer';
import * as fromGenerateCode from './generatecode.reducer';
import * as fromContractTypeData from './contracttypedata.reducer';
import * as fromQrCodeResult from './Qrcoderesult.reducer';
import * as fromGenerateQr from './generateqrcode.reducer';
import * as fromProductRegister from './productregistration.reducer';
import * as fromToggleLicense from './togglelicenseterm.reducer';
import * as fromCreateLicense from './createlicenseterm.reducer';
import * as fromNewAccount from './accountdata.reducer';
import * as fromNewAccountToken from './newaccounttoken.reducer';
import * as fromSignUp from './signup.reducer';
import * as fromResponseStatus from './responsestatus.reducer';
import * as fromApplicationName from './applicationdetail.reducer';
import * as fromRedirection from './redirection.reducer';
import * as fromSearchError from './searcherror.reducer';

import {
	SearchNode,
    ExpandNode,
	Filter,
    ParentData,
    User,
    ChildData,
    ContractTypeData,
    QrCode,
    NewContractType,
    AccountToken
} from '../models';

export interface State {
    searchterm: string;
    filter: Filter;
    searchresult: SearchNode[];
    currentNode: ExpandNode;
    isNodeDetailsVisible: boolean;
    isCreateNodeVisible: boolean;
    isGenerateCodeVisible: boolean;
    isCreateLicenseVisible: boolean;
    contractTypeData: ContractTypeData;
    parentData: ParentData;
    status:  {
        loggedIn: boolean;
        user: User | null;
    };
    childClasses: ChildData[];
    createNewNode: {};
    isModelVisible: boolean;
    createNodeRoute: string;
    isAggregateChecked: boolean;
    qrCodeResult: {};
    qrCodeData: QrCode;
    productregister: {};
    licenseTermData: NewContractType;
    accountCreationData: AccountToken;
    generateAccountToken: {};
    signup: {};
    responseStatus: string;
    appName: string;
    url: string;
    searchError: string;
}

export const reducers = {
    searchterm: fromSearch.reducer,
    filter: fromFilter.reducer,
    searchresult: fromSearchresult.reducer,
    currentNode: fromExpandresult.reducer,
    isNodeDetailsVisible: fromNodeDetails.reducer,
    isCreateNodeVisible: fromCreateNode.reducer,
    isGenerateCodeVisible: fromGenerateCode.reducer,
    contractTypeData: fromContractTypeData.reducer,
    qrCodeResult: fromQrCodeResult.reducer,
    qrCodeData: fromGenerateQr.reducer,
    productregister: fromProductRegister.reducer,
    isCreateLicenseVisible: fromToggleLicense.reducer,
    licenseTermData: fromCreateLicense.reducer,
    createNodeRoute: fromRouteNode.reducer,
    accountCreationData: fromNewAccount.reducer,
    generateAccountToken: fromNewAccountToken.reducer,
    signup: fromSignUp.reducer,
    parentData: fromParentData.reducer,
    status: fromAuth.reducer,
    childClasses: fromChildClasses.reducer,
    isModelVisible: fromModel.reducer,
    isAggregateChecked: fromAggregateToggle.reducer,
    responseStatus: fromResponseStatus.reducer,
    appName: fromApplicationName.reducer,
    url: fromRedirection.reducer,
    searchError: fromSearchError.reducer

};

export const getSearchTerm = (state: State) => state.searchterm;

export const getSearchResult = (state: State) => state.searchresult;

export const getFilter = (state: State) => state.filter;

export const getExpandResult = (state: State) => state.currentNode;

export const getNodeStatus = (state: State) => state.isNodeDetailsVisible;

export const getCreateNodeStatus = (state: State) => state.isCreateNodeVisible;

export const getParentData = (state: State) => state.parentData;

export const getStatus = (state: State) => state.status;

export const getChildClasses = (state: State) => state.childClasses;

export const createNewNode = (state: State) => state.createNewNode;

export const getCreateNodeLabel = (state: State) => state.createNodeRoute;

export const getModelStatus = (state: State) => state.isModelVisible;

export const getGenerateCodeStatus = (state: State) => state.isGenerateCodeVisible;

export const getContractTypeData = (state: State) => state.contractTypeData;

export const getQrCodeResult = (state: State) => state.qrCodeResult;

export const getQrCodeData = (state: State) => state.qrCodeData;

export const getProductRegistration = (state: State) => state.productregister;

export const getLicenseTermData = (state: State) => state.licenseTermData;

export const getCreateLicenseStatus = (state: State) => state.isCreateLicenseVisible;

export const getAccountCreationData = (state: State) => state.accountCreationData;

export const getAccountToken = (state: State) => state.generateAccountToken;

export const getSignUpResult = (state: State) => state.signup;

export const getAggregateBoxStatus = (state: State) => state.isAggregateChecked;

export const getResponseStatus = (state: State) => state.responseStatus;

export const getApplicationName = (state: State) => state.appName;

export const getRedirectionUrl = (state: State) => state.url;

export const getSearchError = (state: State) => state.searchError;
