import * as _ from 'lodash';

export function listChildNodesOnExpand(data) {
    const nodeList = data.nodes.list;
    const result = [];
    _.forEach( nodeList, (o) => {
        const childData = o.child;
        result.push(childData);
    });
    console.log('result' , result);
    return result;
    // body...
}
