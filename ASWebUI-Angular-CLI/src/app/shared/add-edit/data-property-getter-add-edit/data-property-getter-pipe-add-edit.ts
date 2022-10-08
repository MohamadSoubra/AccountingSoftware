import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
  name: "dataPropertyGetter",
})
export class DataPropertyGetterPipeAddEdit implements PipeTransform {
  transform(object: any, keyName: string, nestedProperty: string, ...args: unknown[]): unknown {
    if (!object || object[keyName] === undefined) {
      return;
    }
    if(nestedProperty){
      if(object[keyName][nestedProperty] === undefined){
        console.log(`nestedProperty ${nestedProperty} was not detected make sure you spelled it right (it's case sensitive)`);
        if (object[keyName]){
          return object[keyName];
        } else{
          return {};
        }
      }else if (object[keyName][nestedProperty] === null){
          return "";
      }else{
        return object[keyName][nestedProperty];
      }  
      
    }else{
      return object[keyName];
    }
  }
}
