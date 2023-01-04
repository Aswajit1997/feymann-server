
function special(str){
    let res=[];
    // let word,delimeter,value;
    let helper={word:"",delimeter:"",value:0};
    let arr=str.split(/(,|-|{|}|;|:)/)
    // console.log(arr)
    let count=0;
    // console.log(arr.length)
    for(let i=0;i<arr.length;i++){
        if(count==0) helper.word=arr[i]
        else if(count==1) helper.delimeter=arr[i]
        count++
        if(count==2){
            res.push(helper);
            count=0;
            helper={word:"",delimeter:"",value:0}
        }
    }
     if(helper.word!==""){
            res.push(helper)
        }
    return res
}
export  {special}

