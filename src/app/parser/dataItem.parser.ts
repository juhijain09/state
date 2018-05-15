import * as _ from 'lodash';

export function ParseDataForTreeView(data) {
 const x = data.result.class[0].map(o => {
                return {
                    text: new String(o.name),
                    value: o.guid,
                    children : o.children
                };
               });

 const y = x.map(res => {
                const k = res.children.map(o => {

                      return {
                    text : new String(o.name),
                    value : o.guid,
                };
            });
                   res.children = k;
            });
   return x ; //  body...
}
