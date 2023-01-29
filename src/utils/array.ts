
export const oneToTwo= (arr:any[], pageSize: number) => {
    if (pageSize>=arr.length){
        return [arr]
    }
    if (!arr || arr.length === 0 || pageSize > arr.length) return [];
    let res=[];
    let len = arr.length % pageSize === 0 ? arr.length / pageSize : Math.floor(arr.length / pageSize) + 1;
    for (let i = 0; i < len; i++) {
        let s: any[] = [];
        for (let j = i * pageSize; j < i * pageSize + pageSize && j < arr.length; j++) {
            s.push(arr[j]);
        }
        res.push(s);
    }
    return res;
};